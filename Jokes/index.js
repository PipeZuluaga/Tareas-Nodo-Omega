/*
Para resolver el ejercicio necesitamos:
1. Obtener el chiste.
2. Renderizar el chiste en el HTML dependiendo de si es un "Two Part" o "Single"
    - Si es single, sólo deberíamos ver el chiste.
    - Si es un "Two Part" deberíamos ver la primera línea del chiste, seguido de un botón de detalle que me permita revelar la segunda parte del chiste.
    - Sólo se debe de mostrar el detalle del chiste una vez.
    - Cada uno de los botones debe de tener una función definida.
3. Mejorar el diseño sin afectar la funcionalidad del aplicativo. Use su creatividad. Puede utilizar librerías externas.
    
Si existen dudas al respecto del ejercicio por favor diríjanlas a través del Discord.
Adjunto dos imágenes básicas de como se ve el ejercicio final. 

*/
const BASE_URL = "https://v2.jokeapi.dev/joke/Any?lang=es"; // URL BASE PARA EL EJERCICIO :)

let Joketext = document.querySelector(".joke_single");
let Joketexttwopart = document.querySelector(".joke_twoparts");
let buttonInfo = document.querySelector(".btn-info");
let jokeData = null;
let revealButton = null;

const getJoke = async () => {
    const response = await fetch(BASE_URL);
    const data = await response.json();
    return data;
};

const createJoke = async () => {
    jokeData = await getJoke();

    Joketext.innerHTML = "";
    Joketexttwopart.innerHTML = "";

    if (revealButton) {
        revealButton.remove();
        revealButton = null;
    }

    if (jokeData.type === "single") {
        Joketext.innerHTML = jokeData.joke;
        Joketexttwopart.style.display = "none";
    } else if (jokeData.type === "twopart") {
        Joketext.innerHTML = jokeData.setup;
        Joketexttwopart.style.display = "block";

        revealButton = document.createElement("button");
        revealButton.innerText = "Ver la segunda parte";
        revealButton.classList.add("btn", "btn-primary", "btn-lg", "mt-3");
        revealButton.addEventListener("click", revealSecondPart);
        Joketexttwopart.appendChild(revealButton);
    }
};

const revealSecondPart = () => {
    if (jokeData && jokeData.type === "twopart") {
        Joketexttwopart.innerHTML = jokeData.delivery;
    }
};

buttonInfo.addEventListener("click", createJoke);

createJoke(); 
