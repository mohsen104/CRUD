import mongoose from 'mongoose';

async function ConnectedToMongodb(url: string) {
  try {
    if (mongoose.connections[0]?.readyState) {
      return false;
    }
    await mongoose.connect(url);
    console.log('connected to mongodb');
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
}

export default ConnectedToMongodb;
