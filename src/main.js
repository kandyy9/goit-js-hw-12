import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";
import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";

import { fetchImages, loadMoreImages } from './js/pixabay-api.js';
import { renderGallery } from './js/render-function.js';

const form = document.querySelector(".form");
const gallery = document.querySelector(".gallery");
const loader = document.querySelector(".loader");
const loadMoreBtn = document.querySelector(".load-more-btn");
const smplGallery = new SimpleLightbox('.gallery-item a', { captions: true, captionsData: 'alt', captionDelay: 250 });
let query = "";
let pageCount = 1;
const imagesPerPage = 15;  

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

form.addEventListener("submit", async (evt) => {
    evt.preventDefault();
    showLoader('aboveGallery');
    loadMoreBtn.style.display = "block";
    query = evt.target.elements.search.value.trim();
    pageCount = 1;  
    if (query.length <= 0) {
        loader.style.display = "none";
        clearGallery(gallery);
        clearSearchValue(evt);
        loadMoreBtn.style.display = "none";
        return iziToast.error({ title: "Error", message: "Search value is empty", position: "topRight" });
    }

    try {
        const response = await fetchImages(query)
                loader.style.display = "none";
                if (response.data.totalHits === 0) {
                    evt.target.elements.search.value = "";
                    throw new Error("No images found");
                }
                clearGallery(gallery);
                await renderGallery(response.data.hits, gallery);
                clearSearchValue(evt);
                smplGallery.refresh();

                if (response.data.hits.length < imagesPerPage) {
                    loadMoreBtn.style.display = "none";
                    iziToast.info({
                        title: "Info",
                        message: "We're sorry, but you've reached the end of search results.",
                        position: "topRight"
                    });
                }
                return query;
            }
        catch(error){
            loadMoreBtn.style.display = "none";
            loader.style.display = "none";
            iziToast.error({ 
                title: "Error", 
                message: `Sorry, there are no images matching your search query. Please try again! Error: ${error.message}`, 
                position: "topRight" 
            });
            clearSearchValue(evt);
            clearGallery(gallery);
        };
});

loadMoreBtn.addEventListener("click", async () => {
    pageCount += 1;    
    showLoader('aboveLoadMore');

    try {
        const response = await loadMoreImages(query, pageCount);
        loader.style.display = "none";
        let responseHits = response.data.hits.length;

        if (responseHits > 0) {
            await renderGallery(response.data.hits, gallery);
            const xScrollValue = document.querySelector(".gallery-item").getBoundingClientRect().height * 2;
            window.scrollBy({
                top: xScrollValue,
                behavior: 'smooth',
            });
            smplGallery.refresh();
        }

        if (responseHits < imagesPerPage) {
            loadMoreBtn.style.display = "none";
            iziToast.info({ 
                title: "Info", 
                message: "We're sorry, but you've reached the end of search results.", 
                position: "topRight" 
            });
        }

    } catch (error) {
        loadMoreBtn.style.display = "none";
        loader.style.display = "none";
        iziToast.info({ 
            title: "Info", 
            message: "We're sorry, but you've reached the end of search results.", 
            position: "topRight" 
        });
    }
});

