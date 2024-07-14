const APIKey = "44834659-67420821c74452072565be409";

export const fetchImages = async (query) => {
    try {    
        const encodedQuery = encodeURIComponent(query);
        const response = await axios.get(`https://pixabay.com/api/?key=${APIKey}&q=${encodedQuery}&image_type=photo&orientation=horizontal&safesearch=true&per_page=15&page=1`);
        return response;
    }
    catch (error) {    
        return new Error(error.message);
    }     
};

export const loadMoreImages = async (query, pageCount) => {
    try {
        const encodedQuery = encodeURIComponent(query);
        const response = await axios.get(`https://pixabay.com/api/?key=${APIKey}&q=${encodedQuery}&image_type=photo&orientation=horizontal&safesearch=true&per_page=15&page=${pageCount}`);
        if (response.data.hits.length === 0) return new Error();
        return response;
    }
    catch (error) {
        return new Error();
    }
}