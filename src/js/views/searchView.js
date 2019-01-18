import {elements} from './targetsDom';

export const getInput = () => elements.searchInput.value;

//cleaning our input field
export const clearInput = () => {

    elements.searchInput.value = "";
}

//Cleaning our results after searching for query in input field in IU
export const clearResuts = () => {

    elements.resultList.innerHTML = "";
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


}

export const renderResults =  (recipes) => {

    recipes.forEach(renderRecipe)
}