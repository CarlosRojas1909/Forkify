export const elements = {

    searchForm: document.querySelector('.search'),
    searchInput: document.querySelector('.search__field'),
    parentLoader: document.querySelector('.results'),
    resultList: document.querySelector('.results__list'),
    buttonPages: document.querySelector('.results__pages'),
    recipe: document.querySelector('.recipe')
};

//we create this object bc we cant not taget an element that doesn't exist in html yet
export const elementStrings = {
    loaderClass: 'loader'
}

//loader icon to include in our html page
export const renderLoader = parent => {

    const loaderHtml = `
            <div class="${elementStrings.loaderClass}">
                <svg>
                    <use href="img/icons.svg#icon-cw"></use>                
                </svg>
            </div>
    `;
    parent.insertAdjacentHTML('afterbegin', loaderHtml);
}

//clear the icon loader
export const clearLoader = () => {

    const loaderTarget = document.querySelector(`.${elementStrings.loaderClass}`);

    if (loaderTarget) {
        loaderTarget.parentElement.removeChild(loaderTarget)
    }

}