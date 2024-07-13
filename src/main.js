import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";
import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";

import { fetchImages } from './js/pixabay-api.js';
import { loadMoreImages } from './js/pixabay-api.js';
import { renderGallery } from './js/render-function.js';

const form = document.querySelector(".form");
const gallery = document.querySelector(".gallery");
const loader = document.querySelector(".loader");
const loadMoreBtn = document.querySelector(".load-more-btn");
const smplGallery = new SimpleLightbox('.gallery-item a', { captions: true, captionsData: 'alt', captionDelay: 250 });
let query = "";
let pageCount = 1;

const clearSearchValue = (evt) => {
  evt.target.elements.search.value = "";
};

const clearGallery = (gallery) => {
    gallery.innerHTML = "";
}

const showLoader = (position) => {
    if (position === 'aboveGallery') {
        gallery.parentNode.insertBefore(loader, gallery);
    } else if (position === 'aboveLoadMore') {
        loadMoreBtn.parentNode.insertBefore(loader, loadMoreBtn);
    }
    loader.style.display = "block";
};

form.addEventListener("submit", (evt) => {
    evt.preventDefault();
    showLoader('aboveGallery');
    loadMoreBtn.style.display = "block";
    query = evt.target.elements.search.value.trim();
    if (query.length <= 0) {
        loader.style.display = "none";
        gallery.innerHTML = "";
        clearSearchValue(evt);
        loadMoreBtn.style.display = "none";
        return iziToast.error({ title: "Error", message: "Search value is empty", position: "topRight" });
    }

    fetchImages(query)
        .then(response => {
            loader.style.display = "none";
            if (response.data.totalHits === 0) {
                evt.target.elements.search.value = "";
                throw new Error("No images found");
            }
            clearGallery(gallery);
            renderGallery(response.data.hits, gallery);
            clearSearchValue(evt);
            smplGallery.refresh();
            return query;
        })
        .catch(error => {
            loadMoreBtn.style.display = "none";
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

loadMoreBtn.addEventListener("click", () => {
    pageCount+=1;    
    showLoader('aboveLoadMore');
    loadMoreImages(query, pageCount)
        .then((response) => {
            loader.style.display = "none";
            if (response.data.hits.length === 0) throw new Error();
                renderGallery(response.data.hits, gallery);
                smplGallery.refresh();
        })
        .catch(error => {
            console.log(error);
            loadMoreBtn.style.display = "none";
            loader.style.display = "none";
            iziToast.error({ 
                title: "Error", 
                message: "We're sorry, but you've reached the end of search results.", 
                position: "topRight" 
            });
        });
})


