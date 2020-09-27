// global variables
// ----------------


// variable that store the number of players for the excercise
var numberOfPlayers;
// we need a variable which increses each time we create a new input player
var inPlayerId = 1;
// we need a variable which increses each time we create a new player
var playerId = 1;
// current round
var currentRound = 1;
// total rounds
var totalRounds;
// id for passes input
var passesId = 1;
// id for passes for new couples
var getPassesId = 0;
// list of couples to be printed
var coupleStats = '';
// list of players to be printed
var playerStats = '';
// is the number of players even or odd
var plEvenOdd;
// alternate between rotate a-b
var rotateSelector = 2;






// global arrays
// -------------


// store playres and its names and passes
var players = [];
// store players in a specific position
var position = [];
// store the couples matched
var couples = [];
// all the <p> in the left column
var leftColumn = [];


// global classes
// --------------


// class that contains player name and player passes
class Player{
    constructor(name, passes){
        this.name = name;
        this.passes = passes;
    }
}
// class that contains the name of two players and the passes they made
class Couple{
    constructor(name1, name2, passes){
        this.player1 = name1;
        this.player2 = name2;
        this.passes = passes;
    }
}

// references to divs areas of the app


// screen 1 div
const setupDiv = document.querySelector('#setupDiv');


// first button of the app at setup area main screen 1
const btnNplayers = setupDiv.querySelector("#btnNplayers");




// screen 2 div
const playersDiv = document.querySelector('#playersDiv');


// inside second screen => div for iput names
const nameInputDiv = playersDiv.querySelector('#nameInputDiv');
// inside second screen => div for buttons
const btnDiv = playersDiv.querySelector('#btnDiv');
// add button
const addBtn = btnDiv.querySelector('#addBtn');
// delete button
const dltBtn = btnDiv.querySelector('#dltBtn');
// back button
// const backBtn = document.querySelector('.backBtn');
// reset button
const rstBtn = btnDiv.querySelector('#nameRstBtn');
// start button
const startBtn = btnDiv.querySelector('#startBtn');




// screen 3 div
const roundsDiv = document.querySelector('#roundsDiv');

// buttons div
const roundBtnDiv = roundsDiv.querySelector('#roundBtnDiv');

// back button
// const roundBackBtn = roundBtnDiv.querySelector('#roundBackBtn');

// reset button
const roundRstBtn = roundBtnDiv.querySelector('#roundRstBtn');

// next button
const nextRound = roundBtnDiv.querySelector('#nextRound');
nextRound.addEventListener("click", rotate);


const currentRoundDiv = roundsDiv.querySelector('#currentRoundDiv');

// h2 round text
const roundH2 = currentRoundDiv.querySelector('#roundH2');

// paragraph for transition
// const p1 = currentRoundDiv.querySelector('#player1');
// const p2 = currentRoundDiv.querySelector('#player2');



// screen 4 div
const statsDiv = document.querySelector('#statsDiv');
// div  for couples stats
const coupleStatsDiv = statsDiv.querySelector('#coupleStats');
// div for players stats
const playerStatsDiv = statsDiv.querySelector('#playerStats');

const statsRstBtn = statsDiv.querySelector('#statsRstBtn');




// functions
// ---------


// setters


// sort array couples[]
function sortCouples(){

    couples.sort(function(a, b) { return b.passes - a.passes;} );
    players.sort(function(a, b) { return b.passes - a.passes;} );
}


// set number of players ***SETUP()***
function getNumberOfPlayers(){

    // get number of players
    numberOfPlayers = document.querySelector("#inNplayers").value;    
}

// update number of players ***START()***
function updateNumberOfPlayers(){

    // this is the real number of players
    numberOfPlayers = inPlayerId - 1;
}

// set the total rounds which is the same number of total players ***START()***
function updateTotalRounds(){

    // get totalRounds
    totalRounds = numberOfPlayers;
}

function updateTotalRoundsOdd(){

    // get totalRounds
    totalRounds = numberOfPlayers - 1;
}

