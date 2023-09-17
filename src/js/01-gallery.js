// Add imports above this line
import { galleryItems } from './gallery-items';
// Change code below this line

console.log(galleryItems);

const gallery = document.querySelector('ul.gallery');
const markup = galleryItems
  .map(
    ({ description, original, preview }) => `
  <li class="gallery__item">
    <a class="gallery__link" href="${original}">
      <img
        class="gallery__image"
        src="${preview}"
        data-source="${original}"
        alt="${description}"
      />
    </a>
  </li>
`
  )
  .join('');

gallery.insertAdjacentHTML('beforeend', markup);

let instance = null;

gallery.addEventListener('click', event => {
  if (event.target.nodeName !== 'IMG') {
    return;
  }
  event.preventDefault();

  const largeImageUrl = event.target.getAttribute('data-source');

  instance = basicLightbox.create(
    `<img src="${largeImageUrl}" width="800" height="600">`
  );

  instance.show();

  window.addEventListener('keydown', handleKeyPress);
});

function handleKeyPress(event) {
  if (event.key === 'Escape') {
    if (instance) {
      instance.close();
      window.removeEventListener('keydown', handleKeyPress);
    }
  }
}
