/*
* Justin Stitt --- CPSC 335 --- 02/02/2021
* note: I decided to scrap the code you gave us and go for a more OOP approach. I hope this is okay. 
* another note: my javascript is quite bad, I did the best I could.
*/

// globals
const CELL_SIZE = 10;
const ROWS      = 48;
const COLS      = 64;

const color = ['black', 'red', 'yellow', 'blue'];
const bitvector_codex = [1, 0, 2, 1] // base 3 bit-vector

let frame        =  0;// monotonic increasing (+)
let frame_buffer = 30;// update frequency control
let stats        = true;// show stats?
let show_ant     = false;//show ant?

//p5.js bootstrapping
function setup(){
    let width  = CELL_SIZE * COLS 
    let height = CELL_SIZE * ROWS
    createCanvas(width, height);
    // slider + label
    textSize(32);
    let label = createDiv('Speed');
    label.id('label');
    sSlider = createSlider(0, frame_buffer - 1, frame_buffer);
    let ruleset = createDiv('RULESET:  0 = turn right | 1 = turn left |\
                            2 = enter countdown state (going straight for a bit)');
    ruleset.id('label');
    //checkboxes
    toggleStats = createCheckbox('show stats?', true);
    toggleStats.changed(toggle_stats);
    toggleAnt   = createCheckbox('show ant?', false);
    toggleAnt.changed(toggle_ant);
}

/**
 * Ant class is our agent that acts in its environment
 * has pos and dir and other state properties
 */
class Ant{
    constructor(r, c, man){
        this.pos   = [r, c]; // relative grid positioning
        this.dir   = 0;      // cardinal: 0->north | 1->east | 2->south | 3->west
        this.man   = man;    // instance of manager (singleton)
        this.mode  = 0;      // swap mode = 0, set_count mode = 1, countdown mode = 2
        this.count = 0;      // for countdown mode
    }
    move(){
        this.check_rule();
        if(this.dir == 0) this.pos[0] += -1;
        if(this.dir == 1) this.pos[1] +=  1;
        if(this.dir == 2) this.pos[0] +=  1;
        if(this.dir == 3) this.pos[1] += -1;
        this.check_bounds();
    }
    check_bounds(){// wrap-around
        if(this.pos[0] < 0) this.pos[0] = ROWS - 1;
        if(this.pos[1] < 0) this.pos[1] = COLS - 1;
        this.pos[0] %= ROWS;
        this.pos[1] %= COLS;
    }
    check_rule(){
        let _cell  = this.man.cells[this.pos[0]][this.pos[1]]
        let _codex = bitvector_codex[_cell.color];

        if(this.mode == 0){
            if     (_codex == 0) this.dir += 1;
            else if(_codex == 1) this.dir -= 1;
            else if(_codex == 2) this.mode = 1;
        }
        else if(this.mode == 1) { this.count = _codex; this.mode = 2; }
        else if(this.mode == 2) {// countdown mode
            if(this.count <= 0) this.mode      = 0; // back to LR mode
            else                this.count    -= 1;    // decrease count
        }
        if(this.dir < 0) this.dir = 3;
        this.dir    %= 4;            // keep cardinal wrap around for direction
        _cell.color += 1;            // inc color
        _cell.color %= color.length; // wrap-around coloring
    }
}

/**
 * A Cell is an object with 2 attributes: position and color.
 * The former being static and the latter being dynamic based on game state
 */
class Cell{
    constructor(r, c){
        this.pos   = [r, c];
        this.color = 0; // default color
    }
    draw(){
        fill(color[this.color]) // global color lookup
        let realised = [this.pos[1] * CELL_SIZE, this.pos[0] * CELL_SIZE]; // actual rendered pos
        rect(...realised, CELL_SIZE, CELL_SIZE); // utilization of 'splat' operator to expand iterable
    }
}

/**
 * Manager class handles the update/draw loop of our grid of cells -- aptly named 'cells'
 */
class Man{
    constructor(){
        this.cells = [];
        this.setup();
        /* setup ant agent */
        this.ant = new Ant(ROWS/2, COLS/2, this); // middle-ish
    }
    setup(){// man setup to create rxc grid of Cell objects
        /* setup grid (2d matrix) */
        for(let r = 0; r < ROWS; ++r){
            this.cells.push([]);
            for(let c = 0; c < COLS; ++c){
                this.cells[r].push(new Cell(r, c));
            }
        }
    }
    draw_grid(){// draw all Cell objects
        // move ant and check rule first!
        this.ant.move();
        for (let x = 0; x < ROWS; ++x){
            for (let y = 0; y < COLS; ++y){
                this.cells[x][y].draw();
            }
        }
        if(show_ant){
            let realised = [this.ant.pos[1] * CELL_SIZE, this.ant.pos[0] * CELL_SIZE]; // actual rendered pos
            fill('white'); // ant color
            rect(...realised, CELL_SIZE, CELL_SIZE); // utilization of 'splat' operator to expand iterable
        }
    }
}

function toggle_stats(){stats = !stats;}
function toggle_ant(){show_ant = !show_ant;}

function show_stats(){
    /* draw a frame counter onto our canvas (flavor) */
    _ant = manager.ant;
    textSize(32);
    fill(100);
    text(`frame: ${frame}`, 8, 32);
    textSize(16);
    fill(200);
    text(`dir: ${_ant.dir}`, 8, 450); // show current direction of ant
    let isCountdown = _ant.mode == 2 ? true : false;
    let showCount = isCountdown ? `| count: ${_ant.count}` : '';
    text(`countdown mode: ${isCountdown} ${showCount}`, 8, 475); // show if in countdown mode and current count iff
}

const manager = new Man();// having manager as a global is pretty bad... but I don't like javascript so I break rules.

function draw()//p5.js update loop
{
    frame += 1;// increment frame count (exhaust frame buffer)
    
    if(frame % (frame_buffer - sSlider.value()) == 0){// update display once our frame buffer is exhausted
        manager.draw_grid();
        if(stats) show_stats();
    }
}
// fin