---
title: "Section 07: Breaking Out Pacman"
author: Jed Rembold and Eric Roberts
date: "Week of October 16th"
slideNumber: true
theme: monokai
highlightjs-theme: monokai
width: 1920
height: 1080
transition: fade
css:
  - css/codetrace.css
  - css/roberts.css
content_url: https://github.com/rembold-cs151-master/Section07
---


## Pacman
- This week all problems will revolve around a single situation: simulating a very small portion of the classic arcade game Pacman
- Tasks will thus include:
  - Creating and adding a Pacman shape to the window
  - Getting Pacman to move
  - Implementing bouncing off the walls
  - Getting Pacman to "eat" the pills as he moves
  - (Optional) Getting Pacman's mouth to gobble as he moves
- These same tasks will also prove highly valuable when working through the Breakout Project!

## Part A: Creating Pacman
- The template file automatically creates the scene to below when run
- Your initial task is to add the classic yellow Pacman shape to the center of the screen
  - Consists of a circle missing a 90 deg segment centered on the positive x-axis
- Recall when working with `GArc`s how you need to specify the location! That will be important for getting Pacman properly centered

:::r-stack
![](./images/pacman_start.png)

![](./images/pacman_present.png){.fragment}

:::

## Part A: Pacman Created
```{.mypython style='max-height:800px'}
def create_pacman():
    pacman = GArc(
        GW_WIDTH / 2 - PACMAN_RADIUS,  #centered x
        GW_HEIGHT / 2 - PACMAN_RADIUS, #centered y
        2 * PACMAN_RADIUS,             #width
        2 * PACMAN_RADIUS,             #height
        45,                            #starting angle
        270,                           #sweep angle
    )
    pacman.set_filled(True)
    pacman.set_fill_color("yellow")
    return pacman

pacman = create_pacman()
gw.add(pacman)
```

## Part B: Moving Pacman
- The next task is to get Pacman moving!
- Create a `step` callback function and define an interval event listener to call that function every 20 ms
- Each time the `step` function is called, it should move Pacman forward (to the right) by the number of pixels indicated by the provided constant


## Part B: Pacman Moved
```{.mypython style='max-height:800px'}
def step():
    pacman.move(PACMAN_SPEED, 0)

gw.set_interval(step, 20)
```


## Part C: Bouncing Pacman
:::{style='font-size:.9em'}
- Currently, Pacman will just move off the right side of the screen, which is not ideal. Instead we want Pacman to reverse direction at the wall
- Will thus need to keep track of Pacman's current direction somehow
  - This will need to be updated or set within the `step` callback function, so it **must** be added as an attribute to the `GWindow` (`gw`)
- Update the movement in your `step` function to use this new variable
- Add a conditional check to see if an edge of Pacman has extended beyond an edge of the screen, and reverse the direction if so
- You can also use the `set_starting_angle` and `get_starting_angle` methods for `GArc`s to flip Pacman around to face the other direction!
:::


## Part C: Pseudo Bouncing
- In pseudocode, you might have something like:
```mypython
def step():
    pacman.move(|||something involving the direction|||, 0)

    if |||left or right edge of Pacman extends off screen|||:
        |||reverse Pacman direction by switching direction variable value|||
        |||turn Pacman around by changing starting angle of arc|||

|||initialize direction variable|||
gw.set_interval(step, 20)
```

## Part C: Pacman Bounced
```{.mypython style='max-height: 800px; font-size:.8em'}
def step():
    pacman.move(gw.dx, 0)
    if (pacman.get_x() + 2 * PACMAN_RADIUS > GW_WIDTH #right edge
        or pacman.get_x() < 0 #left edge
       ):
        gw.dx *= -1 #flip it
        pacman.set_start_angle(pacman.get_start_angle() + 180)

pacman = create_pacman()
gw.dx = PACMAN_SPEED
gw.set_interval(step, 20)
```

## Part D: Hungry Pacman
- At the moment Pacman just moves over the yellow pills: we'd like to change that so that they actually disappear as Pacman moves over them
- You can remove anything from the `GWindow` with `gw.remove(obj)`, but that requires you to have a variable `obj` that was assigned your particular `GObject`.
  - Here we have named variables for pacman (`pacman`) and for the background colored rectangle (`bg`), but not the pills!
- So a method is needed to retrieve a `GObject` that has already been added to the window
  - The most obvious of these is the `.get_element_at(x,y)` method for GWindows.


## Part D: Getting Elements
- You provide `.get_element_at(x,y)` a pair of coordinates, $x$ and $y$
  - If there is a `GObject` at that location, it will return it to you! So save that object in a variable!
  - If there is no object at that location, it will return `None`
- You can then use any returned object exactly as you would had you assigned it to a variable initially, including removing it from the window!
```mypython
>>> leftmost_pill = gw.get_element_at(20, 200)
>>> print(leftmost_pill)
GOval(20, 190.0, 20, 20)
```

## Part D: Pacman's Mouth
::::::cols
::::{.col style='font-size:.85em; flex-grow:1.25'}
- Here we want to remove a pill whenever it gets halfway into Pacman's mouth, as indicated in the image to the right.
- The x and y values of this position will depend on the current position of Pacman, so think about how you could work out where this point is in the window.
- Keep in mind that the object (if any) returned by `.get_element_at` is just the topmost object found at that location. So often times you might want to do a comparison afterwards with an `if` statement to ensure it is the object you are interested in.
::::

::::col

![](./images/pacman_mouth.svg)

::::
::::::


## Part D: Hunger Satiated
```{.mypython style='max-height:850px;'}
def step():
    ...
    # Adjusting for which side mouth is on
    if gw.dx > 0:
        x = pacman.get_x() + PACMAN_RADIUS * 1.5
    else:
        x = pacman.get_x() + PACMAN_RADIUS * 0.5
    y = pacman.get_y() + PACMAN_RADIUS
    # Getting anything there
    obj = gw.get_element_at(x,y)
    # Removing that thing if present and if it isn't the bg
    if obj is not None and obj is not bg:
        gw.remove(obj)
    ...
```

## <i class='fa-solid fa-trophy fa-beat'></i> Challenge!
- Currently, Pacman's mouth doesn't move
- Add code to cause Pacman's mouth to repeatedly open and close by adjusting the starting angle and sweep angle every step
- You'll need to adjust both angles in tandem to achieve a symmetric opening and closing of the mouth
