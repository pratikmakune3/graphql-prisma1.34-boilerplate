// import getUserId from '../utils/getUserId';

const directiveResolvers = {

    isAuthenticated: (next, source, {role}, { request }) => {
        console.log('[ Middleware isAuthenticated ]');
        // getUserId(request, true);
        return next();
    },

    isAdmin: (next, source, {role}, ctx) => {

    },
};

export { directiveResolvers as default }
