yarn run concurrently \
-n "dev:client, build:server, build:server-util-gql, run:server" \
\
"yarn run webpack-dev-server --env.package=client" \
"yarn run webpack --watch --env.package=server" \
"yarn run nodemon ./packages/server/dist/server.js"
