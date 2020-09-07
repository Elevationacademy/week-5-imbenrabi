const printResults = function (word, synonyms, sentiment) {
    console.log(`
        The word ${word} has a 
        ${sentiment === 1 ? "Positive" : sentiment === -1 ? "Negative" : "Neutral"} sentiment,
        its synonyms are: ${synonyms}`
    )
}

$.get('/randomWord')
    .then(function (word) {
        let synonymsPromise = $.get(`/synonyms/${word}`)
        let sentimentPromise = $.get(`/sentiment/${word}`)
        Promise.all([synonymsPromise, sentimentPromise])
            .then(function (results) {
                printResults(word, results[0], results[1])
            })
    })
