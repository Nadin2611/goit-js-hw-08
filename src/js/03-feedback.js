import throttle from 'lodash.throttle';

const form = document.querySelector('.feedback-form');
const emailInput = document.querySelector('.feedback-form input');
const textarea = document.querySelector('.feedback-form textarea');

let feedbackFormState = {
  email: '',
  message: '',
};

function onUpdateForm(event) {
  feedbackFormState = {
    email: emailInput.value,
    message: textarea.value,
  };
  localStorage.setItem(
    'feedback-form-state',
    JSON.stringify(feedbackFormState)
  );
}
const throttledUpdateForm = throttle(onUpdateForm, 500);

form.addEventListener('input', throttledUpdateForm);
form.addEventListener('submit', onFormSubmit);

const savedFormState = localStorage.getItem('feedback-form-state');

if (savedFormState) {
  const feedbackFormState = JSON.parse(savedFormState);
  emailInput.value = feedbackFormState.email;
  textarea.value = feedbackFormState.message;
}

function onFormSubmit(event) {
  event.preventDefault();

  if (
    feedbackFormState.email.trim() === '' ||
    feedbackFormState.message.trim() === ''
  ) {
    console.log('Заповніть, будь ласка, усі поля перед відправкою форми.');
    return;
  }
  console.log('Дані форми були відправлені:', feedbackFormState);

  localStorage.removeItem('feedback-form-state');

  event.currentTarget.reset();
  feedbackFormState = {
    email: '',
    message: '',
  };
}
