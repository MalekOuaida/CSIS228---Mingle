const { validationResult } = require('express-validator');
const { checkMatch, getMatchesForUser } = require('../services/matchServices');

const checkMatchController = async (req, res) => {
    const { userId1, userId2 } = req.body;
    try {
        const isMatch = await checkMatch(userId1, userId2);
        res.status(200).json({ 
            message: isMatch ? 'Match found!' : 'No match yet',
            isMatch
        });
    } catch (error) {
        res.status(500).json({ message: error?.message });
    }
};

const getMatchesForUserController = async (req, res) => {
    const { userId } = req.params;
    try {
        const matches = await getMatchesForUser(userId);
        res.status(200).json({ matches });
    } catch (error) {
        res.status(500).json({ message: error?.message });
    }
};

module.exports = {
    checkMatchController,
    getMatchesForUserController
};
