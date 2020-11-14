document.addEventListener('DOMContentLoaded', function(){
  // We use querySelectorAll to form an array of cards

  const cards = document.querySelectorAll(".game-card"); 

  let numOfCards = cards.length;

  /* To start off, we know 2 cards are going to be picked for each play sequence, so we create a variable for those 
  two cards. We also know that we need a variable holding a boolean that informs us once a card has been clicked
  and lastly we need a variable counting how many cards have been flipped. We would also need to limit the value to two
  at a time later on */

  let cardA = null;

  let cardB = null;

  let cardsFlipped = 0;

  let currentScore = 0;

  let lowestScore = localStorage.getItem("lowest-score")

  if(lowestScore){

    document.getElementById("best-score").innerText = lowestScore;
  }

  for(let card of cards){

    card.addEventListener("click", handleCardClick);
  }

  let startBtn = document.getElementById("start-button");

  startBtn.addEventListener("click", startGame);

  function handleCardClick(event) {
    
    if(!event.target.classList.contains("front")) return;

    let clickedCard = event.target.parentElement;

    if(!cardA || !cardB){

      if(!clickedCard.classList.contains("cardFlipped")){

        setScore(currentScore + 1);
      }

      clickedCard.classList.add("cardFlipped");

      cardA = cardA || clickedCard;

      cardB = clickedCard === cardA ? null : clickedCard;

      // console.log(cardA, cardB);
    }
    if(cardA && cardB){

      // console.log(cardA, cardB);

      let classOfA = cardA.children[1].children[0].src;

      let classOfB = cardB.children[1].children[0].src;

      // console.log(classOfA, classOfB)

      if(classOfA === classOfB){

        cardsFlipped += 2;

        cardA.removeEventListener("click", handleCardClick);

        cardB.removeEventListener("click", handleCardClick);

        cardA = null;

        cardB = null;
      }
      else{

        setTimeout(function (){

          cardA.classList.remove("cardFlipped");
          cardB.classList.remove("cardFlipped");
          cardA = null;
          cardB = null;

        }, 1000)


      }

    }

    if(cardsFlipped === numOfCards) endGame();
  }


  function startGame(event){

    setScore(0);

    start.classList.add("playing");

    let indices = [];

    for(let i = 1; i <= numOfCards / 2; i++){

      indices.push(i.toString());
    }

    let pairs = shuffle(indices.concat(indices));

    for(let i = 0; i < cards.length; i++ ){

      let path = "jpg/" + pairs[i] + ".jpg";

      cards[i].children[1].children[0].src = path;
    }
  }

  // here is a helper function to shuffle an array
  // it returns the same array with values shuffled
  // it is based on an algorithm called Fisher Yates if you want ot research more
  function shuffle(array) {
      
      let arrayCopy = array.slice();

      for(let indx1 = arrayCopy.length - 1; indx1 > 0; indx1--){
      // Generate a random index between 0 to indx1 (inclusive)

      let indx2 = Math.floor(Math.random() * (indx1 + 1));

      // Switch elements indx1 and indx2
      let temp = arrayCopy[indx1];
      arrayCopy[indx1] = arrayCopy[indx2];
      arrayCopy[indx2] = temp;

      }

    return arrayCopy;
  }


  function setScore(newScore){

    currentScore = newScore;

    document.getElementById("current-score").innerText =currentScore;
  }

function endGame(){

  let end = document.getElementById("end");
  let scoreHeader = end.children[1];
  scoreHeader.innerText = "Your Score is " + currentScore;
  let lowestScore = +localStorage.getItem("lowest-score") || Infinity;

  if(currentScore < lowestScore){
    scoreHeader.innerText = "- NEW BEST SCORE!!";
    localStorage.setItem("lowest-score", currentScore);
  }
  document.getElementById("end").classList.add("game-over");
}
  

});