import { GraphQLServer, PubSub } from 'graphql-yoga'
import { makeExecutableSchema } from 'graphql-tools';
import { importSchema } from 'graphql-import'

import prisma from './prisma';
import { resolvers, fragmentReplacements } from './resolvers/index';
import directiveResolvers from './resolvers/directiveResolvers';

const bodyParser = require('body-parser');

const path = require('path');
const PATH_TO_ENV = '.env';
require('dotenv').config({
    path: path.resolve(process.cwd(), PATH_TO_ENV)
});

const opts = {
    port: 4001,
    cors: {
        credentials: true,
    }
};

const typeDefs = importSchema('./src/schema.graphql');

/*
    Using makeExecutableSchema - it makes hookup with directiveResolvers easy
*/
const schema = makeExecutableSchema({
    typeDefs,
    resolvers,
    directiveResolvers,
});

const pubsub = new PubSub();

const server = new GraphQLServer({
    schema,
    context(request) {
        return {
            pubsub,
            prisma,
            request
        }
    },
    fragmentReplacements
});


server.express.use(bodyParser.json());
server.express.use(bodyParser.urlencoded());

// in latest body-parser use like below.
server.express.use(bodyParser.urlencoded({ extended: true }));

server.express.use(function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header(
        'Access-Control-Allow-Headers',
        'Origin, X-Requested-With, Content-Type, Accept'
    );
    next();
});

server.start(opts, () => {
    console.log('The Prorail Server is Up and Running!!!');
});
