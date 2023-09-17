const form = document.querySelector('.feedback-form');
const emailInput = document.querySelector('.feedback-form input');
const textarea = document.querySelector('.feedback-form textarea');
let isSubmitted = false;

const onUpdateForm = _.throttle(() => {
  const feedbackFormState = {
    email: emailInput.value,
    message: textarea.value,
  };
  localStorage.setItem(
    'feedback-form-state',
    JSON.stringify(feedbackFormState)
  );
}, 500);

form.addEventListener('input', onUpdateForm);
form.addEventListener('submit', onFormSubmit);

const savedFormState = localStorage.getItem('feedback-form-state');

if (savedFormState) {
  const feedbackFormState = JSON.parse(savedFormState);
  emailInput.value = feedbackFormState.email;
  textarea.value = feedbackFormState.message;
}

function onFormSubmit(event) {
  event.preventDefault();

  if (!isSubmitted) {
    console.log(savedFormState);
    isSubmitted = true;
  }

  if (savedFormState === null || savedFormState === '{}') {
    localStorage.removeItem('feedback-form-state');
  }

  event.currentTarget.reset();

  form.removeEventListener('input', onUpdateForm);
  form.removeEventListener('submit', onFormSubmit);
}
