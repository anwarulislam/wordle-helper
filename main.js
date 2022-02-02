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
        keyboard: [
            ['q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p'],
            ['a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l'],
            ['↵', 'z', 'x', 'c', 'v', 'b', 'n', 'm', '←'],
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

            // Enter
            if (e.key == 'Enter') {
                this.filterWords();
            }
        },
        pressKey: function (key) {
            let event = { key }
            if (key == '↵') {
                event.key = 'Enter';
            }
            if (key == '←') {
                event.key = 'Backspace';
            }
            this.writeWord(event);
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