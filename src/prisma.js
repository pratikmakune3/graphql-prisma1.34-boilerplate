// Code to connect Node application with Prisma graphql API

import { Prisma } from "prisma-binding";

const path = require('path');
const PATH_TO_ENV = '.env';
require('dotenv').config({
    path: path.resolve(process.cwd(), PATH_TO_ENV)
});

const prisma = new Prisma({
   typeDefs: 'src/generated/prisma.graphql',
   endpoint: process.env.PRISMA_ENDPOINT,
   secret: process.env.PRISMA_SECRET,
});

export { prisma as default };