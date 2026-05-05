import Comment from '../models/Comment.js';
import Post from '../models/Post.js';

// @desc    Add comment
// @route   POST /api/posts/:postId/comments
// @access  Private
export const addComment = async (req, res) => {
    try {
        req.body.post = req.params.postId;
        req.body.author = req.user.id;

        const post = await Post.findById(req.params.postId);

        if (!post) {
            return res.status(404).json({ success: false, message: 'Post not found' });
        }

        const comment = await Comment.create(req.body);

        res.status(201).json({
            success: true,
            data: comment
        });
    } catch (err) {
        res.status(400).json({ success: false, message: err.message });
    }
};

// @desc    Delete comment
// @route   DELETE /api/posts/:postId/comments/:commentId
// @access  Private
export const deleteComment = async (req, res) => {
    try {
        const comment = await Comment.findById(req.params.commentId);

        if (!comment) {
            return res.status(404).json({ success: false, message: 'Comment not found' });
        }

        // Make sure user is comment owner or admin
        if (comment.author.toString() !== req.user.id && req.user.role !== 'admin') {
            return res.status(401).json({ success: false, message: 'Not authorized to delete this comment' });
        }

        await comment.deleteOne();

        res.status(200).json({
            success: true,
            data: {}
        });
    } catch (err) {
        res.status(400).json({ success: false, message: err.message });
    }
};
