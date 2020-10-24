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

let clickedSerie;
listenSerie();

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
      console.log(data);
      // 6. Aquí llamamos a la función pintar series
      paintSeries();
    });
}
// 5. Definimos función para que se pinten las series (creamos html)
function paintSeries() {
  let html = "";
  for (let i = 0; i < shows.length; i++) {
    if (shows[i].show.image === null) {
      html += `<li class="serie-item js-item" id="${[i]}">`;
      html += `<h3 class= "serie-name js-name">${shows[i].show.name}</h3>`;
      html += `<img class="serie-image js-image" src="./assets/images/noimage.png"/>`;
      html += "</li>";
    } else {
      html += `<li class="serie-item js-item" id="${[i]}">`;
      html += `<h3 class="serie-name js-name">${shows[i].show.name}</h3>`;
      html += `<img clas="serie-image js-image" src="${shows[i].show.image.medium}"/>`;
      html += "</li>";
    }
    seriesList.innerHTML = html;
  }
}

// Función para añadir a favoritas
function listenSerie() {
  const items = document.querySelectorAll(".js-item");
  for (const item of items) {
    item.addEventListener("click", selectFav);
  }
}
// Funciones para seleccionar favoritas
function selectFav(event) {
  const clickedSerie = parseInt(event.currentTarget.id);
  const isFav = favorites.indexOf(clickedSerie);
  if (isFav === -1) {
    favList.push(clickedSerie);
    event.currentTarget.classList.add("fav-item");
  } else if (isFav > -1) {
    favorites.splice(isFav, 1);
    event.currentTarget.classList.remove("fav-item");
  }
}

// Función para pintar favoritas
let favHtml = "";
function paintFav() {
  favHtml += `<li class="fav-item js-favItem" id="${clickedSerie}">`;
  favHtml += `<h3 class="fav-name js-favName">${shows[clickedSerie].show.name}</h3>`;
  if (shows[clickedSerie].show.image === null) {
    favHtml += `<img class="fav-image js-favImage" src="./assets/images/noimage.png"/>`;
  } else {
    favHtml += `<img class="fav-image js-favImage" src="${shows[clickedSerie].show.image.medium}"/>`;
  }
  favHtml += "</li>";
  favList.innerHTML = favHtml;
}
// 4. Escuchador en el botón de buscar (al hacer click conecta con la API)
btnSearch.addEventListener("click", getShows);

// Simulador de click - lo quitamos al final
// btnSearch.click();
