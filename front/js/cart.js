
const articleArray =  [];
localStorageArticle();
articleArray.forEach((item) => contentArticle(item));

function localStorageArticle(){
    const nmbArticle = localStorage.length;
    // console.log("vous avez ajouter : ", nmbArticle);
    for(let i = 0; i < nmbArticle; i++){
        const article = localStorage.getItem(localStorage.key(i));
        // console.log("objet a la position ", i, `est l'`, article)
         const articleObjet = JSON.parse(article);
    
        articleArray.push(articleObjet);
        // console.log(articleArray);
    }
   }
   
  
//ITEM
// altText: "Photo d'un canapé jaune et noir, quattre places"
// articleId: "415b7cacb65d43b2b5c1ff70f3393ad1"
// color: "Black/Yellow"
// imgUrl: "http://localhost:3000/images/kanap02.jpeg"
// price: 4499
// quantity: 1


// bloc article qui contient l'ensemble des items du produit dans le panier 
function contentArticle(item) {
    const blocArticle = buildArticle(item);
    contentSection(blocArticle);
    const divImage = buildImage(item);
    blocArticle.appendChild(divImage);
    const blocDivDescription = buildDescription(item);
    blocArticle.appendChild(blocDivDescription);
    displayTotalQuantity(item);
    displayTotalPrice(item);
}
// bloc section du document
function contentSection(blocArticle){
    const section = document.querySelector('#cart__items').appendChild(blocArticle);

}
// Bloc article du document
function buildArticle(item){
    const blocArticle = document.createElement('article');

    blocArticle.classList.add('cart__item');
    blocArticle.dataset.id = item.articleId;
    blocArticle.dataset.color = item.color;

    return blocArticle;
}
// image du produit dans le panier
function buildImage(item){
    const divImage = document.createElement('div');
    const image = document.createElement('img');

    divImage.classList.add('cart__item__img');

    image.src = item.imgUrl;
    image.alt = item.altText;

    divImage.appendChild(image)

    return divImage;
}

// description du produit dans le panier regroupe fonctions buildItemDescription && buildBlocQuantity
function buildDescription(item){
    const blocDivDescription = document.createElement('div');
    blocDivDescription.classList.add('cart__item__content');

    const divDescription = buildItemDescription(item);

    const blocSetting = buildBlocQuantity(item);
    
    blocDivDescription.appendChild(divDescription);
    blocDivDescription.appendChild(blocSetting);
    
    const divdeleteItem = buildDeleteItem(item);

    blocSetting.appendChild(divdeleteItem);
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
    const inputQuantite = document.createElement('input') 

    blocSetting.classList.add('cart__item__content__settings');
    divQuantity.classList.add('cart__item__content__settings__quantity');
    inputQuantite.classList.add('itemQuantity');
    inputQuantite.type = "number";
    inputQuantite.name = "itemQuantity";
    inputQuantite.min = "1";
    inputQuantite.max = "100";
    inputQuantite.value = item.quantity;
    inputQuantite.addEventListener('input', () => updatePriceAndQuantity(item.articleId, inputQuantite.value));

    p.textContent =`Qté : `;

    blocSetting.appendChild(divQuantity);
    divQuantity.appendChild(p);
    divQuantity.appendChild(inputQuantite) ;

    return blocSetting;
}


function buildDeleteItem(item){
    const divdeleteItem = document.createElement ('div');
    const p = document.createElement ('p');
    
    divdeleteItem.classList.add ('cart__item__content__settings__delete');
    p.classList.add ('deleteItem')
    p.textContent = "supprimer"
    divdeleteItem.appendChild(p)

return divdeleteItem;
}

// fonction de calcul du nombre d'article total dans le panier
function displayTotalQuantity(item){
    const totalQuantity = document.querySelector('#totalQuantity');
    const totalItemQuantity = articleArray.reduce((total, item) => total + item.quantity, 0);// methode reduce() renvoie la valeur cumulé dans array localStorage
    
    totalQuantity.textContent = totalItemQuantity;
}
// fonction de calcul de prix total dans le panier
function displayTotalPrice(item){
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
function updatePriceAndQuantity(articleId, newQuantitevalue){//retourne une nouvelle quantité en passant par array localStorage
    const newTotalQuantity = articleArray.find((item) => item.articleId === articleId);// methode find() renvoie la valeur du premier élément
    newTotalQuantity.quantity = Number(newQuantitevalue);

    displayTotalQuantity();
    displayTotalPrice();
}