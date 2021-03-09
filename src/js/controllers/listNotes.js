import Notes from '../notes';
import Navigation from '../libs/navigation';

let softKeysEnabled = false;

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

const handleEnter = event => {
  window.onCustomNavigate('/new');
};

const handleSoftRight = event => {
  if (!softKeysEnabled) return;

  const curIdx = Navigation.getTheIndexOfTheSelectedElement();
  const remainingNotes = Notes.deleteNote(curIdx);
  if (!remainingNotes) {
    disableSoftKeys();
  }
};

const handleSoftLeft = event => {
  if (!softKeysEnabled) return;

  const curIdx = Navigation.getTheIndexOfTheSelectedElement();
  window.onCustomNavigate('/edit', `?idx=${curIdx}`);
};

const init = () => {
  Notes.loadNotes();
};

const renderCB = () => {
  const totalNotes = Notes.renderNotes();

  if (totalNotes) {
    // select the first elem by default
    Navigation.selectdefault();
    enableSoftKeys();
  }
};

const enableSoftKeys = () => {
  document.getElementById("left").innerText = 'Edit';
  document.getElementById("right").innerText = 'Delete';

  softKeysEnabled = true;
};

const disableSoftKeys = () => {
  document.getElementById("left").innerText = '';
  document.getElementById("right").innerText = '';

  softKeysEnabled = false;
};

export default { handleKeyDown, init, renderCB };