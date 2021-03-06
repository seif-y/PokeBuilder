import { User } from "./userSchema";
import { Team } from "../teams/teamSchema";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

// Value to set for time before a user's JWT token expires. 31556926 is around a year.
const jwtExpiryTime = 31556926;

async function createUser(user, callback) {
    const dbUser = new User(user);

    // Create password hash using bcrypt, with salt
    bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(user.password, salt, (err, hash) => {
            if (err) {
                callback(null, err);
                return;
            }
            dbUser.password = hash;

            // After hashing password, save user and return them
            dbUser
                .save()
                .then(() => {
                    callback(dbUser);
                })
                .catch((err) => {
                    callback(null, err);
                });
        });
    });
}

async function retrieveUser(id) {
    return User.findById(id);
}

async function getTeamsByUser(userID) {
    return Team.find({ creator: userID });
}

async function getJwtForUser(username, password, callback) {
    User.findOne({ username }).then((dbUser) => {
        if (!dbUser) {
            callback({ success: false, errMsg: "Could not find user" });
            return;
        }

        bcrypt.compare(password, dbUser.password).then((isMatch) => {
            if (isMatch) {
                const payload = {
                    id: dbUser._id,
                    name: dbUser.username,
                };
                return jwt.sign(payload, "secret", { expiresIn: jwtExpiryTime }, (err, token) => {
                    callback({ success: true, token: token });
                });
            } else {
                callback({ success: false, errMsg: "Incorrect password" });
            }
        });
    });
}

export { createUser, retrieveUser, getTeamsByUser, getJwtForUser };
