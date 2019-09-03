import mongoose from 'mongoose';
import { connectMongoose } from 'test/helpers/mongo-test-helpers';

describe('insert', () => {
  beforeAll(async () => {
    await connectMongoose();
  });

  afterAll(() => {
    mongoose.disconnect();
  });

  it('should insert a doc into collection', async () => {
    const User = mongoose.model(
      'user.ts',
      new mongoose.Schema({ name: String }),
    );
    const cnt = await User.count({});
    expect(cnt).toEqual(0);
  });
});
