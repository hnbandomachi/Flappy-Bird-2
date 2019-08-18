// browser-sync start --server -f -w

var bird, bg, score = 0, speed = 2;
var pipes = [], check = true;
const w = 288, h = 512, hole = 80;

function setup() {
    createCanvas(w, h);
    bgImage = loadImage('/image/bgNight.png');
    birdImage = loadImage('/image/birdMid.png');
    baseImage = loadImage('image/base.png');

    bg = new Background();
    base = new Base();
    bird = new Bird();
    pipes.push(new Pipe());
};

function draw() {
    bg.show();    

    if (frameCount < 300) {
        if (frameCount%100 == 0) {
            pipes.push(new Pipe());
        };                
    };

    for (let i = 0; i < pipes.length; i++) {
        if (pipes[i].overBackground()) {
            pipes.splice(0, 1);
            if (frameCount > 300) {
                pipes.push(new Pipe());
            };

        };
        pipes[i].show();
    };
    base.show();

    bird.show();    
    if (bird.dead()) gameover();
};

function Bird() {
    this.width = 34;
    this.height = 24;
    this.x = 70;
    this.y = 70;
    this.v = 0;
    this.a = 0.4;

    this.flap = function() {
        if (keyIsPressed === true) {
            this.v = -6;
            keyIsPressed = false;
        };
    };

    this.overcome = function() {
        if (pipes[0].xup <= this.x - pipes[0].width - this.width/2 && check) {
            check = false;
            return true;
        };
    };

    this.update = function() {
        this.flap();
        this.v += this.a;
        this.y += this.v;

        if (this.overcome()) {
            score++;
        };
    };

    this.dead = function() {
        
    };    

    this.show = function() {        
        this.update();
        image(birdImage, this.x, this.y);
    };    
};

function Pipe() {
    this.width = 52;
    this.height = 320;    
    this.x = w;
    this.yup = floor(random(-0.55*this.height, -0.35*this.height));
    this.hup = this.height + this.yup;
    this.ydow = this.hup + hole;

    this.pipeUp = loadImage('/image/pipe-green-2.png');
    this.pipeDow = loadImage('/image/pipe-green.png');

    this.update = function() {
        this.x -= speed;        
    };

    this.show = function() {
        this.update();
        image(this.pipeDow, this.x, this.ydow);
        image(this.pipeUp, this.x, this.yup);
    };

    this.overBackground = function() {
        if (this.x < -this.width) {
            check = true;
            return true;
        } ;
    };
};

function Base() {
    this.width = 336;
    this.height = 112;
    this.x = 0;

    this.update = function() {
        if (this.x < -this.width) {
            this.x = 0;
        }
        this.x -= speed;
    };

    this.show = function() {
        this.update();
        image(baseImage, this.x, h - 70);
        image(baseImage, this.width + this.x, h - 70);
    };
};

function Background() {
    this.x = 0;
    this.width = 288;
    this.height = 512;

    this.update = function() {
        if (this.x < -this.width) {
            this.x = 0;
            console.log('bg');
        }
        this.x -= 0.2;
    };

    this.show = function() {
        this.update();
        image(bgImage, this.x, 0);
        image(bgImage, this.width + this.x, 0);
    };
};

function gameover() {
    frameRate(0);
};
