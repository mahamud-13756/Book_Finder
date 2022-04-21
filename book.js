document.getElementById('error-message').style.display = 'none';

const spinner = document.getElementById('spinner');        // spinner

console.log('mahamud');
const searchBook = () => {
    console.log('mahamud');
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


// ----------display Error------------
const displayError = error => {
    document.getElementById('error-message').style.display = 'block';
}



// --------------display search books function-----------
const displaySearchResult = (books, num) => {

    console.log('mahamud2');

    spinner.classList.add('d-none');

    const searchResult = document.getElementById('search-result');
    searchResult.textContent = '';

    // ---------set number of hits--------------
    const numOfHits = document.getElementById('num-of-hits');

    if (num !== 0) {
        numOfHits.innerHTML = `
      <h6>Total  ${num} results found , showing ${books.length} of them</h6>
    `;
    }
    else {
        numOfHits.innerHTML = `
      <h4>No data found..........!</h4>
    `;
    }

    // console.log(num);
    // console.log(books);

    books.forEach(book => {

        const div = document.createElement('div');
        div.classList.add('col');

        if (book.cover_i !== undefined) {
            div.innerHTML = `
        <div  class="card h-100 mb-5 bg-transparent rounded-3 shadow-lg">
            <img src="https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg" class="card-img-top  img-fluid" alt="no image found">

            <div class="card-body">
                <h4 class="card-title"> Book Name: ${book.title ? book.title : "No Book Name Found"}</h4>
                <p class="card-title"> Author Name: ${book.author_name ? book.author_name : "No Author found....!"}</p>
                <p class="card-text"> Publisher: ${book.publisher ? book.publisher : "No publisher found......!"}</p>
                <p class="card-text">First publish year: ${book.first_publish_year ? book.first_publish_year : "published year not found......!"}</p>
            </div>
        </div>
           `;
        }

        else {
            div.innerHTML = `
        <div  class="card h-100 mb-5 bg-transparent rounded shadow-lg">
            <img src="imgNotFound.png" class="card-img-top  img-fluid" alt="no image found">

            <div class="card-body">
                <h4 class="card-title"> Book Name: ${book.title ? book.title : "No Book Name Found"}</h4>
                <p class="card-title"> Author Name: ${book.author_name ? book.author_name : "No Author found....!"}</p>
                <p class="card-text"> Publisher: ${book.publisher ? book.publisher : "No publisher found......!"}</p>
                <p class="card-text">First publish year: ${book.first_publish_year ? book.first_publish_year : "published year not found......!"}</p>
            </div>
        </div>
           `;
        }


        searchResult.appendChild(div);
    }); 6
}