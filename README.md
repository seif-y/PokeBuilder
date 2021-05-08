# <img src="frontend/public/favicon.ico" alt="PokeBuilder Icon" height="30"/> PokéBuilder 

PokéBuilder is a MERN web application that allows users to build and share Pokémon teams. Users can browse the Pokédex to look at Pokémon stats, types and descriptions. They can also view, upvote, and comment on posted teams.

## Getting Started

Before starting, make sure you have Node and NPM installed and set up on your system.

### Installing Dependencies

There are separate `package.json` files for the frontend and backend. Run the following command from the `frontend` and `backend` directories, to install dependencies for each module:

```console
npm install
```

### Running in Development

In development environments, the backend and frontend must be running simultaneously for the application to work. These can be run using the command line, by typing the following commands in the `frontend` and `backend` directories:

```console
npm start
```

By default, the frontend runs on `localhost:3000`, and the backend runs on `localhost:3001`

### Running in Production

In production, the backend will serve a static build of the frontend website. To build the frontend and run it through the backend, use the following commands from the project's root directory:

```console
npm run build --prefix frontend
npm start --production --prefix backend
```
