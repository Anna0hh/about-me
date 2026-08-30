let items = [];

function saveItems() {
  localStorage.setItem('todoItems', JSON.stringify(items));
}

function loadItems() {
  const storedItems = localStorage.getItem('todoItems');
  if (storedItems) {
    items = JSON.parse(storedItems);
  }
}

function renderItems() {
  const itemsDiv = document.getElementById('todo-list');
  if (!itemsDiv) return;

  itemsDiv.innerHTML = '';

  items.forEach((item, index) => {
    const row = document.createElement('div');
    row.className = 'todo-item';

    const check = document.createElement('button');
    check.type = 'button';
    check.className = 'todo-check';
    check.setAttribute('aria-label', `Mark ${item.text} as complete`);
    check.textContent = item.completed ? '✓' : '';
    check.addEventListener('click', () => toggleItem(index));

    const text = document.createElement('span');
    text.textContent = item.text;
    text.className = item.completed ? 'completed' : '';

    const button = document.createElement('button');
    button.type = 'button';
    button.className = 'todo-delete';
    button.textContent = 'Delete';
    button.addEventListener('click', () => removeItem(index));

    row.appendChild(check);
    row.appendChild(text);
    row.appendChild(button);
    itemsDiv.appendChild(row);
  });
}

function addItem() {
  const input = document.getElementById('new-item');
  if (!input) return;

  const newItem = input.value.trim();

  if (!newItem) return;

  items.push({ text: newItem, completed: false });
  input.value = '';
  saveItems();
  renderItems();
}

function toggleItem(index) {
  if (!items[index]) return;

  items[index].completed = !items[index].completed;
  saveItems();
  renderItems();
}

function removeItem(index) {
  items.splice(index, 1);
  saveItems();
  renderItems();
}

document.addEventListener('DOMContentLoaded', () => {
  const input = document.getElementById('new-item');
  const addButton = document.getElementById('add-item-btn');
  const styleButton = document.getElementById('style-changer');

  loadItems();
  renderItems();

  if (addButton) {
    addButton.addEventListener('click', addItem);
  }

  if (input) {
    input.addEventListener('keydown', (event) => {
      if (event.key === 'Enter') {
        addItem();
      }
    });
  }

  if (styleButton) {
    styleButton.addEventListener('click', () => {
      const body = document.body;
      const currentTheme = body.dataset.theme === 'light' ? 'light' : 'dark';
      const nextTheme = currentTheme === 'light' ? 'dark' : 'light';

      body.dataset.theme = nextTheme;
      styleButton.textContent = nextTheme === 'light' ? 'Switch to Dark' : 'Switch to Light';
    });

    styleButton.textContent = document.body.dataset.theme === 'light' ? 'Switch to Dark' : 'Switch to Light';
  }
});


