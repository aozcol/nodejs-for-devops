const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');

describe('Mongoose Connection', () => {
  let mongoServer;

  beforeAll(async () => {
    mongoServer = await MongoMemoryServer.create();
    const mongoUri = mongoServer.getUri();
    await mongoose.connect(mongoUri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
  });

  afterAll(async () => {
    await mongoose.disconnect();
    await mongoServer.stop();
  });

  it('should connect to the MongoDB database', async () => {
    expect(mongoose.connection.readyState).toBe(1); // Connected state
  });

  it('should disconnect from the MongoDB database', async () => {
    await mongoose.disconnect();
    expect(mongoose.connection.readyState).toBe(0); // Disconnected state
  });
});
