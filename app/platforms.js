/*********************************
 * Copyright © 2016 Stefan Horne *
 *********************************/
var platforms = {

    velocity: 3.5,

    _platforms: [],

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

                this._platforms.push({
                    x: _x,
                    y: -25,
                    proximity: 0,
                    closest: false,
                    width: platform_s.width,
                    height: platform_s.height
                });
            }
            for (i = 0, len = this._platforms.length; i < len; i++) {
                var p = this._platforms[i],

                /* Collision */

                    px = player.direction > 0 ? player.x + 15 : player.x,
                // right side of player
                    px2 = player.direction > 0 ? player.x + player_s_right.width : player.x + player_s_right.width - 15,
                // player feet
                    py = player.y + player_s_right.height + player.yvelocity,

                    platx2 = p.x + platform_s.width,
                    platy2 = p.y + platform_s.height;

                /* Platform Collision */

                // Calculate proximity to player and get closest proximity
                p.proximity = Math.abs(p.x / 2 - player.x / 2) + Math.abs(p.y / 2 - player.y / 2);
                var minprox = Math.min.apply(Math, this._platforms.map(function (obj) {
                    return obj.proximity;
                }));

                this.closest = p.proximity == minprox;

                // If this is the closest platform to the player
                if (this.closest) {
                    if (((px > p.x && px < platx2) || (px2 > p.x && px2 < platx2)) && (py >= p.y && py <= platy2) && player.yvelocity > 0) {
                        player.onplatform = true;
                        player.y = p.y - player_s_right.height;
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
