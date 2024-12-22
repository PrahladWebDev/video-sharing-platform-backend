import Interaction from "../models/Interactions.js";
import Video from "../models/Video.js";

const toggleStatus = async (req, res) => {
    try {
        const { videoId, type } = req.body;
        const video = await Video.findById(videoId);
        if (!video) return res.status(404).json({ success: false, message: "Video not found" });

        let interaction = await Interaction.findOne({ user: req.user._id, video: videoId });

        if (interaction) {
            if (interaction.type === type) {
                await interaction.deleteOne();
                return res.status(200).json({ success: true, message: `Removed ${type}` });
            } else {
                interaction.type = type;
                await interaction.save();
                return res.status(200).json({ success: true, message: `Toggled to ${type}` });
            }
        } else {
            const newInteraction = new Interaction({
                user: req.user._id,
                video: videoId,
                type,
            });
            await newInteraction.save();
            return res.status(201).json({ success: true, message: `${type} added` });
        }
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

export { toggleStatus };
