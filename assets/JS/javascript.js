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


//contact form validation and to update validation to check for empty fields and valid email address on every input change, not just on submit. Add error messages below each field when invalid and remove them when valid. Also, add a success message when the form is submitted successfully.

const form = document.getElementById('contact-form');
if (form) {
  const nameInput = document.getElementById('name');
  const emailInput = document.getElementById('email');
  const subjectInput = document.getElementById('subject');
  const messageInput = document.getElementById('message');

  const nameError = document.getElementById('name-error');
  const emailError = document.getElementById('email-error');
  const subjectError = document.getElementById('subject-error');
  const messageError = document.getElementById('message-error');
  const successMessage = document.getElementById('success-message');

  function setError(element, message) {
    if (!element) return;
    element.textContent = message;
  }

  function setInvalidState(input, isInvalid) {
    if (!input) return;
    input.classList.toggle('invalid', isInvalid);
  }

  function validateName() {
    const value = nameInput.value.trim();
    const isInvalid = !value;

    setInvalidState(nameInput, isInvalid);
    setError(nameError, isInvalid ? 'Name is required.' : '');
    return !isInvalid;
  }

  function validateEmail() {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const value = emailInput.value.trim();
    const isInvalid = !value || !emailPattern.test(value);

    setInvalidState(emailInput, isInvalid);

    if (!value) {
      setError(emailError, 'Email is required.');
      return false;
    }

    if (!emailPattern.test(value)) {
      setError(emailError, 'Please enter a valid email address.');
      return false;
    }

    setError(emailError, '');
    return true;
  }

  function validateSubject() {
    const value = subjectInput.value.trim();
    const isInvalid = !value || value.length < 8;

    setInvalidState(subjectInput, isInvalid);

    if (!value) {
      setError(subjectError, 'Subject is required.');
      return false;
    }

    if (value.length < 8) {
      setError(subjectError, 'Subject must be at least 8 characters long.');
      return false;
    }

    setError(subjectError, '');
    return true;
  }

  function validateMessage() {
    const value = messageInput.value.trim();
    const isInvalid = !value || value.length < 25;

    setInvalidState(messageInput, isInvalid);

    if (!value) {
      setError(messageError, 'Message is required.');
      return false;
    }

    if (value.length < 25) {
      setError(messageError, 'Message must be at least 25 characters long.');
      return false;
    }

    setError(messageError, '');
    return true;
  }

  nameInput.addEventListener('input', () => {
    successMessage.textContent = '';
    validateName();
  });

  emailInput.addEventListener('input', () => {
    successMessage.textContent = '';
    validateEmail();
  });

  subjectInput.addEventListener('input', () => {
    successMessage.textContent = '';
    validateSubject();
  });

  messageInput.addEventListener('input', () => {
    successMessage.textContent = '';
    validateMessage();
  });

  form.addEventListener('submit', (event) => {
    event.preventDefault();

    const isNameValid = validateName();
    const isEmailValid = validateEmail();
    const isSubjectValid = validateSubject();
    const isMessageValid = validateMessage();

    if (isNameValid && isEmailValid && isSubjectValid && isMessageValid) {
      const name = encodeURIComponent(nameInput.value.trim());
      const email = encodeURIComponent(emailInput.value.trim());
      const subject = encodeURIComponent(subjectInput.value.trim());
      const message = encodeURIComponent(messageInput.value.trim());

      const mailtoLink = `mailto:annalytics.dev@gmail.com?subject=${subject}&body=${encodeURIComponent(
        `Name: ${nameInput.value.trim()}\nEmail: ${emailInput.value.trim()}\n\nMessage:\n${messageInput.value.trim()}`
      )}`;

      successMessage.textContent = 'Opening your email app...';
      window.location.href = mailtoLink;
      form.reset();
      nameInput.classList.remove('invalid');
      emailInput.classList.remove('invalid');
      subjectInput.classList.remove('invalid');
      messageInput.classList.remove('invalid');
    }
  });
}


