const process = require('process');
const readline = require('readline');
const chalk = require('chalk');

const logger = console.log.bind(console);

module.exports = function displayResults(results) {
  readline.cursorTo(process.stdout, 0, 0);
  readline.clearScreenDown(process.stdout);

  Object.entries(results).forEach(([fileName, todos]) => {
    logger(chalk.magenta.underline(fileName));
    todos.forEach(({ text }) => {
      logger(chalk.green(`-- ${text}`));
    });
  });
};
