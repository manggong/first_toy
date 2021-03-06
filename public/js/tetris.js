var NUM_ROWS = 20;
var NUM_COLS = 10;
var BLOCK_WIDTH = 30;
var BLOCK_HEIGHT = 30;
var TICK_MS = 400;

var pieces =
  [[[0, 0, 0, 0],
    [0, 1, 1, 0],
    [0, 1, 1, 0],
    [0, 0, 0, 0]],
   [[0, 0, 2, 0],
    [0, 0, 2, 0],
    [0, 0, 2, 0],
    [0, 0, 2, 0]],
   [[0, 0, 3, 0],
    [0, 3, 3, 0],
    [0, 0, 3, 0],
    [0, 0, 0, 0]],
   [[0, 0, 0, 0],
    [0, 0, 4, 4],
    [0, 4, 4, 0],
    [0, 0, 0, 0]],
   [[0, 0, 0, 0],
    [0, 5, 5, 0],
    [0, 0, 5, 5],
    [0, 0, 0, 0]],
   [[0, 0, 6, 0],
    [0, 0, 6, 0],
    [0, 6, 6, 0],
    [0, 0, 0, 0]],
   [[0, 7, 0, 0],
    [0, 7, 0, 0],
    [0, 7, 7, 0],
    [0, 0, 0, 0]]];

var KEY_ENTER = 13;
var KEY_SPACE = 32;
var KEY_LEFT = 37;
var KEY_RIGHT = 39;
var KEY_DOWN = 40;
var KEY_UP =38;
var KEY_R = 82;

function rotateLeft(piece) {
  return [
    [piece[0][3], piece[1][3], piece[2][3], piece[3][3]],
    [piece[0][2], piece[1][2], piece[2][2], piece[3][2]],
    [piece[0][1], piece[1][1], piece[2][1], piece[3][1]],
    [piece[0][0], piece[1][0], piece[2][0], piece[3][0]]
  ];
}

function rotateRight(piece) {
  return [
    [piece[3][0], piece[2][0], piece[1][0], piece[0][0]],
    [piece[3][1], piece[2][1], piece[1][1], piece[0][1]],
    [piece[3][2], piece[2][2], piece[1][2], piece[0][2]],
    [piece[3][3], piece[2][3], piece[1][3], piece[0][3]]
  ];
}

function intersects(rows, piece, y, x) {
  for (var i = 0; i < 4; i++)
    for (var j = 0; j < 4; j++)
      if (piece[i][j])
        if (y+i >= NUM_ROWS || x+j < 0 || x+j >= NUM_COLS || rows[y+i][x+j])
          return true;
  return false;
}

function apply_piece(rows, piece, y, x) {
  var newRows = [];
  for (var i = 0; i < NUM_ROWS; i++){
    for (var j = 0; j < NUM_COLS; j++){
      if(rows[i][j]) rows[i][j]=8;
    }
    newRows[i] = rows[i].slice();
  }
  for (var i = 0; i < 4; i++)
    for (var j = 0; j < 4; j++)
      if (piece[i][j])
        newRows[y+i][x+j] = piece[i][j];
  return newRows;
}

function kill_rows(rows) {
  var newRows = [];
  var k = NUM_ROWS;
  for (var i = NUM_ROWS; i --> 0;) {
    for (var j = 0; j < NUM_COLS; j++) {
      if (!rows[i][j]) {
        newRows[--k] = rows[i].slice();
        break;
      }
    }
  }
  for (var i = 0; i < k; i++) {
    newRows[i] = [];
    for (var j = 0; j < NUM_COLS; j++) newRows[i][j] = 0;
  }
  return {
    'rows': newRows,
    'numRowsKilled': k,
  };
}

function randomPiece() {
  return pieces[Math.floor(Math.random() * pieces.length)];
}

function TetrisGame() {
  this.gameOver = false;
  this.score = 0;
  this.currentPiece = randomPiece();
  this.nextPiece = randomPiece();
  this.pieceY = 0;
  this.pieceX = 3;
  this.rows = [];
  for (var i = 0; i < NUM_ROWS; i++) {
    this.rows[i] = []
    for (var j = 0; j < NUM_COLS; j++) {
        this.rows[i][j] = 0;
    }
  }
}

