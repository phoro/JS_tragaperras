
var tragaperras_UF3 = function () {

    const FRUTAS = ['./issue/img/1_cereza.svg', './issue/img/2_pina.svg', './issue/img/3_limon.svg', './issue/img/4_fresa.svg', './issue/img/5_platano.svg', './issue/img/6_naranja.svg'];

    const slot1 = document.getElementById("slot1");
    const slot2 = document.getElementById("slot2");
    const slot3 = document.getElementById("slot3");

    const monedero_vista = document.getElementById("monedero");
    const boto_exit = document.getElementById("exit");
    const boto_addcash = document.getElementById("addcash");
    const boto_play = document.getElementById("play");
    const llista = document.getElementById("ul_llista");

    var monedero;


    function juga() {

        let combinacio = [];
        if (tragaperras_UF3.monedero >= 1) {
            tragaperras_UF3.monedero -= 1;
            afegeixLllista("Has gastado 1€. Tienes " + tragaperras_UF3.monedero +"€");
            actualitzaUI();
            combinacio = generaCombinacion();
            colocaFrutas(...combinacio);
            analitzaJugada(combinacio);
        }
    }

    function analitzaJugada(combinacio) {
        //cereza
        let cereza = 0;
        combinacio.forEach(function (numero) {
            if (numero === 0) { cereza++; }
        });
        if (cereza != 0) {
            afegeixLllista("Premio!");
            if (cereza === 1) { afegeixDiners(1) }
            else if (cereza === 2) { afegeixDiners(4) }
            else { { afegeixDiners(10) } }
        }
    }

    function afegeixLllista(text) {
        let li = document.createElement("li");
        li.innerHTML=text;
        llista.appendChild(li);
    }

    function mostraWallet() {
        alert("Monedas Totales: " + tragaperras_UF3.monedero);
    }

    function generaCombinacion() {
        const NUM_MAXIM_OPCIONS = 6;
        let combinacio = [];
       
        for (let i = 0; i < 3; i++) {
            combinacio.push(Math.floor(Math.random() * NUM_MAXIM_OPCIONS));
        }
        return combinacio;
    }

    function colocaFrutas(a, b, c) {
        slot1.src = FRUTAS[a];
        slot2.src = FRUTAS[b];
        slot3.src = FRUTAS[c];
    }

    function afegeixDiners(quantitat = 10) {
        //TODO
        
        tragaperras_UF3.monedero += quantitat;
        afegeixLllista("Has añadido " + quantitat +"€. Tienes " + tragaperras_UF3.monedero +"€");
        actualitzaUI();
    }

    // cridem aquesta funció cada cop que hi ha moviment de diners
    // i/o entrades a l'historial
    function actualitzaUI() {
        //afegeixLllista("Tens " + tragaperras_UF3.monedero +"€");
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
     * Lee el monedero
     * @returns cadena monedero en formato de 4 cifras
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

    function inicialitzacion() {//inicialització
        tragaperras_UF3.monedero = 0;
        boto_exit.disabled = true;
        boto_play.disabled = true;
        //alert("inicialitzat ");
    }

    return {
        cridaExterna: juga,
        mostraWallet: mostraWallet,
        afegeixDiners: afegeixDiners,
        inicia: inicialitzacion
    }
}

//Funció autoexecutable que es crida a sí mateixa.
//al cargar el script 
var init_tragaperras_UF3 = (function () {
    tragaperras_UF3().inicia();
})();