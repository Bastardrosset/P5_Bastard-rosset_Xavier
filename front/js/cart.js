const articleArray = [];
articleArray.forEach((item) => contentArticle(item));
// let price = null;
// console.log(articleArray);
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
  articleArray.forEach((product) => {
    fetch(`http://localhost:3000/api/products/${product.articleId}`)
      .then((response) => response.json())
      .then((data) => {
        product.price = data.price;
        contentArticle(product);
      });
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
  displayTotalQuantity(item);
  displayTotalPrice(item);
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
  inputQuantite.addEventListener("input", () =>
    updatePriceAndQuantity(item.articleId, inputQuantite.value, item.color)
  );

  p.textContent = `Qté : `;

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
//   console.log("newTotalQuantity", newItem);

  displayTotalQuantity();
  displayTotalPrice();
  updateProductLocalStorage(newItem);
}
// fonction de calcul du nombre d'article total dans le panier
function displayTotalQuantity() {
  const totalQuantity = document.getElementById("totalQuantity");
  const totalItemQuantity = articleArray.reduce(
    (totalItemQuantity, item) => totalItemQuantity + item.quantity,
    0
  ); // methode reduce() renvoie la valeur cumulé dans array localStorage

  totalQuantity.textContent = totalItemQuantity;
}
// fonction de calcul de prix total dans le panier
function displayTotalPrice() {
  const totalPrice = document.getElementById("totalPrice");
  let total = 0;
  articleArray.forEach((item) => {
    const totalItem = item.price * item.quantity;
    total += totalItem;
  });
  // const total = articleArray.reduce((total, item) => total = item.price * item.quantity, 0);
  totalPrice.textContent = total;
  // console.log(total);
}
// fonction enregistre les nouvelles quantitées quand EventListener 'click' execute la fonction updatePriceAndQuantity(item.articleId, inputQuantite.value))
function updateProductLocalStorage(item) {
  const key = `${item.articleId}-${item.color}`;
  localStorage.setItem(key, JSON.stringify(item));
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
  // console.log('item to delete',item);
  const itemToDelete = articleArray.find(
    (selected) =>
      selected.articleId === item.articleId && selected.color === item.color
  );
  //  console.log('item to delete',itemToDelete);
  articleArray.splice(itemToDelete, 1);
  //  console.log(articleArray);

  displayTotalQuantity();
  displayTotalPrice();
  deleteDataLocalStorage(item);
  deleteArticleFromPage(item);
}
// fonction supprimer sur la page
function deleteArticleFromPage(item) {
  const articleToDelete = document.querySelector(
    `[data-id="${item.articleId}"][data-color="${item.color}"]`
  );
  // console.log('deleting article', articleToDelete);
  articleToDelete.remove();
}
// fonction supprimer dans localStorage
function deleteDataLocalStorage(item) {
  const key = `${item.articleId}-${item.color}`;
  // console.log('on retire cette key',key);
  localStorage.removeItem(key);
}

// FORMULAIRE
// selectionne le boutton commander du formulaire
function selectedSubmitForm() {
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
  // if (ifFormInvalid()) return;
  // if (isEmailInvalid()) return;
  // if (isFirstNameInvalid()) return;
  // if (isLastNameInvalid()) return;
  // if (isAdressInvalid()) return;
  // if (isCityInvalid()) return;
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
    // console.log('key as', key);
    const id = key.split("-")[0];
    ids.push(id);
    // console.log('ids as', ids);
  }
  return ids;
}
// vérifie le validitée de l'input city
function isCityInvalid() {
  const city = document.querySelector("#city");
  const errorCity = document.querySelector("#cityErrorMsg");
  city.addEventListener('change', (e) => validCity(this))
    function validCity(){
      const regex = /^[a-zA-Z0-9 ]+$/;
      let testCity = regex.test(city.value);
        if(testCity) {
          errorCity.textContent = 'Ville valide';
          errorCity.style.color = 'green';
        }else {
          errorCity.textContent = "Les caractères spéciaux et chiffres ne sont pas tolérés";
          errorCity.style.color = "#fbbcbc"
        }
  }
  
}
// vérifie le validitée de l'input address
function isAdressInvalid() {
  const address = document.querySelector("#address").value;
  const errorAddress = document.querySelector("#addressErrorMsg");
  address.addEventListener('change', (e) => validAddress(this))
    function validAddress(){
      const regex = /^[a-zA-Z0-9 ]+$/;
      let testAddress = regex.test(address.value);
        if(testAddress){
          errorAddress.textContent = 'Adrresse valide';
          errorAddress.style.color = 'green';
        }else {
          errorAddress.textContent = "Les caractères spéciaux ne sont pas tolérés";
          errorAddress.style.color = '#fbbcbc';
        }
  }
}
// vérifie le validitée de l'input lastName
function isLastNameInvalid() {
  const lastName = document.querySelector("#lastName").value;
  const errorLastName = document.querySelector("#lastNameErrorMsg");
  lastName.addEventListener('change', (e) => validLastName(this));
    function validLastName(){
      const regex = /^[a-zA-Z-]+$/;
      let testLastName = regex.test(lastName.value);
        if(testLastName){
          errorLastName.textContent = 'Format prénom valide';
          errorLastName.style.color = 'green';
        }else {
          errorLastName.textContent = "Veuillez écrire votre nom correctement";
        }
    }
}
// vérifie le validitée de l'input firstName
function isFirstNameInvalid() {
  const firstName = document.querySelector("#firstName").value;
  const errorFirstName = document.querySelector("#firstNameErrorMsg");
  const regex = /^[a-zA-Z]$/;
  if (regex.test(firstName) === false) {
    errorFirstName.textContent = "Veuillez écrire votre prénom correctement";
    return true;
  } else {
    firstName.match(regex)
    errorFirstName.remove();
  }
  return false;
  
}
// vérifie le validitée de l'input email
function isEmailInvalid() {
  const email = document.querySelector("#email").value;
  const errorEmail = document.querySelector("#emailErrorMsg");
  const regex =
    /^([\w-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/;
  if (regex.test(email) === false) {
    errorEmail.textContent = "Veuillez enregistrer un email valide";
    return true;
  }
  return false;
}
// verifie qu'il n'y est pas d'input vide
function ifFormInvalid() {
  const form = document.getElementsByClassName("cart__order__form");
  const inputs = document.querySelectorAll("input");
  inputs.forEach((input) => {
    if (input.value === "") {
      alert("Veuillez remplir tous les champs");
      return true;
    }
    return false;
  });
}
localStorageArticle();
callPriceAndId();
selectedSubmitForm();
buildRequestBody();
getIdsFromLocalStorage();
isCityInvalid();