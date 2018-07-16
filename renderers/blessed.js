const process = require('process');
const blessed = require('blessed');

class BlessedRenderer {
  constructor() {
    const screen = blessed.screen({
      autoPadding: true,
      smartCSR: true,
    });
    const list = blessed.list({
      top: 'center',
      left: 'center',
      width: '98%',
      height: '98%',
      interactive: true,
      items: [],
      keys: true,
      tags: true,
      style: {
        fg: 'white',
        selected: {
          fg: '#ff8500',
        },
      },
    });

    screen.title = 'TODO-OPS';
    screen.append(list);
    screen.key(['escape', 'q', 'C-c'], () => process.exit(0));
    list.focus();
    screen.render();

    this.list = list;
    this.screen = screen;
  }

  update(items) {
    const results = [];

    Object.entries(items).forEach(([fileName, todos]) => {
      results.push(`{blue-fg}${fileName}{/}`);
      todos.forEach(({ text }) => {
        results.push(`{blue-fg}---{/} {green-fg}${text}{/}`);
      });
    });

    this.list.clearItems();
    this.list.setItems(results);
    this.screen.render();
  }
}

module.exports = BlessedRenderer;
