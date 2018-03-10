// import * as express from 'express';
// import * as bodyParser from 'body-parser';
// import { graphiqlExpress, graphqlExpress } from 'apollo-server-express';
// import { connect } from 'mongoose';
// import { schema } from './graphql/schema';
// // import './createMocks';

// const port = 3000;

// const app = express();

// app.use('/graphql', bodyParser.json(), graphqlExpress({ schema, }));
// app.get('/graphiql', graphiqlExpress({ endpointURL: '/graphql' })); // if you want GraphiQL enabled

// connect('mongodb://localhost/visdict');

// app.listen(port, () => {
//     console.debug(`Go to http://localhost:${port}/graphiql to run queries!`);
// });
