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

In development environments, the backend and frontend must be running simultaneously for the application to work. By default, the frontend runs on port 3000 and the backend runs on port 3001. These can be run using the command line, by typing the following command in both the `frontend` and `backend` directories:

```console
npm start
```

By default, the frontend runs on `localhost:3000`, and the backend runs on `localhost:3001`

### Running in Production

In production, the backend will serve a static build of the frontend website. By default, the frontend and backend will both run on port 3001 in production To build the frontend and run it through the backend, use the following commands from the project's root directory:

```console
npm run build --prefix frontend
npm start --production --prefix backend
```

## Testing

Test suites have been developed for both the frontend and the backend. To run the test suite for each module, run the following command in the `frontend` or `backend` folder:

```console
npm test
```

React Cosmos is also used for frontend testing. Fixtures files can be created to test React components in isolation. You can create a folder labelled `frontend/src/__fixtures__`, which will contain any React Cosmos fixtures. To use React Cosmos, run the following command in the `frontend` folder:

```console
npm run cosmos
```
