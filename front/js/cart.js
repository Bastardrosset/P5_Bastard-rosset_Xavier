let articleArray = [];
articleArray.forEach((item) =>  contentArticle(item));

// boucle sur le contenu du localStorage et envoie le contenu vers tableau ArticleArray
function localStorageArticle() {
  const nmbArticle = localStorage.length;
  // console.log("vous avez ajouter : ", nmbArticle);
  for (let i = 0; i < nmbArticle; i++) {
    const item = localStorage.getItem(localStorage.key(i));
    // console.log("objet a la position ", i, `est l'`, article)
      if (isJson(item)) {
        const articleObjet = JSON.parse(item);
        articleArray.push(articleObjet);
      }
      // console.log(articleArray);
  }
}

// verifie si les données sont convertis en JS
function isJson(str) {
  try {
    JSON.parse(str);
  } catch (e) {
    return false;
  }
  return true;
}

// appel api en fonction de l'id article selectionné
function callPriceAndId() {
  articleArray.sort((a, z) => a.articleId.localeCompare(z.articleId));
  let productFromAPI = [];
// fonction boucle sur produit dans articleArray, trouve le prix grace a produit index et renvoie vers tableau productFromAPI pour filtrer et classer
  articleArray.forEach(async (product) => {
    await new Promise(r => setTimeout(r, 200))
    fetch(`http://localhost:3000/api/products/${product.articleId}`)
      .then((response) => response.json())
      .then((data) => {
        product.price = data.price;
        productFromAPI.push(product);

        displayTotalQuantityAndPrice();
      });
      contentArticle(product);

  });
}

// bloc article qui contient l'ensemble des items du produit dans le panier
function contentArticle(item) {
  const section = contentSection();
  const blocArticle = buildArticle(item);
  const divImage = buildImage(item);
  const blocDivDescription = buildDescription(item);
  section.appendChild(blocArticle);
  blocArticle.appendChild(divImage);
  blocArticle.appendChild(blocDivDescription);

  contentSection();
}

// bloc section du document
function contentSection() {
  const section = document.getElementById("cart__items");
  return section;
}

// Bloc article du document
function buildArticle(item) {
  const blocArticle = document.createElement("article");
  blocArticle.classList.add("cart__item");
  blocArticle.dataset.id = item.articleId;
  blocArticle.dataset.color = item.color;
  // console.log("blocArticle",blocArticle);
  return blocArticle;
}

// image du produit
function buildImage(item) {
  const divImage = document.createElement("div");
  const image = document.createElement("img");
  divImage.classList.add("cart__item__img");
  image.src = item.imageUrl;
  image.alt = item.altTxt;
  divImage.appendChild(image);
  return divImage;
}

// description du produit, regroupe fonctions buildItemDescription && buildBlocQuantity
function buildDescription(item) {
  const blocDivDescription = document.createElement("div");
  const divDescription = buildItemDescription(item);
  const blocSetting = buildBlocQuantity(item);
  blocDivDescription.classList.add("cart__item__content");
  blocDivDescription.appendChild(divDescription);
  blocDivDescription.appendChild(blocSetting);
  return blocDivDescription;
}

//descriptif nom, couleur et prix de l'article
function buildItemDescription(item) {
  const divDescription = document.createElement("div");
  const title = document.createElement("h2");
  const colorChoice = document.createElement("p");
  const price = document.createElement("p");
  divDescription.classList.add("cart__item__content__description");
  title.textContent = item.name;
  colorChoice.textContent = item.color;
  price.textContent = item.price + "€";
  divDescription.appendChild(title);
  divDescription.appendChild(colorChoice);
  divDescription.appendChild(price);
  return divDescription;
}

// quantite d'article & input
function buildBlocQuantity(item) {
  const blocSetting = document.createElement("div");
  const divQuantity = document.createElement("div");
  const p = document.createElement("p");
  const inputQuantite = document.createElement("input");
  const divdeleteItem = buildDeleteItem(item);
  blocSetting.classList.add("cart__item__content__settings");
  divQuantity.classList.add("cart__item__content__settings__quantity");
  inputQuantite.classList.add("itemQuantity");
  inputQuantite.type = "number";
  inputQuantite.name = "itemQuantity";
  inputQuantite.min = "1";
  inputQuantite.max = "100";
  inputQuantite.value = item.quantity;
  p.textContent = `Qté : `;

  inputQuantite.addEventListener("change", () => {
    // console.log('Input value change', inputQuantite.value);
    updatePriceAndQuantity(item.articleId, inputQuantite.value, item.color);
  });
  
  blocSetting.appendChild(divQuantity);
  divQuantity.appendChild(p);
  divQuantity.appendChild(inputQuantite);
  blocSetting.appendChild(divdeleteItem);
  return blocSetting;
}

