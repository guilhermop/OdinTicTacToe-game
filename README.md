TThe goal was to practice organizing code using factory functions and the module pattern (IIFE), keeping global scope as clean as possible.

Features

2-player local gameplay
Win and tie detection
Restart button to reset the round
Cyberpunk visual theme with neon glows and scanline effects
Responsive layout


 Concepts Practiced

Factory functions — Gameboard() and Player() are factories that return objects without using new


IIFE / Module pattern — GameController and DisplayController are wrapped in IIFEs so only one instance ever exists and internals stay private


Separation of concerns — game logic lives in GameController, DOM logic lives in DisplayController, they communicate through a clean public API


DOM manipulation — rendering board state, handling click events, updating status text


Built With
HTML5
CSS3 (custom properties, grid, animations)
JavaScript (ES6+)
Orbitron & Share Tech Mono — Google Fonts
