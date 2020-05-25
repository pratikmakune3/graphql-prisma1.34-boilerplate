const Query = {
    async users(parent, args, { prisma, request }, info) {

        let opArgs = {};

        if (args.query) {
            opArgs.where = {
                OR: [
                    { name_contains: args.query },
                    { email_contains: args.query },
                ]
            }
        }

        return prisma.query.users(opArgs, info);
    },

    async user(parent, args, { prisma, request }, info) {

        return await prisma.query.user(
            {
                where: {
                    id: args.id
                }
            },
            info
        )

    },
}

export { Query as default }