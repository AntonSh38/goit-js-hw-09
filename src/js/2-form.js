const formEl = document.querySelector('.feedback-form');
const localStorageKey = 'feedback-form-state';
let formData = { email: '', message: '' };

const savedData = localStorage.getItem(localStorageKey);

if (savedData) {
  const parsedData = JSON.parse(savedData);
  formData = parsedData;

  formEl.elements.email.value = parsedData.email;
  formEl.elements.message.value = parsedData.message;
}

formEl.addEventListener('submit', onFormSubmit);
formEl.addEventListener('input', onFormInput);

function onFormSubmit(event) {
  event.preventDefault();

  formData.email = formEl.elements.email.value.trim();
  formData.message = formEl.elements.message.value.trim();

  if (formData.email === '' || formData.message === '') {
    alert(`Fill please all fields`);
    return;
  }

  console.log(formData);

  localStorage.removeItem(localStorageKey);
  formEl.reset();
  formData.email = '';
  formData.message = '';
}

function onFormInput(event) {
  const formMeta = new FormData(formEl);

  for (const [key, value] of formMeta) {
    formData[key] = value.trim();
  }
  localStorage.setItem(localStorageKey, JSON.stringify(formData));
}
