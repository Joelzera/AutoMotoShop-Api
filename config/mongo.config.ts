import mongoose from 'mongoose';

mongoose.connect('localhost:27017/auto_moto')
const database = mongoose.connection

export default database