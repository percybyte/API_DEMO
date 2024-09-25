import clientService from '../services/client.service.js';

/**
 * Controller function to retrieve a list of clients.
 * It accepts an optional "email" query parameter to filter clients by email.
 * If no parameter is provided, it returns the entire list of clients.
 * The function ensures that only the "email" parameter is allowed,
 * and returns a 400 error if any invalid parameters are sent.
 *
 * Responses:
 * - 200: Successfully returns the list of clients.
 * - 204: No clients found.
 * - 400: Invalid parameters provided.
 * - 500: Server error or unexpected issues (handled by error middleware).
 */
const getClients = async (req, res, next) => {
  try {
    // Extract query parameters from the request
    const queryParams = req.query;

    const allowedParams = ['email'];

    // Get the actual parameters received in the request
    const receivedParams = Object.keys(queryParams);

    // Check if any received parameters are not allowed
    const invalidParams = receivedParams.filter(
      (param) => !allowedParams.includes(param),
    );

    // Check if any received parameters are not allowed
    if (invalidParams.length > 0) {
      return res.status(400).json({
        status: 'error',
        message: `Invalid parameter(s): ${invalidParams.join(', ')}. Only "email" is allowed.`,
      });
    }

    // Get list of all clients
    const clients = await clientService.find(queryParams);

    if (clients.length === 0) {
      return res.status(404).json({
        status: 'success',
        message: 'No clients found with the provided email.',
      });
    }

    res.json({
      status: 'success',
      data: clients,
    });
  } catch (error) {
    next(error);
  }
};

const getOneClient = async (req, res, next) => {
  const { id } = req.params;

  try {
    const client = await clientService.findOne(id);
    console.log('CLIENTE', client);
    if (!client) {
      return res.status(404).json({
        status: 'fail',
        message: 'Client not found',
      });
    }

    res.json({
      status: 'success',
      data: client,
    });
  } catch (error) {
    next(error);
  }
};

const createClient = async (req, res, next) => {
  try {
    const newClient = await clientService.create(req.body);
    res.status(201).json({
      status: 'success',
      data: newClient,
    });
  } catch (error) {
    next(error);
  }
};

const updateClient = async (req, res, next) => {
  const { id } = req.params;

  try {
    if (Object.keys(req.body).length === 0) {
      return res.status(400).json({
        status: 'error',
        message: 'No fields provided for update',
      });
    }
    const clientUpdated = await clientService.update(id, req.body);

    if (!clientUpdated) {
      return res.status(404).json({
        status: 'fail',
        message: 'Client not found',
      });
    }
    res.json({
      status: 'success',
      data: clientUpdated,
    });
  } catch (error) {
    if (error.isBoom) {
      return next(error);
    }

    return res.status(500).json({
      message: error.message,
    });
  }
};

const deleteClient = async (req, res, next) => {
  const { id } = req.params;
  try {
    const clientDeleted = await clientService.delete(id);

    if (!clientDeleted) {
      return res.status(404).json({
        status: 'error',
        message: 'Client not found',
      });
    }

    res.status(200).json({
      status: 'success',
      message: 'Client deleted successfully',
    });
  } catch (error) {
    next(error);
  }
};

export { getClients, getOneClient, createClient, updateClient, deleteClient };
