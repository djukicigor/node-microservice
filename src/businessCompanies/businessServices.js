const BusinessCompanies = require('../models/business_model');

class BusinessCompanyService {
  async createCompany(data, cb) {
    const { displayName } = data;
    const name = displayName.toLowerCase();
    this.makeNameUnique(name, async (newName) => {
      const newCompany = new BusinessCompanies({ displayName, name: newName });
      try {
        const savedCompany = await newCompany.save();
        cb(null, savedCompany);
      } catch (e) {
        cb(e);
      }
    });
  }

  async updateCompany(_id, data, cb) {
    this.displayName = data.displayName;
    if (this.displayName === '') {
      cb('Name is empty');
    }
    try {
      await BusinessCompanies.update({ _id }, {
        displayName: this.displayName,
      },
      { upsert: true });
      cb(null, true);
    } catch (e) {
      cb(e);
    }
  }

  async makeNameUnique(name, cb) {
    const exists = await BusinessCompanies.findOne({ name });
    if (exists) {
      this.makeNameUnique(name + Math.floor((Math.random() * 10) + 1), (data) => {
        cb(data);
      });
    } else {
      cb(name);
    }
  }
}

module.exports = BusinessCompanyService;
