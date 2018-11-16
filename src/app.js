
const express = require('express');
const bodyParser = require('body-parser');
const BusinessCompanyService = require('./businessCompanies/businessServices');
const WorkspaceService = require('./workspaces/workspaceService');
const UserService = require('./users/userServices');

const companyService = new BusinessCompanyService();
const workService = new WorkspaceService();
const userService = new UserService();

const app = express();

app.use(bodyParser.json());

app.post('/api/create-company', (req, res) => {
  companyService.createCompany(req.body, (err, data) => {
    if (err) {
      res.status(500).send({ error: err });
      throw new Error(err);
    } else {
      res.json(data);
    }
  });
});

app.put('/api/update-company/:id', (req, res) => {
  companyService.updateCompany(req.params.id, req.body, (err, data) => {
    if (err) {
      res.status(500).send({ error: err });
      throw new Error(err);
    } else {
      res.json(data);
    }
  });
});

app.post('/api/create-workspace/:companyId', (req, res) => {
  workService.createWorkspace(req.params.companyId, req.body, (err, data) => {
    if (err) {
      res.status(500).send({ error: err });
      throw new Error(err);
    } else {
      res.json(data);
    }
  });
});

app.put('/api/update-workspace/:workspaceId', (req, res) => {
  const { workspaceId } = req.params;
  workService.updateWorkspace(workspaceId, req.body, (err, data) => {
    if (err) {
      res.status(500).send({ error: err });
      throw new Error(err);
    } else {
      res.json(data);
    }
  });
});

app.post('/api/add-user/:workspaceId', (req, res) => {
  const { workspaceId } = req.params;
  userService.addUserToWorkspace(workspaceId, req.body, (err, data) => {
    if (err) {
      res.status(500).send({ error: err });
      throw new Error(err);
    } else {
      res.json(data);
    }
  });
});

app.delete('/api/remove-user/:email', (req, res) => {
  userService.removeUserFromWorkspace(req.params.email, (err, data) => {
    if (err) {
      res.status(500).send({ error: err });
      throw new Error(err);
    } else {
      res.json(data);
    }
  });
});

module.exports = app;
