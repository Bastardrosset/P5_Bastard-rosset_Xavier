const url_string = window.location.search; 
const url = new URLSearchParams(url_string);
const articleId = url.get('id');
let kanap = null;

function showProduct(){
    fetch (`http://localhost:3000/api/products/${articleId}`)// appel les items en fonction de leur id
    .then((response) => response.json())
    .then((res) => detailsArticle(res))
}
function detailsArticle(_kanap){
    kanap = _kanap;
    console.log(_kanap);
    attachImage();
    attachTitle();
    attachPrice();
    attachDescription();
    attachColors();
}

function attachImage(){
    const image = document.createElement('img');// creation de l'élément img
    image.src = kanap.imageUrl;// attribut l'image de l'article
    image.alt = kanap.altTxt;// attribut le text alternatif de l'article

    const blocImg = document.querySelector('.item__img');// selection du div itemm__img
    if (blocImg != null){// si item__img existe, attribut l'image dans le bloc
        blocImg.appendChild(image);
    }
}

function attachTitle(){
    const title = document.querySelector('#title');
    if(title != null){
        title.textContent = kanap.name;
    }
}

function attachPrice(){
    const span = document.querySelector('#price');
    if (span != null){
        span.textContent = kanap.price;
    }
}

function attachDescription(){
    const p = document.querySelector('#description');
    if (p != null){
        p.textContent = kanap.description;
    }
}

function attachColors(){
    const select = document.querySelector('#colors');// selection de élément auquel on attribut option value
    
     if (select != null){
         kanap.colors.forEach((color) => {// boucle sur les options couleurs disponible dans l'array
            const option = document.createElement('option');// creation de l'élément option value
            option.value = color;// attribue une couleur a une value
            option.textContent = color;// attribut le text correspondant
            select.appendChild(option);// attribue option value comme élément de select
        })
    }
}

function addEventListenerToaddToCart(){
    var button = document.querySelector('#addToCart');// attribut une variable button a l'élément button
if(button != null){
    button.addEventListener('click', addToCart)
    }
}

function addToCart(){
    const selectedColor = document.querySelector('#colors').value
    const selectedQuantity = document.querySelector('#quantity').value
            
    if (choiceSelection(selectedColor, selectedQuantity)) return; 
    saveCart(selectedColor, selectedQuantity);
    redirectCart();
}

function saveCart(selectedColor,selectedQuantity){
    const key = `${articleId}-${selectedColor}`;
    const data = {// objet auquel on attribut les valeurs a enregistrer afin de les communiquer a la page cart.js
        articleId : articleId,
        color : selectedColor,
        quantity : Number(selectedQuantity),
        imageUrl : kanap.imageUrl,
        altTxt : kanap.altTxt,
        name : kanap.name
    }
     localStorage.setItem(key, JSON.stringify(data));// store les valeurs enregistrés dans l'objet data et les sérialises en format json 
}

function choiceSelection(selectedColor,selectedQuantity){
    if(selectedColor == null || selectedQuantity == null || selectedColor === '' || selectedQuantity == 0){
        alert("Veuillez choisir une couleur et une quantitée !")// si les choix n'ont pas de valeur, message alert s'execute
        return true;// empeche d'aller plus loin si les conditions non remplis
    }
}

function redirectCart(){// redirige vers la page panier
    window.location.href = "cart.html";
}
showProduct();
addEventListenerToaddToCart();
