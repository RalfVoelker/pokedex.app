let quantityOfPokemon = 21;
let allPokemonNames;
let pokemons = [];

let found;
let foundId = [];

let isRunning = false;

let colorType = {
  fire: "#FBB741",
  grass: "#9ECB91",
  water: "#96D8DE",
  bug: "#CC3333",
  flying: "#00AFF0",
  poison: "#E5B80B",
  normal: "#ffdab9",
  electric: "#F1D651",
  ground: "#8b5742",
  psychic: "#ff34b3",
  fairy: "#F2C1D1",
  fighting: "#b93636",
  rock: "#817669",
  steel: "#B5C0C9",
  ice: "#53CCDC",
  dragon: "#79B465",
  dark: "#4E4459",
  ghost: "#C2C1D4",
};


async function includeHTML() {
  let includeElements = document.querySelectorAll("[w3-include-html]");
  for (let i = 0; i < includeElements.length; i++) {
    const element = includeElements[i];
    file = element.getAttribute("w3-include-html");
    let respo = await fetch(file);
    if (respo.ok) {
      element.innerHTML = await respo.text();
    } else {
      element.innerHTML = "404 - Page not found";
    }
  }
}


async function init() {
  await gallery();
  loadPokemonNames();
}


async function gallery() {
  isRunning = true;
  let currentPokemon;
  let content = document.getElementById("card");
  content.innerHTML = "";

  for (let i = 1; i < quantityOfPokemon; i++) {
    let url = `https://pokeapi.co/api/v2/pokemon/${i}/`;
    let response = await fetch(url);
    currentPokemon = await response.json();
    let content = document.getElementById("card");
    content.innerHTML += pokemonHtml(i, currentPokemon);
    pokemonTypesHtml(i, currentPokemon);
  }
  isRunning = false;
}


async function searchGallery() {
  let foundPokemon;
  let content = document.getElementById("card");
  content.innerHTML = "";
  for (let i = 1; i < foundId.length; i++) {
    let url = `https://pokeapi.co/api/v2/pokemon/${foundId[i]}/`;
    let response = await fetch(url);
    foundPokemon = await response.json();
    let content = document.getElementById("card");
    content.innerHTML += pokemonHtml(i, foundPokemon);
    pokemonTypesHtml(i, foundPokemon);
  }
}


function pokemonTypesHtml(i, currentPokemon) {
  for (let j = 0; j < currentPokemon["types"].length; j++) {
    if (currentPokemon["types"][j] != undefined) {
      document.getElementById(`type${j}${i}`).innerHTML = /*html*/ `
        <div class="container-type"><h4>${currentPokemon["types"][j]["type"]["name"]}</h4></div>`;
      changeTypeBackground(i, j, currentPokemon);
    }
  }
  setBackgroundColorForTypes(i, currentPokemon);
}


function setBackgroundColorForTypes(i, currentPokemon) {
  let type0Color = currentPokemon["types"][0]["type"]["name"];
  let type1Color;
  if (currentPokemon["types"][1] == undefined) {
    type1Color = currentPokemon["types"][0]["type"]["name"];
  } else {
    type1Color = currentPokemon["types"][1]["type"]["name"];
  }
  colorBackgroundPokemonImage(i, type0Color, type1Color);
}


function colorBackgroundPokemonImage(indexPokemon, color) {
  let colorBg = colorType[color];
  document.getElementById(`pokemon-img${indexPokemon}`).style.background = `${colorBg}`;
}


function changeTypeBackground(i, j, currentPokemon) {
  let type = currentPokemon["types"][j]["type"]["name"];
  document.getElementById(`type${j}${i}`).style.backgroundColor = colorType[type];
  document.getElementById(`type${j}${i}`).style.borderRadius = "5px";
}


function loadMore() {
  quantityOfPokemon = quantityOfPokemon + 20;
  // document.getElementById("card").innerHTML = "";
  if (isRunning == false){
    gallery();
  }
}


