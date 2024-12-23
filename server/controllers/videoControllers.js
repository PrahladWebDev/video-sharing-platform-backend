import Video from "../models/Video.js";
import Channel from "../models/Channel.js";

const uploadVideo = async (req, res) => {
    try {
        const { name, description, category, channelId } = req.body;
        const channel = await Channel.findOne({ _id: channelId, owner: req.user._id });
        
        if (!channel) return res.status(404).json({ success: false, message: 'Channel not found or unauthorized' });

        const video = new Video({
            name,
            description,
            category,
            owner: req.user._id,
            channel: channelId,
        });

        const savedVideo = await video.save();
        res.status(201).json(savedVideo);
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

const getAllVideos = async (req, res) => {
    try {
        const videos = await Video.find()
            .populate('owner', 'username')
            .populate('channel', 'channelName');
        res.status(200).json(videos);
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

const getVideoById = async (req, res) => {
    try {
        const { id } = req.params;
        const video = await Video.findById(id)
            .populate('owner', 'username')
            .populate('channel', 'channelName');

        if (!video) return res.status(404).json({ success: false, message: 'Video not found' });

        const isUniqueView = !video.viewers.includes(req.user._id);
        if (isUniqueView) {
            video.views += 1;
            video.viewers.push(req.user._id);
            await video.save();
        }

        res.status(200).json(video);
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

const deleteVideo = async (req, res) => {
    try {
        const { id } = req.params;
        const video = await Video.findOneAndDelete({ _id: id, owner: req.user._id });

        if (!video) return res.status(404).json({ success: false, message: 'Video not found or unauthorized' });

        res.status(200).json({ success: true, message: 'Video deleted successfully' });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

const updateVideo = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, description, category } = req.body;

        const video = await Video.findOneAndUpdate(
            { _id: id, owner: req.user._id },
            { name, description, category },
            { new: true }
        );

        if (!video) return res.status(404).json({ success: false, message: 'Video not found or unauthorized' });

        res.status(200).json(video);
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

export { uploadVideo, getAllVideos, getVideoById, deleteVideo, updateVideo };