// set input player id ***SETUP()***
function setInPlayerId(){
     
    // players will be created with ids. then set this variable 
    // to be used in case of add more players
    inPlayerId = numberOfPlayers;
    ++ inPlayerId;
}

// check if there is at leats one player
function checkNoPlayer(){

    // at least one player needed
    if(numberOfPlayers <= 0){return true;} // add a message advicing about minimmum number of players

}

// reset all the arrays
function resetArray(){
    players.length = 0;
    position.length = 0;
    couples.length = 0;
}

 // reset variables
 function resetVariables(){

    // reset variables
   numberOfPlayers = 0;
   inPlayerId = 1;
   playerId = 1;
   currentRound = 1;
   passesId = 1;
   rotateSelector = 2;
   getPassesId = 0;
}



// screen transitions


// transition from screen 1 to screen 2 ***SETUP()***
function screen2(){

    // change z index and trigger transition when changing screens
    setupDiv.classList.toggle('screenShow');
    playersDiv.classList.toggle('screenShow');
}

// transition from screen 2 to screen 3 ***START()***
function screen3(){
    
    // remove class to screens which came in starting from last screen
    statsDiv.classList.remove('screenShow');    
    playersDiv.classList.remove('screenShow');
    
    // add class screenShow to the screen 3
    roundsDiv.classList.toggle('screenShow');
}

function screen4(){

    // remove class to screens which came in starting from last screen
    statsDiv.classList.remove('screenShow');    
    playersDiv.classList.remove('screenShow');
    roundsDiv.classList.remove('screenShow');
    // add class screenShow to the screen 3
    statsDiv.classList.toggle('screenShow');
}



// loop

// create a loop to generate input for every player name ***SETUP()***
function createInputPlayer(){
    
    for(let i = 0; i < numberOfPlayers; ++i) {
        
        // create input for player name
        var inp = document.createElement("input");    
        inp.setAttribute("placeHolder", `Name of player ${i + 1}`);        
        inp.setAttribute("class", "inPlayerName")
        inp.setAttribute("id", `inPlayer${i + 1}`);        
        nameInputDiv.appendChild(inp);    
    }
}

// store player names ***START()***
function getNames(){

    // get all the names
    for(let i = 0; i < numberOfPlayers; ++i){
        const name = nameInputDiv.querySelector(`#inPlayer${i + 1}`).value;
        players[i] = new Player(name, 0);        
    }
}

// store player names ***START()***
function getNamesOdd(){

    // get all the names
    for(let i = 0; i < numberOfPlayers - 1; ++i){
        const name = nameInputDiv.querySelector(`#inPlayer${i + 1}`).value;
        players[i] = new Player(name, 0);        
    }
}


// this only works for even number of players ***START()***
function makeCouple(){

    // create couples based on player position
    for (let i = 0; i < numberOfPlayers / 2; ++i) {
        couples[i] = new Couple(`${players[i].name}`, `${players[(numberOfPlayers / 2) + i].name}`, 0);            
    }
}

// create the couples for the first round?
// this only works for even number of players ***START()***
function makeCoupleOdd(){

    // create couples based on player position
    for (let i = 0; i < numberOfPlayers / 2 - 1; ++i) {
        couples[i] = new Couple(`${players[i].name}`, `${players[(numberOfPlayers / 2) + i].name}`, 0);            
    }
}

