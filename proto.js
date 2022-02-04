Array.prototype.cancelCharacters = function (characters) {
    let words = this;
    var result = [];
    for (var i = 0; i < words.length; i++) {
        var word = words[i];
        var isCanceled = false;
        for (var j = 0; j < characters.length; j++) {
            var character = characters[j];
            if (word.includes(character)) {
                isCanceled = true;
                break;
            }
        }
        if (!isCanceled) {
            result.push(word);
        }
    }
    return result;
};

Array.prototype.withCharactersButNotInIndex = function (characters, index) {
    let words = this;
    var result = [];
    for (var i = 0; i < words.length; i++) {
        var word = words[i];
        var isPresent = false;
        for (var j = 0; j < characters.length; j++) {
            var character = characters[j];
            if (word.includes(character) && word[index] != character) {
                isPresent = true;
                break;
            }
        }
        if (isPresent) {
            result.push(word);
        }
    }
    return result;
};

Array.prototype.withCharacters = function (characters) {
    let words = this;
    var result = [];
    for (var i = 0; i < words.length; i++) {
        var word = words[i];
        var isPresent = false;
        for (var j = 0; j < characters.length; j++) {
            var character = characters[j];
            if (word.includes(character)) {
                isPresent = true;
                break;
            }
        }
        if (isPresent) {
            result.push(word);
        }
    }
    return result;
};


Array.prototype.withCharAndIndex = function (character, index) {
    let words = this;
    var result = [];
    for (var i = 0; i < words.length; i++) {
        var word = words[i];
        if (word[index] == character) {
            result.push(word);
        }
    }
    return result;
}