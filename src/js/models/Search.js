import axios from 'axios';
import {config} from '../keyApi';

export default class Search {

    constructor(query) {
        
        this.query = query;
    }

    async getResults() {

        const poxy = 'https://cors-anywhere.herokuapp.com/';
        const key = `${config.MY_KEY1}`;
    
        try {

            const res = await axios(`${poxy}https://www.food2fork.com/api/search?key=${key}&q=${this.query}`);
            // console.log(res);
            this.result = res.data.recipes;
            // console.log(this.result);
    
        } catch(error) {
            console.log(error)
        }
    }
        
}