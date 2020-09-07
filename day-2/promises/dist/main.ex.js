const BOOKS_ENDPOINT = 'https://www.googleapis.com/books/v1/volumes?q=title';
const GIPHY_ENDPOINT = 'https://api.giphy.com/v1/gifs/search';
const GIPHY_API_KEY = 'qa9N9Ueg3t1QwIxjEePgkZcZtJTwymFC';

const displayResults = function (word, book, gif) {
    $('body').append(`<p>word: ${word}</p>`);
    $('body').append(`<p>book title: ${book}</p>`);
    $('body').append(`<p>gif url: ${gif}</p>`);
}

$.get('/randomWord')
    .then(function (word) {
        console.log(word);
        let bookPromise = $.get(`${BOOKS_ENDPOINT}:${word}`)
        let giphyPromise = $.get(`${GIPHY_ENDPOINT}?api_key=${GIPHY_API_KEY}&q=${word}`);

        Promise.all([bookPromise, giphyPromise]).then((results) => {
            displayResults(word, results[0].items[0].volumeInfo.title, results[1].data[0].url);

        }).catch((err) => {
            console.log(err);
        })


    }).catch((err) => {
        console.log(err);
    })
