const cart = [];

retrouveArticles();

 function retrouveArticles(){
    const articleId = localStorage.length;// récupere ce que contient localStorage

    for (let i = 0; i < articleId.length; i++){
        //  console.log(i);
        const item = localStorage.getItem(localStorage.key(i))
        const itemObject = JSON.parse(item)// désérialise le format json pour en faire un objet 
        // Json.parse(localstorage.getItem(cart))

        cart.push(itemObject)
    }
}
console.log(cart);

function buildArticle() {
    const article = document.createElement('article');
    article.classList.add('cart__item')

    return article;
}

function blocImage(item){
    const divImage = document.createElement('div');
    divImage.classList.add('cart__item__img')
    const image = document.createElement('img');
    image.src = item.imageUrl;
    image.alt = item.altTxt;
    divImage.appendChild(image);
    return divImage;
}