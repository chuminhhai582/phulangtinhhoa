import { loadEnv } from 'vite';

// Load env vars from .env.local and .env.test for testing
const env = loadEnv('test', process.cwd(), '');

for (const key in env) {
  if (Object.prototype.hasOwnProperty.call(env, key)) {
    process.env[key] = env[key];
  }
}
