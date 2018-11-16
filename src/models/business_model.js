const mongoose = require('mongoose');

const { Schema } = mongoose;

const usersSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  role: {
    type: String,
    enum: ['basic', 'admin'],
    required: true,
  },
});

const workspacesSchema = new Schema({
  _id: {
    type: String,
    index: true,
  },
  displayName: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
    lowercase: true,
  },
  users: [usersSchema],
});

const BusinessCompaniesSchema = new Schema({
  _id: {
    type: String,
    index: { unique: true },
  },
  displayName: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    index: { unique: true },
    required: true,
    lowercase: true,
  },
  workspaces: [workspacesSchema],
});

module.exports = mongoose.model('Business.companies', BusinessCompaniesSchema);
