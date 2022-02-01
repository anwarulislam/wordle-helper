Vue.component("modal", {
    template: "#modal-template"
});

var app = new Vue({
    el: '#app',
    data: {
        showStep: null,
        words: allWords || [],
        boardState: [
            '',
            '',
            '',
            '',
            '',
            '',
        ],
        evaluations: [
            ['absent', 'absent', 'absent', 'absent', 'absent'],
            ['absent', 'absent', 'absent', 'absent', 'absent'],
            ['absent', 'absent', 'absent', 'absent', 'absent'],
            ['absent', 'absent', 'absent', 'absent', 'absent'],
            ['absent', 'absent', 'absent', 'absent', 'absent'],
            ['absent', 'absent', 'absent', 'absent', 'absent'],
        ],
        remainingWords: {},
        currentIndex: 0,
        correctWord: 'those'
    },
    methods: {
        setEvaluation: function (wordIndex, letterIndex) {
            if (this.currentIndex !== wordIndex) return;
            Vue.set(this.evaluations[wordIndex], letterIndex, this.nextEvValue(this.evaluations[wordIndex][letterIndex]));
        },
        nextEvValue: function (current) {
            if (current == 'absent') {
                return 'present';
            } else if (current == 'present') {
                return 'correct';
            } else {
                return 'absent';
            }
        },
        writeWord: function (e) {
            let word = this.boardState[this.currentIndex]

            if (e.key.length == 1) {
                if (word.length < 5) {
                    word += e.key
                    Vue.set(this.boardState, this.currentIndex, word);
                }
            }

            // backspace
            if (e.key == 'Backspace') {
                if (word.length > 0) {
                    word = word.substring(0, word.length - 1);
                    Vue.set(this.boardState, this.currentIndex, word);
                }
            }
        },
        splitWord: function (word) {
            let arr = word.split('');
            let remainingLength = 5 - arr.length;
            for (let i = 0; i < remainingLength; i++) {
                arr.push('');
            }
            return arr;
        },
        filterWords: function () {
            let word = this.boardState[this.currentIndex];
            let evaluation = this.evaluations[this.currentIndex];
            if (word.length < 5) return;

            let remainingWords = this.words

            // for on word

            for (let i = 0; i < word.length; i++) {
                let char = word[i];
                let ev = evaluation[i];
                if (ev == 'absent') {
                    remainingWords = remainingWords.cancelCharacters(char);
                }
                if (ev == 'present') {
                    remainingWords = remainingWords.withCharacters(char);
                }
                if (ev == 'correct') {
                    remainingWords = remainingWords.withCharAndIndex(char, i);
                }
            }

            this.words = remainingWords;
            this.remainingWords[this.currentIndex] = remainingWords;
            this.currentIndex++;
        },
        showRemainingWords: function (i) {
            console.log(this.remainingWords[i]);
            this.showStep = `${i}`;
        }
    },
    created: function () {
        window.addEventListener('keyup', this.writeWord)
    },
})

function wordsOnlyWithTheseCharacters(words, characters) {
    var result = [];
    for (var i = 0; i < words.length; i++) {
        var word = words[i];
        var isIncluded = false;
        for (var j = 0; j < characters.length; j++) {
            var character = characters[j];
            if (word.indexOf(character) >= 0) {
                isIncluded = true;
                break;
            }
        }
        if (isIncluded) {
            result.push(word);
        }
    }

    return result;
}


function wordsIncludesThisCharactersInASingleWord(words, characters) {
    var result = [];
    for (var i = 0; i < words.length; i++) {
        var word = words[i];
        if (characterExistenceInWord(word, characters)) {
            result.push(word);
        }
    }
    return result;
}

function characterExistenceInWord(word, characters) {
    let isIncluded = 0;
    for (var j = 0; j < characters.length; j++) {
        var character = characters[j];
        if (word.indexOf(character) >= 0) {
            isIncluded++;
        }
    }
    return isIncluded == characters.length;
}