TetrisGame.prototype.tick = function () {
  if (this.gameOver)
    return false;
  if (intersects(this.rows, this.currentPiece, this.pieceY + 1, this.pieceX)) {
    /* burn current piece into board */
    this.rows = apply_piece(this.rows, this.currentPiece, this.pieceY, this.pieceX);
    var r = kill_rows(this.rows);
    this.rows = r.rows;
    this.score += 1 + r.numRowsKilled * r.numRowsKilled * NUM_COLS;
    /* fetch next piece */
    if (intersects(this.rows, this.currentPiece, 0, NUM_COLS / 2 - 2)) {
      this.gameOver = true;
    }
    else{
      this.currentPiece = this.nextPiece;
      this.pieceY = 0;
      this.pieceX = NUM_COLS / 2 - 2;
      this.nextPiece = randomPiece();
    }
  } else {
    this.pieceY += 1;
  }
  return true;
}

TetrisGame.prototype.steerLeft = function () {
  if (!intersects(this.rows, this.currentPiece, this.pieceY, this.pieceX - 1))
    this.pieceX -= 1;
}

TetrisGame.prototype.steerRight = function () {
  if (!intersects(this.rows, this.currentPiece, this.pieceY, this.pieceX + 1))
    this.pieceX += 1;
}

TetrisGame.prototype.steerDown = function () {
  if (!intersects(this.rows, this.currentPiece, this.pieceY + 1, this.pieceX))
    this.pieceY += 1;
}

TetrisGame.prototype.rotateLeft = function () {
  var newPiece = rotateLeft(this.currentPiece);
  if (!intersects(this.rows, newPiece, this.pieceY, this.pieceX))
    this.currentPiece = newPiece;
}

TetrisGame.prototype.rotateRight = function () {
  var newPiece = rotateRight(this.currentPiece);
  if (!intersects(this.rows, newPiece, this.pieceY, this.pieceX))
    this.currentPiece = newPiece;
}

TetrisGame.prototype.letFall = function () {
  while (!intersects(this.rows, this.currentPiece, this.pieceY+1, this.pieceX))
    this.pieceY += 1;
  this.tick();
}

TetrisGame.prototype.get_rows = function () {
  return apply_piece(this.rows, this.currentPiece, this.pieceY, this.pieceX);
}

TetrisGame.prototype.get_next_piece = function () {
  return this.nextPiece;
}

TetrisGame.prototype.get_score = function () {
  return this.score;
}

TetrisGame.prototype.get_game_over = function () {
  return this.gameOver;
}

function draw_blocks(rows, num_rows, num_cols) {
  var boardElem = document.createElement('div');
  for (var i = 0; i < num_rows; i++) {
    for (var j = 0; j < num_cols; j++) {
        var blockElem = document.createElement('div');
        blockElem.classList.add('tetrisBlock');
        if (rows[i][j]==1)
          blockElem.classList.add('habitated1');
        if (rows[i][j]==2)
          blockElem.classList.add('habitated2');
        if (rows[i][j]==3)
          blockElem.classList.add('habitated3');
        if (rows[i][j]==4)
          blockElem.classList.add('habitated4');
        if (rows[i][j]==5)
          blockElem.classList.add('habitated5');
        if (rows[i][j]==6)
          blockElem.classList.add('habitated6');
        if (rows[i][j]==7)
          blockElem.classList.add('habitated7');
        if (rows[i][j]==8)
          blockElem.classList.add('habitated8');
        blockElem.style.top = (i * BLOCK_HEIGHT) + 'px';
        blockElem.style.left = (j * BLOCK_WIDTH) + 'px';
        boardElem.appendChild(blockElem);
    }
  }
  return boardElem;
}

function draw_tetrisGame(game, isPaused) {
  var leftPaneElem = draw_tetrisLeftPane(game, isPaused);
  var rightPaneElem = draw_tetrisRightPane(game);
  var gameElem = document.createElement('div');
  gameElem.classList.add('tetrisGame');
  gameElem.appendChild(leftPaneElem);
  gameElem.appendChild(rightPaneElem);
  return gameElem;
}

function draw_tetrisLeftPane(game, isPaused) {
  var scoreElem = draw_tetrisScore(game, isPaused);
  var previewElem = draw_tetrisPreview(game);
  var usageElem = draw_tetrisUsage(game);
  var leftPaneElem = document.createElement('div');
  leftPaneElem.classList.add('tetrisLeftPane');
  leftPaneElem.appendChild(previewElem);
  leftPaneElem.appendChild(scoreElem);
  leftPaneElem.appendChild(usageElem);
  return leftPaneElem;
}