function openPokemonCard(activatedPokemon) {
  document.getElementById("dark-bg").classList.remove("d-none");
  renderPokemonCard(activatedPokemon);
}


function closeCard() {
  document.getElementById("dark-bg").classList.add("d-none");
}


function loadPokemonCardTypes(activatedPokemon, pokemon) {
  for (let j = 0; j < pokemon["types"].length; j++) {
    if (pokemon["types"][j] != undefined) {
      document.getElementById(`poke-card-type${j}${activatedPokemon}`).innerHTML = `<div class="poke-card-type"><h3>${pokemon["types"][j]["type"]["name"]}</h3></div>`;
      colorPokemonCardTypeBackground(activatedPokemon, j, pokemon);
      colorBackgroundPokemonCard(activatedPokemon);
      document.getElementById(`poke-card-type${j}${activatedPokemon}`).style.borderRadius = "5px";
      document.getElementById(`poke-card-type${j}${activatedPokemon}`).style.marginRight = "20px";
    }
  }
}


function colorPokemonCardTypeBackground(activatedPokemon, j, pokemon) {
  let type = pokemon["types"][j]["type"]["name"];
  document.getElementById(`poke-card-type${j}${activatedPokemon}`).style.backgroundColor = colorType[type];
}


function colorBackgroundPokemonCard(activatedPokemon) {
  let color = colorType[pokemon["types"][0]["type"]["name"]];
  document.getElementById(`poke-card-img${activatedPokemon}`).style.background = `${color}`;
}


async function renderPokemonCard(activatedPokemon) {
  if (typeof foundId[0] == "undefined") {
    let url = `https://pokeapi.co/api/v2/pokemon/${activatedPokemon}/`;
    let response = await fetch(url);
    pokemon = await response.json();
  } else {
    let url = `https://pokeapi.co/api/v2/pokemon/${foundId[activatedPokemon]}/`;
    let response = await fetch(url);
    pokemon = await response.json();
  }
  let content = document.getElementById("pokemoncard");
  content.innerHTML = " ";
  renderCard(activatedPokemon, pokemon, content);
}


function renderCard(activatedPokemon, pokemon, content) {
  content.innerHTML = renderContentPokemonCardHtml(activatedPokemon, pokemon, content);
  loadPokemonCardTypes(activatedPokemon, pokemon);
  loadSkills(activatedPokemon);
}


function lastCard(activatedPokemon) {
  activatedPokemon--;
  if (activatedPokemon == 0) {
    activatedPokemon = 999;
    renderPokemonCard(activatedPokemon);
  } else {
    renderPokemonCard(activatedPokemon);
  }
}


function nextCard(activatedPokemon) {
  activatedPokemon++;
  if (activatedPokemon == 1000) {
    activatedPokemon = 1;
    renderPokemonCard(activatedPokemon);
  } else {
    renderPokemonCard(activatedPokemon);
  }
}


async function loadPokemonNames() {
  let count = 999;
  url = `https://pokeapi.co/api/v2/pokemon/?offset=0&limit=${count}`;
  response = await fetch(url);
  allPokemonNames = await response.json();
}


async function searchPokemons() {
  let inputSearch = document.getElementById("search").value;
  if (document.getElementById("search").value.length == 0) {
    foundId = [];
    await gallery();
  } else if (document.getElementById("search").value.length == 3) {
    await createPokemonList();
    showFoundedPokemon(inputSearch);
  }
}


async function createPokemonList() {
  pokemons = [];
  for (let i = 0; i < allPokemonNames["results"].length; ++i) {
    pokemons.push(allPokemonNames["results"][i]["name"]);
  }
}


function showFoundedPokemon(inputSearch) {
  foundId = [];
  let result = 1;
  found = pokemons.filter((el) =>
    el.toLowerCase().startsWith(inputSearch.toLowerCase())
  );
  foundId.push(result);
  for (let i = 0; i < found.length; i++) {
    result = pokemons.indexOf(found[i]);
    result = result + 1;
    foundId.push(result);
  }
  searchGallery();
}
