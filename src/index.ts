import express from 'express';
import routes from './routes/api/process';

// Create an application object.
const app = express();
const port = 3000;

app.use('/', routes);

app.listen(port, (): void => {
  console.log(`The server is running @ port ${port}`);
});

export default app;
