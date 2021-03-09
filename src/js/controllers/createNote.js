import Notes from '../notes';
import Navigation from '../libs/navigation';

let isEditMode = -1;
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
  Notes.loadNotes();
};

const renderCB = () => {
  const urlParams = new URLSearchParams(window.location.search);
  const currIdx = parseInt(urlParams.get('idx'), 10);
  if (currIdx > -1) {
    const note = Notes.getNoteByIdx(currIdx);

    document.getElementById('note-title').value = note.title;
    document.getElementById('note-desc').value = note.desc;

    isEditMode = currIdx;
  } else {
    isEditMode = -1;
  }
  // select the first elem by default
  Navigation.selectdefault();
};

const handleEnter = event => {
  const title = document.getElementById('note-title').value.trim();
  const desc = document.getElementById('note-desc').value.trim();

  if (!title && !desc) return;

  if (isEditMode === -1) {
    Notes.addNote({ title, desc });
  } else {
    Notes.editNote(isEditMode, { title, desc });
  }
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