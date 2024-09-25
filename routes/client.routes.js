import express from 'express';
const router = express.Router();
import {
  getClients,
  createClient,
  getOneClient,
  updateClient,
  deleteClient,
} from '../controllers/client.controller.js';
import { validatorHandler } from '../middlewares/validatorHandler.js';
import {
  clientSchema,
  getOneClientSchema,
  updateClientSchema,
} from '../schemas/client.schema.js';

router
  .get('/', getClients)
  .get('/:id', validatorHandler(getOneClientSchema, 'params'), getOneClient)
  .post('/', validatorHandler(clientSchema, 'body'), createClient)
  .put(
    '/:id',
    validatorHandler(getOneClientSchema, 'params'),
    validatorHandler(updateClientSchema, 'body'),
    updateClient,
  )
  .delete('/:id', validatorHandler(getOneClientSchema, 'params'), deleteClient);

export default router;
