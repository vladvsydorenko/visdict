# VisDict
The monorepo for VisDict appliction. Both client and server for now.

# Getting Started

Install dependencies

`yarn`

Init packages, install their dependencies etc by `lerna`

`yarn run init`

Run client via webpack-dev-server

`yarn run dev:web client`

Run server and server graphql util building

`yarn run dev:watch server server-util-gql`

Run built server

`yarn run server`

That's it, open `http://localhost:8080/` and enjoy
