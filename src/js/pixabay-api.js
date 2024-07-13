const APIKey = "44834659-67420821c74452072565be409";

export const fetchImages = (query) => {
    const encodedQuery = encodeURIComponent(query);
    const url = `https://pixabay.com/api/?key=${APIKey}&q=${encodedQuery}&image_type=photo&orientation=horizontal&safesearch=true&per_page=40`;
    const options = {
        method: "GET"
    };
    return fetch(url, options)
        .then(response => {
            if (!response.ok) {
                throw new Error(response.status);
            }
            return response.json();
        });
};
