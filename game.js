class TwentyFortyEight {
    constructor() {
      //I want to include everything you need within the constructor such that the board logic should not deviate
      this.board = [];
      this.cell = [0];
    }
  
    randomNum = () => {
      return Math.floor(Math.random() * 15);
    };
  
    //Create the 4X4 board with pre-filled 2s
    createBoard = (numberOfCells) => {
      //console.log('the board')
      for (let i = 0; i < numberOfCells; i++) {
        this.board.push(this.cell);
      }
  
      this.generateValue();
      this.generateValue();
  
      //This is for testing purposes to ensure that cells merge correctly
      //For left/right merging
    //   this.board[7] = [2]
    //   this.board[8] = [2]
    //   this.board[9] = [16];
    //   this.board[10] = [16];
    //   this.board[11] = [2]
      //For up/down merging
      this.board[0] = [2];
      this.board[4] = [32];
      this.board[8] = [32];

      return this.board;
    };
  
    //With each swipe, we need to generate a 2 or 4
  
    generateValue = () => {
      let randonNumber = this.randomNum();
  
      if (this.board[randonNumber].indexOf(0) === 0) {
        this.board[randonNumber] = [2];
      } else if (this.board[randonNumber].indexOf(0) < 0) {
        this.generateValue();
      }
      return this.board;
    };
  
    //We need 4 swipe functions
    //When a player swipes up, down, left, or right, all of the cells shift in that direction
    //If adjacent cells are equal on a swipe, the resultant value of the new cell is both cells added (or just either cell * 2)
  
    swipeRight = () => {
      console.log("swipeRight");
  
      for (let i = 0; i < this.board.length; i++) {
        
        if (i % 4 === 0) {
          
          let row = [
            [parseInt(this.board[i])],
            [parseInt(this.board[i + 1])],
            [parseInt(this.board[i + 2])],
            [parseInt(this.board[i + 3])],
          ];
  
          
  
          let cellsWithValues = row.filter((num) => num.indexOf(0) < 0);
          //console.log('cellsWithValues --> ', cellsWithValues)
          let numOfCellsWithZeroes = 4 - cellsWithValues.length;
          let cellsWithZeroes = Array(numOfCellsWithZeroes).fill([0]);
          //console.log('cellsWithZeroes --> ', cellsWithZeroes)
          let swipedRow = cellsWithZeroes.concat(cellsWithValues);
          //console.log('swipedRow --> ', swipedRow)
  
          this.board[i] = swipedRow[0];
          this.board[i + 1] = swipedRow[1];
          this.board[i + 2] = swipedRow[2];
          this.board[i + 3] = swipedRow[3];
          //console.log(this.board)
          
        }
      }
      this.mergeSameRight();
      this.generateValue()
      return this.board;
    };
  
    swipeLeft = () => {
      console.log("swipeLeft");
  
      for (let i = 0; i < this.board.length; i++) {
        if (i === 3 || i === 7 || i === 11 || i === 15) {
          
          
  
          let row = [
            [parseInt(this.board[i])],
            [parseInt(this.board[i - 1])],
            [parseInt(this.board[i - 2])],
            [parseInt(this.board[i - 3])],
          ];
          
          
  
          let cellsWithValues = row.filter((num) => num.indexOf(0) < 0);
          let numOfCellsWithZeroes = 4 - cellsWithValues.length;
          let cellsWithZeroes = Array(numOfCellsWithZeroes).fill([0]);
          let swipedRow = cellsWithZeroes.concat(cellsWithValues);
  
          
  
          this.board[i] = swipedRow[0];
          this.board[i - 1] = swipedRow[1];
          this.board[i - 2] = swipedRow[2];
          this.board[i - 3] = swipedRow[3];
        }
      }
      this.mergeSameLeft();
      this.generateValue()
      return this.board;
    };
  
    swipeUp = () => {
      console.log("swipeUp");
      for (let i = 0; i < this.board.length; i++) {
        if (i === 12 || i === 13 || i === 14 || i === 15) {
          this.mergeSameUp();
          //console.log("board now --> ", this.board);
  
          let column = [
            [parseInt(this.board[i])],
            [parseInt(this.board[i - 4])],
            [parseInt(this.board[i - 8])],
            [parseInt(this.board[i - 12])],
          ];
          let cellsWithValues = column.filter((num) => num.indexOf(0) < 0);
          let numOfCellsWithZeroes = 4 - cellsWithValues.length;
          let cellsWithZeroes = Array(numOfCellsWithZeroes).fill([0]);
          let swipedRow = cellsWithZeroes.concat(cellsWithValues);
  
          this.board[i] = swipedRow[0];
          this.board[i - 4] = swipedRow[1];
          this.board[i - 8] = swipedRow[2];
          this.board[i - 12] = swipedRow[3];
          //console.log("board again --> ", this.board);
        }
      }
      //this.mergeSameUp()
      this.generateValue()
      return this.board;
    };
  
    swipeDown = () => {
      console.log("swipeDown");
      for (let i = 0; i < this.board.length; i++) {
        if (i === 0 || i === 1 || i === 2 || i === 3) {
          this.mergeSameDown();
  
          let column = [
            [parseInt(this.board[i])],
            [parseInt(this.board[i + 4])],
            [parseInt(this.board[i + 8])],
            [parseInt(this.board[i + 12])],
          ];
  
          //let numOfCellsWithValues = column.filter((num) => num.indexOf(0) < 0).length
          let cellsWithValues = column.filter((num) => num.indexOf(0) < 0);
          let numOfCellsWithZeroes = 4 - cellsWithValues.length;
          let cellsWithZeroes = Array(numOfCellsWithZeroes).fill([0]);
          let swipedRow = cellsWithZeroes.concat(cellsWithValues);
  
          this.board[i] = swipedRow[0];
          this.board[i + 4] = swipedRow[1];
          this.board[i + 8] = swipedRow[2];
          this.board[i + 12] = swipedRow[3];
        }
      }
      this.generateValue()
      return this.board;
    };
  
    mergeSameRight = () => {
      for (let i = 0; i < this.board.length - 1; i++) {
        let previousValue = parseInt(this.board[i]);
        let nextValue = parseInt(this.board[i + 1]);
        if (previousValue === nextValue) {
          this.board[i + 1] = [previousValue + nextValue];
          this.board[i] = [0];
        }
      }
    };
  
    mergeSameLeft = () => {
      for (let i = 0; i < this.board.length - 1; i++) {
        let previousValue = parseInt(this.board[i]);
        let nextValue = parseInt(this.board[i + 1]);
        if (previousValue === nextValue) {
          this.board[i] = [previousValue + nextValue];
          this.board[i + 1] = [0];
        }
      }
    };
  
    mergeSameUp = () => {
      for (let i = 0; i < this.board.length - 1; i++) {
        let previousValue = parseInt(this.board[i]);
        let nextValue = parseInt(this.board[i + 4]);
        if (previousValue === nextValue) {
          this.board[i] = [previousValue + nextValue];
          this.board[i + 4] = [0];
        }
      }
    };
  
    mergeSameDown = () => {
      for (let i = 0; i < this.board.length - 1; i++) {
        let previousValue = parseInt(this.board[i]);
        let nextValue = parseInt(this.board[i + 4]);
        if (previousValue === nextValue) {
          this.board[i + 4] = [previousValue + nextValue];
          this.board[i] = [0];
        }
      }
    };
  }
  
  const newGame = new TwentyFortyEight();
  console.log(newGame.createBoard(16));
  //console.log(newGame.generateValue())
  //console.log(newGame.swipeRight())
  //console.log(newGame.swipeLeft())
  console.log(newGame.swipeUp());
  //console.log(newGame.swipeDown())