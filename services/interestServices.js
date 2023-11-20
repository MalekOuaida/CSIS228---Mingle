const db = require('../database/index'); // Make sure this path is correct

const getInterests = async () => {
    const query = 'SELECT * FROM Interest';
    try {
        const [interests] = await db.query(query);
        return interests;
    } catch (error) {
        throw new Error('Error fetching interests: ' + error.message);
    }
};

const insertInterest = async (userId, interest) => {
    const query = 'INSERT INTO Interest (user_id, interest) VALUES (?, ?)';
    const values = [userId, interest];

    try {
        const [result] = await db.query(query, values);
        return result;
    } catch (error) {
        throw new Error('Error inserting interest: ' + error.message);
    }
};

const updateInterest = async (interestId, newInterest) => {
    const query = 'UPDATE Interest SET interest = ? WHERE InterestID = ?';
    try {
        const [result] = await db.query(query, [newInterest, interestId]);
        return result;
    } catch (error) {
        throw new Error('Error updating interest: ' + error.message);
    }
};

const getInterestById = async (interestId) => {
    const query = 'SELECT * FROM Interest WHERE InterestID = ?';
    try {
        const [interest] = await db.query(query, [interestId]);
        return interest;
    } catch (error) {
        throw new Error('Error fetching interest: ' + error.message);
    }
};

const deleteInterest = async (interestId) => {
    const query = 'DELETE FROM Interest WHERE InterestID = ?';
    try {
        const [result] = await db.query(query, [interestId]);
        return result;
    } catch (error) {
        throw new Error('Error deleting interest: ' + error.message);
    }
};

module.exports = {
    getInterests,
    insertInterest,
    updateInterest,
    getInterestById,
    deleteInterest
};
