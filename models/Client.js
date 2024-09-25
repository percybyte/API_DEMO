import { Schema, model } from 'mongoose';

const ClientSchema = Schema({
  name: {
    type: String,
    required: [true, 'Name is required'],
    trim: true,
  },
  lastName: {
    type: String,
    required: [true, 'Last name is required'],
    trim: true,
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    trim: true,
    unique: true,
  },
  password: {
    type: String,
    required: [true, 'Password is required'],
    trim: true,
  },
  phone: {
    type: String,
    trim: true,
  },
  isActive: {
    type: Boolean,
    default: true,
  },
});

ClientSchema.methods.toJSON = function () {
  const { __v, ...data } = this.toObject();
  return data;
};

const Client = model('Client', ClientSchema);

export default Client;
