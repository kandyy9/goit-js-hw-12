export const renderGallery = (images, galleryElement) => {
    galleryElement.innerHTML = "";

    const galleryItems = images.map(image =>
        `<li class="gallery-item">
            <a class="gallery-link" href="${image.largeImageURL}">
                <img class="gallery-image" src="${image.webformatURL}" alt="${image.tags}"/>
            </a>
            <ul class="info-summary">
                <li class="info-item"><h3 class="info-title">Likes</h3><p class="info-statistics">${image.likes}</p></li>
                <li class="info-item"><h3 class="info-title">Views</h3><p class="info-statistics">${image.views}</p></li>
                <li class="info-item"><h3 class="info-title">Comments</h3><p class="info-statistics">${image.comments}</p></li>
                <li class="info-item"><h3 class="info-title">Downloads</h3><p class="info-statistics">${image.downloads}</p></li>
            </ul>
        </li>`
    ).join('');
    galleryElement.insertAdjacentHTML("beforeend", galleryItems);
};
