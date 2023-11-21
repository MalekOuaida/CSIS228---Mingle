const { validationResult } = require('express-validator');
const { insertInterest, updateInterest, deleteInterest } = require('../services/interestServices');


const addInterestController = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { userId, interest } = req.body;
    try {
        const newInterest = await insertInterest(userId, interest);
        res.status(200).json({ message: "Interest added successfully", newInterest });
    } catch (error) {
        res.status(500).json({ message: error?.message });
    }
};

const updateInterestController = async (req, res) => {
    const { interestId } = req.params;
    const { interest } = req.body;
    try {
        const updatedInterest = await updateInterest(interestId, interest);
        res.status(200).json({ message: "Interest updated successfully", updatedInterest });
    } catch (error) {
        res.status(500).json({ message: error?.message });
    }
};

const deleteInterestController = async (req, res) => {
    const { interestId } = req.params;
    try {
        await deleteInterest(interestId);
        res.status(200).json({ message: "Interest deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: error?.message });
    }
};

module.exports = {
    addInterestController,
    updateInterestController,
    deleteInterestController
};