// function changement on click quantité dans le panier
function updatePriceAndQuantity(articleId, newQuantiteValue, color) {
  
  //retourne une nouvelle quantité en passant par array localStorage
  const newItem = articleArray.find(
    (item) => item.articleId === articleId && item.color === color
  ); // methode find() renvoie la valeur du premier élément
  newItem.quantity = Number(newQuantiteValue);

  updateProductLocalStorage(newItem);
  displayTotalQuantityAndPrice();
}

// fonction de calcul du nombre d'article total dans le panier
function displayTotalQuantityAndPrice() {
  const totalQuantityEl = document.getElementById("totalQuantity");
  const totalPriceEl = document.getElementById("totalPrice");
  let totalQuantity = 0;
  let totalPrice = 0;
  articleArray.forEach(article => {
    // console.log('article', article)
    totalQuantity += article.quantity;
    totalPrice += article.quantity * article.price;
  });
  // console.log('Mise à jour de la qtty', totalPrice)
  totalQuantityEl.textContent = totalQuantity;
  totalPriceEl.textContent = totalPrice;
}

// 
function updateProductLocalStorage(item) {
  const key = `${item.articleId}-${item.color}`;

  articleArray = articleArray
  .filter(el => el.articleId != item.articleId && el.color != item.color);
  articleArray.push(item);
  let copy = Object.assign({}, item) 
  delete copy.price;
  localStorage.setItem(key, JSON.stringify(copy));

}

// boutton supprimer
function buildDeleteItem(item) {
  const divdeleteItem = document.createElement("div");
  const p = document.createElement("p");
  divdeleteItem.classList.add("cart__item__content__settings__delete");
  p.classList.add("deleteItem");
  p.textContent = "supprimer";
  divdeleteItem.appendChild(p);
  divdeleteItem.addEventListener("click", () => deleteItem(item));
  return divdeleteItem;
}

// cible l'article à supprimer dans localStorage
function deleteItem(item) {

  const itemToDelete = articleArray.find(
    (selected) =>
      selected.articleId === item.articleId && selected.color === item.color
  );
  articleArray.splice(itemToDelete, 1);

  displayTotalQuantityAndPrice();
  deleteDataLocalStorage(item);
  deleteArticleFromPage(item);
}

// fonction supprimer sur la page
function deleteArticleFromPage(item) {
  const articleToDelete = document.querySelector(
    `[data-id="${item.articleId}"][data-color="${item.color}"]`
  );
  
  articleToDelete.remove();
}

// fonction supprimer dans localStorage
function deleteDataLocalStorage(item) {
  const key = `${item.articleId}-${item.color}`;
  
  localStorage.removeItem(key);
}


//************ */ FORMULAIRE /* ************/

// selectionne le boutton commander du formulaire
function selectedSubmitForm(e) {
  const orderButton = document.getElementById("order");
  orderButton.addEventListener("click", (e) => submitForm(e));  
  
}

