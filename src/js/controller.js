import * as model from './model.js';
import recipeview from './views/recipeview.js';

// import icons from "../img/icons.svg"///parcel 1

import 'core-js/stable';
import 'regenerator-runtime/runtime';
import recipeview from './views/recipeview.js';
const recipeContainer = document.querySelector('.recipe');

const timeout = function (s) {
  return new Promise(function (_, reject) {
    setTimeout(function () {
      reject(new Error(`Request took too long! Timeout after ${s} second`));
    }, s * 1000);
  });
};

// https://forkify-api.herokuapp.com/v2

///////////////////////////////////////
////LOADING RECIPE

const controlRecipe = async function () {
  try {
    const id = window.location.hash.slice(1);
    console.log(id);

    if (!id) return;
    recipeview.renderSpinner();

    /////1.Loading recipe
    await model.loadRecipe(id);

    //////2.RENDERING THE RECIPE
    recipeview.render(model.state.recipe);
  } catch (err) {
    alert(err);
  }
};

['hashchange', 'load'].forEach(ev =>
  window.addEventListener(ev, controlRecipe)
);

// window.addEventListener('hashchange', showRecipe);
// window.addEventListener('load', showRecipe);
