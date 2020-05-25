import Query from './Query'
import Mutation from './Mutation'
import Subscription from './Subscription'
import { extractFragmentReplacements } from 'prisma-binding'

const resolvers = {
    Query,
    Mutation,
    Subscription
};

const fragmentReplacements = extractFragmentReplacements(resolvers);

export { resolvers, fragmentReplacements }