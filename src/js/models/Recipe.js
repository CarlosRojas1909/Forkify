import axios from  'axios';
import {proxy, key} from '../keyApi';


export default class Recipe {
    constructor(id) {
        this.id = id;
    }

    async getRecipe() {
        
        try {

            const res = await axios(`${proxy}https://www.food2fork.com/api/get?key=${key}&rId=${this.id}`);
            this.title = res.data.recipe.title;
            this.author = res.data.recipe.publisher;
            this.img = res.data.recipe.image_url;
            this.url = res.data.recipe.source_url;
            this.ingredients = res.data.recipe.ingredients;
            // console.log(res);

        } catch (error) {
            console.log(error);
        }
    }

    calcTime() {
        //assuming that we need 15 min for each 3 ingredients
        const numIng = this.ingredients.length;
        const periods = Math.ceil(numIng/3);
        this.time = periods * 15;
    }

    calcServings() {
        this.servings = 4;
    }

    parseIngredients() {

        const unitLong = ['tabelspoons', 'tablespoon', 'ounces', 'ounce', 'teaspoons','teaspoon', 'cups', 'pounds'];
        const unitShort = ['tbsp', 'tbsp', 'oz', 'oz', 'tsp', 'tsp', 'cup', 'pound'];
        const units = [...unitShort, 'kg', 'g']

        const newIngredients = this. ingredients.map((el) => {

                    //uniform units/ lowercasing every ingredient 
                    let ingredient = el.toLowerCase();

                    unitLong.forEach((cur, index) => {
                        ingredient = ingredient.replace(cur, unitShort[index])
                        // console.log(ingredient)
                    });

                    //Remove Parentheses
                    ingredient = ingredient.replace(/ *\([^)]*\) */g, ' ');

                    //Parse ingredients into count, unit and ingredient
                    const arrIng = ingredient.split(' ');
                    const unitIndex = arrIng.findIndex((el2) => units.includes(el2));//returns index number and return -1 when can not find the el2

                    let objIng;

                    if (unitIndex > -1) {
                        //Ex. 4 1/2 cups, arrCount is [4, 1/2]
                        //Ex. 4 cups, arrCount is [4]
                        //there is a unit
                        const arrCount = arrIng.slice(0, unitIndex);

                        let count;
                        if(arrCount.length === 1) {

                            count = eval(arrIng[0].replace('-', '+'));
                        } else {
                            count = eval(arrIng.slice(0, unitIndex).join('+'));
                        }

                        objIng = {
                            count,
                            unit: arrIng[unitIndex],
                            ingredient: arrIng.slice(unitIndex + 1).join(' ')
                        };

                    } else if (parseInt(arrIng[0], 10)) {//takes 1st element in array and try to make it a number if fails, first element are letter(string)
                        //There is not unit, but 1st element is number
                        objIng = {
                            count: parseInt(arrIng[0], 10),
                            unit: '',
                            ingredient: arrIng.slice(1).join(' ')
                        }
                    } else if (unitIndex === -1) {
                        //there is no unit and no number in 1st position
                        objIng = {
                            count: 1,
                            unit: '',
                            ingredient: ingredient
                        }
                    }

                    return objIng;
        });
        this.ingredients = newIngredients;
    }
}