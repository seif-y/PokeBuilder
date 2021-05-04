import passport from "passport";

const passportRequestHandler = passport.authenticate("jwt", { session: false });

export default passportRequestHandler;
