Info--
CPSC-335-03 
Project # 1 -- Cella Larks Ant 34
Justin Stitt (flying solo, no team)
2/02/2021
-=-=--=-=--=-=--=-=--=-=--=-=--=-=--=-=--=-=--=-=-
Intro/Task--
Implement a more complex version of Langton's Ant that incorporates
multiple colors and a custom ruleset including the ability to go straight.
-=-=--=-=--=-=--=-=--=-=--=-=--=-=--=-=--=-=--=-=-
Dependencies--
 * browser supporting js and html5 (chrome, mozilla 11+)
 * 7zip, winrar or other file 'unzipper' software
 * p5.js (included in zip)
-=-=--=-=--=-=--=-=--=-=--=-=--=-=--=-=--=-=--=-=-
Building/Running--
1. Unzip 335-03-p1-Stitt.zip
2. open fresh browser instance
3. drop main-html file into browser
optional-
4. tinker with 'speed' slider to adjust frame buffering
5. toggle 'show stats' and 'show ant' to mess with eye-candy.
-=-=--=-=--=-=--=-=--=-=--=-=--=-=--=-=--=-=--=-=-
Features--
"Larks" ant that follows a trinary color ruleset. The standard Left and Right
direction changes are included alongside the ability to enter a "set-count" and
"countdown" mode which enables the ant to go straight for some time. The four colors
include are black, red, yellow, and blue with a ternary codex of [1,0,2,1] respectively.
You many adjust the speed from slow to fast using the included slider which allows for closer
analyzation of the ants journey! Also included are two checkboxes: (1) show stats and (2) show ant. 
These are "toggleable" and allow for the display of some eye-candy if-you-so desire. The ant will 
also wrap-around the borders of the finite plain which allows for essentially infinite iterations!
-=-=--=-=--=-=--=-=--=-=--=-=--=-=--=-=--=-=--=-=-
Bugs--
Well... the ant is technically a bug? So, there's that at least.
In all seriousness, there is not much room for programatic flaws which vastly limits 
the number of potential bugs. I suppose if you left the simulation run for 26 days you may 
run into an integer overflow on the 'frame' counter variable at around 2 billion.
-=-=--=-=--=-=--=-=--=-=--=-=--=-=--=-=--=-=--=-=-
fin.