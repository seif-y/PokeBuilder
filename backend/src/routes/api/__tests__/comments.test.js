import routes from "../../../routes";
import { MongoMemoryServer } from "mongodb-memory-server";
import mongoose from "mongoose";
import express from "express";
import axios from "axios";

const HTTP_BAD_REQUEST = 400;

let mongod, app, server;
let user1, user2;
let team1, team2;
let comment1, comment2;

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
    app.use("/", routes);
    server = app.listen(3000, () => done());
});

/**
 * Before each test, intialize the database with some data
 */
beforeEach(async () => {
    const usersColl = await mongoose.connection.db.createCollection("users");
    const teamsColl = await mongoose.connection.db.createCollection("teams");
    const commentsColl = await mongoose.connection.db.createCollection("comments");

    user1 = {
        username: "Sree",
        password: "testPassword1",
    };

    user2 = {
        username: "Seifo",
        password: "testPassword2",
    };

    await usersColl.insertMany([user1, user2]);

    team1 = {
        creator: user1._id,
        creatorUsername: user1.username,
        teamName: "Beast Squad",
        description: "My first team",
        upvotes: 0,
        party: [
            {
                pokemonID: 4,
                notes: "Char char",
                nickname: "Charlie",
            },
            {
                pokemonID: 10,
                nickname: "Cater",
            },
            {
                pokemonID: 127,
                nickname: "Pin",
            },
            {
                pokemonID: 79,
            },
            {
                pokemonID: 84,
            },
            {
                pokemonID: 53,
                notes: "Meow",
                nickname: "Paris",
            },
        ],
    };

    await teamsColl.insertMany([team1]);

    comment1 = {
        comment: "I had a great time making this team!",
        teamID: team1._id,
        userID: user1._id,
        username: "Sree",
    };

    comment2 = {
        comment: "Sick team son!",
        teamID: team1._id,
        userID: user2._id,
        username: "Seifo",
    };

    await commentsColl.insertMany([comment1, comment2]);
});

/**
 * After each test, clear the database entirely
 */
afterEach(async () => {
    await mongoose.connection.db.dropCollection("users");
    await mongoose.connection.db.dropCollection("teams");
    await mongoose.connection.db.dropCollection("comments");
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

it("get all comments for a team", async () => {
    const response = await axios.get(`http://localhost:3000/api/teams/${team1._id}/comments`);
    const comments = response.data;

    expect(comments).toBeTruthy();
    expect(comments).toHaveLength(2);

    expect(comments[0].comment).toBe("I had a great time making this team!");
    expect(comments[0].teamID).toBe(team1._id.toString());
    expect(comments[0].userID).toBe(user1._id.toString());
    expect(comments[0].username).toBe(user1.username);

    expect(comments[1].comment).toBe("Sick team son!");
    expect(comments[1].teamID).toBe(team1._id.toString());
    expect(comments[1].userID).toBe(user2._id.toString());
    expect(comments[1].username).toBe(user2.username);
});
