const BusinessCompanies = require('./models/business_model');

// This function makes property "name" unique for company and workspace
const makeNameUnique = async (name, companyId, cb) => {
  let exists = {};

  if (companyId) {
    exists = await BusinessCompanies.findOne({
      $and: [
        { _id: companyId },
        {
          workspaces: {
            $elemMatch: {
              name,
            },
          },
        }],
    });
  } else {
    exists = await BusinessCompanies.findOne({ name });
  }

  if (exists) {
    makeNameUnique(name + Math.floor((Math.random() * 10) + 1), companyId, (data) => {
      cb(data);
    });
  } else {
    cb(name);
  }
};

module.exports = makeNameUnique;