function draw_tetrisRightPane(game) {
  var boardElem = draw_tetrisBoard(game);
  var rightPaneElem = document.createElement('div');
  rightPaneElem.classList.add('tetrisRightPane');
  rightPaneElem.appendChild(boardElem);
  return rightPaneElem;
}

function draw_tetrisBoard(game) {
  var rows = game.get_rows();
  var boardElem = draw_blocks(rows, NUM_ROWS, NUM_COLS);
  boardElem.classList.add('tetrisBoard');
  return boardElem;
}

function draw_tetrisScore(game, isPaused) {
  var score = game.get_score();
  var scoreElem = document.createElement('div');
  scoreElem.classList.add('tetrisScore');
  scoreElem.innerHTML = 'SCORE: ' + score;
  if (game.get_game_over())
  {
    scoreElem.innerHTML += '<br>GAME OVER'
  }
  return scoreElem;
}

function draw_tetrisPreview(game) {
  var piece = game.get_next_piece();
  var pieceElem = draw_blocks(piece, 4, 4);
  var previewElem = document.createElement('div');
  previewElem.classList.add('tetrisPreview');
  previewElem.appendChild(pieceElem);
  return previewElem;
}

function draw_tetrisUsage(game) {
  var usageElem = document.createElement('div');
  usageElem.classList.add('tetrisUsage');
  usageElem.innerHTML =
       "<table>" +
      "<tr><th>방향키</th><td>이동</td></tr>" +
      "<tr><th>윗 방향키</th><td>회전</td></tr>" +
      "<tr><th>Space bar</th><td>Let fall</td></tr>" +
      "</table>";
  return usageElem;
}

function redraw(game, isPaused, containerElem) {
  var gameElem = draw_tetrisGame(game, isPaused);
  containerElem.innerHTML = '';
  containerElem.appendChild(gameElem);
}
function restartGame(){
  tetris_run(document.getElementById('game'));
  retext=document.getElementById('retext');
  retext.innerHTML='Loading...';
}
function tetris_run(containerElem) {
  var game = new TetrisGame();
  
  play();

  function play() {
    var intervalHandler = setInterval(
      function () {
        if (game.tick())
        {
          redraw(game, false, containerElem);
          filter=document.getElementById('myfilter');
          restart=document.getElementById('restart');
          filter.style.display="none";
          restart.style.display="none";
        }
        if(game.get_game_over())
        {
          clearInterval(intervalHandler);
            let serverscore = game.score;
            let send_param = {
                  score:serverscore
              }
            filter=document.getElementById('myfilter');
            restart=document.getElementById('restart');
            retext=document.getElementById('retext');
            retext.innerHTML='RESTART';
            filter.style.display="inline-block";
            filter.style.height="600px";
            filter.style.width="600px";
            filter.style.zIndex="15";
            restart.style.display="inline-block";
            restart.style.paddingLeft="270px";
            restart.style.paddingTop="270px";
            restart.style.zIndex="20";
  
              $.post('/game/3', send_param, function (returnData) {
                  alert(returnData.message);
              });
        }
      },
      TICK_MS
    );

    function keyHandler(kev) {
        if (kev.shiftKey || kev.altKey || kev.metaKey)
          return;
        var consumed = true;
        var mustpause = false;
        if (kev.keyCode === KEY_LEFT) {
          game.steerLeft();
        } else if (kev.keyCode === KEY_RIGHT) {
          game.steerRight();
        } else if (kev.keyCode === KEY_DOWN) {
          game.steerDown();
        } else if (kev.keyCode === KEY_UP) {
          game.rotateRight();
        } else if (kev.keyCode === KEY_SPACE) {
          game.letFall();
        } else {
          consumed = false;
        }
        if (consumed) {
          kev.preventDefault();
          if (mustpause) {
            document.body.removeEventListener('keydown', keyHandler);
            clearInterval(intervalHandler);
            pause();
          } else {
            redraw(game, false, containerElem);
          }

        }
        
    }

    document.body.addEventListener('keydown', keyHandler);
  }

  function pause() {
    function keyHandler(kev) {
      if (kev.keyCode == KEY_ENTER) {
        document.body.removeEventListener('keydown', keyHandler);
        play();
      }
    }

    document.body.addEventListener('keydown', keyHandler);

    redraw(game, true, containerElem);
  }
}