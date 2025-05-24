const { ObjectId } = require('mongodb');
const client = require('../server');

// Get all tools
const getAllTools = async (req, res) => {
  try {
    const tools = await client.db('ToolsDB').collection('tools').find().toArray();
    res.status(200).json(tools);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch tools' });
  }
};

// Get a single tool by ID
const getToolById = async (req, res) => {
  const id = req.params.id;

  try {
    const tool = await client.db('ToolsDB').collection('tools').findOne({ _id: new ObjectId(id) });

    if (!tool) {
      return res.status(404).json({ error: 'Tool not found' });
    }

    res.status(200).json(tool);
  } catch (err) {
    res.status(500).json({ error: 'Failed to retrieve tool' });
  }
};

// Create a new tool
const createTool = async (req, res) => {
  const tool = req.body;
  const requiredFields = ['name', 'category', 'initCommand', 'notes'];

  for (const field of requiredFields) {
    if (!tool[field]) {
      return res.status(400).json({ error: `${field} is required.` });
    }
  }

  try {
    const result = await client.db('ToolsDB').collection('tools').insertOne(tool);

    res.status(201).json({
      acknowledged: result.acknowledged,
      insertedId: result.insertedId
    });
  } catch (err) {
    res.status(500).json({ error: 'Failed to create tool' });
  }
};

// Update a tool
const updateTool = async (req, res) => {
  const id = req.params.id;
  const updates = req.body;

  try {
    const result = await client.db('ToolsDB').collection('tools').updateOne(
      { _id: new ObjectId(id) },
      { $set: updates }
    );

    if (result.matchedCount === 0) {
      return res.status(404).json({ error: 'Tool not found' });
    }

    res.sendStatus(204); // No Content
  } catch (err) {
    res.status(500).json({ error: 'Failed to update tool' });
  }
};

// Delete a tool
const deleteTool = async (req, res) => {
  const id = req.params.id;

  try {
    const result = await client.db('ToolsDB').collection('tools').deleteOne({ _id: new ObjectId(id) });

    if (result.deletedCount === 0) {
      return res.status(404).json({ error: 'Tool not found' });
    }

    res.sendStatus(204); // No Content
  } catch (err) {
    res.status(500).json({ error: 'Failed to delete tool' });
  }
};

module.exports = {
  getAllTools,
  getToolById,
  createTool,
  updateTool,
  deleteTool
};
