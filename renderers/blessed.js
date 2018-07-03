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
      interactive: false,
      items: [],
      tags: true,
      border: {
        type: 'line',
      },
      style: {
        fg: 'white',
        border: {
          fg: '#f0f0f0',
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
