import Notes from '../notes';
import Navigation from '../libs/navigation';
import LocationHelper from '../libs/location';

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
  const urlParams = window.location.search.substr(1); // Remove the '?'
  const [, currIdx] = urlParams.split('=');
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
  // Get the current location of the user
  LocationHelper.getLocation(location => document.getElementById('note-location-label').textContent = location);
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
  window.onCustomNavigate('/index.html');
};

const handleSoftRight = ({ target }) => {
  const { value } = target;
  target.value = value.slice(0, -1);
};

const handleSoftLeft = event => {
  window.onCustomNavigate('/index.html');
};

export default { handleKeyDown, init, renderCB };