"""
Program to animate a Pacman character.
"""

from pgl import GWindow, GArc, GOval, GLine, GRect

GW_WIDTH = 900
GW_HEIGHT = 400
PACMAN_RADIUS = 50
PILL_RADIUS = 10
PACMAN_SPEED = 2


def pacman():
    """Draws and animates a pacman across the screen"""

    def setup_scene():
        """
        Creates the scene, including the background, the corridor walls, and
        the yellow pills.

        Returns the background object for later comparisons to ensure that the
        background is not removed.
        """
        midx, midy = GW_WIDTH / 2, GW_HEIGHT / 2
        # Creating the background
        bg = GRect(GW_WIDTH,GW_HEIGHT)
        bg.set_filled(True)
        bg.set_color("black")
        gw.add(bg)
        # Creating the corridor walls
        for shift in range(-1, 2, 2):
            line = GLine(
                0,
                midy + shift * PACMAN_RADIUS * 1.25,
                GW_WIDTH,
                midy + shift * PACMAN_RADIUS * 1.25,
            )
            line.set_color("blue")
            line.set_line_width(10)
            gw.add(line)
        # Creating the pills
        y = GW_HEIGHT / 2 - PILL_RADIUS
        for x in range(20, GW_WIDTH, 100):
            if x < midx - PACMAN_RADIUS or x > midx + PACMAN_RADIUS:
                pill = GOval(x, y, 2 * PILL_RADIUS, 2 * PILL_RADIUS)
                pill.set_filled(True)
                pill.set_color("yellow")
                gw.add(pill)
        return bg


    gw = GWindow(GW_WIDTH, GW_HEIGHT)
    bg = setup_scene()


if __name__ == "__main__":
    pacman()
