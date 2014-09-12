* Powerups
 * One of each per level, player chooses when to use each
 * Earthball
  * Captured by paddle (as with a new ball) rather than bouncing off it
  * Moves slightly slower than a regular ball
  * Expires when failed to be caught by the paddle (but doesn't lose a life)
 * Airball:
  * Passes through each block playing its note but not hitting it
  * Moves slightly faster than a regular ball
  * Expires when failed to be caught by the paddle (but doesn't lose a life)
 * Fireball
  * Wildcard hitting any block regardless of note
  * Expires when failed to be caught by the paddle (but doesn't lose a life)
  * Moves much faster than a regular ball, so harder to catch
 * Wave
  * Like airball but plays all notes in a column above the paddle
  * Fixed to the paddle like a new ball
  * Expires after a timeout (e.g., like a stream growing from paddle to top of screen then being cut off at source)

* Movement
 * Paddle accelerates to a maximum velocity
 * New ball starts locked to paddle until released (by spacebar), getting horizontal speed from paddle
 * Angle of ball bouncing of paddle: Make paddle act as slightly convex

TODO:
 * Levels
 * Tutorial
 * Paddle acceleration
 * Paddle imparting momentum to ball on launch
 * Help screen
 * Par times (gold/silver/bronze) for levels
 * Local storage for level progress