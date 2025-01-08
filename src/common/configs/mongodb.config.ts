import mongoose from 'mongoose';

async function ConnectedToMongodb(uri: string, database: string) {
  try {
    if (mongoose.connections[0]?.readyState) {
      return false;
    }
    await mongoose.connect(uri + database);
    console.log('connected to mongodb');
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
}

export default ConnectedToMongodb;
