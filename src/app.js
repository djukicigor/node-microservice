
const express = require('express');
const bodyParser = require('body-parser');
const BusinessCompanyService = require('./businessCompanies/businessServices');

const companyService = new BusinessCompanyService();

const app = express();

app.use(bodyParser.json());

app.post('/api/create-company', (req, res) => {
  companyService.createCompany(req.body, (err, data) => {
    if (!err) {
      res.json(data);
    }
  });
});

app.post('/api/update-company/:id', (req, res) => {
  companyService.updateCompany(req.params.id, req.body, (err, data) => {
    if (!err) {
      res.json(data);
    }
  });
});

module.exports = app;
