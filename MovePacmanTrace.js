


"use strict";

const GW_WIDTH = 900;
const GW_HEIGHT = 400;
const PACMAN_RADIUS = 50;
const PILL_RADIUS = 10;
const PACMAN_SPEED = 2;

function MovePacmanDemo() {
    new MovePacmanSim();
}

class MovePacmanSim extends CodeTrace {
    constructor() {
        super("MovePacmanSim")
        let gw = this.installGWindow("PacmanMoveCanvas");
        this._gw = gw;
        this.reset();
        gw.setInterval(step, 20);

        function step() {
            gw._pacman.move(gw._vel, 0);
            if (gw._pacman.getX() > 1000) {
                gw._pacman.setLocation(
                    GW_WIDTH / 2 - PACMAN_RADIUS,
                    GW_HEIGHT / 2 - PACMAN_RADIUS,
                )
            }
        }

    }

    setup_scene() {
        let gw = this._gw;
        let midx = GW_WIDTH / 2;
        let midy = GW_HEIGHT / 2;

        //Background
        let background = GRect(GW_WIDTH, GW_HEIGHT);
        background.setFilled(true);
        gw.add(background);

        //Corridor walls
        for (let shift=-1; shift < 2; shift += 2) {
            let line = GLine(0, midy + shift * PACMAN_RADIUS * 1.25, GW_WIDTH, midy + shift * PACMAN_RADIUS * 1.25);
            line.setColor("blue");
            line.setLineWidth(10);
            gw.add(line);
        }

        //Pills
        let y = GW_HEIGHT / 2 - PILL_RADIUS;
        for (let x=20; x < GW_WIDTH; x += 100) {
            if ((x < GW_WIDTH / 2 - PACMAN_RADIUS) || (x > GW_WIDTH / 2 + PACMAN_RADIUS)) {
                let pill = GOval(x, y, 2 * PILL_RADIUS, 2 * PILL_RADIUS);
                pill.setFilled(true);
                pill.setColor("yellow");
                gw.add(pill);
            }
        }
    }

    draw_pacman() {
        let gw = this._gw;

        let pacman = GArc(
            GW_WIDTH / 2 - PACMAN_RADIUS,
            GW_HEIGHT / 2 - PACMAN_RADIUS,
            2 * PACMAN_RADIUS,
            2 * PACMAN_RADIUS,
            45,
            270
        );
        pacman.setFilled(true);
        pacman.setFillColor("yellow");
        gw._pacman = pacman;
        gw.add(pacman);
    }

    reset() {
        let gw = this._gw;
        gw.clear();
        this.setup_scene();
        this.draw_pacman();
        gw._vel = PACMAN_SPEED;
    }
}
