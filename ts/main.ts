// ISSUE 1
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
if (!$form) throw new Error('Unable to query form element');
const $entryImage = document.querySelector('.entry-image') as HTMLImageElement;
if (!$entryImage) throw new Error('Unable to query entry-image element');
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

  // Update submit event callback function for ISSUE 2
  const $newEntryItem: HTMLLIElement = renderEntry(entry);
  const $entryList = document.querySelector('.entry-list');
  if (!$entryList) throw new Error('Unable to query entry-list element');
  $entryList.prepend($newEntryItem);
  viewSwap('entries');
  toggleNoEntries('off');

  // reset form after all done
  $form.reset();
});

// ISSUE 2
function renderEntry(entry: Entry): HTMLLIElement {
  const $entryElement = document.createElement('li');
  $entryElement.className = 'entry';
  $entryElement.setAttribute('data-entry-id', entry.entryId.toString());
  const entryContent: string = `
            <div class="row">
              <div class="column-half">
                <img
                  class="view-entry-image"
                  src=${entry.photoURL}
                  alt="" />
              </div>

              <div class="column-half">
                <div class="row">
                  <h3 class="entry-title">${entry.title}</h3>
                  <i class="fa fa-pencil edit-icon"></i>
                </div>

                <p class="entry-notes">${entry.notes}
                </p>
              </div>
            </div>`;
  $entryElement.innerHTML = entryContent;
  return $entryElement;
}

document.addEventListener('DOMContentLoaded', () => {
  // load the list items
  const $entryList = document.querySelector('.entry-list');
  if (!$entryList) throw new Error('Unable to query entry-list element');
  if (data.entries.length > 0) {
    toggleNoEntries('off');
    data.entries.forEach((entry) => {
      const $entryListItem: HTMLLIElement = renderEntry(entry);
      $entryList.appendChild($entryListItem);
    });
  }
  // show the previous view before refresh
  viewSwap(data.view);
});

function toggleNoEntries(state: string): void {
  const $noEntryAnnouncement = document.querySelector('.no-entry');
  if (!$noEntryAnnouncement)
    throw new Error('Unable to query no-entry element');
  switch (state) {
    case 'on':
      $noEntryAnnouncement.classList.remove('hidden');
      break;
    case 'off':
      $noEntryAnnouncement.classList.add('hidden');
      break;
  }
}

function viewSwap(view: string): void {
  const $dataViews = document.querySelectorAll(
    '[data-view]',
  ) as NodeListOf<HTMLDivElement>;
  if (!$dataViews) throw new Error('Unable to query data-view elements');
  $dataViews.forEach((item) =>
    item.dataset.view === view
      ? item.classList.remove('hidden')
      : item.classList.add('hidden'),
  );
  data.view = view;
  writeDataToLocalStorage(); // everytime data change, save it to local storage
}

const $entriesLink = document.querySelector(
  '.entries-link',
) as HTMLAnchorElement;
if (!$entriesLink) throw new Error('Unable to query entries element');
$entriesLink.addEventListener('click', () => {
  viewSwap('entries');
});

const $buttonNew = document.querySelector('.button-new') as HTMLAnchorElement;
if (!$buttonNew) throw new Error('Unable to query button-new element');
$buttonNew.addEventListener('click', () => {
  viewSwap('entry-form');
});

// ISSUE 3
