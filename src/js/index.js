
import Search from './models/Search'
import Recipe from './models/Recipe';
import List from './models/List';
import Likes from './models/Likes';
import * as searchView from './views/searchView';
import * as recipeView from './views/recipeView';
import * as listView from './views/listView';
import * as likesView from './views/likesView';
import {elements, renderLoader, clearLoader} from './views/targetsDom';

// Global state of app
// Search Object 
// Current recipe object 
// Shopping list object 
// Liked recipes

const state = {};
window.state = state;
/**
 * Search Controller
 */

const controlSearch = async () => {
    //Get query from view
    const query = searchView.getInput();

    if(query) {
        //New search object and add to state
        state.obj = new Search(query);//here we created an object form our class in Search.js and saved in state object

        //Prepare UI for results/ cleaning input field in UI
        searchView.clearInput();
        searchView.clearResuts();
        //icnon loader
        renderLoader(elements.parentLoader)// we are passing a html element here. never seen before

        try {

            //Search for Recipes
            await state.obj.getResults();//here we have an array with all the results returns a promise also so we have to await for the request, this line add a property result =[] to our brand new created obj
    
            //Render results in UI
            clearLoader();
            searchView.renderPageResults(state.obj.result)
            // console.log(state.obj.result)

        } catch(error) {
            console.log('Something is wrong with the search...');
            clearLoader();
        }
    }
}

elements.searchForm.addEventListener('submit', event => {

    event.preventDefault();
    controlSearch();
})

//using evet delegation bc elemenet html is not there yet
elements.buttonPages.addEventListener('click', event => {
    const btn = event.target.closest('.btn-inline')
 //   console.log(event.target)
 // console.log(btn)

    if(btn) {

        const goToPage = parseInt(btn.dataset.goto, 10);//this is something new, dataset is mandatory and goto is our variable we created when generating out html button in searchView.js..base 10
        searchView.clearResuts();
        searchView.renderPageResults(state.obj.result, goToPage);
        //console.log(goToPage)//1 or 2 or 3(page)
    }
})


/**
 * Recipe Controller
 */
// const r = new Recipe (46956);
// r.getRecipe()
// console.log(r)

const controlRecipe = async () => {

    const id = window.location.hash.replace("#", "");
    // console.log(id);

    if (id) {

        //Prepare UI for changes
        recipeView.clearRecipe();
        renderLoader(elements.recipe);

        //HighLight selected search item
        if(state.search) searchView.highlightSelected(id);

        //Create new recipe object
        state.recipe = new Recipe(id);
        
        //we want to this to happends when we get a response from our req
        try {
            
            //Get recipe data and parse ingredients
            await state.recipe.getRecipe();
            state.recipe.parseIngredients();
            // console.log(state.recipe.ingredients);

            //Calculate servings and time
            state.recipe.calcTime();
            state.recipe.calcServings();
            
            //Prepare UI for changes
            
            //Render changes
            // console.log(state.recipe)
            clearLoader();
            recipeView.renderRecipe(state.recipe, state.likes.isLiked(id));

        } catch(error) {
            console.log('error processing recipe!');
        }
    }
}

// window.addEventListener('hashchange', controlRecipe);
// //if we refresh our page, all our results will go away
// window.addEventListener('load', controlRecipe);

['hashchange', 'load'].forEach((event) => window.addEventListener(event, controlRecipe));

/**
 * List Controller
 */
const controlList = () => {

    //Creae a new list if there is none yet
    if(!state.list) state.list = new List();

    //Add each ingredient to the list and UI
    state.recipe.ingredients.forEach(el => {
        const item = state.list.addItem(el.count, el.unit, el.ingredient);
        listView.renderItem(item);
    });
}

//Handle delete and update list item events
elements.shopping.addEventListener('click', e => {
    const id = e.target.closest('.shopping__item').dataset.itemid;

    //handle the delete button
    if(e.target.matches('shopping__delete, .shopping__delete *')) {
        //delete from state
        state.list.deleteItem(id);

        //delete from UI
        listView.deleteItem(id);

      //handle the count event  
    } else if (e.target.matches('.shopping__count-value')) {
        const val = parseFloat(e.target.value, 10);
        state.list.updateCount(id, val);
    }
})

/**
 * Like Controller
 */

 // just for testing
state.likes = new Likes();
likesView.toggleLikeMenu(state.likes.getNumLikes());


const controlLike = () => {

    if(!state.likes) state.likes = new Likes();
    const currentID = state.recipe.id;
 
    //user has not yet liked current recipe
    if(!state.likes.isLiked(currentID)) {

        //add ike to state
        const  newLike = state.likes.addLike(
                currentID,
                state.recipe.title,
                state.recipe.author,
                state.recipe.img
        );
        //toggle the like button
        likesView.toggleLikeBtn(true);

        //add like to UI list
        likesView.renderLike(newLike);
        // console.log(state.likes)
    //User has liked current recipe
    } else {

        //Remove like form the state
        state.likes.deleteLike(currentId);

        //Toggle the like button
        likesView.toggleLikeBtn(false);

        //Remove like from UI list
        // console.log(state.likes)
        likesView.deleteLike(currentID);

    }

    likesView.toggleLikeMenu(state.likes.getNumLikes());
}




 
//event delegation - handling button clicks
elements.recipe.addEventListener('click', event => {

    if(event.target.matches('.btn-decrease, btn-decrease *')) {// * means element plus any child
        //Decrease button in clicked
        if(state.recipe.servings > 1) {

            state.recipe.updateServings('dec')
            recipeView.updateServingsIngredients(state.recipe);
        }

    } else if(event.target.matches('.btn-increase, btn-increase *')) {
        //Incease button is clicked
        state.recipe.updateServings('inc')
        recipeView.updateServingsIngredients(state.recipe);


    } else if (event.target.matches('.recipe__btn--add, .recipe__btn--add *')) {
        //Add ingredients to shopping list
        controlList();

    } else if(event.target.matches('.recipe__love, .recipe__love *')) {
        //Like controller
        controlLike();
    }

    // console.log(state.recipe)
});

window.l = new List();


