import { MongoMemoryServer } from "mongodb-memory-server";
import mongoose from "mongoose";
import { User } from "../userSchema";

let mongod;
let user1, user2;
/**
 * Before all tests, create an in-memory MongoDB instance so we don't have to test on a real database,
 * then establish a mongoose connection to it.
 *
 * Also, start an express server running on port 3000, hosting the routes we wish to test.
 */
beforeAll(async () => {
    mongod = new MongoMemoryServer();

    const connectionString = await mongod.getUri();
    await mongoose.connect(connectionString, { useNewUrlParser: true, useUnifiedTopology: true });
});

/**
 * Before each test, intialize the database with some data
 */
beforeEach(async () => {
    const usersColl = await mongoose.connection.db.createCollection("users");

    user1 = {
        username: "Sree",
        password: "hashedPassword1",
    };

    user2 = {
        username: "Seifo",
        password: "hashedPassword2",
    };

    await usersColl.insertMany([user1, user2]);
});

/**
 * After each test, clear the database entirely
 */
afterEach(async () => {
    await mongoose.connection.db.dropCollection("users");
});

/**
 * After all tests, gracefully terminate the in-memory MongoDB instance and mongoose connection.
 */
afterAll(async () => {
    await mongoose.disconnect();
    await mongod.stop();
});

it("gets users", async () => {
    const users = await User.find();

    expect(users).toBeTruthy();
    expect(users).toHaveLength(2);

    expect(users[0].username).toBe("Sree");
    expect(users[0]).toHaveProperty("password");
    expect(users[0].comments).toHaveLength(0);
    expect(users[0].upvotedTeams).toHaveLength(0);

    expect(users[1].username).toBe("Seifo");
    expect(users[1]).toHaveProperty("password");
    expect(users[1].comments).toHaveLength(0);
    expect(users[1].upvotedTeams).toHaveLength(0);
});

it("get single user", async () => {
    const user = await User.findById(user1._id);

    expect(user).toBeTruthy();
    expect(user.username).toBe("Sree");
    expect(user).toHaveProperty("password");
    expect(user.comments).toHaveLength(0);
    expect(user.upvotedTeams).toHaveLength(0);
});

it("adds a user without crashing", async () => {
    const user = new User({
        username: "PenBiper",
        password: "hashedPassword3",
    });

    await user.save();

    const fromDb = await mongoose.connection.db.collection("users").findOne({ _id: user._id });
    expect(fromDb).toBeTruthy();
    expect(fromDb.username).toBe("PenBiper");
    expect(fromDb).toHaveProperty("password");
    expect(fromDb.comments).toHaveLength(0);
    expect(fromDb.upvotedTeams).toHaveLength(0);
});

it("fails when username is not included", async () => {
    const user = new User({
        password: "hashedPassword3",
    });

    return expect(user.save()).rejects.toThrow();
});

it("fails when password is not included", async () => {
    const user = new User({
        username: "PenBiper",
    });

    return expect(user.save()).rejects.toThrow();
});
