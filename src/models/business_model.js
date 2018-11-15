const mongoose = require('mongoose');
const uuid = require('node-uuid');

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
    type: Schema.Types.ObjectId,
    default: () => {
      uuid.v1();
    },
    index: true,
  },
  displayName: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    unique: true,
    required: true,
    lowercase: true,
  },
  users: [usersSchema],
});

const BusinessCompaniesSchema = new Schema({
  _id: {
    type: String,
    index: true,
    default: uuid.v1(),
  },
  displayName: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    unique: true,
    required: true,
    lowercase: true,
  },
  workspaces: [workspacesSchema],
});

module.exports = mongoose.model('Business.companies', BusinessCompaniesSchema);
