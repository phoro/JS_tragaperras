
var tragaperras_UF3 = function () {

    const FRUTAS = ['./issue/img/1_cereza.svg', './issue/img/2_pina.svg', './issue/img/3_limon.svg', './issue/img/4_fresa.svg', './issue/img/5_platano.svg', './issue/img/6_naranja.svg'];

    const slot1 = document.getElementById("slot1");
    const slot2 = document.getElementById("slot2");
    const slot3 = document.getElementById("slot3");

    const monedero_vista = document.getElementById("monedero");
    const boto_exit = document.getElementById("exit");
    const boto_addcash = document.getElementById("addcash");
    const boto_play = document.getElementById("play");

    var monedero;


    function juga() {

        if (tragaperras_UF3.monedero >= 1) {
            tragaperras_UF3.monedero -= 1;
            actualitzaUI();

            colocaFrutas(...generaCombinacion());
        }
    }

    function mostraWallet() {
        alert("Monedas Totales: " + tragaperras_UF3.monedero);
    }

    function generaCombinacion() {
        const NUM_MAXIM_OPCIONS = 6;
        let combinacio = [];
        ;
        for (let i = 0; i < 3; i++) {
            combinacio.push(Math.floor(Math.random() * NUM_MAXIM_OPCIONS));
        }
        return combinacio;
    }

    function colocaFrutas(a, b, c) {
        //alert("a:" + a + "b:"+b + "c:"+c);
        slot1.src = FRUTAS[a];
        slot2.src = FRUTAS[b];
        slot3.src = FRUTAS[c];
    }

    function afegeixDiners() {
        //TODO
        tragaperras_UF3.monedero += 10;
        actualitzaUI();
    }
    // cridem aquesta funció cada cop que hi ha moviment de diners
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
     * Lee el monedero
     * @returns cadena monedero en formato de 4 cifras
     */
    function formateaMonedero() {
        const NUM_CIFRAS = 4;
        let fmonedero = tragaperras_UF3.monedero.toString();// Int to String
        let amonedero = fmonedero.split(""); // String to Array
        //alert("longitut inicial" + amonedero.length);

        while (NUM_CIFRAS - amonedero.length > 0) {
            //alert("longitut interna"  + amonedero.length);
            amonedero.unshift("0");
        }

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