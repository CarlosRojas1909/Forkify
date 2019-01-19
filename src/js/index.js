
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
        searchView.renderPageResults(state.obj.result)
        // console.log(state.obj.result)
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







 




