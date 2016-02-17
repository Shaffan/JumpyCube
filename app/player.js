var player = {

    x: 160 - 16,
    y: 120 - 32,

    gravity: 0.25,

    _jump: 5,
    jumpcount: 0,
    canjump: true,

    moving: false,
    acceleration: 0,
    xvelocity: 0,
    yvelocity: 0,

    animation: [0],
    currentframe: 0,

    jump: function () {

        if (this.yvelocity === 0) {
            this.canjump = true;
            this.jumpcount = 0;
        };

        if (this.jumpcount < 2) {
            this.jumpcount += 1;
            this.yvelocity = -this._jump;
        } else {
            this.canjump = false;
        };

    },

    move: function (direction, evttype) {

        this.moving = evttype === "keydown" ? true : false;
        console.log(this.moving);
        
        if (direction < 1) {
            this.xvelocity = -this.xvelocity;
            this.acceleration = -this.acceleration;    
        } 
        
        
    },

    update: function () {
        frames++

        // this.currentframe += frames % 5 === 0 ? 1 : 0;
        // sets the currentframe to 0 when it reaches the end of the animation
        this.currentframe %= this.animation.length;

        // gravity
        if (this.y <= height - (32 + this.yvelocity)) {
            this.yvelocity += this.gravity;
            this.y += this.yvelocity;
        } else {
            this.yvelocity = 0;
        }

        // movement
        if (!this.moving) { 
            console.log("entered");
        } else {
            this.xvelocity += this.acceleration;
            this.x += this.xvelocity;
        }
        
        console.log(this.acceleration);
        // console.log("frames: " + frames);

    },

    draw: function (context) {
        context.clearRect(0, 0, canvas.width, canvas.height);

        var n = this.animation[this.currentframe];

        context.drawImage(images[n], 0, 0, 32, 32, this.x, this.y, 32, 32);
    }
};
