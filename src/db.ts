//const { MongoClient } = require('mongodb');

import { MongoClient } from 'mongodb';
import log from './utils/logs';

const uri = 'mongodb://localhost:27017';
const client = new MongoClient(uri);

export async function connect() {
  try {
    await client.connect();
    log.info('Connected to MongoDB');
  } catch (err) {
    log.error(err);
  }
}

export default client;
