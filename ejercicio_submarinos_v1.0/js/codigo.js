import { UI } from "./UI.js";
import { JuegoSubmarino } from "./JuegoSubmarino.js";

// Aquí le asignamos el tamaño al tablero
UI.tableroSubmarino(6);

UI.init({
    status: "gameStatus"
});

//Iniciamos el juego, el cual se encuentra en UI y JuegoSubmarino
const gameInstance = new JuegoSubmarino(UI);