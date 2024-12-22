import Channel from "../models/Channel.js";

const createChannel = async (req, res) => {
    const { channelName, channelDescription } = req.body;

    const existingChannel = await Channel.findOne({ channelName });
    if (existingChannel) return res.status(400).json({ message: 'Channel already exists' });

    const channel = new Channel({ channelName, channelDescription, owner: req.user._id });
    const savedChannel = await channel.save();
    res.json(savedChannel);
};

const getAllChannels = async (req, res) => {
    const channels = await Channel.find({}).populate('owner', 'username email').populate('subscribers', 'username email');
    res.json(channels);
};

const getChannelById = async (req, res) => {
    const { id } = req.params;
    const channel = await Channel.findById(id).populate('owner', 'username email').populate('subscribers', 'username email');
    if (!channel) return res.status(404).json({ message: 'Channel not found' });
    res.json(channel);
};

const editChannel = async (req, res) => {
    const { id } = req.params;
    const { channelName, channelDescription } = req.body;

    const updatedChannel = await Channel.findOneAndUpdate(
        { _id: id, owner: req.user._id },
        { channelName, channelDescription },
        { new: true }
    );
    if (!updatedChannel) return res.status(404).json({ message: 'Channel not found or unauthorized' });
    res.json(updatedChannel);
};

const deleteChannel = async (req, res) => {
    const { id } = req.params;
    const channel = await Channel.findOneAndDelete({ _id: id, owner: req.user._id });
    if (!channel) return res.status(404).json({ message: 'Channel not found or unauthorized' });
    res.status(200).json({ message: 'Channel deleted successfully' });
};

const toggleSubscription = async (req, res) => {
    const { id } = req.params;
    const channel = await Channel.findById(id);
    if (!channel) return res.status(404).json({ message: 'Channel not found' });

    const isSubscribed = channel.subscribers.includes(req.user._id);
    if (isSubscribed) {
        channel.subscribers.pull(req.user._id);
        await channel.save();
        return res.status(200).json({ message: 'Unsubscribed successfully' });
    }

    channel.subscribers.push(req.user._id);
    await channel.save();
    res.status(200).json({ message: 'Subscribed successfully' });
};

const getUserChannels = async (req, res) => {
    const channels = await Channel.find({ owner: req.user._id });
    res.json(channels);
};

const getSubscribedChannels = async (req, res) => {
    const channels = await Channel.find({ subscribers: req.user._id });
    res.json(channels);
};

export {
    createChannel,
    getAllChannels,
    getChannelById,
    editChannel,
    deleteChannel,
    toggleSubscription,
    getUserChannels,
    getSubscribedChannels
};
