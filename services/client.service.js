import Client from '../models/Client.js';
import bcrypt from 'bcrypt';
import Boom from '@hapi/boom';

class ClientService {
  constructor() {}

  async create(payload) {
    try {
      const { name, lastName, email, password, phone } = payload;
      const hashedPassword = await bcrypt.hash(password, 10);

      const newClient = await Client.create([
        {
          name,
          lastName,
          email,
          password: hashedPassword,
          phone,
        },
      ]);

      return newClient;
    } catch (error) {
      if (error.isBoom) throw error;
      throw Boom.badRequest(error.message);
    }
  }

  async find(queryParams = {}) {
    try {
      const { email } = queryParams;
      let query = Client.find();

      if (email) query = query.where({ email });

      const clients = await query.exec();
      return clients;
    } catch (error) {
      if (error.isBoom) throw error;
      throw Boom.badImplementation(`Error fetching clients: ${error.message}`);
    }
  }

  async findOne(id) {
    try {
      const client = await Client.findById(id);
      if (!client) throw Boom.notFound('Client not found');
      return client;
    } catch (error) {
      if (error.isBoom) throw error;
      throw Boom.badImplementation('Error retrieving the client', {
        data: error,
      });
    }
  }

  async update(id, payload) {
    try {
      const client = await this.findOne(id);
      if (!client) throw Boom.notFound('Client not found');

      if (payload.email) {
        const existingClient = await Client.findOne({ email: payload.email });
        if (existingClient && existingClient._id.toString() !== id) {
          throw Boom.conflict('Email already exists');
        }
      }

      if (payload.password)
        payload.password = await bcrypt.hash(payload.password, 10);

      const response = await Client.findByIdAndUpdate(id, payload, {
        new: true,
      });

      return response;
    } catch (error) {
      if (error.isBoom) throw error;
      throw Boom.badImplementation('Error updating the client', {
        data: error,
      });
    }
  }

  async delete(id) {
    try {
      const client = await this.findOne(id);
      if (!client) throw Boom.notFound('Client not found');

      await Client.findByIdAndDelete(id);
      return {
        status: 'success',
        message: 'Client deleted successfully.',
      };
    } catch (error) {
      if (error.isBoom) throw error;
      throw Boom.badImplementation('Error deleting the client', {
        data: error,
      });
    }
  }
}

export default new ClientService();
