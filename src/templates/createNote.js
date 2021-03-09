const createNote = `
  <section id="new-note" class="new-note">
    <input type="text" id='note-title' nav-selectable="true" autofocus name="title" placeholder="Title" />
    <textarea id='note-desc' nav-selectable="true" name="description" placeholder="Description"></textarea>
  </section>
  <section id="softkey">
    <label id="left">Back</label>
    <label id="center">Save</label>
    <label id="right">Delete</label>
  </section>
`;

export default createNote;