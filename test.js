/* eslint-disable no-underscore-dangle */
/* eslint-disable no-undef */
/* eslint-disable func-names */
/* eslint-disable prefer-arrow-callback */
const { assert } = require('chai');
const mongoose = require('mongoose');
const BusinessCompanies = require('./src/models/business_model');
const BusinessCompanyService = require('./src/businessCompanies/businessServices');
const WorkspaceService = require('./src/workspaces/workspaceService');
const UserService = require('./src/users/userServices');

const companyService = new BusinessCompanyService();
const workService = new WorkspaceService();
const userService = new UserService();

const { DB_URI_TEST } = require('./src/config');

mongoose.connect(DB_URI_TEST);

let companyId = '';
let workspaceId = '';

describe('Unit tests', function () {
  after(function () {
    BusinessCompanies.remove({}, function () {
      mongoose.connection.close();
    });
  });
  describe('Company tests', function () {
    it('should create company', function (done) {
      companyService.createCompany({ displayName: 'New Company' }, function (err, data) {
        if (err) {
          done(err);
        } else {
          companyId = data._id;
          assert.equal(data.name, 'new company');
          done();
        }
      });
    });
    it('should update company', function (done) {
      companyService.updateCompany(companyId, { displayName: 'Updated Company' }, function () {
        BusinessCompanies.findOne({
          displayName: 'Updated Company',
        }).then(function (updatedDoc) {
          assert.isOk(updatedDoc);
          done();
        });
      });
    });
  });
  describe('Workspace tests', function () {
    it('should create workspace', function (done) {
      workService.createWorkspace(companyId, { displayName: 'New Workspace' }, function (err, data) {
        if (err) {
          done(err);
        } else {
          workspaceId = data._id;
          BusinessCompanies.findOne({
            $and: [
              { _id: companyId },
              {
                workspaces: {
                  $elemMatch: {
                    name: 'new workspace',
                  },
                },
              }],
          }).then(function (updatedDoc) {
            assert.isOk(updatedDoc);
            done();
          });
        }
      });
    });
    it('should update workspace', function (done) {
      workService.updateWorkspace(workspaceId, { displayName: 'Updated Workspace' }, function (err, data) {
        if (err) {
          done(err);
        }
        BusinessCompanies.findOne({
          $and: [
            { _id: companyId },
            {
              workspaces: {
                $elemMatch: {
                  displayName: 'Updated Workspace',
                },
              },
            }],
        }).then(function (updatedDoc) {
          assert.isOk(updatedDoc);
          done();
        });
      });
    });
  });
  describe('User tests', function () {
    it('should add user into workspace', function (done) {
      userService.addUserToWorkspace(workspaceId, { email: 'test@mail.com', role: 'basic' }, function (err, data) {
        if (err) {
          done(err);
        }
        BusinessCompanies.findOne({ 'workspaces.users.email': 'test@mail.com' }).then(function (updatedDoc) {
          assert.isOk(updatedDoc);
          done();
        });
      });
    });
    it('should remove user from workspace', function (done) {
      userService.removeUserFromWorkspace('test@mail.com', function (err) {
        if (err) {
          done(err);
        }
        BusinessCompanies.findOne({ 'workspaces.users.email': 'test@mail.com' }).then(function (updatedDoc) {
          assert.isNotOk(updatedDoc);
          done();
        });
      });
    });
  });
});
