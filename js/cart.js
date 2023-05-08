// tableau qui reçoit les élément de LS 
let articleArray = [];


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
    console.log(articleArray);
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
async function callPriceAndId() {
  // fonction asnycrone boucle sur produit dans articleArray, trouve le prix grace a article index et retourne les valeurs du tableau articleArray
  for (let i = 0; i < articleArray.length; i++) {
    const response = await fetch(`http://localhost:3000/api/products/${articleArray[i].articleId}`);
    let productFromAPI = await response.json();
    articleArray[i].price = productFromAPI.price;
    articleArray[i].articleId = productFromAPI._id;
    articleArray[i].color = articleArray[i].color;
    articleArray[i].quantity = articleArray[i].quantity;
  }
// classe les articles grace a .sort() et boucle pour injecter l'article avec contentArticle
  articleArray
    .sort((a, z) => a.articleId.localeCompare(z.articleId))
    .forEach(product => {
      contentArticle(product);
    });
  displayTotalQuantityAndPrice();
}

// bloc article qui contient l'ensemble des items du produit dans le panier
function contentArticle(item) {
  const section = contentSection();
  const blocArticle = buildArticle(item);
  section.appendChild(blocArticle);
}

// bloc section du document
function contentSection() {
  const section = document.getElementById("cart__items");
  return section;
}

// Bloc article du document
function buildArticle(prod) {
  console.log('build', prod)
  const blocArticle = document.createElement("article");
  blocArticle.classList.add("cart__item");
  blocArticle.dataset.id = prod.articleId;
  blocArticle.dataset.color = prod.color;

  // image du produit
  const divImage = document.createElement("div");
  const image = document.createElement("img");
  divImage.classList.add("cart__item__img");
  image.src = prod.imageUrl;
  image.alt = prod.altTxt;
  divImage.appendChild(image);

  blocArticle.appendChild(divImage);

  // description du produit, regroupe fonctions buildItemDescription && buildBlocQuantity
  const blocDivDescription = document.createElement("div");
  const blocSetting = buildBlocQuantity(prod);
  blocDivDescription.classList.add("cart__item__content");

  blocArticle.appendChild(blocDivDescription);

  //descriptif nom, couleur et prix de l'article
  const divDescription = document.createElement("div");
  const title = document.createElement("h2");
  const colorChoice = document.createElement("p");
  const priceEl = document.createElement("p");

  divDescription.classList.add("cart__item__content__description");
  title.textContent = prod.name;
  colorChoice.textContent = prod.color;

  blocDivDescription.appendChild(divDescription);
  blocDivDescription.appendChild(blocSetting);

  divDescription.appendChild(title);
  divDescription.appendChild(colorChoice);
  divDescription.appendChild(priceEl);

  priceEl.textContent = prod.price + '€';


  return blocArticle;
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
  // console.log(articleArray, articleId, color)
  const newItem = articleArray.find(
    (item) => item.articleId === articleId && item.color === color
  ); // methode find() renvoie la valeur du premier élément
  newItem.quantity = Number(newQuantiteValue);
  console.log('new item', newItem)
  updateProductLocalStorage(newItem);
  displayTotalQuantityAndPrice();
}

// fonction de calcul du nombre d'article total dans le panier
function displayTotalQuantityAndPrice() {
  const totalQuantityEl = document.getElementById("totalQuantity");
  const totalPriceEl = document.getElementById("totalPrice");
  let totalQuantity = 0;
  let totalPrice = 0;
  // console.log(articleArray)
  articleArray.forEach(article => {
    totalQuantity += article.quantity;
    totalPrice += article.quantity * article.price;
  });
  totalQuantityEl.textContent = totalQuantity;
  totalPriceEl.textContent = totalPrice;
}

