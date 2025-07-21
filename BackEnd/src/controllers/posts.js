
class PostController {
    static async getAllPosts(req, res) {
        try {
            const posts = await PostModel.find();
            res.status(200).json(posts);
        } catch (error) {
            res.status(500).json({ message: 'Error fetching posts', error: error.message });
        }
    }

    static async getPostById(req, res) {
        try {
            const postId = req.params.id;
            const post = await PostModel.findById(postId);
            if (!post) {
                return res.status(404).json({ message: 'Post not found' });
            }
            res.status(200).json(post);
        } catch (error) {
            res.status(500).json({ message: 'Error fetching post', error: error.message });
        }
    }

    static async createPost(req, res) {
        try {
            const newPost = new PostModel(req.body);
            await newPost.save();
            res.status(201).json(newPost);
        } catch (error) {
            res.status(400).json({ message: 'Error creating post', error: error.message });
        }
    }

    static async updatePost(req, res) {
        try {
            const postId = req.params.id;
            const updatedPost = await PostModel.findByIdAndUpdate(postId, req.body, { new: true });
            if (!updatedPost) {
                return res.status(404).json({ message: 'Post not found' });
            }
            res.status(200).json(updatedPost);
        } catch (error) {
            res.status(400).json({ message: 'Error updating post', error: error.message });
        }
    }

    static async deletePost(req, res) {
        try {
            const postId = req.params.id;
            const deletedPost = await PostModel.findByIdAndDelete(postId);
            if (!deletedPost) {
                return res.status(404).json({ message: 'Post not found' });
            }
            res.status(200).json({ message: 'Post deleted successfully' });
        } catch (error) {
            res.status(500).json({ message: 'Error deleting post', error: error.message });
        }
    }
}

module.exports = PostController;