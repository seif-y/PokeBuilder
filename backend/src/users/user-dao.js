import { User } from "./userSchema";
import { Team } from "../teams/teamSchema";
import bcrypt from "bcryptjs";

async function createUser(user) {
    const dbUser = new User(user);

    // Store user password as a hash before saving it
    bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newUser.password, salt, (err, hash) => {
            if (err) throw err;
            newUser.password = hash;
            newUser
                .save()
                .then((user) => res.json(user))
                .catch((err) => console.log(err));
        });
    });

    await dbUser.save();
    return dbUser;
}

async function retrieveUser(id) {
    return User.findById(id);
}

async function getTeamsByUser(userID) {
    return Team.find({ creator: userID });
}

async function deleteUser(id) {
    await User.deleteOne({ _id: id });
    await Team.deleteMany({ creator: id });
}

export { createUser, retrieveUser, getTeamsByUser, deleteUser };
