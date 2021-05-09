import { MongoMemoryServer } from "mongodb-memory-server";
import mongoose from "mongoose";
import { Team } from "../teamSchema";

let mongod;
let user1, user2;
let team1, team2;

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

    await teamsColl.insertMany([team1, team2]);
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
 */
afterAll(async () => {
    await mongoose.disconnect();
    await mongod.stop();
});

it("gets teams", async () => {
    const teams = await Team.find();

    expect(teams).toBeTruthy();
    expect(teams).toHaveLength(2);

    expect(teams[0].creator).toStrictEqual(user1._id);
    expect(teams[0].creatorUsername).toBe("Sree");
    expect(teams[0].teamName).toBe("Beast Squad");
    expect(teams[0].description).toBe("My first team");
    expect(teams[0].party).toHaveLength(6);
    expect(teams[0].upvotes).toBe(0);

    expect(teams[1].creator).toStrictEqual(user2._id);
    expect(teams[1].creatorUsername).toBe("Seifo");
    expect(teams[1].teamName).toBe("Seifo's Stars");
    expect(teams[1].description).toBe("The best team!");
    expect(teams[1].party).toHaveLength(6);
    expect(teams[1].upvotes).toBe(0);
});

it("get single team", async () => {
    const team = await Team.findById(team1._id);

    expect(team.creator).toStrictEqual(user1._id);
    expect(team).toBeTruthy();
    expect(team.creatorUsername).toBe("Sree");
    expect(team.teamName).toBe("Beast Squad");
    expect(team.description).toBe("My first team");
    expect(team.party).toHaveLength(6);
    expect(team.upvotes).toBe(0);
});

it("adds a team without crashing", async () => {
    const team = new Team({
        creator: user1._id,
        creatorUsername: "Sree",
        teamName: "Sree's Stars",
        description: "Better than Seifo's team!",
        upvotes: 0,
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
    });

    await team.save();

    const fromDb = await mongoose.connection.db.collection("teams").findOne({ _id: team._id });
    expect(fromDb).toBeTruthy();
    expect(fromDb.creatorUsername).toBe("Sree");
    expect(fromDb.teamName).toBe("Sree's Stars");
    expect(fromDb.description).toBe("Better than Seifo's team!");
    expect(fromDb.party).toHaveLength(6);
    expect(fromDb.upvotes).toBe(0);
});

it("fails when creator id not included", async () => {
    const team = new Team({
        creatorUsername: "Sree",
        teamName: "Sree's Stars",
        description: "Better than Seifo's team!",
        upvotes: 0,
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
    });

    return expect(team.save()).rejects.toThrow();
});

it("fails when team name not included", async () => {
    const team = new Team({
        creator: user1._id,
        creatorUsername: "Sree",
        description: "Better than Seifo's team!",
        upvotes: 0,
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
    });

    return expect(team.save()).rejects.toThrow();
});

it("fails when pokemon id not included", async () => {
    const team = new Team({
        creator: user1._id,
        creatorUsername: "Sree",
        description: "Better than Seifo's team!",
        upvotes: 0,
        party: [
            {
                notes: "Grass type",
                nickname: "Giga-Bulba",
            },
            {
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
    });

    return expect(team.save()).rejects.toThrow();
});
