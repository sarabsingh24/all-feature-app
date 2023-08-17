import mongoose from 'mongoose';
import chalk from 'chalk';

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URL, {
      useNewURLParser: true,
      useUnifiedTopology: true,
    });

   console.log(
     chalk.yellow.underline `mongoose conection ${conn.connection.host}`
   );
  } catch (error) {
      console.log(error)
      //Exit process with faliour
      process.exit(1)
  }
};

export default connectDB;