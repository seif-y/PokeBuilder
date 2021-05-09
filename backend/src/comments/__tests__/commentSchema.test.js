import { MongoMemoryServer } from "mongodb-memory-server";
import mongoose from "mongoose";
import { Comment } from "../commentSchema";
import { createComment } from "../comment-dao";

let mongod;
let user1, user2, team;
let comment1, comment2;

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

    team = {
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

    await teamsColl.insertOne(team);

    comment1 = {
        comment: "I had a great time making this team!",
        teamID: team._id,
        userID: user1._id,
        username: "Sree",
    };

    comment2 = {
        comment: "Sick team son!",
        teamID: team._id,
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
 */
afterAll(async () => {
    await mongoose.disconnect();
    await mongod.stop();
});

it("gets comments", async () => {
    const comments = await Comment.find();

    expect(comments).toBeTruthy();
    expect(comments).toHaveLength(2);

    expect(comments[0].comment).toBe("I had a great time making this team!");
    expect(comments[0].teamID).toStrictEqual(team._id);
    expect(comments[0].userID).toStrictEqual(user1._id);
    expect(comments[0].username).toBe(user1.username);

    expect(comments[1].comment).toBe("Sick team son!");
    expect(comments[1].teamID).toStrictEqual(team._id);
    expect(comments[1].userID).toStrictEqual(user2._id);
    expect(comments[1].username).toBe(user2.username);
});

it("get single comment", async () => {
    const comment = await Comment.findById(comment1._id);

    expect(comment).toBeTruthy();
    expect(comment.comment).toBe("I had a great time making this team!");
    expect(comment.teamID).toStrictEqual(team._id);
    expect(comment.userID).toStrictEqual(user1._id);
    expect(comment.username).toBe(user1.username);
});

it("adds a comment without crashing", async () => {
    const comment = new Comment({
        comment: "Insane team mate, love the pokemon choice!",
        teamID: team._id,
        userID: user2._id,
    });

    await createComment(comment);

    const fromDb = await mongoose.connection.db.collection("comments").findOne({ _id: comment._id });
    const dbUser = await mongoose.connection.db.collection("users").findOne({ _id: user2._id });
    const userCommentsArray = dbUser.comments;

    expect(fromDb).toBeTruthy();
    expect(fromDb.comment).toBe("Insane team mate, love the pokemon choice!");
    expect(fromDb.teamID).toStrictEqual(team._id);
    expect(fromDb.userID).toStrictEqual(user2._id);
    expect(fromDb.username).toBe(user2.username);

    expect(userCommentsArray[0]._id).toStrictEqual(comment._id);
    expect(userCommentsArray).toHaveLength(1);
});

it("fails when comment is not included", async () => {
    const comment = new Comment({
        teamID: team._id,
        userID: user2._id,
        username: user2.username,
    });

    return expect(comment.save()).rejects.toThrow();
});

it("fails when teamID is not included", async () => {
    const comment = new Comment({
        comment: "Insane team mate, love the pokemon choice!",
        userID: user2._id,
        username: user2.username,
    });

    return expect(comment.save()).rejects.toThrow();
});

it("fails when userID is not included", async () => {
    const comment = new Comment({
        teamID: team._id,
        comment: "Insane team mate, love the pokemon choice!",
        username: user2.username,
    });

    return expect(comment.save()).rejects.toThrow();
});
