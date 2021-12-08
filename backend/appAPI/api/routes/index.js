import appRouter from './route.js';

export default (app) => {
    app.use('/', appRouter);
}