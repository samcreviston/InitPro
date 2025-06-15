const { ObjectId } = require('mongodb');
const client = require('../server');

// Get all users
const getAllUsers = async (req, res) => {
  try {
    const users = await client.db('UsersDB').collection('users').find().toArray();
    res.status(200).json(users);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch users' });
  }
};

// Get a single user by ID
const getUserById = async (req, res) => {
  const id = req.params.id;

  try {
    const user = await client.db('UsersDB').collection('users').findOne({ _id: new ObjectId(id) });

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.status(200).json(user);
  } catch (err) {
    res.status(500).json({ error: 'Failed to retrieve user' });
  }
};

// Create a new user
const createUser = async (req, res) => {
  const user = req.body;

  try {
    const result = await client.db('UsersDB').collection('users').insertOne(user);

    res.status(201).json({
      acknowledged: result.acknowledged,
      insertedId: result.insertedId
    });
  } catch (err) {
    res.status(500).json({ error: 'Failed to create user' });
  }
};

// Update a user
const updateUser = async (req, res) => {
  const id = req.params.id;
  const updates = req.body;

  if (!updates || Object.keys(updates).length === 0) {
    return res.status(400).json({ error: 'Update data is required' });
  }

  try {
    const result = await client.db('UsersDB').collection('users').updateOne(
      { _id: new ObjectId(id) },
      { $set: updates }
    );

    if (result.matchedCount === 0) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.sendStatus(204); // No Content
  } catch (err) {
    res.status(500).json({ error: 'Failed to update user' });
  }
};

// Delete a user
const deleteUser = async (req, res) => {
  const id = req.params.id;

  try {
    const result = await client.db('UsersDB').collection('users').deleteOne({ _id: new ObjectId(id) });

    if (result.deletedCount === 0) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.sendStatus(204); // No Content
  } catch (err) {
    res.status(500).json({ error: 'Failed to delete user' });
  }
};

module.exports = {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser
};
