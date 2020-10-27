/* eslint-disable no-unused-vars */
"use strict";
// Constantes definidas
const inputSearch = document.querySelector(".js-search");
const seriesList = document.querySelector(".js-seriesList");
const favList = document.querySelector(".js-favList");
const btnSearch = document.querySelector(".js-btnSsearch");
const btnRemove = document.querySelector(".js-btnRemoveAll");
const btnLog = document.querySelector(".js-btnLog");
// Array para la lista de series
let shows = [];
// Array para la lista de favoritas
let favorites = [];

// Petición a la API

function getShows(ev) {
  ev.preventDefault();
  const search = inputSearch.value;
  fetch(`https://api.tvmaze.com/search/shows?q=${search}`)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      // Guardamos los datos recogidos que nos interesan en un nuevo array
      shows = data;
      // Aquí llamamos a la función pintar series
      paintSeries();
      listenSeries();
      addFavorites();
      listenFavorites();
    });
}
btnSearch.addEventListener("click", getShows);

// Definimos función para que se pinten las series (creamos html)

function paintSeries() {
  let html = "";
  for (let i = 0; i < shows.length; i++) {
    let classF = "fav-item";
    const favouriteIndex = favorites.findIndex(function (show, index) {
      return show.id === shows[i].show.id;
    });
    if (favouriteIndex !== -1) {
      classF = "fav-item";
    } else {
      classF = "";
    }
    html += `<li class="serie-item js-item ${classF}" id="${shows[i].show.id}">`;
    html += `<h3 class= "serie-name js-name">${shows[i].show.name}</h3>`;
    html += `<p class= "serie-status js-status">${shows[i].show.status}</p> `;
    if (shows[i].show.image === null) {
      html += `<img class="serie-image js-image" src="./assets/images/noimage.png"/>`;
    } else {
      html += `<img class="serie-image js-image" src="${shows[i].show.image.medium}"/>`;
      html += "</li>";
    }
  }
  seriesList.innerHTML = html;
  listenFavorites();
}

// Función para que se marquen como favoritas en la lista de series

function favoritesSeries(ev) {
  const clicked = parseInt(ev.currentTarget.id);
  const indexFav = favorites.findIndex(function (show, index) {
    return show.id === clicked;
  });
  const isFavorite = indexFav !== -1;
  if (isFavorite === true) {
    favorites.splice(indexFav, 1);
  } else {
    for (let i = 0; i < shows.length; i++) {
      if (shows[i].show.id === clicked) {
        favorites.push(shows[i].show);
      }
    }
  }
  paintSeries();
  listenSeries();
  addFavorites();
  setLocalStorage();
}

// Función para escuchar cuando hacemos click en una serie

function listenSeries() {
  const series = document.querySelectorAll(".js-item");
  for (const serie of series) {
    serie.addEventListener("click", favoritesSeries);
  }
}

// Función para que las seleccionadas se añadan a la lista de favoritas

function addFavorites() {
  let favHtml = "";
  for (let i = 0; i < favorites.length; i++) {
    favHtml += `<li class="fav-item" id="${favorites[i].id}">`;
    favHtml += `<h3 class="fav-name">${favorites[i].name}</h3>`;
    if (favorites[i].image === null) {
      favHtml += `<img class="fav-image" src="./assets/images/noimage.png"/>`;
    } else {
      favHtml += `<img class="fav-image" src="${favorites[i].image.medium}"/>`;
    }
    favHtml += "</li>";
  }
  favList.innerHTML = favHtml;
  listenFavorites();
}

// Función que escucha cuando se hace click en una serie marcada como favorita

function listenFavorites() {
  const favItems = document.querySelectorAll(".js-favorite-item");
  for (const favItem of favItems) {
    favItem.addEventListener("click", removeAll);
  }
}
listenFavorites();

// Función localStorage para guardar los datos

const setLocalStorage = () => {
  const stringData = JSON.stringify(favorites);
  localStorage.setItem("fav", stringData);
};

// Función localStorage para leer los datos

const getLocalStorage = () => {
  const stringFav = localStorage.getItem("fav");
  if (stringFav !== null) {
    favorites = JSON.parse(stringFav);
    addFavorites();
  }
};
getLocalStorage();

// Función para borrar todas las series de la lista de favoritas

function removeAll() {
  favorites = [];
  localStorage.removeItem("fav");
  addFavorites();
  paintSeries();
  listenSeries();
  listenFavorites();
}
function clickLog(ev) {
  for (const favItem of favorites) {
    console.log(favItem.name);
  }
}
btnLog.addEventListener("click", clickLog);
// Escuchador para que nos de las series

btnSearch.addEventListener("click", getShows);

// Escuchador para quitar series de la lista de favoritas

btnRemove.addEventListener("click", removeAll);
