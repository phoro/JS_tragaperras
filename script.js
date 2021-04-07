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
    const FRUTAS = ['./issue/img/0_zanahoria.png', './issue/img/1_aguacate.png', './issue/img/2_ajo.png', './issue/img/3_cebolla.png', './issue/img/4_pepino.png', './issue/img/5_puerro.png','issue/img/6_tomate.png'];

    // Elements del DOM
    const slot1 = document.getElementById("slot1");
    const slot2 = document.getElementById("slot2");
    const slot3 = document.getElementById("slot3");

    const monedero_vista = document.getElementById("monedero");
    const boto_exit = document.getElementById("exit");
    const boto_addcash = document.getElementById("addcash");
    const boto_play = document.getElementById("play");
    const llista = document.getElementById("ul_llista");

    var pista1 = document.getElementById("pista1");
    var pista2 = document.getElementById("pista2");

    // Moneder de l'aplicació
    var monedero;

    /**
     * Funció principal del joc.
     * Obté un combinació aleatòria, mostra les fruites i atorga premis
     */
    function juga() {
        let combinacio = [];
        let so_juga = 'issue/sounds/mixkit-video-game-mystery-alert-234.wav';

        sona(so_juga, 1);

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
        let zanahoria = 0, aguacate = 0, ajo = 0, cebolla = 0, pepino = 0, puerro = 0, tomate = 0;

        //Conta les aparicions
        combinacio.forEach(function (numero) {
            if (numero === 0) { zanahoria++; };
            if (numero === 1) { aguacate++; };
            if (numero === 2) { ajo++; };
            if (numero === 3) { cebolla++; };
            if (numero === 4) { pepino++; };
            if (numero === 5) { puerro++; };
            if (numero === 6) { tomate++; };
        });

        //Concedeix els premis
        if (zanahoria != 0) { // premis amb zanahoria

            afegeixLlista("Premio!");
            if (zanahoria === 1) {
                if (aguacate > 1 || ajo > 1 || cebolla > 1 || pepino > 1 || puerro > 1 || tomate > 1) {
                    afegeixDiners(3);
                } else {
                    afegeixDiners(1);
                }
            }
            else if (zanahoria === 2) { afegeixDiners(4) }
            else { { afegeixDiners(10) } }
        } else { //premis sense zanahoria
            if (aguacate > 1 || ajo > 1 || cebolla > 1 || pepino > 1 || puerro > 1 || tomate > 1) {

                afegeixLlista("Premio!");
                if (aguacate > 2 || ajo > 2 || cebolla > 2 || pepino > 2 || puerro > 2 || tomate > 2) {
                    //Tres iguals
                    afegeixDiners(5);
                } else {
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
        const NUM_MAXIM_OPCIONS = 7;
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
        let so_diners;

        if (tragaperras_UF3.monedero === 0) {//si s'afegeix diners per primer cop
            so_diners = 'issue/sounds/mixkit-winning-a-coin-video-game-2069.wav';
        } else {
            so_diners = 'issue/sounds/mixkit-winning-chimes-2015.wav';
        }

        tragaperras_UF3.monedero += quantitat;
        afegeixLlista("Has añadido " + quantitat + "€. Tienes " + tragaperras_UF3.monedero + "€");
        actualitzaUI();
        sona(so_diners, 2);
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
     * Reprodueix un recurs d'audio. Té dues pistes
     * @param {*} src uri del recurs
     * @param {*} pista número de pista
     */
    function sona(src, pista) {
        if (pista === 1) {
            pista1.src = src;
            pista1.play();
        } else {
            pista2.src = src;
            pista2.play();
        }
    }

    /**
     * Inicialització de paràmetres.
     */
    function inicialitzacio() {//inicialització
        tragaperras_UF3.monedero = 0;
        boto_exit.disabled = true;
        boto_play.disabled = true;
        pista1.hidden = true;
        pista2.hidden = true;
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