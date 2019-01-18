
import Search from './models/Search'
import * as searchView from './views/searchView';
import {elements, renderLoader, clearLoader} from './views/targetsDom';
// Global state of app
// Search Object 
// Current recipe object 
// Shopping list object 
// Liked recipes

const state = {};

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
        //Search for Recipes
        await state.obj.getResults();//here we have an array with all the results returns a promise also so we have to await for the request, this line add a property result =[] to our brand new created obj

        //Render results in UI
        clearLoader();
        searchView.renderResults(state.obj.result)
        // console.log(state.obj.result)
    }
}



elements.searchForm.addEventListener('submit', event => {

    event.preventDefault();
    controlSearch();
})







 




//key from food2fork: 7ba3628f174c8dfce673bcf8158f0337 
//search request: https://www.food2fork.com/api/search
//recipe request: https://www.food2fork.com/api/get 

//https://www.food2fork.com/api/search?key=KEY&q=chicken%20breast&page=2 