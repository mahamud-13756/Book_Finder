document.getElementById('error-message').style.display = 'none';

const spinner = document.getElementById('spinner');        // spinner


const searchBook = () => {
    const searchField = document.getElementById('search-field');
    const searchText = searchField.value;
    // -----------------clear data----------------
    searchField.value = '';

    document.getElementById('error-message').style.display = 'none';

    if (searchText === '') {
        alert('Enter word to search')
    }
    else {
        //-------------- loading data------------------

        spinner.classList.remove('d-none');

        const url = `https://openlibrary.org/search.json?q=${searchText}`;
        fetch(url)
            .then(res => res.json())
            .then(data => displaySearchResult(data.docs, data.numFound))
            .catch(error => displayError(error));
    }
}