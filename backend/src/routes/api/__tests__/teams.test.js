import routes from "../../../routes";
import { MongoMemoryServer } from "mongodb-memory-server";
import mongoose from "mongoose";
import express from "express";
import axios from "axios";

const HTTP_BAD_REQUEST = 400;

let mongod, app, server;
let user1, user2;
let team1, team2, team3;

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

    team2 = {
        creator: user2._id,
        creatorUsername: user2.username,
        teamName: "Seifo's Stars",
        description: "The best team!",
        upvotes: 0,
        party: [
            {
                pokemonID: 1,
                notes: "Grass type",
                nickname: "Bulba",
            },
            {
                pokemonID: 4,
                notes: "Fire type",
                nickname: "CharChar",
            },
            {
                pokemonID: 7,
                notes: "Water type",
                nickname: "Squirty",
            },
            {
                pokemonID: 25,
                notes: "Electric type",
                nickname: "PikaPika",
            },
            {
                pokemonID: 39,
                notes: "Singing God",
            },
            {
                pokemonID: 74,
                nickname: "Roller",
            },
        ],
    };

    team3 = {
        creator: user1._id,
        creatorUsername: "Sree",
        teamName: "Sree's Stars",
        upvotes: 0,
        description: "Better than Seifo's team!",
        party: [
            {
                pokemonID: 3,
                notes: "Grass type",
                nickname: "Giga-Bulba",
            },
            {
                pokemonID: 6,
                notes: "Fire type",
                nickname: "Giga-Char",
            },
            {
                pokemonID: 9,
                notes: "Water type",
                nickname: "Blast",
            },
            {
                pokemonID: 26,
                notes: "Electric type",
                nickname: "Rai",
            },
            {
                pokemonID: 39,
                notes: "Singing God",
            },
            {
                pokemonID: 76,
                nickname: "Giga-Roller",
            },
        ],
    };

    await teamsColl.insertMany([team1, team2, team3]);
});

/**
 * After each test, clear the database entirely
 */
afterEach(async () => {
    await mongoose.connection.db.dropCollection("users");
    await mongoose.connection.db.dropCollection("teams");
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

it("get all teams from server", async () => {
    const response = await axios.get("http://localhost:3000/api/teams");
    const teams = response.data;

    expect(teams).toBeTruthy();
    expect(teams).toHaveLength(3);

    expect(teams[0].creatorUsername).toBe("Sree");
    expect(teams[0].teamName).toBe("Beast Squad");
    expect(teams[0].description).toBe("My first team");
    expect(teams[0].party).toHaveLength(6);
    expect(teams[0].upvotes).toBe(0);

    expect(teams[1].creatorUsername).toBe("Seifo");
    expect(teams[1].teamName).toBe("Seifo's Stars");
    expect(teams[1].description).toBe("The best team!");
    expect(teams[1].party).toHaveLength(6);
    expect(teams[1].upvotes).toBe(0);

    expect(teams[2].creatorUsername).toBe("Sree");
    expect(teams[2].teamName).toBe("Sree's Stars");
    expect(teams[2].description).toBe("Better than Seifo's team!");
    expect(teams[2].party).toHaveLength(6);
    expect(teams[2].upvotes).toBe(0);
});

it("retrieve single team by id", async () => {
    const response = await axios.get(`http://localhost:3000/api/teams/${team1._id}`);
    const team = response.data;

    expect(team).toBeTruthy();
    expect(team.creatorUsername).toBe("Sree");
    expect(team.teamName).toBe("Beast Squad");
    expect(team.description).toBe("My first team");
    expect(team.party).toHaveLength(6);
    expect(team.upvotes).toBe(0);
});

it("test for invalid team id", async () => {
    try {
        await axios.get("http://localhost:3000/api/teams/incorrectID");
        fail("A 400 response should have been returned as the team ID is invalid");
    } catch (err) {
        const { response } = err;
        expect(response).toBeDefined();
        expect(response.status).toBe(HTTP_BAD_REQUEST);
        expect(response.data).toBe("Invalid team id");
    }
});

it("retrieve created teams by a user", async () => {
    const response = await axios.get(`http://localhost:3000/api/users/${user1._id}/teams`);
    const teams = response.data;

    expect(teams).toBeTruthy();

    expect(teams[0].creator).toBe(user1._id.toString());
    expect(teams[0].creatorUsername).toBe("Sree");
    expect(teams[0].teamName).toBe("Beast Squad");
    expect(teams[0].description).toBe("My first team");
    expect(teams[0].party).toHaveLength(6);
    expect(teams[0].upvotes).toBe(0);

    expect(teams[1].creator).toBe(user1._id.toString());
    expect(teams[1].creatorUsername).toBe("Sree");
    expect(teams[1].teamName).toBe("Sree's Stars");
    expect(teams[1].description).toBe("Better than Seifo's team!");
    expect(teams[1].party).toHaveLength(6);
    expect(teams[1].upvotes).toBe(0);
});
