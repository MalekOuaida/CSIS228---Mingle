const { validationResult } = require('express-validator');
const { addLike, checkMatch, deleteLike } = require('../services/likes.services');

const addLikeController = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { likerUserId, likedUserId } = req.body;
    try {
        const likeResult = await addLike(likerUserId, likedUserId);
        const matchResult = await checkMatch(likerUserId, likedUserId);
        res.status(200).json({ 
            message: "Like added successfully", 
            likeResult, 
            match: matchResult ? 'Match found!' : 'No match yet' 
        });
    } catch (error) {
        res.status(500).json({ message: error?.message });
    }
};

const deleteLikeController = async (req, res) => {
    const { likeId } = req.params;
    try {
        await deleteLike(likeId);
        res.status(200).json({ message: "Like deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: error?.message });
    }
};

module.exports = {
    addLikeController,
    deleteLikeController
};
