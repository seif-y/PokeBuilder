import { Strategy, ExtractJwt } from "passport-jwt";
import { User } from "../users/userSchema";

const opts = { jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(), secretOrKey: "secret" };

export default function configPassport(passport) {
    passport.use(
        new Strategy(opts, (jwt_payload, done) => {
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
}
