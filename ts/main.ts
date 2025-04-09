interface FormElements extends HTMLFormControlsCollection {
  title: HTMLInputElement;
  photoURL: HTMLInputElement;
  notes: HTMLTextAreaElement;
}

interface Entry {
  entryId: number;
  title: string;
  photoURL: string;
  notes: string;
}

const $form = document.querySelector('.form') as HTMLFormElement;
if (!$form) throw new Error('Unable to find form element');
const $entryImage = document.querySelector('.entry-image') as HTMLImageElement;
if (!$entryImage) throw new Error('Unable to find entry-image element');
const $formELements = $form.elements as FormElements;
const $photoURL = $formELements.photoURL;

$photoURL.addEventListener('input', () => {
  if ($photoURL.value) {
    $entryImage.setAttribute('src', $photoURL.value);
  } else {
    $entryImage.setAttribute('src', 'images/placeholder-image-square.jpg');
  }
});

$form.addEventListener('submit', (event: Event) => {
  event.preventDefault();
  const entryId = data.nextEntryId++;
  const title = $formELements.title.value;
  const photoURL = $formELements.photoURL.value;
  const notes = $formELements.notes.value;
  const entry: Entry = { entryId, title, photoURL, notes };
  data.entries.unshift(entry);
  $entryImage.setAttribute('src', 'images/placeholder-image-square.jpg');
  writeDataToLocalStorage();
  $form.reset();
});