// display couples ******only works when even number of players ***START()***
function displayCouples(){

    for(i = 0; i < numberOfPlayers / 2; ++i) {
            
        // player 1
        let p1 = document.createElement("p");
        p1.setAttribute('id', `player${playerId}`);
        p1.innerHTML = `${couples[i].player1}`;
        p1.style.gridColumn = "1/2";
        p1.style.gridRow = passesId + 1;
        currentRoundDiv.appendChild(p1);
        // update input player id
        ++playerId;
        
        // player 2
        let p2 = document.createElement("p");
        p2.setAttribute('id', `player${playerId}`);
        p2.innerHTML = `${couples[i].player2}`;
        p2.style.gridColumn = "2/3";
        p2.style.gridRow = passesId + 1;
        currentRoundDiv.appendChild(p2);
        // update input player id
        ++playerId;
    
        // passes input
        let inPases = document.createElement("input");    
        // inPases.setAttribute("placeHolder", "Passes N°");
        inPases.setAttribute("type", "number");
        inPases.setAttribute("placeHolder", "0");
        inPases.setAttribute("id", `passes${passesId}`); 
        inPases.style.gridColumn = "3/4"; 
        inPases.style.gridRow = passesId + 1;      
        currentRoundDiv.appendChild(inPases);
        // update passesId
        ++passesId;
    }    

    // create extra <p> to be overwritten for transition effect purpose
    let pL = document.createElement("p");
    pL.setAttribute('id', `player${playerId}`);
    pL.style.gridColumn = "1/2";
    pL.style.gridRow = passesId + 1;
    currentRoundDiv.appendChild(pL);
    // update input player id
    ++playerId;

    // create extra <p> to be overwritten for transition effect purpose
    let p2 = document.createElement("p");
    p2.setAttribute('id', `player${playerId}`);
    p2.style.gridColumn = "2/3";
    p2.style.gridRow = passesId + 1;
    currentRoundDiv.appendChild(p2);
    // update input player id
    ++playerId;

    // all paragraph height
    var allP = currentRoundDiv.querySelectorAll('p');
    allP.forEach(p => p.style.minHeight = "1.5em");
}

// display couples ******only works when even number of players ***START()***
function displayCouplesOdd(){
    

    for(i = 0; i < numberOfPlayers / 2 - 1; ++i) {
            
        // player 1
        let p1 = document.createElement("p");
        p1.setAttribute('id', `player${playerId}`);
        p1.innerHTML = `${couples[i].player1}`;
        p1.style.gridColumn = "1/2";
        p1.style.gridRow = passesId + 1;
        currentRoundDiv.appendChild(p1);
        // update input player id
        ++playerId;
        
        // player 2
        let p2 = document.createElement("p");
        p2.setAttribute('id', `player${playerId}`);
        p2.innerHTML = `${couples[i].player2}`;
        p2.style.gridColumn = "2/3";
        p2.style.gridRow = passesId + 1;
        currentRoundDiv.appendChild(p2);
        // update input player id
        ++playerId;
    
        // passes input
        let inPases = document.createElement("input");            
        inPases.setAttribute("type", "number");
        inPases.setAttribute("placeHolder", "0");
        inPases.setAttribute("id", `passes${passesId}`); 
        inPases.style.gridColumn = "3/4"; 
        inPases.style.gridRow = passesId + 1;      
        currentRoundDiv.appendChild(inPases);
        // update passesId
        ++passesId;
    }

    
    // display last player which remains alone
    let pL = document.createElement("p");
    pL.setAttribute('id', `player${playerId}`);
    pL.innerHTML = `${players[numberOfPlayers/2 - 1].name}`;
    pL.style.gridColumn = "1/2";
    pL.style.gridRow = passesId + 1;
    currentRoundDiv.appendChild(pL);
    // update input player id
    ++playerId;

    // create extra <p> to be overwritten for transition effect purpose
    let p1 = document.createElement("p");
    p1.setAttribute('id', `player${playerId}`);
    p1.style.gridColumn = "2/3";
    p1.style.gridRow = passesId + 1;
    currentRoundDiv.appendChild(p1);
    // update input player id
    ++playerId;    

    // passes input extra but hidden until needed
    let inPases = document.createElement("input");            
    inPases.setAttribute("type", "number");
    inPases.setAttribute("placeHolder", "0");
    inPases.setAttribute("id", `passes${passesId}`); 
    inPases.style.gridColumn = "3/4"; 
    inPases.style.gridRow = passesId + 1;  
    inPases.style.display = 'none';
    currentRoundDiv.appendChild(inPases);

    // all paragraph height
    var allP = currentRoundDiv.querySelectorAll('p');
    allP.forEach(p => p.style.minHeight = "1.5em");
}

