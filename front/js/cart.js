const articleArray =  [];
localStorageArticle();
articleArray.forEach((item) => contentArticle(item));
let price = null;
function localStorageArticle(){
    const nmbArticle = localStorage.length;
    // console.log("vous avez ajouter : ", nmbArticle);
    for(let i = 0; i < nmbArticle; i++){
        const article = localStorage.getItem(localStorage.key(i));
        // console.log("objet a la position ", i, `est l'`, article)
         const articleObjet = JSON.parse(article);
    
        articleArray.push(articleObjet);
        console.log(articleArray);
    }
}
function callPriceAndId(){
    fetch ("http://localhost:3000/api/products")
    .then((response) => response.json())
    .then((data) =>  priceAndIdItem(data) 
        //  console.log(data)
    )
}
function priceAndIdItem(data){
    data.forEach((item) =>{
        const {_id, price} = item
        // console.log(_id, price)

        comparedId(item)
    })
}
async function comparedId(item){
    const nmbArticle = localStorage.length;
    for(i = 0; i < nmbArticle; i++){
        const test = Object.values(articleArray[0])
        if(test[0] === item._id){
            const price = item.price;
             console.log(price);
        }
    }
}
//bloc article qui contient l'ensemble des items du produit dans le panier 
function contentArticle(item) {
    const section = contentSection();
    const blocArticle = buildArticle(item);
    const divImage = buildImage(item);
    const blocDivDescription = buildDescription(item);

    section.appendChild(blocArticle);
    blocArticle.appendChild(divImage);
    blocArticle.appendChild(blocDivDescription);
    
    contentSection();
    displayTotalQuantity(item);
    displayTotalPrice(item);
}
// bloc section du document
function contentSection(){
    const section = document.querySelector('#cart__items');

    return section;
}
// Bloc article du document
function buildArticle(item){
    const blocArticle = document.createElement('article');

    blocArticle.classList.add('cart__item');
    blocArticle.dataset.id = item.articleId;
    blocArticle.dataset.color = item.color;
    // console.log("blocArticle",blocArticle);

    return blocArticle;
}
// image du produit dans le panier
function buildImage(item){
    const divImage = document.createElement('div');
    const image = document.createElement('img');

    divImage.classList.add('cart__item__img');

    image.src = item.imageUrl;
    image.alt = item.altTxt;

    divImage.appendChild(image);

    return divImage;
}
// description du produit dans le panier regroupe fonctions buildItemDescription && buildBlocQuantity
function buildDescription(item){
    const blocDivDescription = document.createElement('div');
    const divDescription = buildItemDescription(item);
    const blocSetting = buildBlocQuantity(item);

    blocDivDescription.classList.add('cart__item__content');
    blocDivDescription.appendChild(divDescription);
    blocDivDescription.appendChild(blocSetting);

    return blocDivDescription;
}
//descriptif nom, couleur et prix de l'article dans le panier
function buildItemDescription(item){
    const divDescription = document.createElement ('div');
    const title = document.createElement ('h2');
    const colorChoice = document.createElement ('p');
    const price = document.createElement ('p');

    divDescription.classList.add('cart__item__content__description');

    title.textContent = item.name;
    colorChoice.textContent = item.color;
    price.textContent = item.price + "€";

    divDescription.appendChild(title);
    divDescription.appendChild(colorChoice);
    divDescription.appendChild(price);
    return divDescription;
}
// quantite d'article & input du panier
function buildBlocQuantity(item){
    const blocSetting = document.createElement('div');
    const divQuantity = document.createElement('div');
    const p = document.createElement('p');
    const inputQuantite = document.createElement('input'); 
    const divdeleteItem = buildDeleteItem(item);

    blocSetting.classList.add('cart__item__content__settings');
    divQuantity.classList.add('cart__item__content__settings__quantity');
    inputQuantite.classList.add('itemQuantity');
    inputQuantite.type = "number";
    inputQuantite.name = "itemQuantity";
    inputQuantite.min = "1";
    inputQuantite.max = "100";
    inputQuantite.value = item.quantity;
    inputQuantite.addEventListener('input', () => updatePriceAndQuantity(item.articleId, inputQuantite.value,item));

    p.textContent =`Qté : `;

    blocSetting.appendChild(divQuantity);
    divQuantity.appendChild(p);
    divQuantity.appendChild(inputQuantite);
    blocSetting.appendChild(divdeleteItem);

    return blocSetting;
}
function buildDeleteItem(item){
    const divdeleteItem = document.createElement ('div');
    const p = document.createElement('p');
    
    divdeleteItem.classList.add('cart__item__content__settings__delete');
    p.classList.add('deleteItem');
    p.textContent = "supprimer";
    divdeleteItem.appendChild(p);

    divdeleteItem.addEventListener('click', () => deleteItem(item));

    return divdeleteItem;
}
function deleteItem(item){
    // console.log('item to delete',item);
    const itemToDelete = articleArray.findIndex((selected) => selected.articleId === item.articleId && selected.color === item.color);
    //  console.log('item to delete',itemToDelete);
     articleArray.splice(itemToDelete, 1);
    //  console.log(articleArray);

     displayTotalQuantity();
     displayTotalPrice();
     deleteDataLocalStorage(item);
     deleteArticleFromPage(item);
}
function deleteArticleFromPage(item){
    const blocArticle = buildArticle(item);
    const articleToDelete = document.querySelector(`[data-id="${item.articleId}"][data-color="${item.color}"]`);
    // console.log('deleting article', articleToDelete);
    articleToDelete.remove(item);
}
// fonction de calcul du nombre d'article total dans le panier
function displayTotalQuantity(){
    const totalQuantity = document.querySelector('#totalQuantity');
    const totalItemQuantity = articleArray.reduce((total, item) => total + item.quantity, 0);// methode reduce() renvoie la valeur cumulé dans array localStorage
    
    totalQuantity.textContent = totalItemQuantity;
}
// fonction de calcul de prix total dans le panier
function displayTotalPrice(){
    const totalPrice = document.querySelector('#totalPrice');
    let total = 0;
    articleArray.forEach(item =>{
        const totalItem = item.price * item.quantity;
        total += totalItem;
    })
    // console.log(total);
    totalPrice.textContent = total;
}
// function changement on click quantité dans le panier
function updatePriceAndQuantity(articleId, newQuantiteValue, item){//retourne une nouvelle quantité en passant par array localStorage
    const newTotalQuantity = articleArray.find((item) => item.articleId === articleId);// methode find() renvoie la valeur du premier élément
    newTotalQuantity.quantity = Number(newQuantiteValue);
    item.quantity = newTotalQuantity.quantity;

    displayTotalQuantity();
    displayTotalPrice();
    deleteDataLocalStorage(item);
}
function deleteDataLocalStorage(item){
    const key = `${item.articleId}-${item.color}`;
    // console.log('on retire cette key',key);
    localStorage.removeItem(key);

}
// fonction enregistre les nouvelles quantitées quand EventListener 'click' execute la fonction updatePriceAndQuantity(item.articleId, inputQuantite.value))
function saveNewDataLocalStorage(item){
    const newData = JSON.stringify(item);
    const key = `${item.articleId}-${item.color}`;
    localStorage.setItem(key, newData);
    // console.log('newData', newData);
}

callPriceAndId();
comparedId(articleArray);