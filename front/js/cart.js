// console.log("vous avez ajouter : ", nmbArticle);
localStorageArticle();

function localStorageArticle(){
    const nmbArticle = localStorage.length;

    for(let i = 0; i < nmbArticle; i++){
        const article = localStorage.getItem(localStorage.key(i));
        // console.log("objet a la position ", i, `est l'`, article)
        const articleArray =  [];
        const articleObjet = JSON.parse(article);
    
        articleArray.push(articleObjet);
        // console.log(articleArray);
    }
   }


//ITEMS
// altText: "Photo d'un canapé jaune et noir, quattre places"
// articleId: "415b7cacb65d43b2b5c1ff70f3393ad1"
// color: "Black/Yellow"
// imgUrl: "http://localhost:3000/images/kanap02.jpeg"
// price: 4499
// quantity: 1

//  function contentArticle(){

//     const article = buildArticle(item);
//     const image = blocImage(item);
//     const description = blocDescription(item);

//     article.appendChild(image)
//     article.appendChild(description);

// console.log(article);
//  }

 // bloc article qui contient l'ensemble des items du produit dans le panier
// function buildArticle() {
    // const article = document.createElement('article');
    // article.classList.add('cart__item');
    // article.dataset.articleId = item.articleId;
    // article.dataset.color = item.color;
    // document.querySelector('#cart__items').appendChild(article);

//     return article;

// }

// // image du produit dans le panier
// function blocImage(item){
//     const divImage = document.createElement('div');
//     divImage.classList.add('cart__item__img')
//     const image = document.createElement('img');
//     image.src = item.imageUrl;
//     image.alt = item.altTxt;
//     divImage.appendChild(image);

    

//     return divImage;
// }

// // description du produit dans le panier
// function blocDescription(item){
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
// function blocQuantity(){
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


// function deleteItem(){
//     const divdeleteItem = document.createElement ('div');
//     const deleteItem = document.createElement ('p');
    
//     divdeleteItem.classList.add ('cart__item__content__settings__delete');
//     deleteItem.classList.add ('deleteItem')
    
//     document.querySelector('.cart__item__content__settings').appendChild(divdeleteItem);

// return divdeleteItem;
// }