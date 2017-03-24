 console.log(Phaser);
//This sets the variable for the spacebar.
var spaceKey;

var ground;
var player;
var obstacle;
var music;
//This sets the score to start at -1.
var score = -1;
var roof;

var GAME_WIDTH = 800;
var GAME_HEIGHT = 600;
var GAME_CONTAINER_ID = 'gameDiv';

//This is the object which runs the game.
function preload(){
  game.load.image('background', 'assets/backround.png');
  game.load.image('player','assets/helicopter.png'); 
  game.load.image('obstacle','assets/mountains.png');
  game.load.image('ground', 'assets/wallHorizontal.png');
  game.load.audio('backgroundMusic', 'assets/music.mp3')
  game.load.image('roof','assets/wallHorizontal.png');
  game.stage.backgroundColor="618bed"  
  
};
  

function create(){
    //This creates the player character at the bottom left side of the screen.
  player = game.add.sprite(game.width/8, game.world.height*(2/5), 'player');
  game.physics.arcade.enable(player);
 
 //This creates the first obstacle on the right side of the screen.
  obstacle = game.add.sprite(700,game.world.height, 'obstacle');
  obstacle.scale.setTo(1,2);
  obstacle.anchor.setTo(1.5,1);
  game.physics.arcade.enable(obstacle)
  obstacle.body.immovable = true
  //This sets up a group call platforms. For future functionality we can set all horizontal surfaces to this group.
platforms = game.add.group();
platforms.enableBody = true;

//This creates the ground, and makes it solid object the player will not pass through.
ground = platforms.create(0, GAME_HEIGHT, 'ground');
ground.anchor.setTo(0,1);
ground.scale.setTo(4, 1);
game.physics.arcade.enable(ground)
game.physics.startSystem(Phaser.Physics.ARCADE);
ground.body.immovable = true

spaceKey = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
  player.body.bounce.y = 0.2;
  player.body.gravity.y = 600;


//This adds the scoreboard on the top left side of the screen.
scoreText = game.add.text(16, 550, 'score: 0', { fontSize: '32px', fill: '#000000' });
  
music = game.add.audio ('backgroundMusic')
music.play(music.mp3);
  
roofforms = game.add.group(0, 0, 'roof');
roofforms.enablebody = true;
roof= platforms.create (0, GAME_HEIGHT*1/30 ,'roof');
roof.anchor.setTo(0,1);
roof.scale.setTo(4,1);
game.physics.arcade.enable(roof);
roof.body.immovable = true;
  };

function update(){
game.physics.arcade.collide(player, ground);
game.physics.arcade.collide(player, obstacle);
game.physics.arcade.collide(player, roof);

if (spaceKey.isDown) {
    player.body.velocity.y = -300;
  }

//This creates a place to add sound when the obstacle reaches the player.
if (obstacle.x > 600) {
  obstacle.x -= 0.05;
};

//This will  create a new wall if the old wall goes off the screen.
if (obstacle.x < 0) {
  obstacle.kill();
  obstacle = game.add.sprite(1100, GAME_HEIGHT, 'obstacle');
  obstacle.scale.setTo(1,3);
  obstacle.anchor.setTo(1,1);
  game.physics.arcade.enable(obstacle);
  obstacle.body.immovable = true;
};

//This will update the score if the player has not been pushed off the screen, and the wall has gone off the left side.
  if (obstacle.x < 5 && player.x > 5){
    score++;
    scoreText.text = 'score: ' + score;
  };
//This will tell you "You Lose!" if the player is pushed off the left side of the screen.
  if (player.x < 0){
    scoreText = game.add.text(350,200, 'You FAILED!', {fill: '#ff0000'});
    obstacle.kill();
    player.kill();
  }; 


};

var game = new Phaser.Game(800, 600, Phaser.AUTO, 'gameDiv', { preload: preload, update: update, create: create });

game.state.start();