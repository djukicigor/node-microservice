/* eslint-disable class-methods-use-this */
const uuid = require('node-uuid');
const BusinessCompanies = require('../models/business_model');
const makeNameUnique = require('../utils');

// class for manipulating with workspaces
class WorkspaceService {
  async createWorkspace(companyId, data, cb) {
    const { displayName } = data;
    const name = displayName.toLowerCase();

    makeNameUnique(name, companyId, async (newName) => {
      const newWorkspace = { _id: uuid.v1(), displayName, name: newName };

      try {
        await BusinessCompanies.update({
          _id: companyId,
        }, {
            $push: {
              workspaces: newWorkspace,
            },
          });

        cb(null, newWorkspace);
      } catch (e) {
        cb(e);
      }
    });
  }

  async editWorkspace(companyId, workspaceId, data, cb) {
    const { displayName } = data;

    if (displayName === '') {
      cb('Name is empty');
    }

    try {
      await BusinessCompanies.update({ _id: companyId }, {
        $set: {
          'workspaces.$[elem].displayName': displayName,
        },
      }, {
        arrayFilters: [{
          'elem._id': workspaceId,
        }],
      });
      cb(null, true);
    } catch (e) {
      cb(e);
    }
  }
}

module.exports = WorkspaceService;
