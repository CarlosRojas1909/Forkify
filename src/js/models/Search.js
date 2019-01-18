import axios from 'axios';

export default class Search {

    constructor(query) {
        
        this.query = query;
    }

    async getResults() {

        const poxy = 'https://cors-anywhere.herokuapp.com/';
        const key = '2d1566abc6cc0e8319b2469cc14c9606';
    
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