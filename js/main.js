'use strict';
const $form = document.querySelector('.form');
if (!$form) throw new Error('Unable to find form element');
const $entryImage = document.querySelector('.entry-image');
if (!$entryImage) throw new Error('Unable to find entry-image element');
const $formELements = $form.elements;
const $photoURL = $formELements.photoURL;
$photoURL.addEventListener('input', () => {
  if ($photoURL.value) {
    $entryImage.setAttribute('src', $photoURL.value);
  } else {
    $entryImage.setAttribute('src', 'images/placeholder-image-square.jpg');
  }
});
$form.addEventListener('submit', (event) => {
  event.preventDefault();
  const entryId = data.nextEntryId++;
  const title = $formELements.title.value;
  const photoURL = $formELements.photoURL.value;
  const notes = $formELements.notes.value;
  const entry = { entryId, title, photoURL, notes };
  data.entries.unshift(entry);
  $entryImage.setAttribute('src', 'images/placeholder-image-square.jpg');
  console.log(data);
  writeDataToLocalStorage();
  $form.reset();
});
