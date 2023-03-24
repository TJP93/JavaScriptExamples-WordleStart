import { Dictionary } from "./Dictionary.js";
import * as readline from 'readline';
import { stdin as input, stdout as output } from 'node:process';

class Wordle {

    constructor() {
        this.dictionary = new Dictionary();
        this.rl = readline.createInterface({ input, output });
        this.prompt = (query) => new Promise((resolve) => this.rl.question(query, resolve));
    }

    // async because we wait for user to type
    async runWordle() {

        let exiting = false;

        try {
            while (!exiting) {

                let answer = await this.prompt('(P)lay) or e(X)it? ');
                answer = answer.toUpperCase();
                if (answer === "X") {
                    console.log(`Exit requested.`);
                    exiting = true;
                } else if (answer === "P") {
                    await this.playGame();
                } else {
                    console.log(`I don't know how to "${answer}"`);
                }

            }
        } catch (e) {
            console.log(`Unexpected exception ${e}`);
        }

        console.log(`Thank you for visiting, goodbye.`);

        this.rl.close();

    }

    async playGame(){
     
        let target = this.dictionary.getRandomWord();
        let guess = await this.prompt('Please make your guess: ');
        guess = guess.toLowerCase();

        let indicators = [...guess].map(
            (guessChar, index) => {
              if ( index > this.target.length ) {
                  return ">"; // indicator we're off the end
              }
              let targetChar = this.target.charAt(index);
              if ( guessChar === targetChar) {
                  return targetChar;
              } 
              return  ( this.target.indexOf(guessChar) >= 0 ) ? guessChar.toLowerCase() : " "; 
            }
        );

        console.log(indicators);
        
       if (target === guess) {
        console.log(`Congratulations, you win! The target word was ${target} `);
       }
        console.log(`The target word was ${target} `); 
    }
}
    // need to stop the game from automatically ending after every guess. Also a counter for guess totals, 6 is the most allowed before losing?
    // need to compare the user's guess to the target word and feedback which letters and positions are correct. I assume this needs a lookahead?

let wordle = new Wordle();
wordle.runWordle();



