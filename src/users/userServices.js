/* eslint-disable class-methods-use-this */
const BusinessCompanies = require('../models/business_model');

class UserService {
  async addUserToWorkspace(workspaceId, data, cb) {
    const { email, role } = data;
    const newUser = { email, role };

    const userExists = await BusinessCompanies.findOne({
      'workspaces.users.email': email,
    });

    if (userExists) {
      cb('Email already exists');
    }

    try {
      await BusinessCompanies.updateOne({ 'workspaces._id': workspaceId }, {
        $push: {
          'workspaces.$[elem].users': newUser,
        },
      }, {
        arrayFilters: [{
          'elem._id': workspaceId,
        }],
      });

      cb(null, newUser);
    } catch (e) {
      cb(e);
    }
  }

  async removeUserFromWorkspace(email, cb) {
    try {
      await BusinessCompanies.update({ 'workspaces.users.email': email }, {
        $pull: {
          'workspaces.$[].users': { email },
        },
      });
      cb(null, true);
    } catch (e) {
      cb(e);
    }
  }
}

module.exports = UserService;
