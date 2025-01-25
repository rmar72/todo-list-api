import app from './app';
import CFonts from 'cfonts';
import logger from './utils/logger';

const PORT = process.env.PORT || 8080;

const server = app.listen(PORT, () => {
  CFonts.say('Nooro API', {
    font: 'block',
    align: 'center',
    colors: ['cyan', 'yellow'],
    background: 'transparent',
    letterSpacing: 0.1,
    lineHeight: 0,
    space: false,
  });
  CFonts.say('Running on:', {
    font: 'simple',
    align: 'center',
    colors: ['yellowBright'],
    background: 'transparent',
    letterSpacing: 0.3,
    lineHeight: 0.4,
    space: false,
  });
  CFonts.say(`http://localhost:${PORT}`, {
    font: 'simple',
    align: 'center',
    colors: ['cyan', 'blue'],
    background: 'transparent',
    letterSpacing: 0,
    lineHeight: 0.3,
    space: false,
  });
});

// Gracefully handle shutdown signals
function shutdown() {
  logger.warn('The server is shutting down...');
  server.close((err) => {
    if (err) {
      logger.error(`Error during shutdown: ${err}`);
      process.exitCode = 1;
    }
    process.exit();
  });
}

// Attach shutdown logic to signals
process.on('SIGINT', shutdown);
process.on('SIGTERM', shutdown);

