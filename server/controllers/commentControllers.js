import Comment from "../models/Comment.js";
import Video from "../models/Video.js";

const addComment = async (req, res) => {
    try {
        const { videoId, content } = req.body;
        
        const video = await Video.findById(videoId);
        if (!video) return res.status(404).json({ success: false, message: "Video not found" });

        const newComment = new Comment({
            video: videoId,
            user: req.user._id,
            content,
        });

        const savedComment = await newComment.save();
        res.status(201).json({ success: true, comment: savedComment });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

const getComments = async (req, res) => {
    try {
        const { videoId } = req.params;

        const comments = await Comment.find({ video: videoId })
            .populate('user', 'username')  // Populate user field with username
            .sort({ createdAt: -1 });  // Optional: Sort by newest comments first

        res.status(200).json({ success: true, comments });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

export { addComment, getComments };