// get passes from input #passesN°
function getPasses(){

    // store passes in couples and players
    for(let i = 0; i < (numberOfPlayers/2); ++i){
        let passes = currentRoundDiv.querySelector(`#passes${i + 1}`).value;
        let input = currentRoundDiv.querySelector(`#passes${i + 1}`);
        if(passes == '' || passes <= 0){passes = 0};
        passes = parseInt(passes);
        couples[getPassesId].passes = passes;
        ++getPassesId;
        players[i].passes += passes;
        players[(numberOfPlayers / 2) + i].passes += passes;

        //clear input field
        input.value = '';
    }    
}

// get passes from input #passesN° OOD
function getPassesOdd(){

    // store passes in couples and players
    for(let i = 0; i < numberOfPlayers/2 - 1; ++i){
        let passes = currentRoundDiv.querySelector(`#passes${i + 1}`).value;
        let input = currentRoundDiv.querySelector(`#passes${i + 1}`);
        if(passes == '' || passes <= 0){passes = 0};
        passes = parseInt(passes);
        couples[getPassesId].passes = passes;
        ++getPassesId;
        players[i].passes += passes;
        players[(numberOfPlayers / 2) + i].passes += passes;

        //clear input field
        input.value = '';
    }    
}

// reorder players[] rotateA
function setPlayersA(){

    // reorder players[]
    for(i = 0; i < numberOfPlayers / 2; ++i) {
        players[numberOfPlayers - i] = players[numberOfPlayers - i - 1];
    }
}

function setPlayersAodd(){

    // reorder players[]
    for(i = 0; i < numberOfPlayers / 2 - 1; ++i) {
        players[numberOfPlayers - i - 1] = players[numberOfPlayers - i - 2];
    }
}

// set new couples rotateA
function setCouplesA(){

    // new couples
    for(i = 0; i < (numberOfPlayers / 2) - 1; ++i) {     
        couples.push(new Couple(`${players[1 + i].name}`, `${players[(numberOfPlayers / 2) + 1 + i].name}`, 0));
    }  
}

// get passes
function getPassesA(){

    for(i = 0; i < (numberOfPlayers / 2) - 1; ++i){
        let passes = currentRoundDiv.querySelector(`#passes${i + 2}`).value;
        let input = currentRoundDiv.querySelector(`#passes${i + 2}`);
        if(passes == '' || passes <= 0){passes = 0};
        passes = parseInt(passes);
        couples[getPassesId].passes = passes;
        ++getPassesId;
        players[1 + i].passes += passes;
        players[(numberOfPlayers / 2) + 1 + i].passes += passes;

        //clear input field
        input.value = '';
    }
}

function setPlayersB(){

    players[numberOfPlayers / 2] = players[0];
    for(i = 0; i < (numberOfPlayers / 2) - 1; ++i) {
      players[i] = players[i + 1];      
    }
    players[numberOfPlayers / 2 - 1] = players[players.length - 1];
}

function setCouplesB(){

    for( i = 0; i < numberOfPlayers / 2; ++i) {
        couples.push(new Couple(`${players[i].name}`,`${players[(numberOfPlayers / 2) + i].name}`, 0));
       }
}

function setCouplesBodd(){

    for( i = 0; i < numberOfPlayers / 2 - 1; ++i) {
        couples.push(new Couple(`${players[i].name}`,`${players[(numberOfPlayers / 2) + i].name}`, 0));
       }
}



// --------
// loop end


// display number of round ***START()***
function displayRound(){
    roundH2.innerHTML = `Round ${currentRound} - ${totalRounds}`;    
}

// update current round ***START()***
function updateCurrentRound(){
    ++currentRound;
}

// create an imput for a new player
function addPlayer(){
    var inp = document.createElement("input");    
        inp.setAttribute("placeHolder", `Name of player ${inPlayerId}`);        
        inp.setAttribute("id", `inPlayer${inPlayerId}`);        
        nameInputDiv.appendChild(inp);
        // increment input player id so the next player will be a higer id
        ++ inPlayerId;
}

