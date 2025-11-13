export class JuegoSubmarino {

    //Declaramos variables necesarias para que funcione el juego
    constructor(UIControl) {
        this.UI = UIControl;

        this.total = this.UI.total;

        this.subPos = Math.floor(Math.random() * (this.total * this.total));

        this.UI.start(this);

        this.activarEventos();
    }

    activarEventos() {
        this.UI.casillas.forEach((casilla, index) => {
            casilla.addEventListener("click", () => {
                this.disparar(index);
            });
        });
    }

    //Ocultamos las casillas que ya se han hecho clic y cambiamos el texto de debajo del tablero, indicando si hemos acertado o no
    disparar(index) {
        this.UI.casillas[index].style.visibility = "hidden";

        if (index === this.subPos) {
            this.UI.changeStatus("Enhorabuena, has encontrado el submarino!!!");
            return;
        }

        this.UI.changeStatus("Fallaste, el submarino se ha movido");
        this.moverSubmarino();
    }

    //En caso de fallar, el submarino se moverá una casilla hacia cualquier dirección al azar
    moverSubmarino() {
        const total = this.total;
        const maxIndex = total * total - 1;

        let newPos = this.subPos;
        let intento = 0;

        while (true) {
            const dir = Math.floor(Math.random() * 4);
            const row = Math.floor(newPos / total);
            const col = newPos % total;

            let newRow = row;
            let newCol = col;

            switch (dir) {
                case 0: newRow = Math.max(0, row - 1); break; // arriba
                case 1: newRow = Math.min(total - 1, row + 1); break; // abajo
                case 2: newCol = Math.max(0, col - 1); break; // izquierda
                case 3: newCol = Math.min(total - 1, col + 1); break; // derecha
            }

            const candidato = newRow * total + newCol;

            // Aquí procuramos que el submarino no se vaya hacia una casilla ya oculta
            if (this.UI.casillas[candidato].style.visibility !== "hidden") {
                this.subPos = candidato;
                break;
            }

            // Y si ya no quedan casillas, evitamos un bucle infinito en donde nunca podremos "encontrar el submarino",
            //pudiendo terminar siempre el juego
            intento++;
            if (intento > 15) {
                break;
            }
        }
    }
}