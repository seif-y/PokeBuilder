import routes from "../../../routes";
import { MongoMemoryServer } from "mongodb-memory-server";
import mongoose from "mongoose";
import express from "express";
import axios from "axios";

const HTTP_UNAUTHORIZED = 401;

let mongod, app, server;
let user1, user2, incorrectUser2;

/**
 * Before all tests, create an in-memory MongoDB instance so we don't have to test on a real database,
 * then establish a mongoose connection to it.
 *
 * Also, start an express server running on port 3000, hosting the routes we wish to test.
 */
beforeAll(async (done) => {
    mongod = new MongoMemoryServer();

    const connectionString = await mongod.getUri();
    await mongoose.connect(connectionString, { useUnifiedTopology: true, useNewUrlParser: true });

    app = express();
    app.use(express.json());
    app.use("/", routes);
    server = app.listen(3000, () => done());
});

/**
 * Before each test, intialize the database with some data
 */
beforeEach(async () => {
    const coll = await mongoose.connection.db.createCollection("users");

    user1 = {
        username: "Sree",
        password: "testPassword1",
    };

    user2 = {
        username: "Ben",
        password: "testPassword2",
    };

    incorrectUser2 = {
        username: "Ben",
        password: "wrongPassword",
    };

    await coll.insertOne(user1);
});

/**
 * After each test, clear the database entirely
 */
afterEach(async () => {
    await mongoose.connection.db.dropCollection("users");
});

/**
 * After all tests, gracefully terminate the in-memory MongoDB instance and mongoose connection.
 *
 * Also, stop the express server
 */
afterAll((done) => {
    server.close(async () => {
        await mongoose.disconnect();
        await mongod.stop();

        done();
    });
});

it("creating a new user", async () => {
    const response = await axios.post("http://localhost:3000/api/users/register", user2);
    const user = response.data;

    expect(user).toBeTruthy();
    expect(user.username).toBe("Ben");

    // The hashed password should not be revealed/returned when the user is created
    expect(user.password).toBeUndefined();
    expect(user.comments).toHaveLength(0);
    expect(user.upvotedTeams).toHaveLength(0);
});

it("getting a user by id", async () => {
    const response = await axios.get(`http://localhost:3000/api/users/${user1._id}`);
    const user = response.data;

    expect(user).toBeTruthy();
    expect(user.username).toBe("Sree");

    // The hashed password should not be revealed/returned when the user is created
    expect(user.password).toBeUndefined();
    expect(user.comments).toHaveLength(0);
    expect(user.upvotedTeams).toHaveLength(0);
});

it("correct user login", async () => {
    await axios.post("http://localhost:3000/api/users/register", user2);
    const response = await axios.post("http://localhost:3000/api/users/login", user2);
    const resData = response.data;

    expect(resData.success).toBe(true);
    expect(resData).toHaveProperty("token");
});

it("incorrect user login", async () => {
    try {
        await axios.post("http://localhost:3000/api/users/register", user2);
        await axios.post("http://localhost:3000/api/users/login", incorrectUser2);
        fail("A 401 response should have been returned as the password is incorrect");
    } catch (err) {
        const { response } = err;
        expect(response).toBeDefined();
        expect(response.status).toBe(HTTP_UNAUTHORIZED);
        expect(response.data.success).toBe(false);
        expect(response.data.errMsg).toBe("Incorrect password");
    }
});
