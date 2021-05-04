import express from "express";
import path from "path";
import mongoose from "mongoose";
import passport from "passport";
import configPassport from "./auth/passport";

// Setup Express
const app = express();
const port = process.env.PORT || 3001;
const USERNAME = "pokeUser";
const PASSWORD = "PokemonFanBoy1";
const CONNECTION_STRING =
    "mongodb+srv://" +
    USERNAME +
    ":" +
    PASSWORD +
    "@cluster0.ipbwg.mongodb.net/pokeBuilder?retryWrites=true&w=majority";

// Setup body-parser
app.use(express.json());

// Setup our routes.
import routes from "./routes";
app.use("/", routes);

// Make the "public" folder available statically
app.use(express.static(path.join(__dirname, "../public")));

// Serve up the frontend's "build" directory, if we're running in production mode.
if (process.env.NODE_ENV === "production") {
    console.log("Running in production!");

    // Make all files in that folder public
    app.use(express.static(path.join(__dirname, "../../frontend/build")));

    // If we get any GET request we can't process using one of the server routes, serve up index.html by default.
    app.get("*", (req, res) => {
        res.sendFile(path.join(__dirname, "../../frontend/build/index.html"));
    });
}

// Start the DB running. Then, once it's connected, start the server.
mongoose
    .connect(CONNECTION_STRING, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true })
    .then(() => app.listen(port, () => console.log(`App server listening on port ${port}!`)));

// Add our custom passport JWT config to passport, to handle authentication
configPassport(passport);
