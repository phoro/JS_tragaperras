/**
 * @fileoverview Aplicació encapsulada 'TragaPerras'
 * @author Robert Guiral
 * 
 * Màquina escurabutxaques
 */



/**
 * Espai de noms de l'aplicació.
 * Encapsulament.
 * @returns funcions accessibles:
 *  + play() Funció principal del joc. Permet jugar.
 *  + mostraWallet() Mostra el contingut del monedero en un 'alert'.
 *  + afegeixDiners() Afegeix monedes al monedero.
 *  + inicia() Inicialització de paràmetres.
 */
var tragaperras_UF3 = function () {

    //Array amb les imatges de les fruites
    const FRUTAS = ['./issue/img/1_cereza.svg', './issue/img/2_pina.svg', './issue/img/3_limon.svg', './issue/img/4_fresa.svg', './issue/img/5_platano.svg', './issue/img/6_naranja.svg'];

    // Elements del DOM
    const slot1 = document.getElementById("slot1");
    const slot2 = document.getElementById("slot2");
    const slot3 = document.getElementById("slot3");

    const monedero_vista = document.getElementById("monedero");
    const boto_exit = document.getElementById("exit");
    const boto_addcash = document.getElementById("addcash");
    const boto_play = document.getElementById("play");
    const llista = document.getElementById("ul_llista");

    // Moneder de l'aplicació
    var monedero;

    /**
     * Funció principal del joc.
     * Obté un combinació aleatòria, mostra les fruites i atorga premis
     */
    function juga() {
        let combinacio = [];
        if (tragaperras_UF3.monedero >= 1) {
            tragaperras_UF3.monedero -= 1;
            afegeixLlista("Has gastado 1€. Tienes " + tragaperras_UF3.monedero + "€");
            actualitzaUI();
            combinacio = generaCombinacio();
            colocaFrutas(...combinacio);
            analitzaJugada(combinacio);
        }
    }

    /**
     * Troba els premis en la combinació i ajusta monedero si cal
     * @param {*} combinacio array amb tres valors corresponents als índexs de l'array de fruites 
     */
    function analitzaJugada(combinacio) {
        let cereza = 0, pina = 0, limon = 0, fresa = 0, platano = 0, naranja = 0;

        //Conta les aparicions
        combinacio.forEach(function (numero) {
            if (numero === 0) { cereza++; };
            if (numero === 1) { pina++; };
            if (numero === 2) { limon++; };
            if (numero === 3) { fresa++; };
            if (numero === 4) { platano++; };
            if (numero === 5) { naranja++; };
        });

        //Concedeix els premis
        if (cereza != 0) { // premis amb cereza
            afegeixLlista("Premio!");
            if (cereza === 1) {
                if (pina > 1 || limon > 1 || fresa > 1 || platano > 1 || naranja > 1) {
                    afegeixDiners(3);
                } else {
                    afegeixDiners(1);
                }
            }
            else if (cereza === 2) { afegeixDiners(4) }
            else { { afegeixDiners(10) } }
        } else { //premis sense cereza
            if (pina > 1 || limon > 1 || fresa > 1 || platano > 1 || naranja > 1) {
                afegeixLlista("Premio!");
                if (pina > 2 || limon > 2 || fresa > 2 || platano > 2 || naranja > 2) {
                    //Tres iguals
                    afegeixDiners(5);
                } else{
                    //Dos iguals
                    afegeixDiners(2);
                }
            }
        }
    }

    /**
     * Afegeix a la 'ul' del DOM un element 'li' amb el text aportat.
     * @param {*} text text informatiu que cal mostrar a l'usuària
     */
    function afegeixLlista(text) {
        let li = document.createElement("li");
        li.innerHTML = text;
        llista.appendChild(li);
    }

    /**
     * Mostra el contingut del monedero en un 'alert'.
     */
    function mostraWallet() {
        alert("Monedas Totales: " + tragaperras_UF3.monedero);
    }

    /**
     * Genera una combinació aleatòria de tres números.
     * @returns Array amb tres valors aleatoris
     */
    function generaCombinacio() {
        const NUM_MAXIM_OPCIONS = 6;
        let combinacio = [];

        for (let i = 0; i < 3; i++) {
            combinacio.push(Math.floor(Math.random() * NUM_MAXIM_OPCIONS));
        }
        return combinacio;
    }

    /**
     * Disposa les imatges corresponents en els slots de la UI.
     * @param {*} a posició array fruites per slot 1
     * @param {*} b posició array fruites per slot 2
     * @param {*} c posició array fruites per slot 3
     */
    function colocaFrutas(a, b, c) {
        slot1.src = FRUTAS[a];
        slot2.src = FRUTAS[b];
        slot3.src = FRUTAS[c];
    }

    /**
     * Afegeix monedes al monedero.
     * @param {*} quantitat Monedes per afegir al monedero
     */
    function afegeixDiners(quantitat = 10) {
        //TODO

        tragaperras_UF3.monedero += quantitat;
        afegeixLlista("Has añadido " + quantitat + "€. Tienes " + tragaperras_UF3.monedero + "€");
        actualitzaUI();
    }

    /**
     * Disposa la UI d'acord al moment del joc.
     * Informa quantitat de monedero actual.
     * Habilita/Deshabilita interacció de l'usuària.
     * Cridem aquesta funció cada cop que hi ha moviment de diners i/o entrades a l'historial
     */
    function actualitzaUI() {
        monedero_vista.innerHTML = formateaMonedero();
        if (tragaperras_UF3.monedero <= 0) {
            boto_exit.disabled = true;
            boto_play.disabled = true;
            boto_addcash.disabled = false;
        } else {
            boto_exit.disabled = false;
            boto_addcash.disabled = true;
            boto_play.disabled = false;
        }
    }

    /**
     * Aplica format al monedero per la UI.
     * @returns cadena monedero en format de 4 xifras
     */
    function formateaMonedero() {
        const NUM_CIFRAS = 4;
        let fmonedero = tragaperras_UF3.monedero.toString();// Int to String
        let amonedero = fmonedero.split(""); // String to Array

        while (NUM_CIFRAS - amonedero.length > 0) {
            amonedero.unshift("0");
        }
        amonedero.push(" €");
        return amonedero.join('');
    }

    /**
     * Inicialització de paràmetres.
     */
    function inicialitzacio() {//inicialització
        tragaperras_UF3.monedero = 0;
        boto_exit.disabled = true;
        boto_play.disabled = true;
    }

    // Funcions accessibles des de crides externes
    return {
        play: juga,
        mostraWallet: mostraWallet,
        afegeixDiners: afegeixDiners,
        inicia: inicialitzacio
    }
}

/**
 * Funció autoexecutable.
 * Es crida a sí mateixa al carregar l'script.
 * Inicialitza l'aplicació
 */
var init_tragaperras_UF3 = (function () {
    tragaperras_UF3().inicia();
})();