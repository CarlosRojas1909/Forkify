import {elements} from './targetsDom';

export const getInput = () => elements.searchInput.value;

//cleaning our input field
export const clearInput = () => {

    elements.searchInput.value = "";
}

//Cleaning our results after searching for query in input field in IU
export const clearResuts = () => {

    elements.resultList.innerHTML = "";
    elements.buttonPages.innerHTML = "";
}

export const highlightSelected = id => {

    const resultsArr = Array.from(document.querySelectorAll('.results__link'));
    resultsArr.forEach(el => {
        el.classList.remove('results__link--active');
    })

    document.querySelector(`a[href="#${id}"]`).classList.add('results__link--active');
}

/*
// 'Pasta with tomato and spinach
acc: 0 / acc + cur.length = 5 / newTitle = ['Pasta']
acc: 5 / acc + cur.length = 9 / newTitle = ['Pasta', 'with']
acc: 9 / acc + cur.length = 15 / newtitle = ['Pasta', 'with', 'tomato']
acc: 15 / acc + cur.length = 18 / newtitle = ['Pasta', 'with', 'tomato']
acc: 18 / acc + cur.length = 24 / newtitle = ['Pasta', 'with', 'tomato']
*/

//here we create a function to limit the # of charaters in the the title of a recipe
const limitRecipeTitle = (title, limit = 17) => {

    const newTitle = [];
    if (title.length > limit) {

        title.split(' ').reduce((acc, cur, index) => {// reduce is creating another array

            if (acc + cur.length <= 17) {
                
                newTitle.push(cur);
            }
            return acc + cur.length;

        }, 0)

        return `${newTitle.join(' ')}...`//The join() method creates and returns a new string by concatenating all of the elements in an array (or an array-like object), separated by commas or a specified separator string. If the array has only one item, then that item will be returned without using the separator.
    }
}


//creating a function for forEach to make our code more redable also I don't need to export it. 
const renderRecipe = (recipe) => {

    const markup = `
        <li>
            <a class="results__link" href="#${recipe.recipe_id}">
                <figure class="results__fig">
                    <img src="${recipe.image_url}" alt="${recipe.title}">
                </figure>
                <div class="results__data">
                    <h4 class="results__name">${limitRecipeTitle(recipe.title)}</h4>
                    <p class="results__author">"${recipe.publisher}"</p>
                </div>
            </a>
        </li>`;// not need to add the second parameter in limitRecipeTitle bc we set a default value for it

        elements.resultList.insertAdjacentHTML('beforeend', markup);


};

// creating a button to pass it in renderButton functionn. we are writing it separate to keep organized
// data-goto: it's a new feature on html5, link a to go somewhere, data-goto (data-variableName)
//type: 'prev' or 'next'
const createButton = (curPage, type) => `
        
        <button class="btn-inline results__btn--${type}" data-goto=${type === 'prev' ? curPage - 1 : curPage + 1}>
            <span>${type === 'prev' ? curPage - 1 : curPage + 1}</span>
            <svg class="search__icon">
                <use href="img/icons.svg#icon-triangle-${type === 'prev' ? 'left' : 'right'}"></use>
            </svg>
        </button>

    `;


const renderButton = (curPage, numResults, resPerPage) => {
    let button;

    const totalPages  = Math.ceil(numResults / resPerPage);// 4.2->5 , 4.6->5
    //case where we are in page 1 and totalPages is also 1 we dont want to display any button
    if (curPage === 1 && totalPages > 1) {
        //show only button to go next page
        button = createButton(curPage, 'next')
    } else if (curPage < totalPages) {
        // show both buttons prev and next
        button = `${createButton(curPage, 'prev')} ${createButton(curPage, 'next')}`//joining 2 strings

    } else if (curPage === totalPages && totalPages > 1 ) {
        //show buttons to go to previous pages only
        button = createButton(curPage, 'prev')

    }

    elements.buttonPages.insertAdjacentHTML('afterbegin', button)
}



export const renderPageResults =  (recipes, page =1, resPerPage = 10) => {
    //render results of current page

    const start = (page - 1) * resPerPage;// start variable hold a value of an index in the recipes array
    const end = page * resPerPage;// index as well

    recipes.slice(start, end).forEach(renderRecipe)

    //render pagination buttons
    renderButton(page, recipes.length, resPerPage);
}