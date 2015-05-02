/**
 * Checks if given given word has a length between 5-19 characters
 * 
 * @param  {string} word 
 * @return {bool}   Returns true if the word is valid/unfiltered
 */
function validWord(word) {
    if (word.length < 4 || word.length > 20) { 
        return false;
    }

    return true;
}

module.exports = {
    'validWord' : validWord,
}