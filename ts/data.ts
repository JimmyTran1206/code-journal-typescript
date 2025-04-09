interface Data {
  view: string;
  entries: Entry[];
  editing: null;
  nextEntryId: number;
}

const data = readDataFromLocalStorage();

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function writeDataToLocalStorage(): void {
  const dataJSON = JSON.stringify(data);
  localStorage.setItem('data-local-storage', dataJSON);
}

function readDataFromLocalStorage(): Data {
  const dataDefault: Data = {
    view: 'entry-form',
    entries: [],
    editing: null,
    nextEntryId: 1,
  };
  const dataString: string | null = localStorage.getItem('data-local-storage');
  return dataString ? (JSON.parse(dataString) as Data) : dataDefault;
}

// Test function, will be removed when completed
interface randomDogData {
  message: string;
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
async function fillEntryData(): Promise<void> {
  // Declare API URL
  const randomDogAPI = 'https://dog.ceo/api/breeds/image/random';
  const randomTextAPI = 'https://baconipsum.com/api/?type=all-meat&paras=3';
  // Take elements from the forms
  const $title = document.querySelector('#title') as HTMLInputElement;
  const $photoURL = document.querySelector('#photoURL') as HTMLInputElement;
  const $notes = document.querySelector('#notes') as HTMLTextAreaElement;
  // Fetching data
  console.log('Fetching data...');
  try {
    const responseDogAPI = await fetch(randomDogAPI);
    const responseTextAPI = await fetch(randomTextAPI);
    if (!responseDogAPI || !responseTextAPI) {
      throw new Error('Fail to fetch data');
    }
    const dogData: randomDogData = await responseDogAPI.json();
    const textData: string[] = await responseTextAPI.json();
    $title.value = textData[0].slice(0, 10);
    $photoURL.value = dogData.message;
    $photoURL.dispatchEvent(new Event('input', { bubbles: true })); // dispatch input event to photoURL
    $notes.value = textData.join('');
  } catch (error) {
    console.error('Unable to fetch data', error);
  }
}