// delete an input for a player
function dltPlayer(){
    // we don't want to remain without players
    if(inPlayerId === 2){
        return;
    }
    // if there are more than 2 players, delete one
    else{
        // delete also one id
        --inPlayerId;
    var dlt = document.querySelector(`#inPlayer${inPlayerId}`);
    dlt.remove();
    }
    return;
}
// reset function goes back to setup area
function reset(){
    // remove css class to restart from scratch

    // remove class to screens which came in starting from last screen
    statsDiv.classList.remove('screenShow');
    roundsDiv.classList.remove('screenShow');
    playersDiv.classList.remove('screenShow');
    
    // add class screenShow to the main screen
    setupDiv.classList.toggle('screenShow');

    // restore class to the state before going out ++not necesary
    
    // remove input screen 2
    let rmv = nameInputDiv.querySelectorAll('input');
    rmv.forEach(inp => inp.remove());

    // remove content input & paragraph screen 3

    // remove input
    let rmv2= currentRoundDiv.querySelectorAll('input');
    rmv2.forEach(inp => inp.remove());

    // remove p
    let p = currentRoundDiv.querySelectorAll('p');
    p.forEach(inp => inp.remove());

    // remove content screen 4

    // remove couples
    let rmvCop = coupleStatsDiv.querySelectorAll('p');
    rmvCop.forEach(inp => inp.remove());

    // remove players
    let rmvPl = playerStatsDiv.querySelectorAll('p');
    rmvPl.forEach(inp => inp.remove());

    // reser values
    resetVariables();
    resetArray();
}



// transition


function transitionRightLeft(){

    right();
    left();
}

function transitionRight(){

    right();
}




function nextRoundA(){

    // hide input for passes #passes1
    hideInput1();

     // remove effect down
     removeDown();

     // display new couples

     // #player1 remain the same 

     // #player2 empty
     let p2 = currentRoundDiv.querySelector("#player2");
     p2.innerHTML = "";
    
     // the rest #playerN° display new couples

     // variable for player id starting from #player3
     let id = 3;
     for(i = 0; i < (numberOfPlayers / 2) - 1; ++i){
         let p1 = currentRoundDiv.querySelector(`#player${id}`);
       p1.innerHTML = couples[couples.length - ((numberOfPlayers / 2) - 1) + i].player1;
       ++id;
       let p2 = currentRoundDiv.querySelector(`#player${id}`);
       p2.innerHTML = couples[couples.length - ((numberOfPlayers / 2) - 1) + i].player2;
       ++id;
     }

     // last #player display last players[]
     let lastP = currentRoundDiv.querySelector(`#player${numberOfPlayers + 2}`);
     lastP.innerHTML = players[players.length - 1].name;

}

function nextRoundAodd(){

    // hide input for passes #passes1
    hideInput1();

     // remove effect down
     removeDownOdd();

     // display new couples

     // #player1 remain the same 

     // #player2 empty
     let p2 = currentRoundDiv.querySelector("#player2");
     p2.innerHTML = "";
    
     // the rest #playerN° display new couples

     // variable for player id starting from #player3
     let id = 3;
     for(i = 0; i < (numberOfPlayers / 2) - 1; ++i){
         let p1 = currentRoundDiv.querySelector(`#player${id}`);
       p1.innerHTML = couples[couples.length - ((numberOfPlayers / 2) - 1) + i].player1;
       ++id;
       let p2 = currentRoundDiv.querySelector(`#player${id}`);
       p2.innerHTML = couples[couples.length - ((numberOfPlayers / 2) - 1) + i].player2;
       ++id;
     }

    showInputLast();

    // do we need this?
    // last #player display last players[]
    //  let lastP = currentRoundDiv.querySelector(`#player${numberOfPlayers + 1}`);
    //  lastP.innerHTML = players[players.length - 1].name;

}

