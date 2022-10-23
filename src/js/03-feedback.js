import throttle from 'lodash.throttle';
const formData = {};

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

function populateArea() {
  const savedText = localStorage.getItem(FEEDBACK_KEY);
  const parseText = JSON.parse(savedText);
  if (savedText) {
    if (parseText.email) {
      refs.emailArea.value = parseText.email;
    }
    if (parseText.message) {
      refs.messageArea.value = parseText.message;
    }
  }
}

// function populateArea() {
//   const savedText = localStorage.getItem(FEEDBACK_KEY);
//   let parseText = JSON.parse(savedText);
//   console.log(parseText);
//   if (savedText) {
//     refs.emailArea.value = parseText.email;
//     if (!parseText.email) {
//       refs.emailArea.value = '';
//       parseText.email = '';

//       let jsonText = JSON.stringify(parseText);
//       console.log(jsonText);
//       localStorage.setItem(FEEDBACK_KEY, jsonText);
//     }
//     refs.messageArea.value = parseText.message;
//     if (!parseText.message) {
//       refs.messageArea.value = '';
//       parseText.message = '';
//       let jsonText = JSON.stringify(parseText);
//       console.log(jsonText);
//       localStorage.setItem(FEEDBACK_KEY, jsonText);
//     }
//   }
// }
