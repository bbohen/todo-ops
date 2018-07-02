const chokidar = require('chokidar');
const fs = require('fs');
const leasot = require('leasot');
const path = require('path');
const process = require('process');

const displayResults = require('./renderers/terminal');

const pathToWatch = process.argv[2] || process.cwd();
const results = {};

function removeEntriesForFile(pathName) {
  delete results[pathName];

  displayResults(results);
}

function updateEntriesForFile(pathName) {
  const content = fs.readFileSync(pathName, 'utf8');
  const filetype = path.extname(pathName);

  if (leasot.isExtSupported(filetype)) {
    const fileName = pathName.replace(/^.*[\\\/]/, ''); // eslint-disable-line
    const todosAndFixmes = leasot.parse({
      ext: filetype,
      content,
      fileName,
      skipUnsupported: true,
    });

    if (todosAndFixmes && todosAndFixmes.length > 0) {
      results[pathName] = todosAndFixmes;
    }

    displayResults(results);
  }
}

chokidar
  .watch(pathToWatch, {
    ignored: /(^|[\/\\])\../, // eslint-disable-line
    persistent: true,
  })
  .on('add', updateEntriesForFile)
  .on('change', updateEntriesForFile)
  .on('unlink', removeEntriesForFile);
