import mongoose from "mongoose";

const TeamSchema = mongoose.Schema;

const teamSchema = new TeamSchema(
    {
        creator: { type: String, required: true },
        teamName: { type: String, required: true },
        description: String,
        upVotes: Number,

        party: [
            {
                pokemonID: { type: Number, required: true },
                notes: String,
                nickname: { type: String },
            },
        ],
    },
    {
        timestamps: {},
    }
);

const Team = mongoose.model("Team", teamSchema);

export { Team };
