
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
        console.log(articleArray);
    }
   }
   
  
//ITEMS
// altText: "Photo d'un canapé jaune et noir, quattre places"
// articleId: "415b7cacb65d43b2b5c1ff70f3393ad1"
// color: "Black/Yellow"
// imgUrl: "http://localhost:3000/images/kanap02.jpeg"
// price: 4499
// quantity: 1


// bloc article qui contient l'ensemble des items du produit dans le panier
function contentArticle(item) {
    const section = document.querySelector('#cart__items');
    const blocArticle = document.createElement('article');

    blocArticle.classList.add('cart__item');
    blocArticle.dataset.id = item.articleId;
    blocArticle.dataset.color = item.color;

    section.appendChild(blocArticle);

    return blocArticle;
}

// image du produit dans le panier
// function buildImage(article){
//     const divImage = document.createElement('div');
//     const image = document.createElement('img');

//     divImage.classList.add('cart__item__img')

//     image.src = article.imageUrl;
//     image.alt = article.altTxt;

//     divImage.appendChild(image);
// }

// // description du produit dans le panier
// function buildDescription(article){
//     const blocDivDescription = document.createElement('div');
//     blocDivDescription.classList.add('cart__item__content');
//     const divDescription = document.createElement ('div');
//     divDescription.classList.add('cart__item__content__description');
//     const title = document.createElement ('h2');
//     const colorChoice = document.createElement ('p');
//     const price = document.createElement ('p');


//     title.textContent = item.name;
//     colorChoice.textContent = item.color;
//     price.textContent = item.price + "€";

//     divDescription.appendChild(title);
//     divDescription.appendChild(colorChoice);
//     divDescription.appendChild(price);

//     document.querySelector('.cart__item__content').appendChild(divDescription);

//     return blocDivDescription;
// }

// // quantite d'article dans le panier
// function buildBlocQuantity(){
//     const blocSettingQuantity = document.createElement('div');
//     const blocQuantity = document.createElement('div');
//     const blocQuantityp = document.createElement('p');
//     const inputQuantite = document.createElement('input') 

//     blocSettingQuantity.classList.add('cart__item__content__settings');
//     blocQuantity.classList.add('cart__item__content__settings__quantity');
//     inputQuantite.classLisr.add('itemQuantity');


//     blocSettingQuantity.appendChild(blocQuantity);
//     blocQuantity.appendChild(blocQuantityp);
//     blocQuantity.appendChild(inputQuantite) ;

    // return blocSettingQuantity;
// }


// function buildDeleteItem(){
//     const divdeleteItem = document.createElement ('div');
//     const deleteItem = document.createElement ('p');
    
//     divdeleteItem.classList.add ('cart__item__content__settings__delete');
//     deleteItem.classList.add ('deleteItem')
    
//     document.querySelector('.cart__item__content__settings').appendChild(divdeleteItem);

// return divdeleteItem;
// }