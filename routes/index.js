import express from 'express';

import clientRoutes from './client.routes.js';

const handleRouting = (app) => {
  const router = express.Router();
  app.use('/api/v1', router);

  // Define routes
  router.use('/clients', clientRoutes);
};

export default handleRouting;
