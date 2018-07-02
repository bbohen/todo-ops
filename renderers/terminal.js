const process = require('process');
const readline = require('readline');

const logger = require('../utils/logger');

module.exports = function displayResults(results) {
  readline.cursorTo(process.stdout, 0, 0);
  readline.clearScreenDown(process.stdout);

  Object.entries(results).forEach(([fileName, todos]) => {
    logger(`*** ${fileName}`);
    todos.forEach(({ text }) => {
      logger(`-- ${text}`);
    });
  });
};
