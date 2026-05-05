import Post from '../models/Post.js';
import Comment from '../models/Comment.js';

// @desc    Get all posts
// @route   GET /api/posts
// @access  Public
export const getPosts = async (req, res) => {
    try {
        let query;

        // Copy req.query
        const reqQuery = { ...req.query };

        // Fields to exclude
        const removeFields = ['select', 'sort', 'page', 'limit', 'search', 'author'];

        // Loop over removeFields and delete them from reqQuery
        removeFields.forEach(param => delete reqQuery[param]);

        // Create query string
        let queryStr = JSON.stringify(reqQuery);

        // Finding resource
        query = Post.find(JSON.parse(queryStr)).populate('author', 'name avatar');

        // Search in title
        if (req.query.search) {
            query = query.find({ title: { $regex: req.query.search, $options: 'i' } });
        }

        // Filter by author name (searching via populate is tricky, usually we'd pass author ID)
        // For simplicity, if author is provided, we assume it's an ID or we search by name in User first
        if (req.query.author) {
            query = query.find({ author: req.query.author });
        }

        // Sort
        if (req.query.sort) {
            const sortBy = req.query.sort === 'newest' ? '-createdAt' : req.query.sort.split(',').join(' ');
            query = query.sort(sortBy);
        } else {
            query = query.sort('-createdAt');
        }

        // Pagination
        const page = parseInt(req.query.page, 10) || 1;
        const limit = parseInt(req.query.limit, 10) || 10;
        const startIndex = (page - 1) * limit;
        const endIndex = page * limit;
        const total = await Post.countDocuments();

        query = query.skip(startIndex).limit(limit);

        // Executing query
        const posts = await query;

        // Pagination result
        const pagination = {};

        if (endIndex < total) {
            pagination.next = {
                page: page + 1,
                limit
            };
        }

        if (startIndex > 0) {
            pagination.prev = {
                page: page - 1,
                limit
            };
        }

        res.status(200).json({
            success: true,
            count: posts.length,
            pagination,
            data: posts
        });
    } catch (err) {
        res.status(400).json({ success: false, message: err.message });
    }
};

// @desc    Get single post
// @route   GET /api/posts/:id
// @access  Public
export const getPost = async (req, res) => {
    try {
        const post = await Post.findById(req.params.id).populate('author', 'name avatar');

        if (!post) {
            return res.status(404).json({ success: false, message: 'Post not found' });
        }

        // Get comments for this post
        const comments = await Comment.find({ post: req.params.id }).populate('author', 'name avatar');

        res.status(200).json({
            success: true,
            data: {
                ...post._doc,
                comments
            }
        });
    } catch (err) {
        res.status(400).json({ success: false, message: err.message });
    }
};

// @desc    Create new post
// @route   POST /api/posts
// @access  Private
export const createPost = async (req, res) => {
    try {
        // Add user to req.body
        req.body.author = req.user.id;

        const post = await Post.create(req.body);

        res.status(201).json({
            success: true,
            data: post
        });
    } catch (err) {
        res.status(400).json({ success: false, message: err.message });
    }
};

// @desc    Update post
// @route   PUT /api/posts/:id
// @access  Private
export const updatePost = async (req, res) => {
    try {
        let post = await Post.findById(req.params.id);

        if (!post) {
            return res.status(404).json({ success: false, message: 'Post not found' });
        }

        // Make sure user is post owner
        if (post.author.toString() !== req.user.id && req.user.role !== 'admin') {
            return res.status(401).json({ success: false, message: 'Not authorized to update this post' });
        }

        post = await Post.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true
        });

        res.status(200).json({
            success: true,
            data: post
        });
    } catch (err) {
        res.status(400).json({ success: false, message: err.message });
    }
};

// @desc    Delete post
// @route   DELETE /api/posts/:id
// @access  Private
export const deletePost = async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);

        if (!post) {
            return res.status(404).json({ success: false, message: 'Post not found' });
        }

        // Make sure user is post owner
        if (post.author.toString() !== req.user.id && req.user.role !== 'admin') {
            return res.status(401).json({ success: false, message: 'Not authorized to delete this post' });
        }

        await post.deleteOne();

        // Also delete associated comments
        await Comment.deleteMany({ post: req.params.id });

        res.status(200).json({
            success: true,
            data: {}
        });
    } catch (err) {
        res.status(400).json({ success: false, message: err.message });
    }
};
