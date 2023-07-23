const cells= document.querySelectorAll('.cell');
const reset_bottom=document.querySelector('.reset');
const current_turn=document.querySelector('.current-turn');
const score1=document.querySelector('.scor1');
const score2=document.querySelector('.scor2');
const draw=document.querySelector('.draw');
const message_content=document.querySelector('.content');
const overlay=document.getElementById('overlay');
const close_botton=document.getElementById('close');
const win_combo=[
[0,1,2],
[3,4,5],
[6,7,8],
[0,3,6],
[1,4,7],
[2,5,8],
[0,4,8],
[2,4,6]
];

let turn= true;
let used_cells=[];
//let win=false;
let ties=0;

let player1={
    Symbol:'<i class="fa fa-close"></i>' ,
    played: [],
    score:0
}

let player2={
    Symbol:'<i class="fa fa-circle-o"></i>' ,
    played: [],
    score:0
}
check_turn();
for(let i=0;i<9;i++){
cells[i].addEventListener('click',()=>{
    if(it_is_empty(i)){
        if(turn){
            addsymbol(player1,i);
            turn=false;
            winner(player1);
            check_turn();
             }
             else{
                 addsymbol(player2,i);
                 turn=true;
                 winner(player2);
                 check_turn();
             }

    }
    else alert('choose an empty cell')

})

}
function addsymbol(player,i){
    cells[i].innerHTML=player.Symbol;
    player.played.push(i);
    used_cells.push(i);
}

// ... Your existing code ...

function winner(player) {
  let win = false; // Declare win variable locally inside the winner function
  win_combo.some(combo => {
    if (combo.every(index => player.played.includes(index))) {
      if (player === player1) {
        player1.score++; // Update player1's score
      } else {
        player2.score++; // Update player2's score
      }
      showscore();
      setTimeout(showmessage, 500, player, true); // Pass true when the player wins
      win = true; // Set win to true to prevent multiple messages for the same win
      return true; // Exit the loop early since we found a winning combo
    }
  });

  if (!win && used_cells.length === 9) {
    ties++;
    showscore();
    setTimeout(showmessage, 500, player, false); // Pass false when the game is a draw
  }
}

// ... Your existing code ...

function it_is_empty(i){
    if(used_cells.includes(i))   return false;
    else  return true;

}
//last min 19:17
//function reset
function reset(){
    cells.forEach(cell=>{
        cell.innerHTML='';
    })
    used_cells=[];
    player1.played=[];
    player2.played=[];
    turn=true;
    check_turn();
}
reset_bottom.addEventListener('click',reset);

function check_turn(){
 if(turn){
    current_turn.innerHTML=player1.Symbol;
 }
 else{
    current_turn.innerHTML=player2.Symbol;
 }
}
function showscore(){
    score1.innerHTML=player1.score;
    score2.innerHTML=player2.score;
    draw.innerHTML=ties;
}
// ... Your existing code ...
// Remove this line (close_botton event listener added twice)
close_botton.addEventListener('click',()=>{
    overlay.style.display='none';
})

// Keep this line (close_botton event listener to reset the game)
close_botton.addEventListener('click', () => {
    overlay.style.display = 'none';
    reset(); // Call reset() here after the overlay is closed
});


// ... Your existing code ...

function showmessage(player, win) {
    if (win) {
        overlay.style.display = 'flex';
        message_content.innerHTML = player.Symbol + ' is the <h2>WINNER</h2>';
    } else if (!win && used_cells.length === 9) {
        overlay.style.display = 'flex';
        message_content.innerHTML = 'It is a <h2>DRAW</h2>';
    }
    reset(); // Call reset() here after showing the message
    win = false; // Reset the win variable to false
}
