fetch("http://localhost:3000/api/products")// appel a l'API 
  .then(response => response.json())// reponse transforme en format lisible
  .then((data) => {
    //   console.log(data)
      return addProducts(data);// reponse passe le resultat a fonction addProduct
          
        }
      )
function addProducts(data){
    data.forEach((kanap) =>{
    const {_id, imageUrl, altTxt, name, description} = kanap
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

function makeAnchor(id){// creation du lien vers l'article
    const anchor = document.createElement('a');
    anchor.href = `./product.html?id=${id}`;
    return anchor;
}
function linkItems(anchor, article){// selection de l'élément auquel on ajoute le l'élément lien et l'élément article
    const items = document.querySelector("#items");
    if (items != null){// si items est trouvé
    items.appendChild(anchor);// on lui ajoute le lien anchor
    anchor.append(article);// ajout dans anchor l'élément article
    }
}
function buildImage(imageUrl, altTxt){// creation du bloc image
    const image = document.createElement('img');
    image.src = imageUrl;
    image.alt = altTxt;

    return image;
}
function buildH3(name){// creation du titre de l'article
    const titleArticle = document.createElement('h3');
    titleArticle.textContent = name;
    titleArticle.classList.add('productName');

    return titleArticle;
}
function txtArticle(description){// creation du descriptif de l'article
    const textArticle = document.createElement('p');
    textArticle.textContent = description;
    textArticle.classList.add('productDescription');

    return textArticle;
}






