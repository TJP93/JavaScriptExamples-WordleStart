
import { readFileSync } from 'fs';

export class Dictionary {

    constructor(filePath = "Wonder.txt") {
        
        const data = readFileSync(filePath, 'utf-8');
        const wordRegexp = /\b\w+\b/g;

        // matchAll returns an array of Matches 
        // each Match is an array, the first item is the matched string
        // use a map to extract that first item and convert to lowercase
        const allWords = [...data.matchAll(wordRegexp)].map(   
            (entry) => entry[0].toLowerCase() // entry is an array, first element the matched word
        ).sort(Intl.Collator().compare);

        this.dictionary = allWords;
        //this.dictionary = [...new Set(allWords)];
    
        console.log(`Dictionary: ${this.dictionary}`);

    }

    getRandomWord() {
        return this.dictionary[Math.floor(Math.random()*this.dictionary.length)];
    }    
}

