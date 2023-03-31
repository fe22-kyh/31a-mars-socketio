const usernameField = document.querySelector('.username-field');
const passwordField = document.querySelector('.password-field');
const loginBtn = document.querySelector('.login-btn');
const serverInfo = document.querySelector('.server-info');

const titleField = document.querySelector('.title-field');
const contentField = document.querySelector('.content-field');
const todoSubmitBtn = document.querySelector('.todo-submit-btn');
const todoList = document.querySelector('.todo-list');

function createTodoListItem(todo) {
  let li = document.createElement('li');
  let h4 = document.createElement('h4');
  let p = document.createElement('p');

  h4.textContent = todo.title;
  p.textContent = todo.content;

  li.append(h4, p);

  todoList.append(li);
}

async function refreshListContent() {
  let result = await sendData("http://127.0.0.1:9090/api/todo/", "GET");
  let todos = await result.json();

  todoList.innerHTML = '';

  for (let todo of todos) {
    createTodoListItem(todo);
  }
}

async function handleNewTodo() {
  const todo = {
    title: titleField.value,
    content: contentField.value
  }

  // create new todo at server
  sendData("http://127.0.0.1:9090/api/todo/", "PUT", todo);
}
todoSubmitBtn.addEventListener('click', handleNewTodo);


async function handleAuthentication() {
  const authDetails = {
    username: usernameField.value,
    password: passwordField.value
  }

  // authenticate with server
  await authenticate(authDetails);
  establishSocketConnection();
  refreshListContent();
}
loginBtn.addEventListener('click', handleAuthentication);

