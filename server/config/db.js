const mongoose = require('mongoose');

// const URI =
//   'mongodb+srv://wmoody:budget@budgetapp.kfhbkml.mongodb.net/?retryWrites=true&w=majority';

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI);
    console.log(`Connected to MongoDB: ${conn.connection.host}`.cyan.underline);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};
module.exports = connectDB;