function nextRoundB(){

    // remove class
    removeUp();

    // before last player
    let p = currentRoundDiv.querySelector(`#player${numberOfPlayers + 1}`);

    // remove before last player
    p.innerHTML = "";

    // display new couples

    // id for paragraph
    var id = 1;
    for(let i = 0; i < numberOfPlayers / 2; ++i){
        let p1 = currentRoundDiv.querySelector(`#player${id}`);
        p1.innerHTML = couples[couples.length - numberOfPlayers/2 + i].player1;
        ++id;
        let p2 = currentRoundDiv.querySelector(`#player${id}`);
        p2.innerHTML = couples[couples.length - numberOfPlayers/2 + i].player2;
        ++id;
    }



    // input for passes #passes1 show
    let inp1 = currentRoundDiv.querySelector("#passes1");
    inp1.style.display = 'block';

    
}

// no problems up to here--------------
function nextRoundBodd(){

    // remove class
    removeUpOdd();

    // before last player empty
    let bLp = currentRoundDiv.querySelector(`#player${numberOfPlayers - 1}`);
    bLp.innerHTML = '';


    leftOdd();

    // display new couples

    // id for paragraph
    var id = 1;
    for(let i = 0; i < numberOfPlayers / 2 - 1; ++i){
        let p1 = currentRoundDiv.querySelector(`#player${id}`);
        p1.innerHTML = couples[couples.length - (numberOfPlayers/2) + 1 + i].player1;
        ++id;
        let p2 = currentRoundDiv.querySelector(`#player${id}`);
        p2.innerHTML = couples[couples.length - (numberOfPlayers/2) + 1 + i].player2;
        ++id;
    }



    // input for passes #passes1 show
    let inp1 = currentRoundDiv.querySelector("#passes1");
    inp1.style.display = 'block';

    // hide input #passes last
    let inpL = currentRoundDiv.querySelector(`#passes${numberOfPlayers/2}`);
    inpL.style.display = 'none';

    
}


// hide input for passes #passes1 rotateA
function hideInput1(){

    // input for passes #passes1 hidden
    let inp1 = currentRoundDiv.querySelector("#passes1");
    inp1.style.display = 'none';
}

function showInputLast(){

    // input for passes #passes last show
    let inpL = currentRoundDiv.querySelector(`#passes${numberOfPlayers/2}`);
    inpL.style.display = 'block';
}

function checkEnd(){

    //al terminar todos los ciclos dar resultado final
    if(currentRound > plEvenOdd){

        // check for elements repeted
        for(let i = 0; i < players.length; ++i){
            for(let j = 0; j < players.length - 1; ++j){
                if(i == j){continue};
                // players[i].name === players[j].name ? players.splice(i, 1) : players;
                if(players[i].name === players[j].name){players.splice(i, 1); break};
            }            
        };
      
        //sort the array couples[]
        sortCouples();        

        // replace no inputs with 0
        couples.forEach(cpl => isNaN(cpl.passes) ? cpl.passes = 0 : cpl.passes);
        players.forEach(ply => isNaN(ply.passes) ? ply.passes = 0 : ply.passes);
        
        //poner la lista en la variable list
        for(let i = 0; i < couples.length; ++i) {
          coupleStats = `${couples[i].player1} <--> ${couples[i].player2} => ${couples[i].passes}`;
          
          //mostrar resultado        
        let cpl = document.createElement("p"); 
        
        cpl.innerHTML = coupleStats;
        
        coupleStatsDiv.appendChild(cpl);
        
        }

        // remove an element at the middle of players[]
        // players.splice(numberOfPlayers / 2 , 1);

        for(let i = 0; i < players.length; ++i){
            playerStats = `${players[i].name} => ${players[i].passes}`;
            let ply = document.createElement("p");
            ply.innerHTML = playerStats;
            playerStatsDiv.appendChild(ply);
        }

        
        screen4();

        //terminar el programa
        return;
      }
}

// back to which screen?
// function back(){

// }





// screen 1 => screen 2
//             --------



// get the number of players and create inputs for the names
function setup(){

    // get the inicial number of players
    getNumberOfPlayers();
    
    // check there is at least one player
    if(checkNoPlayer()){return};
    
    // set the input player id for each player
    setInPlayerId();

    // create a loop to generate input for every player name
    createInputPlayer();    

    // change classes and transition to screen 2
    screen2();
}


