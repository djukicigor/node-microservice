const BusinessCompanies = require('../models/business_model');

class BusinessCompanyService {
  async createCompany(data, cb) {
    this.displayName = data.displayName;
    const name = this.displayName.toLowerCase();
    this.makeNameUnique(name, async (newName) => {
      const newCompany = new BusinessCompanies({ displayName: this.displayName, name: newName });
      const savedCompany = await newCompany.save();
      cb(null, savedCompany);
    });
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
