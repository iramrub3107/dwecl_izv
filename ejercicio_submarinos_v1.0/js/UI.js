export const UI = {
    juego: null,
    casillas: [],
    total: 0,

    control: {
        status: null
    },

    init(domControl) {
        UI.control.status = document.getElementById(domControl.status);
    },

    //Comenzamos el juego, y declaramos el texto que aparece debajo del tablero
    start(juego) {
        UI.juego = juego;
        UI.changeStatus("El juego ha comenzado. Mucha suerte!");
    },

    //Aquí cambiamos el texto del juego para que diga si nos hemos equivocado o no haciendo clic en una casilla
    changeStatus(text) {
        UI.control.status.textContent = text;
    },

    //Aquí se crea la interfaz del tablero con el cual nos pondremos a jugar
    tableroSubmarino(total) {
        const plantilla = document.getElementById("template-tablero");
        const tablero = document.getElementById("tablero");

        UI.total = total;
        UI.casillas = [];

        tablero.style.gridTemplateColumns = `repeat(${total}, 1fr)`;

        for (let i = 0; i < total * total; i++) {
            const clon = plantilla.content.cloneNode(true);
            const casilla = clon.querySelector(".casilla");

            casilla.dataset.index = i;

            UI.casillas.push(casilla);
            tablero.appendChild(clon);
        }
    }
};