/*********************************
 * Copyright © 2016 Stefan Horne *
 *********************************/
'use strict';
var canvas,
    context,
    width,
    height,
    // This needs to be initialised
    frames = 0,
    
    gamestate,
    states = {Start: 0, Game: 1, Death: 2};

function input(event) {

    if (gamestate === states.Start) {
        gamestate = states.Game;
    }

    if (event.which === 37) {
        player.move(-1, event.type);
    }
    if (event.which === 38 && event.type !== 'keyup') {
        player.jump();
    }
    if (event.which === 39) {
        player.move(1, event.type);
    }
    // prevent scroll etc
    event.preventDefault();
}

function run() {
    var loop = function () {
        update();
        render();
        window.requestAnimationFrame(loop);
    };
    window.requestAnimationFrame(loop);
}

function update() {
    frames++;
    if (gamestate !== states.Death) {
        platforms.update();
    }
    player.update();

}

function render() {
    context.clearRect(0, 0, canvas.width, canvas.height);

    platforms.draw(context);
    player.draw(context);

    if (gamestate === states.Start) {
        var text = context.measureText("Press any button to start");
        context.fillText("Press any button to start", width / 2 - (text.width / 2), height / 2);
    } else if (gamestate === states.Death) {
        canvas.style.backgroundColor = '#a2b4c3';
        score_s.draw(context, width / 2 - (score_s.width / 2), height / 2 - (score_s.height / 2));
    }
}

(function main() {

    width = window.innerWidth;
    height = window.innerHeight;

    var font = "bold 20px Kristen ITC";
    if (width > 500) {
        width = 400;
        height = 600;
        font = "bold 30px Kristen ITC";
    }

    canvas = document.createElement('canvas');

    canvas.width = width;
    canvas.height = height;

    context = canvas.getContext("2d");
    context.font = font;

    document.body.appendChild(canvas);

    $(document).keydown(function (event) {
        input(event);
    });
    $(document).keyup(function (event) {
        input(event);
    });

    gamestate = states.Start;


    var img = new Image();
    img.onload = function () {
        loadSprites(this);
        run();
        player.x = width / 2 - (player_s.width / 2) + 5;
        player.y = height / 2 - player_s.height / 2;
    };
    img.src = "assets/sprites.png";

})();
