/*********************************
 * Copyright © 2016 Stefan Horne *
 *********************************/
var platforms = {

    velocity: 3.5,

    _platforms: [],

    column: {absLeft: 0, Left: 1, Right: 2, absRight: 3},

    reset: function () {
        this._platforms = [];
    },

    update: function () {

        if (gamestate === states.Start) {
            this._platforms.splice(0, this._platforms.length);

            this._platforms.push({
                x: width / 2 - (platform_s.width / 2),
                y: height / 9,
                proximity: 0,
                width: platform_s.width,
                height: platform_s.height
            });
        } else {
            if (frames % 65 === 0) {
                var _x = getRandomArbitrary(1, width - platform_s.width - 1);

                var platform = this._platforms.push({
                    x: _x,
                    y: -25,
                    proximity: 0,
                    closest: false,
                    width: platform_s.width,
                    height: platform_s.height
                });

                _x += platform_s.width / 2;
                if ((_x >= 0 && _x <= width - (width / 4) * 3)) {
                    console.log("absLeft");
                } else if (_x >= width - (width / 4) * 3 && _x <= width - (width / 4) * 2) {
                    console.log("Left");
                } else if (_x >= width - (width / 4) * 2 && _x <= width - (width / 4)) {
                    console.log("Right");
                } else if (_x >= width - (width / 4) && _x <= width) {
                    console.log("absRight");
                }

            }
            for (i = 0, len = this._platforms.length; i < len; i++) {
                var p = this._platforms[i];

                /* Collision */

                // right side of player
                var px2 = player.x + player_s.width - 15;
                // player feet
                var py = player.y + player_s.height + player.yvelocity;

                var platx2 = p.x + platform_s.width;
                var platy2 = p.y + platform_s.height;

                /* Platform Collision */

                // Calculate proximity to player and get closest proximity
                p.proximity = Math.abs(p.x / 2 - player.x / 2) + Math.abs(p.y / 2 - player.y / 2);
                var minprox = Math.min.apply(Math, this._platforms.map(function (obj) {
                    return obj.proximity;
                }));

                this.closest = p.proximity == minprox;

                // If this is the closest platform to the player
                if (this.closest) {
                    if (((player.x > p.x && player.x < platx2) || (px2 > p.x && px2 < platx2)) && (py >= p.y && py <= platy2) && player.yvelocity > 0) {
                        player.onplatform = true;
                        player.y = p.y - player_s.height;
                    } else {
                        player.onplatform = false;
                    }
                }

                // Platform movement and remove platforms after they leave the canvas
                p.y += this.velocity;
                if (p.y > height) {
                    this._platforms.splice(i, 1);
                    i--;
                    len--;
                }
            }
        }


    },

    draw: function (context) {
        for (var i = 0, len = this._platforms.length; i < len; i++) {
            var p = this._platforms[i];
            platform_s.draw(context, p.x, p.y);
        }
    }

};
