import * as express from 'express';
import * as bodyParser from 'body-parser';
import { graphiqlExpress, graphqlExpress } from 'apollo-server-express';
import { schema } from './graphql/schema';

const port = 3000;

const app = express();

app.use('/graphql', bodyParser.json(), graphqlExpress({ schema, }));
app.get('/graphiql', graphiqlExpress({ endpointURL: '/graphql' })); // if you want GraphiQL enabled

app.listen(port, () => {
    console.debug(`Go to http://localhost:${port}/graphiql to run queries!`);
});