// Gestion formulaire, conditions de validité && si valide renvoie les données
function submitForm(e) {
  e.preventDefault();
  if (localStorage.length === 0) {
    alert("S'il vous plaît choisissez un article");
    return;
  }
  if(!validFirstName(firstName) || !validLastName(lastName) || !validAddress(address) || !validCity(city) || !validEmail(email)){
    alert("Votre formulaire est mal completé !");
    return
  };
  
  const body = buildRequestBody();
  fetch("http://localhost:3000/api/products/order", {
    method: "POST",
    body: JSON.stringify(body),
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((response) => response.json())
    .then((data) => {
      const orderId = data.orderId;
      window.location.href =
        "../html/confirmation.html" + "?orderId=" + orderId;
      // console.log('data as', data);// orderId
    })
    .catch((error) => console.error(error));
  // console.log(form.elements);

}

// constructeur clé body, information enregistrés par le client
function buildRequestBody() {
  const form = document.querySelector(".cart__order__form");
  const firstName = form.elements.firstName.value;
  const lastName = form.elements.lastName.value;
  const address = form.elements.address.value;
  const city = form.elements.city.value;
  const email = form.elements.email.value;
  const body = {
    contact: {
      firstName: firstName,
      lastName: lastName,
      address: address,
      city: city,
      email: email,
    },
    products: getIdsFromLocalStorage(),
  };
  // console.log(body);
  return body;
}

// constructeur clé products, ID article séléctionné par le client
function getIdsFromLocalStorage() {
  const numberOfProduct = localStorage.length;
  const ids = [];
  for (let i = 0; i < numberOfProduct; i++) {
    const key = localStorage.key(i);
    const id = key.split("-")[0];
    ids.push(id);
  }
  return ids;
}

// vérifie la validitée de l'input city
function isCityValid() {
  const cityEl = document.querySelector("#city");

  cityEl.addEventListener('change', function() {
    validCity(this)
  });
      
}
const validCity = () => {// verifie expression régulière input city
  const cityEl = document.querySelector("#city");
  const comment = cityEl.nextElementSibling;
  const regexCity = new RegExp(/^[a-zA-Z]+$/);
  let cityTest = regexCity.test(cityEl.value);

    if(cityTest){
      comment.textContent = '';
      return true;
    }else {
      comment.textContent = 'Champ ville invalide, les chiffres et caractères spéciaux ne sont pas permis !';
      return false;
    }
}

// vérifie la validitée de l'input address
function isAddressValid() {
  const addressEl = document.querySelector("#address");

  addressEl.addEventListener('change', function() {
      validAddress(this)
  });
        
}
const validAddress = function() {// verifie expression régulière input address
  const addressEl = document.querySelector("#address");
  const comment = addressEl.nextElementSibling;
  const regexAddress = new RegExp(/^[a-zA-Z0-9 ]+$/);
  let addressTest = regexAddress.test(addressEl.value);

    if(addressTest){
      comment.textContent = '';
      return true;
    }else {
      comment.textContent = 'Champ adresse invalide, les caractères spéciaux ne sont pas permis !';
      return false;
    }
}

// vérifie la validitée de l'input lastName
function isLastNameValid() {
  const lastNameEl = document.querySelector("#lastName");

  lastNameEl.addEventListener('change', function() {
    validLastName(this)
  });
}
const validLastName = function() {// verifie expression régulière input firstName
  const lastNameEl = document.querySelector("#lastName");
  const comment = lastNameEl.nextElementSibling;
  const regexLastName = new RegExp(/^[a-zA-Z-]+$/);
  valid = true;
  let lastNameTest = regexLastName.test(lastNameEl.value);
  // console.log(lastNameTest);

    if(lastNameTest === valid){
      comment.textContent = '';
      return true;
    }else {
      comment.textContent = 'Champ nom invalide, les chiffres et caractères spéciaux ne sont pas permis !';
      return false;
    }
}

// Vérifie la validitée de l'input FirstName
function isFirstNameValid() {
  const firstNameEl = document.querySelector("#firstName");
  
  firstNameEl.addEventListener('change', function() {
    validFirstName(this)
  });
}
const validFirstName = function() {// verifie expression régulière input lastName
  const firstNameEl = document.querySelector("#firstName");
  const comment = firstNameEl.nextElementSibling;
  const regexFirstName = new RegExp(/^[a-zA-Z]+$/);
 
  let firstNameTest = regexFirstName.test(firstNameEl.value);
  
    if(firstNameTest){
      comment.textContent = '';
      return true;
    }else {
      comment.textContent = 'Champ prénom invalide, les chiffres et caractères spéciaux ne sont pas permis !';
      return false;
    }
}

// vérifie la validitée de l'input email
function isEmailValid() {
  const emailEl = document.querySelector("#email");

  emailEl.addEventListener('change', function(){
    validEmail(this)
  });
}
const validEmail = function() {// verifie input email
  const emailEl = document.querySelector("#email");
  const comment = emailEl.nextElementSibling;
  const regexEmail = new RegExp(/^([\w-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/);
  
  let emailTest = regexEmail.test(emailEl.value);
  
    if(emailTest){
      comment.textContent = '';
      return true;
    }else {
      comment.textContent = 'Format email invalide !';
      return false;
    }
}



localStorageArticle();
callPriceAndId();
selectedSubmitForm();
buildRequestBody();
getIdsFromLocalStorage();
isCityValid();
isAddressValid();
isLastNameValid();
isFirstNameValid();
isEmailValid();