// screen 2 => screen 3
//             --------

// get the names, create players and position them to start the excercise
function start(){

    // this is the real number of players updated
    updateNumberOfPlayers();

    plEvenOdd = numberOfPlayers;

    plEvenOdd % 2 !== 0 ? ++numberOfPlayers : numberOfPlayers;

    plEvenOdd % 2 == 0 ? updateTotalRounds() : updateTotalRoundsOdd();

    // update totalRounds
    // updateTotalRounds();

    // change classes to display screen 3
    screen3();    


    plEvenOdd % 2 == 0 ? getNames() :  getNamesOdd();

    // get the player names
    // getNames();
    // put all the names inside position array
    // getPosition(); ******************ready to delete*****************



    

    plEvenOdd % 2 == 0 ? makeCouple() :  makeCoupleOdd();

        // create couples based on player position
        // makeCouple();

        // diplay round
        displayRound();

        
        // update the current round
        updateCurrentRound();

        plEvenOdd % 2 == 0 ? displayCouples() :  displayCouplesOdd();

        // display couple + passes input
        // displayCouples();        
}



// function back(){

// }






// rotations and transitions
// -------------------------



// rotate a- players[]
function rotateA(){

    // check if there is an even number of players
    plEvenOdd % 2 == 0 ? getPasses() :  getPassesOdd();

    // check if the excercise ended
    checkEnd();

    // next round    
    displayRound();
    updateCurrentRound();

    // reorder players[]
    plEvenOdd % 2 == 0 ? setPlayersA() : setPlayersAodd();
    

    // new couples
    setCouplesA();
    
    // transition first
    plEvenOdd % 2 == 0 ? down() : downOdd();
    

            

    // when transition ends
    let p2 = currentRoundDiv.querySelector("#player2");
    p2.addEventListener("transitionend", function (event){

        // aply all the code for the next round
        plEvenOdd % 2 == 0 ? nextRoundA() : nextRoundAodd();
        
        
        });
    
    
}

function rotateB(){
    
    // get passes
    getPassesA();

    // check if the excercise ended
    checkEnd();    

    // next round    
    displayRound();
    updateCurrentRound();

    // reorder players[]
    setPlayersB();
    

    // new couples
    plEvenOdd % 2 == 0 ? setCouplesB() : setCouplesBodd();
    
    


    // trnasition first
    plEvenOdd % 2 == 0 ? transitionRightLeft() : transitionRight();
    
    

    // when transition ends
    let p1 = currentRoundDiv.querySelector("#player1");
    let p3 = currentRoundDiv.querySelector("#player3");
    p1.addEventListener("transitionend", function (event){
       
        // transition
        plEvenOdd % 2 == 0 ? up() : upOdd();
        

        // when transition ends
        p3.addEventListener("transitionend", function (event){

            plEvenOdd % 2 == 0 ? nextRoundB() : nextRoundBodd();

        });

    });    

}

// transition 1
function down(){

    // id for paragraph
    let id = 2;

    // loop to select the paragraph on the right column for the transition
    for(let i = 0; i < numberOfPlayers/2; ++i){
        let p = currentRoundDiv.querySelector(`#player${id}`);
        p.classList.add('down');
        id += 2;
    }
}

function downOdd(){

    // id for paragraph
    let id = 2;

    // loop to select the paragraph on the right column for the transition
    for(let i = 0; i < numberOfPlayers/2 - 1; ++i){
        let p = currentRoundDiv.querySelector(`#player${id}`);
        p.classList.add('down');
        id += 2;
    }
}

function removeDown(){
    // id for paragraph
    let id = 2;

    // loop to select the paragraph on the right column for the transition
    for(let i = 0; i < numberOfPlayers/2; ++i){
        let p = currentRoundDiv.querySelector(`#player${id}`);
        p.classList.remove('down');
        id += 2;
    }
}

