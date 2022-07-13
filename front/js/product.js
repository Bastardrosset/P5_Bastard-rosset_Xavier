const url_string = window.location.search; 
const url = new URLSearchParams(url_string);
const articleId = url.get('id');

// appel a l'API en fonction de l'ID de l'article
function showProduct() {
    fetch (`http://localhost:3000/api/products/${articleId}`)// appel les items en fonction de leur id
    .then((response) => response.json())
    .then((res) => detailsArticle(res))
}

// fonction qui regroupe les fonctionnalitées avec clé .kanap
function detailsArticle(_kanap) {
    kanap = _kanap;
    // console.log(_kanap);
    attachImage();
    attachTitle();
    attachPrice();
    attachDescription();
    attachColors();
}

// fonction cible l'élément qui contient l'image et attribut l'image
function attachImage() {
    const image = document.createElement('img');// creation de l'élément img
    image.src = kanap.imageUrl;// attribut l'image de l'article
    image.alt = kanap.altTxt;// attribut le text alternatif de l'article
    const blocImg = document.querySelector('.item__img');// selection du div itemm__img
    if (blocImg != null){// si item__img existe, attribut l'image dans le bloc
        blocImg.appendChild(image);
    }
}

// fonction qui cible l'élément qui contient le nom de l'article et attribut le titre
function attachTitle() {
    const title = document.getElementById('title');
    if(title != null){
        title.textContent = kanap.name;
    }
}

// fonction qui cible l'élément qui contient le prix et attribut le prix
function attachPrice() {
    const span = document.getElementById('price');
    if (span != null){
        span.textContent = kanap.price;
    }
}

// fonction qui cible l'élément de description et attribut la description de l'article
function attachDescription() {
    const p = document.getElementById('description');
    if (p != null){
        p.textContent = kanap.description;
    }
}

// fonction qui cible l'élément color de l'article et attribut la valeur séléctionner pour l'article
function attachColors() {
    const select = document.getElementById('colors');// selection de élément auquel on attribut option value
    
     if (select != null){
         kanap.colors.forEach((color) => {// boucle sur les options couleurs disponible dans l'array
            const option = document.createElement('option');// creation de l'élément option value
            option.value = color;// attribue une couleur a une value
            option.textContent = color;// attribut le text correspondant
            select.appendChild(option);// attribue option value comme élément de select
        })
    }
}

// fonction ajouter au panier
function addEventListenerToAddToCart() {
    const button = document.getElementById('addToCart');// attribut une variable button a l'élément button
if(button != null){
    button.addEventListener('click', addToCart);
    }
}

// attribue les valeurs a verifier avant ajout au panier
function addToCart() {
    const selectedColor = document.getElementById('colors').value;
    const selectedQuantity = document.getElementById('quantity').value;
            
    if (choiceSelection(selectedColor, selectedQuantity)) return; 
    saveCart(selectedColor, selectedQuantity);
    redirectCart();
}

// enregistre les données et store vers localStorage
function saveCart(selectedColor,selectedQuantity) {
    const key = `${articleId}-${selectedColor}`;
    const data = {// objet auquel on attribut les valeurs a enregistrer afin de les communiquer a la page cart.js
        articleId : articleId,
        color : selectedColor,
        quantity : Number(selectedQuantity),
        imageUrl : kanap.imageUrl,
        altTxt : kanap.altTxt,
        name : kanap.name
    }
    let item = JSON.parse(localStorage.getItem(key))
    if (item) {
        ++item.quantity;
        localStorage.setItem(key, JSON.stringify(item));
    } else {
        localStorage.setItem(key, JSON.stringify(data));
        // store les valeurs enregistrés dans l'objet data et les sérialises en format json 
    }
}

// verifie les valeurs couleur et quantité 
function choiceSelection(selectedColor,selectedQuantity) {
    if(selectedColor == null || selectedQuantity == null || selectedColor === '' || selectedQuantity == 0){
        alert("Veuillez choisir une couleur et une quantitée !")// si les choix n'ont pas de valeur, message alert s'execute
        return true;// empeche d'aller plus loin si les conditions non remplis
    }
}

// redirige vers panier
function redirectCart() {
    window.location.href = "cart.html";
}



showProduct();
addEventListenerToAddToCart();