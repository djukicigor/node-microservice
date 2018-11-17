let DB_URI = 'mongodb://localhost:27017/microservice';
const DB_URI_TEST = 'mongodb://localhost:27017/microservice-test';

if (process.env.MONGO_DB_URI) {
  DB_URI = process.env.MONGO_DB_URI;
}

module.exports = {
  DB_URI,
  DB_URI_TEST,
};
