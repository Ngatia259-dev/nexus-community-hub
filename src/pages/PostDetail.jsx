import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { useFetch } from "../hooks/useFetch";
import Avatar from "../components/shared/Avatar";
import Badge from "../components/shared/Badge";
import Button from "../components/shared/Button";
import Loader from "../components/shared/Loader";

const PostDetail = () => {
  const { id } = useParams();
  const [liked, setLiked] = useState(false);
  const [copied, setCopied] = useState(false);

  const { data: post, loading: postLoading, error: postError } =
    useFetch(`https://jsonplaceholder.typicode.com/posts/${id}`);

  const { data: author } = useFetch(
    post?.userId
      ? `https://jsonplaceholder.typicode.com/users/${post.userId}`
      : null
  );

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
        {["community", "tech", "discussion"].map(tag => (
          <Badge key={tag}>{tag}</Badge>
        ))}
      </div>

      <h1 className="text-3xl font-bold mb-4 capitalize">{post.title}</h1>

      <div className="flex items-center gap-3 mb-8 text-sm text-gray-500">
        <Avatar name={author?.name || "Author"} size="sm" />
        <span>{author?.name || "Loading..."}</span>
      </div>

      <p className="text-gray-700 leading-relaxed mb-10">{post.body}</p>

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

      <CommentsSection postId={id} />
    </div>
  );
};

const CommentsSection = ({ postId }) => {
  const { data: fetched, loading, error } =
    useFetch(`https://jsonplaceholder.typicode.com/comments?postId=${postId}`);

  // only tracks user-added comments — fetched ones come directly from useFetch
  const [newComments, setNewComments] = useState([]);
  const [form, setForm] = useState({ name: "", body: "" });
  const [formError, setFormError] = useState("");

  const allComments = [...(newComments), ...(fetched || [])];

  const handleSubmit = () => {
    if (!form.name.trim()) { setFormError("Name is required."); return; }
    if (form.body.length < 5) { setFormError("Comment too short."); return; }
    setNewComments(prev => [{ id: Date.now(), ...form }, ...prev]);
    setForm({ name: "", body: "" });
    setFormError("");
  };

  return (
    <section className="mt-10">
      <h2 className="text-xl font-bold mb-6">
        Comments ({allComments.length})
      </h2>

      <div className="bg-gray-50 rounded-xl p-4 mb-8 border">
        <input
          type="text"
          placeholder="Your name"
          value={form.name}
          onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
          className="w-full px-3 py-2 mb-3 text-sm border rounded-lg"
        />
        <textarea
          placeholder="Write a comment..."
          value={form.body}
          onChange={e => setForm(f => ({ ...f, body: e.target.value }))}
          rows={3}
          className="w-full px-3 py-2 mb-3 text-sm border rounded-lg resize-none"
        />
        {formError && <p className="text-xs text-red-500 mb-2">{formError}</p>}
        <div className="flex justify-end">
          <Button onClick={handleSubmit}>Post comment</Button>
        </div>
      </div>

      {loading && <Loader />}
      {error && <p className="text-red-500 text-sm">Failed to load comments.</p>}

      {allComments.map(c => (
        <div key={c.id} className="py-4 border-b">
          <p className="text-sm font-semibold">{c.name}</p>
          <p className="text-sm text-gray-600 mt-1">{c.body}</p>
        </div>
      ))}
    </section>
  );
};

export default PostDetail;