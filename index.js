import express from 'express';
import handleRouting from './routes/index.js';
import connectToDB from './database/config.js';
import colors from 'colors';
import cors from 'cors';
import globalConfig from './config/globalConfig.js';
import {
  logErrors,
  errorHandler,
  boomErrorHandler,
  mongooseErrorHandler,
} from './middlewares/errorHandler.js';

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Validation Endpoint
app.get('/', (req, res) => res.send('API Running...!!!'));

// Connection to database
connectToDB();

// Routing
handleRouting(app);

// Handle Errors Middlewares
app.use(logErrors);
app.use(boomErrorHandler);
app.use(mongooseErrorHandler);
app.use(errorHandler);

app.listen(globalConfig.port || 4000, () =>
  console.log(colors.blue(`Server running in port ${globalConfig.port}`)),
);
