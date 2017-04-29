window.onload = function () {

  
  var words;

  var makeWords = function(){
    words = ["princess leia", "luke skywalker", 
    "lando calrissian", "han solo", "chewbacca", 
    "darth vader", "boba fett", "jabba the hutt", 
    "obi wan kenobi", "emperor palpatine", "yoda", 
    "corellia", "hoth", "tatooine", "endor", 
    "cloud city", "dagobah", "alderaan", "ewok", 
    "wookiee", "tauntaun", "wampa", "sarlacc", 
    "x wing", "tie fighter", "millennium falcon", 
    "death star", "rebel alliance", "empire", 
    "empire strikes back", "a new hope", 
    "return of the jedi"];
  }

  makeWords();

  console.log("# of words= " + words.length)

  // alphabet
  var alph = ['a', 'b', 'c', 'd', 'e', 'f', 
  	'g', 'h','i', 'j', 'k', 'l', 'm', 'n', 
  	'o', 'p', 'q', 'r', 's','t', 'u', 'v', 
  	'w', 'x', 'y', 'z'];

  console.log("# of letters= " + alph.length)

  //variables
  var word;
  var guess;
  var guesses;
  var remaining;
  var showRemaining = document.getElementById("remaining");
  var correct;
  var space;
  var wins = 0;
  var showWins = document.getElementById("wins");
  var losses = 0;
  var showLosses = document.getElementById("losses");
  var pointGuard = 0;
  var w = document.createElement("li");
  var l = document.createElement("li");
  var listLetter;
  var letters;
  



  // create alphabet keys
  var keys = function () {
    keyList = document.getElementById("keyDisplay")
    //creates ul for alphabet 
    letters = document.createElement("ul");
    // loop fills ul letters with alphabet
    for (var i = 0; i < alph.length; i++) {
      letters.id = "alph";
      //create key for current letter
      listLetter = document.createElement("li");
      listLetter.id = "letter";
      // defines listLetter with current letter
      listLetter.innerHTML = alph[i];
      //initiates function to respond to key clicks
      points();
      //adds ul letters to keyList
      keyList.appendChild(letters);
      //adds current letter to ul letters
      letters.appendChild(listLetter);
    }

  }
  //counters for hits and misses
  points = function () {
    // This happens when you click a key
    listLetter.onclick = function () {
      var prompt = document.getElementById("pickPrompt");
      prompt.innerHTML = "Pick Another Letter";
      guess = (this.innerHTML);
      //changes key appearance on click
      this.setAttribute("class", "used")
      //disables key
      this.onclick = null;
      //loop checks guess against letters in word
      for (var i = 0; i < word.length; i++) {
        //hit scenario
        if (word[i] === guess) {
          //creates array of correct guesses
          guesses[i].innerHTML = guess;
          //adds a point
          count++;
          endGame();
        }
      }
      //miss scenario
      var miss = (word.indexOf(guess));
      if (miss === -1) {
        remaining--;
        showRemaining.innerHTML = remaining;
        endGame();
      }   
    }
  }
  //fill in letters
  output = function (){
    tray = document.getElementById("tray");
    //
    correct = document.createElement("ul");
    //
    for (var i = 0; i <word.length; i++) {
      correct.setAttribute("id", "solution");
      guess = document.createElement("li");
      guess.setAttribute("class", "guess");
      //space may need to be a dash
      //identifies spaces
      if (/\s/.test(word[i])) {
        guess.innerHTML = " ";
        space++;
      }
      else {
        //make this a FA Rebel glyph
        guess.innerHTML = "_";
      }
      //
      guesses.push(guess);
      tray.appendChild(correct);
      correct.appendChild(guess);
    }
  }
  //endgame


  endGame = function () {
    //check for loss scenario
    if (remaining < 1) {
      showRemaining.innerHTML = "The Rebellion has been crushed";
      addLoss();
      reset();
    }
   
    if ((count + space) >= word.length){
      showRemaining.innerHTML = "You defeated the Empire!";
      wins++;
      w.innerHTML += "X <br>";
      showWins.appendChild(w);
      console.log("wins: " + wins);
      message.innerHTML = null;
      if (wins >= 5){
        hardReset();
        message.innerHTML = "Game Over. You Win! <br> <img class ='endImage' src='assets/images/trooper.jpg'/>";
        var audio = new Audio('assets/audio/swtheme.m4a');
        audio.play();
      }
      reset();
    }
    
  }
  var addLoss = function(){
    losses++;
    l.innerHTML += "X <br>";
    showLosses.appendChild(l)
    console.log("losses: " + losses);
    var message = document.getElementById("message");
    message.innerHTML = "The word was: \"" + word + "\"";
    console.log("loss");
    if (losses >= 5){
      hardReset();
      message.innerHTML = "Game Over. You Lose! <br> <img class ='endImage' src='assets/images/Carbonite.jpg'/>";
      var audio = new Audio('assets/audio/imperial_march.m4a');
      audio.play();
    }
  }

  // Play
  play = function () {
    var index = Math.floor(Math.random() * words.length)
    word = words[index];
    words.splice(index, 1);
    console.log("# of words= " + words.length);
    word = word.replace(/\s/g, " ");
    console.log("The word is: " + word);
    guesses = [ ];
    remaining = 12;
    showRemaining.innerHTML = remaining;
    count = 0;
    space = 0;
    keys();
    output();
    endGame();
  }
  play();
 
  // Reset

  var reset = function(){
    correct.parentNode.removeChild(correct);
    letters.parentNode.removeChild(letters);
    letters = null;
    play();
  }
  
  
  //activate reset button and prevent cheating by adding a loss
  document.getElementById("reset").onclick = function(){
    resetClick();
  }

  resetClick = function(){
    addLoss();
    reset();
  }

  var hardReset = function(){
    document.getElementById("reset").onclick = function(){
    location.reload();
    }
  }
}






