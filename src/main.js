import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";
import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";

import { fetchImages } from './js/pixabay-api.js';
import { renderGallery } from './js/render-function.js';

const form = document.querySelector(".form");
const gallery = document.querySelector(".gallery");
const loader = document.querySelector(".loader");
const smplGallery = new SimpleLightbox('.gallery-item a', { captions: true, captionsData: 'alt', captionDelay: 250 });

const clearSearchValue = (evt) => {
  evt.target.elements.search.value = "";
};

form.addEventListener("submit", (evt) => {
    evt.preventDefault();
    loader.style.display = "block";
    const query = evt.target.elements.search.value.trim();
    if (query.length <= 0) {
        loader.style.display = "none";
        gallery.innerHTML = "";
        clearSearchValue(evt);
        return iziToast.error({ title: "Error", message: "Search value is empty", position: "topRight" });
    }

    fetchImages(query)
        .then(data => {
            loader.style.display = "none";
            if (data.hits.length === 0) {
                evt.target.elements.search.value = "";
                throw new Error("No images found");
            }
            renderGallery(data.hits, gallery);
            clearSearchValue(evt);
            smplGallery.refresh();

        })
        .catch(error => {
            loader.style.display = "none";
            console.error(error);
            iziToast.error({ 
                title: "Error", 
                message: `Sorry, there are no images matching your search query. Please try again! Error: ${error.message}`, 
                position: "topRight" 
            });
            clearSearchValue(evt);
            gallery.innerHTML = "";
        });
});
