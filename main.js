// import all the required modules
const prompt = require('prompt-sync')({sigint: true});
const clear = require('clear-screen');

// instantiate variable
const hat = '^';
const hole = 'O';
const fieldCharacter = '░';
const pathCharacter = '*';
const row = 10;
const col = 10;


class Field { 

    field = [];

    constructor() {//create empty field!
        //current location of the character *
        //default position (0,0)
        this.locationX = 0;
        this.locationY = 0;

        for (let a = 0; a < row; a++) {
            this.field[a] = [];
        }

        this.generateField(); //put in patches of grass in the plot
    }

    generateField(height, width, percentage = 0.2) {
        for (let y = 0; y < row; y++) {
            for (let x = 0; x < col; x++) {
                const prob = Math.random(); 

                // random holes
                if (prob < percentage) {
                    this.field[y][x] = hole;
                } else {
                this.field[y][x] = fieldCharacter;
                }
            }
        }

        //set the "hat" random location
        let hatX;
        let hatY;

        do {
            hatX = Math.floor(Math.random() * row);
            hatY = Math.floor(Math.random() * col);
            this.field[hatX][hatY] = hat;
        } while (hatX == 0 && hatY == 0)  //make sure hat not at [0][0]
       
        //set character position as [0][0]
        this.field[0][0] = pathCharacter;
    } 

    runGame() {
        //Implement your codes
        let playGame = true;
        while (playGame) {

            this.print();
            this.askQuestion();

            if (!this.isOutOfBounds()) {
                console.log('Out of bounds - Game End!');
                playGame = false;
                break;
            } 
            else if (this.isHole()) {
                console.log('Sorry, you fell down a hole!');
                playGame = false;
                break
            } 
            else if (this.isHat()) {
                console.log('Congrats, you found your hat!');
                playGame = false;
                break;
            }
          //update char current location
            this.field[this.locationY][this.locationX] = pathCharacter;
        }
    }

    isOutOfBounds = () => this.locationY >= 0 || this.locationY <-10 || this.locationX <= 0 || this.locationX > 10;

    isHole = () => this.field[this.locationY][this.locationX] === hole;

    isHat = () => this.field[this.locationY][this.locationX] === hat;


    print() {
        clear();
        const displayString = this.field.map(row => {
            return row.join('');
        }).join('\n');
        console.log(displayString);
    }

    askQuestion() {
        const answer = prompt('Which Way? ').toUpperCase();
        //Implement your codes
        switch(answer) {
            case 'U':
                this.locationY--;
                break;
            case 'D':
                this.locationY++;
                break;
            case 'L':
                this.locationX--;
                break;
            case 'R':
                this.locationX++;
                break;
            default:
                console.log("Enter (u, d, l or r) ");
                this.askQuestion();
                break;
        }
    }//End of askQuestion
} //End of class

//Create an instance object for the Field
const myField = new Field();
myField.runGame(); //change to runGame at task 5