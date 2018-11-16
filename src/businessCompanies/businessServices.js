/* eslint-disable class-methods-use-this */

const uuid = require('node-uuid');
const BusinessCompanies = require('../models/business_model');
const makeNameUnique = require('../utils');

class BusinessCompanyService {
  async createCompany(data, cb) {
    const { displayName } = data;
    const name = displayName.toLowerCase();
    makeNameUnique(name, null, async (newName) => {
      const newCompany = new BusinessCompanies({ _id: uuid.v1(), displayName, name: newName });
      try {
        const savedCompany = await newCompany.save();
        cb(null, savedCompany);
      } catch (e) {
        cb(e);
      }
    });
  }

  async updateCompany(_id, data, cb) {
    const { displayName } = data;
    if (displayName === '') {
      cb('Name is empty');
    }
    try {
      await BusinessCompanies.update({ _id }, {
        displayName,
      },
      { upsert: true });
      cb(null, true);
    } catch (e) {
      cb(e);
    }
  }
}

module.exports = BusinessCompanyService;
