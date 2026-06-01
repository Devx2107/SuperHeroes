'use strict';

const { createApp } = require('./src/create-app');
const { getEnv } = require('./src/config/env');

const env = getEnv();
const app = createApp({ env });

app.listen(env.port, () => {
  console.log(`Hero Hub server running at http://localhost:${env.port}`);
});
