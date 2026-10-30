import createApp from './app.js';
import connectDatabase from './config/database.js';
import env from './config/env.js';
import seedProducts from './seed/seed.js';

const bootstrap = async () => {
  try {
    await connectDatabase();

    if (env.autoSeed) await seedProducts();

    const app = createApp();
    app.listen(env.port, () => {
      console.log(`[api] Mandella Cafe listening on http://localhost:${env.port}`);
    });
  } catch (error) {
    console.error('[boot] failed to start server', error);
    process.exit(1);
  }
};

bootstrap();
