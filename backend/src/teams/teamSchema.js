import mongoose from "mongoose";

const TeamSchema = mongoose.Schema;

const teamSchema = new TeamSchema(
    {
        creator: {
            type: TeamSchema.Types.ObjectId,
            ref: "User",
            required: [true, "A reference to a user is required"],
        },
        teamName: { type: String, required: [true, "A team name is required"] },
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
