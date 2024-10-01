import 'reflect-metadata';
import { AppDataSource } from './repos/db';
import http from 'http';
import app from './server';

AppDataSource.initialize()
  .then(() => {
    console.log('Data Source has been initialized!');
  })
  .catch((error: unknown) => {
    console.log('Error during Data Source initialization:', error);
  });

const server = http.createServer(app);
server.listen(3000, () => {
  console.log('Server is running on port', 3000);
});
