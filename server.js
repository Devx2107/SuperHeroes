'use strict';

const { createApp } = require('./src/create-app');
const { getEnv } = require('./src/config/env');

const env = getEnv();
const app = createApp({ env });

app.listen(env.port, () => {
  console.log(`Legendrium server running at http://localhost:${env.port}`);
});
