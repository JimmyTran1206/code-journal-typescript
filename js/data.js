'use strict';
const data = readDataFromLocalStorage();
// eslint-disable-next-line @typescript-eslint/no-unused-vars
function writeDataToLocalStorage() {
  const dataJSON = JSON.stringify(data);
  localStorage.setItem('data-local-storage', dataJSON);
}
function readDataFromLocalStorage() {
  const dataDefault = {
    view: 'entry-form',
    entries: [],
    editing: null,
    nextEntryId: 1,
  };
  const dataString = localStorage.getItem('data-local-storage');
  return dataString ? JSON.parse(dataString) : dataDefault;
}
