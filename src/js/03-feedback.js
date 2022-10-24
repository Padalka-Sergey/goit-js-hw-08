import throttle from 'lodash.throttle';
let formData = {};

const FEEDBACK_KEY = 'feedback-form-state';

const refs = {
  form: document.querySelector('.feedback-form'),
  emailArea: document.querySelector('input'),
  messageArea: document.querySelector('textarea'),
};

refs.form.addEventListener('submit', onFormSubmit);
refs.form.addEventListener('input', throttle(onFormInput, 500));

populateArea();

function onFormSubmit(evt) {
  evt.preventDefault();
  console.log(formData);
  evt.currentTarget.reset();
  localStorage.removeItem(FEEDBACK_KEY);
}

function onFormInput(evt) {
  formData[evt.target.name] = evt.target.value;

  localStorage.setItem(FEEDBACK_KEY, JSON.stringify(formData));
}

// function populateArea() {
//   const savedText = localStorage.getItem(FEEDBACK_KEY);
//   const parseText = JSON.parse(savedText);
//   // console.log(evt.target.value);
//   if (savedText) {
//     if (parseText.email) {
//       refs.emailArea.value = parseText.email;
//     }
//     if (parseText.message) {
//       refs.messageArea.value = parseText.message;
//     }
//   }
// }

function populateArea() {
  const savedText = localStorage.getItem(FEEDBACK_KEY);
  let parseText = JSON.parse(savedText);
  // console.log(parseText);
  if (savedText) {
    formData = parseText;
    refs.emailArea.value = formData.email;
    if (!parseText.email) {
      refs.emailArea.value = '';
    }
    refs.messageArea.value = formData.message;
    if (!parseText.message) {
      refs.messageArea.value = '';
    }
  }
}