function removeDownOdd(){
    // id for paragraph
    let id = 2;

    // loop to select the paragraph on the right column for the transition
    for(let i = 0; i < numberOfPlayers/2 - 1; ++i){
        let p = currentRoundDiv.querySelector(`#player${id}`);
        p.classList.remove('down');
        id += 2;
    }
}

// transition 2
function right(){

    // #player1 
    let p1 = currentRoundDiv.querySelector("#player1");

    // #player2
    let p2 = currentRoundDiv.querySelector("#player2");

    // add class .right
    p1.classList.add('right');

    // after transition ends
    p1.addEventListener("transitionend", function (event){
       
         // #player2 = #player1    
        p2.innerHTML = p1.innerHTML;
    
        // #player1 empty
        p1.innerHTML = "";
        // remove class
        p1.classList.remove('right');});    

}

function left(){

    // #playerLast
    let pL = currentRoundDiv.querySelector(`#player${numberOfPlayers + 2}`);

    // before last player
    let p = currentRoundDiv.querySelector(`#player${numberOfPlayers + 1}`);
 
    // add class
    pL.classList.add('left');

    // when transition ends
    pL.addEventListener("transitionend", function (event){
       
        // #player before last one = last #player
        p.innerHTML = pL.innerHTML;       
 
        // #playerLast empty
        pL.innerHTML = "";  
        
        pL.classList.remove('left')});

      
}

function leftOdd(){

    // #playerLast
    let pL = currentRoundDiv.querySelector(`#player${numberOfPlayers}`);

    // before last player
    let p = currentRoundDiv.querySelector(`#player${numberOfPlayers - 1}`);
 
    // add class
    pL.classList.add('left');

    // when transition ends
    pL.addEventListener("transitionend", function (event){
       
        // #player before last one = last #player
        p.innerHTML = pL.innerHTML;       
 
        // #playerLast empty
        pL.innerHTML = "";  
        
        pL.classList.remove('left')});      
}

function up(){

     // id for paragraph
     let id = 3;

     // loop to select the paragraph on the right column for the transition
     for(let i = 0; i < numberOfPlayers/2; ++i){
         let p = currentRoundDiv.querySelector(`#player${id}`);
         p.classList.add('up');
         id += 2;         
     }    
}

function upOdd(){

    // id for paragraph
    let id = 3;

    // loop to select the paragraph on the left column for the transition
    for(let i = 0; i < numberOfPlayers/2 - 1; ++i){
        let p = currentRoundDiv.querySelector(`#player${id}`);
        p.classList.add('up');
        id += 2;         
    }    
}

function removeUp(){

     // id for paragraph
     let id = 3;

     // loop to select the paragraph on the right column for the transition
     for(let i = 0; i < numberOfPlayers/2; ++i){
         let p = currentRoundDiv.querySelector(`#player${id}`);
         p.classList.remove('up');
         id += 2;
     }    
}

function removeUpOdd(){

    // id for paragraph
    let id = 3;

    // loop to select the paragraph on the right column for the transition
    for(let i = 0; i < numberOfPlayers/2 - 1; ++i){
        let p = currentRoundDiv.querySelector(`#player${id}`);
        p.classList.remove('up');
        id += 2;
    }    
}



// rotation effect
function rotate(){    

    rotateSelector % 2 == 0 ? rotateA() : rotateB();

    ++rotateSelector;
   
}



// start the app with the effect coming in
setupDiv.classList.toggle('screenShow');


// buttons and event listener
// --------------------------

// clicking this button will trigger a function to create inputs for players
// it takes you to screen 2
btnNplayers.addEventListener("click", setup);

// add player
addBtn.addEventListener("click", addPlayer);

// delete player
dltBtn.addEventListener("click", dltPlayer);

// reset button
rstBtn.addEventListener("click", reset);//it takes you to screen 1

// round reset button
roundRstBtn.addEventListener("click", reset);//it takes you to screen 1

statsRstBtn.addEventListener("click", reset);//it takes you to screen 1

// start button
startBtn.addEventListener("click", start);//it takes you to screen 3

