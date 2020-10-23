/* eslint-disable no-unused-vars */
"use strict";
// Constantes definidas
const inputSearch = document.querySelector(".js-search");
const seriesList = document.querySelector(".js-seriesList");
const favList = document.querySelector(".js-favList");
const btnSearch = document.querySelector(".js-btnSsearch");
const btnRemove = document.querySelector(".js-btnRemoveAll");

// Array para la lista de series
let shows = [];

// Array para la lista de favoritas
let favorites = [];

// Petición a la API
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
      console.log(data);
      // Aquí llamamos a la función pintar series
      paintSeries();
    });
}
paintSeries();
// listenSeries();
// paintFavorites();
// Función para pintar series
function paintSeries() {
  // Aquí hay que meter algo más??
  for (let show of shows) {
    seriesList.innerHTML += `<li class="serie-item js-item">`;
    if (show.show.image === null) {
      seriesList.innerHTML += `<img src="./assets/images/noimage.png"/>`;
    } else {
      seriesList.innerHTML += `<img class="serie-image js-image" src="${show.show.image.medium}"/>`;
    }
    seriesList.innerHTML += `<h3 class="serie-name js-name">${show.show.name}</h3>`;
    seriesList.innerHTML += `</li>`;
  }
}
// // Función para pintar favoritas
// function paintFavorites() {
//   for (let i = 0; i < shows.length; i++) {
//     let classF;
//     const indexFav = favorites.indexOf(i);
//     const isFavorite = indexFav !== -1;
//     if (favorite === true) {
//       classF = "pallettes_item--favorite";
//     }
//     else {
//       classF = "";
//     }
//     favList.innerHTML += `<li class="js-palette-item palettes_item--favorite" id = "${i}">`;
//     favList.innerHTML += `</li>`;
// }

// // Función para colocar las favoritas en su lista
// const favoritesSeries = function (ev) {
//   const clicked = parseInt(ev.currentTarget.id);
//   // 4.7 para meter o quitar de favoritos (con un método de array indexOf)
//   const indexFav = favorites.indexOf(clicked);
//   const isFavorite = indexFav !== -1;
//   if (isFavorite === false) {
//     favorites.push(clicked);
//   } else {
//     favorites.splice(indexFav, 1);
//   }
// };

// // Función para guardar en favoritas
// function listenSeries() {
//   const seriesItem = document.querySelectorAll(".js-palette-item");
//   for (const serieItem of seriesItem) {
//     serieItem.addEventListener("click", favoritesSeries);
//   }
// }
// Escuchador en el botón de buscar (al hacer click conecta con la API)
btnSearch.addEventListener("click", getShows);

// Simulador de click - lo quitamos al final
btnSearch.click();
