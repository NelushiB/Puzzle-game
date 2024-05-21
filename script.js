document.addEventListener('DOMContentLoaded', function () {

   let puzzlePieces = document.querySelector('.puzzle-pieces');
   let puzzleBoard = document.querySelector('.puzzle-board');

   // Initialize an empty array to store the puzzle pieces
   let pieces = [] 

   for (let i = 1; i <= 9; i++) {
      // Put 1 to 9 into the array
      pieces.push(i);

      // Add div puzzle to the board
      let puzzleDiv = document.createElement('div');
      puzzleDiv.dataset.id = i;
      let puzzleBlankPiece = document.createElement('img');
      puzzleBlankPiece.src = `./img/blankPiece.jpg`;
      
      //DRAG FUNCTIONALITY
      puzzleBlankPiece.addEventListener("dragstart", handleDragStart);
      puzzleBlankPiece.addEventListener("dragenter", handleDragEnter);
      puzzleBlankPiece.addEventListener("dragover", handleDragOver);
      puzzleBlankPiece.addEventListener('drop', handleDrop);
      puzzleBlankPiece.addEventListener("dragend", handleDragEnd);
      
      puzzleDiv.appendChild(puzzleBlankPiece);
      puzzleBoard.appendChild(puzzleDiv);

   }

   // Shuffle the elements of the array randomly
   shuffleArray(pieces);

   // Add the image puzzle
   pieces.forEach(piece => {
      let puzzlePiece = document.createElement('img');
      puzzlePiece.src = `./img/${piece}.jpg`;
      puzzlePiece.draggable = true;
      puzzlePiece.dataset.id = piece;
      
      //DRAG FUNCTIONALITY
      puzzlePiece.addEventListener("dragstart", handleDragStart);
      puzzlePiece.addEventListener("dragenter", handleDragEnter);
      puzzlePiece.addEventListener("dragover", handleDragOver);
      puzzlePiece.addEventListener("drop", handleDrop); 
      puzzlePiece.addEventListener("dragend", handleDragEnd);

      puzzlePieces.appendChild(puzzlePiece);
   });

   let draggingElement = null;
   let draggedElement = null;

   // FUNCTIONS
   function shuffleArray(array) {
      for (var i = array.length - 1; i > 0; i--) {
         let j = Math.floor(Math.random() * (i + 1));
         let temp = array[i];
         array[i] = array[j];
         array[j] = temp;
      }
   }

   function handleDragStart(e) {
      draggingElement = e.target;
   }

   function handleDragEnter(e) {
      e.preventDefault();
   }

   function handleDragOver(e) {
      e.preventDefault();
   }

   function handleDrop(e) {
      e.preventDefault();
      draggedElement = e.target;
   }

   function handleDragEnd() {
      let tempSrc = draggingElement.src;
      let tempId = draggingElement.dataset.id;

      draggingElement.src = draggedElement.src;
      draggingElement.dataset.id = draggedElement.dataset.id;

      draggedElement.src = tempSrc;
      draggedElement.dataset.id = tempId;
      
      checkPuzzle();
   }

   function checkPuzzle() {
      let correctPieces = 0;
      document.querySelectorAll('.puzzle-board div').forEach(div => {
         if (div.childNodes.length > 0) {
            let img = div.childNodes[0]; 
            if (parseInt(div.dataset.id) === parseInt(img.dataset.id)) {
               correctPieces++;
               console.log(correctPieces)
            }
         }
      });
      console.log(correctPieces)

      if (correctPieces === 9) {
         alert('Puzzle completed!');
         
         draggingElement = null;
         draggedElement = null;
      }
   }
});
