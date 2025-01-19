// Ahora que tenemos nuestro HTML y CSS, es hora de darle vida con JavaScript <3

// 1. Seleccionar los elementos HTML que vamos a utilizar:
// - Imagen de los pokemon
// - Stats de cada uno
// Pista: revisa el método document.querySelector()

// Pokemon 1
let poke1ImgElement = document.querySelector(".pokemon-1__img");
let poke1HpElement = document.querySelector(".pokemon-1__hp");
let poke1NameElement = document.querySelector(".pokemon-1__name");
let poke1AttackElement = document.querySelector(".pokemon-1__attack");
let poke1DefenseElement = document.querySelector(".pokemon-1__defense");
let poke1TypeElement = document.querySelector(".pokemon-1__type");
// Pokemon 2
let poke2ImgElement = document.querySelector(".pokemon-2__img");
let poke2HpElement = document.querySelector(".pokemon-2__hp");
let poke2NameElement = document.querySelector(".pokemon-2__name");
let poke2AttackElement = document.querySelector(".pokemon-2__attack");
let poke2DefenseElement = document.querySelector(".pokemon-2__defense");
let poke2TypeElement = document.querySelector(".pokemon-2__type");

const ModalText=document.querySelector(".modal__text")
// 2 - Analizar la API de Pokemon :)
// - Haz un llamado a la URL https://pokeapi.co/api/v2/pokemon/ y analiza cómo devuelve su respuesta
// Al API retorna un pokemon https://pokeapi.co/api/v2/pokemon/{ID} si se provee un ID al final.
// Para enfrentar 2 pokemones aleatores, necesitamos hacer 2 llamados a la API con 2 n´¨úmeros aleatorios entre el 1 y el 900

// 3 - Crear una función que genere un número random entre 1 y 900.
// Puedes usar esta:
const getRandomNumber = (numMin, numMax) => {
  return Math.floor(Math.random() * (numMax - numMin + 1) + numMin);
};

// 4 - Asignar un número random al ID de los que serán nuestros pokemons
// Declara 2 variables para cada pokemon y guarda los números que retorna la funci´øn en ellos

const poke1ID = getRandomNumber(1, 900);
const poke2ID = getRandomNumber(1, 900);

// 5 - Crear una función para traer (fetch) data de la API
// Dale una mirada a la función fetch -> https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API
// Recuerda la URL de la API https://pokeapi.co/api/v2/pokemon/${pokeID}

const getPokemon = async (pokeID) => {
  const response = await fetch(` https://pokeapi.co/api/v2/pokemon/${pokeID}`);
  const data = await response.json();
  return data;
};

// 6 - Crear los pokemons. Haz varias pruebas a las API para examinar bien qué devuelve, esa data
// será necesaria para popular nuestros elementos HTML
// Crea una función asíncrona que reciba los 2 ID de los pokemon
// Haz una llamada a la API por cada pokemon, guarda los datos que te devuelve en dos variables: pokemon1 y pokemon2
// - Toma los elementos HTML que seleccionamos más arriba y utiliza su propiendad innerHTML para añadir la info que necesitamos de la API

const createPokemons = async (poke1ID, poke2ID) => {
  const pokemon1 = await getPokemon(poke1ID);
  
  poke1ImgElement.src = pokemon1.sprites.other["official-artwork"]["front_default"];
  poke1NameElement.innerHTML += pokemon1.name;
  poke1HpElement.innerHTML += pokemon1.stats[0]["base_stat"];
  poke1AttackElement.innerHTML += pokemon1.stats[1]["base_stat"];
  poke1DefenseElement.innerHTML += pokemon1.stats[2]["base_stat"];
  poke1TypeElement.innerHTML += pokemon1.types[0].type.name;

  const pokemon2 = await getPokemon(poke2ID);

  poke2ImgElement.src = pokemon2.sprites.other["official-artwork"]["front_default"];
  poke2NameElement.innerHTML += pokemon2.name;
  poke2HpElement.innerHTML += pokemon2.stats[0]["base_stat"];
  poke2AttackElement.innerHTML += pokemon2.stats[1]["base_stat"];
  poke2DefenseElement.innerHTML += pokemon2.stats[2]["base_stat"];
  poke2TypeElement.innerHTML += pokemon2.types[0].type.name;

};

createPokemons(poke1ID,poke2ID);

const catchBtn = document.querySelector(".button__catch");
catchBtn.addEventListener("click", () =>{
  window.location.reload();
  //window.onload();
});


// BONUS 8 - Vamos a crear la función que permitirá que los pokemons interactúen y peleen

// 🎁 Bonus! - Vamos a crear la función fightPokemons que permitirá que los pokemons interactúen y peleen

// 1. Seleccionar los datos que ahora tenemos en el HTML y que trajimos desde la API: para ambos pokemon: HP, attack, defense y name.
const DatosPokemon1=async(poke1ID)=>{

  const pokemon1 = await getPokemon(poke1ID);
  namep = pokemon1.name;
  hp =  pokemon1.stats[0]["base_stat"];
  Attack=  pokemon1.stats[1]["base_stat"];
  Defense= pokemon1.stats[2]["base_stat"];
  const DatosP1 =[namep,hp,Attack,Defense];
  return DatosP1;
}

const DatosPokemon2= async (poke2ID)=>{
  const pokemon2= await getPokemon(poke2ID);
  namep = pokemon2.name;
  hp =  pokemon2.stats[0]["base_stat"];
  Attack=  pokemon2.stats[1]["base_stat"];
  Defense= pokemon2.stats[2]["base_stat"];
  const DatosP2 =[namep,hp,Attack,Defense];
  return DatosP2;
}

