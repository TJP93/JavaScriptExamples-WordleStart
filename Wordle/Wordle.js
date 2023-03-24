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
        
        console.log(`Apologies, guessing is not yet implemented `);
        console.log(`The target word was ${target} `); 
    }
}




let wordle = new Wordle();
wordle.runWordle();
