import { JwtStrategy, ExtractJwt } from "passport-jwt";
import mongoose from "mongoose";

const User = mongoose.model("users");
const keys = require("../config/keys");
const opts = { jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(), secretOrKey: "secret" };

module.exports = (passport) => {
    passport.use(
        new JwtStrategy(opts, (jwt_payload, done) => {
            User.findById(jwt_payload.id)
                .then((user) => {
                    if (user) {
                        return done(null, user);
                    }
                    return done(null, false);
                })
                .catch((err) => console.log(err));
        })
    );
};
