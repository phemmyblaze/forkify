import * as model from './model.js';
import recipeview from './views/recipeview.js';
import searchView from './views/searchView.js';

import 'core-js/stable';
import 'regenerator-runtime/runtime';
const recipeContainer = document.querySelector('.recipe');

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
    recipeview.renderError();
  }
};

const controlSearchResults = async function () {
  try {
    ////1) Get search query
    const query = searchView.getQuery();
    if (!query) return;

    //////2) load search results
    await model.loadSearchResults(query);

    ///3) render results
    console.log(model.state.search.results);
  } catch (err) {
    console.log(err);
  }
};

const init = function () {
  recipeview.addHandlerRender(controlRecipe);
  searchView.addHandlerSearch(controlSearchResults);
};
init();
