fetch("http://localhost:3000/api/products")// appel a l'API 
  .then(response => response.json())// reponse transforme en format lisible
  .then((data) => {
    //   console.log(data)
      return addProducts(data);// reponse passe le resultat a fonction addProduct
          
        }
    )

// gere l'assemblage de la sémantique de la page
function addProducts(data){
    data.forEach((kanap) =>{
    const {_id, imageUrl, altTxt, name, description} = kanap// recupere les string de l'api
    const image = buildImage(imageUrl, altTxt);// appel la fonction buildImage
    const anchor= makeAnchor(_id); // appel fonction makeAnchor avec imageUrl, resultat est passé a anchor
    const article = document.createElement('article');// creation de l'élément article
    const titleArticle = buildH3(name);// transmet le nom de l'article a fonction buildH3
    const textArticle = txtArticle(description);

    article.appendChild(image);// attribut l'image a article
    article.appendChild(titleArticle);// attribut le titre a l'article
    article.appendChild(textArticle);// attribut la description a l'article
    linkItems(anchor, article);// passe le resultat du lien anchor a fonction linkItems
    })
}

// creation du lien vers l'article
function makeAnchor(id){
    const anchor = document.createElement('a');
    anchor.href = `./product.html?id=${id}`;// redirige vers la page de l'article
    return anchor;
}

// selection de l'élément auquel on ajoute le l'élément lien et l'élément article
function linkItems(anchor, article){
    const items = document.getElementById("items");
    if (items != null){// si items est trouvé
    items.appendChild(anchor);// on lui ajoute le lien anchor
    anchor.append(article);// ajout dans anchor l'élément article
    }
}

// creation du bloc image
function buildImage(imageUrl, altTxt){
    const image = document.createElement('img');
    image.src = imageUrl;
    image.alt = altTxt;

    return image;
}

// creation du titre de l'article
function buildH3(name){
    const titleArticle = document.createElement('h3');
    titleArticle.textContent = name;
    titleArticle.classList.add('productName');

    return titleArticle;
}

// creation du descriptif de l'article
function txtArticle(description){
    const textArticle = document.createElement('p');
    textArticle.textContent = description;
    textArticle.classList.add('productDescription');

    return textArticle;
}