// permet d'éviter d'écraser un produit déja présent sur page panier
function updateProductLocalStorage(item) {
  const key = `${item.articleId}-${item.color}`;

  articleArray = articleArray.filter(el => el != item);
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

// cible l'article à supprimer dans localStorage fliter filtre tout les element sauf item
function deleteItem(item) {

  articleArray = articleArray.filter(el => el != item)


  deleteDataLocalStorage(item);
  deleteArticleFromPage(item);
  displayTotalQuantityAndPrice();
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
  if (!validFirstName(firstName) || !validLastName(lastName) || !validAddress(address) || !validCity(city) || !validEmail(email)) {
    alert("Votre formulaire est mal completé !");
    return
  };
// constructeur du document form et redirige vers page order
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
    })
    .catch((error) => console.error(error));

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

  cityEl.addEventListener('change', function () {
    validCity(this)
  });

}
const validCity = () => {// verifie expression régulière input city
  const cityEl = document.querySelector("#city");
  const comment = cityEl.nextElementSibling;
  const regexCity = new RegExp(/^[a-zA-Z]+$/);
  let cityTest = regexCity.test(cityEl.value);

  if (cityTest) {
    comment.textContent = '';
    return true;
  } else {
    comment.textContent = 'Champ ville invalide, les chiffres et caractères spéciaux ne sont pas permis !';
    return false;
  }
}

// vérifie la validitée de l'input address
function isAddressValid() {
  const addressEl = document.querySelector("#address");

  addressEl.addEventListener('change', function () {
    validAddress(this)
  });

}
const validAddress = function () {// verifie expression régulière input address
  const addressEl = document.querySelector("#address");
  const comment = addressEl.nextElementSibling;
  const regexAddress = new RegExp(/^[a-zA-Z0-9 ]+$/);
  let addressTest = regexAddress.test(addressEl.value);

  if (addressTest) {
    comment.textContent = '';
    return true;
  } else {
    comment.textContent = 'Champ adresse invalide, les caractères spéciaux ne sont pas permis !';
    return false;
  }
}

// vérifie la validitée de l'input lastName
function isLastNameValid() {
  const lastNameEl = document.querySelector("#lastName");

  lastNameEl.addEventListener('change', function () {
    validLastName(this)
  });
}
const validLastName = function () {// verifie expression régulière input firstName
  const lastNameEl = document.querySelector("#lastName");
  const comment = lastNameEl.nextElementSibling;
  const regexLastName = new RegExp(/^[a-zA-Z-]+$/);
  valid = true;
  let lastNameTest = regexLastName.test(lastNameEl.value);


  if (lastNameTest === valid) {
    comment.textContent = '';
    return true;
  } else {
    comment.textContent = 'Champ nom invalide, les chiffres et caractères spéciaux ne sont pas permis !';
    return false;
  }
}

// Vérifie la validitée de l'input FirstName
function isFirstNameValid() {
  const firstNameEl = document.querySelector("#firstName");

  firstNameEl.addEventListener('change', function () {
    validFirstName(this)
  });
}
const validFirstName = function () {// verifie expression régulière input lastName
  const firstNameEl = document.querySelector("#firstName");
  const comment = firstNameEl.nextElementSibling;
  const regexFirstName = new RegExp(/^[a-zA-Z]+$/);

  let firstNameTest = regexFirstName.test(firstNameEl.value);

  if (firstNameTest) {
    comment.textContent = '';
    return true;
  } else {
    comment.textContent = 'Champ prénom invalide, les chiffres et caractères spéciaux ne sont pas permis !';
    return false;
  }
}

// vérifie la validitée de l'input email
function isEmailValid() {
  const emailEl = document.querySelector("#email");

  emailEl.addEventListener('change', function () {
    validEmail(this)
  });
}
const validEmail = function () {// verifie input email
  const emailEl = document.querySelector("#email");
  const comment = emailEl.nextElementSibling;
  const regexEmail = new RegExp(/^([\w-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/);

  let emailTest = regexEmail.test(emailEl.value);

  if (emailTest) {
    comment.textContent = '';
    return true;
  } else {
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