// 2. Crear una función que calcule el daño hecho a cada pokemon. Necesitamos el poder del atacante y la defensa y los HP del que defiende
// - Calcular el daño restando el ataque de la defensa, con esto definimos si el pokemon sufrió daño.
// - Calcular los nuevos HP: Si la defensa es menor a 0, significa que el ataque logró perforarla e hizo daño, en este caso vamos a restar el daño de los HP, si no, la HP debe quedar igual pues no hubo da˜ño
// En esta función vamos a devolver la nueva HP del pokemon atacado y además el da˜ñó que sufrió. - Luego vamos a necesitar estos datos -
const showModal = (text) => {
  const modal = document.querySelector(".modal");
  const modalText = document.querySelector(".modal__text");
  modalText.innerHTML = text;
  modal.style.display = "block"
  
}
const closeModal = () => {
  const modal = document.querySelector(".modal");
  modal.style.display = "none";
};
const closeModalBtn = document.querySelector(".button__modal");
closeModalBtn.addEventListener("click", closeModal);

const fightPokemons = async (poke1ID, poke2ID) => {
  const DatosP1 = await DatosPokemon1(poke1ID); 
  const DatosP2 = await DatosPokemon2(poke2ID);  

  const nameP1 = DatosP1[0];
  let HpP1 = DatosP1[1];
  const AtaqueP1 = DatosP1[2];
  const DefensaP1 = DatosP1[3];

  const nameP2 = DatosP2[0];
  let HpP2 = DatosP2[1];
  const AtaqueP2 = DatosP2[2];
  const DefensaP2 = DatosP2[3];

  let narracion = '';

  let DañoRecibidoP2 = DefensaP2 - AtaqueP1;

  if (DañoRecibidoP2 < 0) {
    HpP2 = HpP2 + DañoRecibidoP2;
    poke2HpElement.innerHTML = HpP2+ ` Daño recibido (${DañoRecibidoP2})`;
    narracion += `El Pokémon ${nameP1} ha perforado la defensa de ${nameP2}, recibiendo ${Math.abs(DañoRecibidoP2)} puntos de daño.\nSu vida ahora es de: ${HpP2}\n`;
  } else {
    narracion += `El Pokémon ${nameP1} no ha logrado perforar la defensa de ${nameP2}, por lo que no recibió daño.\n`;
  }

  let DañoRecibidoP1 = DefensaP1 - AtaqueP2;
  if (DañoRecibidoP1 < 0) {
    HpP1 = HpP1 + DañoRecibidoP1;
    poke1HpElement.innerHTML = HpP1 +` Daño recibido (${DañoRecibidoP1})`;
    narracion += `El Pokémon ${nameP2} ha perforado la defensa de ${nameP1}, recibiendo ${Math.abs(DañoRecibidoP1)} puntos de daño.\nSu vida ahora es de: ${HpP1}\n`;
  } else {
    narracion += `El Pokémon ${nameP2} no ha logrado perforar la defensa de ${nameP1}, por lo que no recibió daño.\n`;
  }

  if (DañoRecibidoP2 < DañoRecibidoP1) {
    narracion += `El Pokémon ${nameP1} ha hecho más daño y ha ganado!`;
  } else if (DañoRecibidoP1 < DañoRecibidoP2) {
    narracion += `El Pokémon ${nameP2} ha hecho más daño y ha ganado!`;
  } else if (DañoRecibidoP2==DañoRecibidoP1) {
    narracion += `Ambos pokemones recibieron el mismo daño, ¡es un empate!`;
  }

  showModal(narracion);
};

const FightBtn = document.querySelector(".button__fight");
FightBtn.addEventListener("click", () => {
  fightPokemons(poke1ID, poke2ID);
});

// 3. Narrar la batalla ;). Para esto vamos a usar el elemento modal__text, aquí vamos a ir llenando su innerHTML.
// Empecemos con el Pokemon 1.



// Ahora calculemos el daño que le hizo a pokemon2 y cuánta vida le queda, usemos la función de calcular daño



// Vamos a narrar qué pasó en este ataque.Si el pokemon 1 tiene un ataque mayor a la denfesa del pokemon 2, debemos narrar que logra perforar su defensa
// y describir cuánto daño recibió y cuáles son ahora sus puntos de vida
// Si el ataque del pokemon 1 no es mayor que la denfesa del pokemon 2, significa que no logra perforarla y por lo tanto no hay daño.


// Ahora el Pokemon2, mismo procedimiento.


// Definamos el ganador que sería el más daño haya hecho al otro pokemon.
// Recordemos que los puntos de daño son negativos!!
// - Si el daño recibido por pokemon 2 es menor al de pokemon 1, (es decir un mayor número negativo), significa que pokemon 1 hizo más daño, por lo tanto es el gandor!
// - En caso de que sea menor el daño de pokemon 1, significa que pokemon 2 es el gandor
// - El último caso posible es que ambos hayan recibido el mismo daño, en ese caso sería un empate.



// 7️⃣ - Vamos a practicar eventos en JS, de esta manera vamos a poder controlar cuándo traer pokemons desde la interfaz
// Nuestra función fetch va a traer pokemons cada que el código es ejecutado, es decir cuando la página se recarga
// Vamos a añadir un botón que recargue la página en cada click, así podemos obtener nuevos pokemons random cada vez.
// 🤓 Pista: - Seleccionar el elmento HTML del botón
//           - Llamar a la función createPokemons solo cuando se dé click a ese botón (lee sobre eventListeners https://www.w3schools.com/js/js_htmldom_eventlistener.asp )
// 🕵🏻‍♀️ En nuestra app tenemos 3 botones. El de Catch!, Fight! y el que OK! que aparece en el modal cuando pelean los pokemons
// Cada botón tendrá atado un eventListener que vamos a construir juntos ❤️

