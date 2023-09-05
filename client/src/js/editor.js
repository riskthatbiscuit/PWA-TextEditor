// Import methods to save and get data from the indexedDB database in './database.js'
import { getDb, putDb } from './database';
import { header } from './header';

export default class {
  constructor() {
    const localData = localStorage.getItem('content');
    console.log("this is the local data")
    console.log(localData)

    // check if CodeMirror is loaded
    if (typeof CodeMirror === 'undefined') {
      throw new Error('CodeMirror is not loaded');
    }

    this.editor = CodeMirror(document.querySelector('#main'), {
      value: '',
      mode: 'javascript',
      theme: 'monokai',
      lineNumbers: true,
      lineWrapping: true,
      autofocus: true,
      indentUnit: 2,
      tabSize: 2,
    });

    // When the editor is ready, set the value to whatever is stored in indexeddb.
    // Fall back to localStorage if nothing is stored in indexeddb, and if neither is available, set the value to header.
getDb().then((data) => {
  console.info("Loaded data from IndexedDB, injecting into editor");
  console.log(data);
  // console.log(data.length)

  if (data !== null && data.length > 0) {
    const lastEntry = data[data.length - 1];
    // console.log(lastEntry)
    // console.log(lastEntry.note)
    if (lastEntry && lastEntry.note) {
            this.editor.setValue(lastEntry.note);
    } else {
      console.log("Last entry does not contain content.");
    }
  } else {
    console.log("Data not available in IndexedDB");
    this.editor.setValue(localData || header);
  }
});

    this.editor.on('change', () => {
      localStorage.setItem('content', this.editor.getValue());
    });

    // Save the content of the editor when the editor itself is loses focus
    this.editor.on('blur', () => {
      console.log('The editor has lost focus');
      putDb(localStorage.getItem('content'));
    });
  }
}
