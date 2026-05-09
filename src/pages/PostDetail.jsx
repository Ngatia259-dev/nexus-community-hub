import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { useFetch } from "../hooks";
import Avatar from "../components/shared/Avatar";
import Badge from "../components/shared/Badge";
import Button from "../components/shared/Button";
import Loader from "../components/shared/Loader";

const PostDetail = () => {
  const { id } = useParams();
  const [liked, setLiked] = useState(false);
  const [copied, setCopied] = useState(false);

  // Fetch from the local backend
  const { data: response, loading: postLoading, error: postError } =
    useFetch(`/api/posts/${id}`);

  const post = response?.data;
  const author = post?.author;

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (postLoading) return <div className="py-12 text-center"><Loader /></div>;
  if (postError || !post) return (
    <div className="py-12 text-center">
      <p>Post not found.</p>
      <Link to="/posts">Back to posts</Link>
    </div>
  );

  return (
    <div className="max-w-3xl mx-auto px-4 py-12">
      <nav className="text-sm text-gray-400 mb-6">
        <Link to="/">Home</Link> / <Link to="/posts">Posts</Link> / {post.title}
      </nav>

      <div className="flex gap-2 mb-4">
        {post.tags && post.tags.map(tag => (
          <Badge key={tag}>{tag}</Badge>
        ))}
      </div>

      <h1 className="text-3xl font-bold mb-4 capitalize">{post.title}</h1>

      <div className="flex items-center gap-3 mb-8 text-sm text-gray-500">
        <Avatar name={author?.name || "Author"} size="sm" />
        <span>{author?.name || "Loading..."}</span>
      </div>

      <p className="text-gray-700 leading-relaxed mb-10 whitespace-pre-wrap">{post.content}</p>

      <div className="flex gap-3 mb-10">
        <Button onClick={() => setLiked(l => !l)}>
          {liked ? "Liked" : "Like"}
        </Button>
        <Button onClick={handleShare}>
          {copied ? "Link copied!" : "Share"}
        </Button>
      </div>

      {author && (
        <div className="flex items-center gap-4 p-4 rounded-xl border mb-10">
          <Avatar name={author.name} size="lg" />
          <div>
            <p className="font-semibold">{author.name}</p>
            <p className="text-sm text-gray-500">{author.email}</p>
          </div>
        </div>
      )}

      <CommentsSection postId={id} initialComments={post.comments || []} />
    </div>
  );
};

const CommentsSection = ({ postId, initialComments }) => {
  const [comments, setComments] = useState(initialComments);
  const [form, setForm] = useState({ content: "" });
  const [formError, setFormError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async () => {
    if (form.content.length < 5) { setFormError("Comment too short."); return; }
    
    const token = localStorage.getItem('nexus_token');
    if (!token) {
      setFormError("You must be logged in to comment.");
      return;
    }

    setIsSubmitting(true);
    try {
      const response = await fetch(`/api/posts/${postId}/comments`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ content: form.content })
      });
      const data = await response.json();
      
      if (data.success) {
        // Optimistically add the returned comment
        // (Note: The backend might just return the comment without populated author, 
        // but for now we append it as-is)
        setComments(prev => [data.data, ...prev]);
        setForm({ content: "" });
        setFormError("");
      } else {
        setFormError(data.message || "Failed to post comment.");
      }
    } catch (err) {
      setFormError("Network error.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="mt-10">
      <h2 className="text-xl font-bold mb-6">
        Comments ({comments.length})
      </h2>

      <div className="bg-gray-50 rounded-xl p-4 mb-8 border">
        <textarea
          placeholder="Write a comment..."
          value={form.content}
          onChange={e => setForm({ content: e.target.value })}
          rows={3}
          className="w-full px-3 py-2 mb-3 text-sm border rounded-lg resize-none"
        />
        {formError && <p className="text-xs text-red-500 mb-2">{formError}</p>}
        <div className="flex justify-end">
          <Button onClick={handleSubmit} disabled={isSubmitting}>
            {isSubmitting ? 'Posting...' : 'Post comment'}
          </Button>
        </div>
      </div>

      {comments.map(c => (
        <div key={c._id || c.id} className="py-4 border-b">
          <p className="text-sm font-semibold">{c.author?.name || 'Anonymous'}</p>
          <p className="text-sm text-gray-600 mt-1">{c.content}</p>
        </div>
      ))}
    </section>
  );
};

export default PostDetail;