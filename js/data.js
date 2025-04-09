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
// eslint-disable-next-line @typescript-eslint/no-unused-vars
async function fillEntryData() {
  // Declare API URL
  const randomDogAPI = 'https://dog.ceo/api/breeds/image/random';
  const randomTextAPI = 'https://baconipsum.com/api/?type=all-meat&paras=5';
  // Take elements from the forms
  const $title = document.querySelector('#title');
  const $photoURL = document.querySelector('#photoURL');
  const $notes = document.querySelector('#notes');
  // Fetching data
  console.log('Fetching data...');
  try {
    const responseDogAPI = await fetch(randomDogAPI);
    const responseTextAPI = await fetch(randomTextAPI);
    if (!responseDogAPI || !responseTextAPI) {
      throw new Error('Fail to fetch data');
    }
    const dogData = await responseDogAPI.json();
    const textData = await responseTextAPI.json();
    $title.value = textData[0].slice(0, 10);
    $photoURL.value = dogData.message;
    $photoURL.dispatchEvent(new Event('input', { bubbles: true })); // dispatch input event to photoURL
    $notes.value = textData.join('');
  } catch (error) {
    console.error('Unable to fetch data', error);
  }
}
