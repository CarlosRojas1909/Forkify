import uniqid from 'uniqid';

export default class List {
    constructor() {
        this.items = [];
    }

    addItem (count, unit, ingredient) {
        const item = {
            id: uniqid(),
            count,
            unit, 
            ingredient
        }
        this.items.push(item);
        return item;
    }

    deleteItem(id) {
        const index = this.items.findIndex(el => el.id === id);
        //(index, #el) [2,4,8] splice(1, 2) -> returns [4,8] original array is changed to [2,]
        // (index, last index but not included) [2,4,8] slice(1, 2) -> returns 4, original array is changed to [2,4,8]
        this.items.splice(index, 1)
    }

    updateCount(id, newCount) {
        this.items.find(el => el.id === id).count = newCount;
    }
}