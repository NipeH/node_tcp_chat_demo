const socket = io();
// viestien lähetys
const $form = document.querySelector('#message');
const $name = document.querySelector('#name');
const $body = document.querySelector('#body');
$form.addEventListener('submit', e => {
  e.preventDefault();
  const name = $name.value;
  const body = $body.value;
  addMessage({ name, body });
  socket.emit('message', { name, body });
});
// viestien vastaanotto
const $tbody = document.querySelector('tbody');
socket.on('messages', (messages) => {
  messages.forEach(addMessage);
});
socket.on('message', addMessage);
function addMessage (message) {
  const { name, body } = message;
  const $message = document.createElement('tr');
  const $messageName = document.createElement('td');
  const $messageBody = document.createElement('td');
  $messageName.textContent = name;
  $messageBody.textContent = body;
  $message.appendChild($messageName);
  $message.appendChild($messageBody);
  $tbody.appendChild($message);
}