import Notes from '../notes';
import Navigation from '../libs/navigation';

const handleKeyDown = event => {
  switch (event.key) {
    case "Enter":
      handleEnter(event);
      break;
    case "SoftRight":
    case "ArrowRight":
      handleSoftRight(event);
      break;
    case "SoftLeft":
    case "ArrowLeft":
      handleSoftLeft(event);
      break;
    case "ArrowDown":
      Navigation.Down(event);
      break;
    case "ArrowUp":
      Navigation.Up(event);
      break;
    default:
      break;
  }
};

const init = () => {
  // Nothing to do here as of now
};

const renderCB = () => {
  // select the first elem by default
  Navigation.selectdefault();
};

const handleEnter = event => {
  const title = document.getElementById('note-title').value.trim();
  const desc = document.getElementById('note-desc').value.trim();

  if (!title && !desc) return;

  Notes.addNote({ title, desc });
  window.onCustomNavigate('/');
};

const handleSoftRight = ({ target }) => {
  const { value } = target;
  target.value = value.slice(0, -1);
};

const handleSoftLeft = event => {
  window.onCustomNavigate('/');
};

export default { handleKeyDown, init, renderCB };