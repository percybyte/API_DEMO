import mongoose from 'mongoose';
import color from 'colors';
import globalConfig from '../config/globalConfig.js';

const connectToDB = async () => {
  try {
    const { dbUser, dbPass, dbUri, dbName } = globalConfig;
    const connection = await mongoose.connect(
      `mongodb+srv://${dbUser}:${dbPass}@${dbUri}/${dbName}?retryWrites=true&w=majority&appName=ClusterDev`,
    );
    console.info(
      color.yellow(`Connected to database ${connection.connection.host}`),
    );
  } catch (err) {
    console.error(`Error connecting to the database: ${err}`);
    process.exit(1);
  }
};

export default connectToDB;
