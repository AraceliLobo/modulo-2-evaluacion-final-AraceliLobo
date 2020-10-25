/* eslint-disable no-unused-vars */
"use strict";
// 1. Constantes definidas
const inputSearch = document.querySelector(".js-search");
const seriesList = document.querySelector(".js-seriesList");
const favList = document.querySelector(".js-favList");
const btnSearch = document.querySelector(".js-btnSsearch");
const btnRemove = document.querySelector(".js-btnRemoveAll");

// 2. Array para la lista de series
let shows = [];
// Array para la lista de favoritas
let favorites = [];

// 3. Petición a la API
function getShows(ev) {
  ev.preventDefault();
  const search = inputSearch.value;
  fetch(`http://api.tvmaze.com/search/shows?q=${search}`)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      // Guardamos los datos recogidos que nos interesan en un nuevo array
      shows = data;
      // 6. Aquí llamamos a la función pintar series
      paintSeries();
      listenSeries();
      paintFavorites();
    });
}
// 5. Definimos función para que se pinten las series (creamos html) además añadimos la etiqueta da favorita
function paintSeries() {
  let html = "";
  for (let i = 0; i < shows.length; i++) {
    let classF = "";
    const favoriteIndex = favorites.findIndex(function (show, index) {
      return show.id === shows[i].show.id;
    });
    if (favoriteIndex !== -1) {
      classF = "fav-item";
    } else {
      classF = "";
    }
    html += `<li class="serie-item js-item ${classF}" id="${shows[i].show.id}">`;
    html += `<h3 class= "serie-name js-name">${shows[i].show.name}</h3>`;
    if (shows[i].show.image === null) {
      html += `<img class="serie-image js-image" src="./assets/images/noimage.png"/>`;
    } else {
      html += `<img class="serie-image js-image" src="${shows[i].show.image.medium}"/>`;
      html += "</li>";
    }
    seriesList.innerHTML = html;
  }
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
}
// Función para escuchar cuando hacemos click en una serie
function listenSeries() {
  const series = document.querySelectorAll(".js-item");
  for (const serie of series) {
    serie.addEventListener("click", favoritesSeries);
  }
}
// Función para que las seleccionadas aparezcan en la lista de favoritas
function paintFavorites() {
  let favHtml = "";
  for (let i = 0; i < shows.length; i++) {
    let classF = "";
    const favoriteIndex = favorites.findIndex(function (show, index) {
      return show.id === shows[i].show.id;
    });
    if (favoriteIndex !== -1) {
      classF = "fav-item";
    } else {
      classF = "";
    }
    favHtml += `<li class="fav-item" id="${shows[i].show.id}">`;
    favHtml += `<h3 class="fav-name">${shows[i].show.name}</h3>`;
    if (shows[i].show.image === null) {
      favHtml += `<img class="fav-image" src="./assets/images/noimage.png"/>`;
    } else {
      favHtml += `<img class="fav-image" src="${shows[i].show.image.medium}"/>`;
    }
    favHtml += "</li>";

    favList.innerHTML = favHtml;
  }
}
// 4. Escuchador en el botón de buscar (al hacer click conecta con la API)
btnSearch.addEventListener("click", getShows);

// Simulador de click - lo quitamos al final
// btnSearch.click();
