fetch("http://localhost:3000/api/products")
  .then(response => response.json())
  .then((data) => addProducts(data)
      )

function addProducts(donnees){
    const imageUrl = donnees[0].imageUrl

    let anchor = document.createElement('a');
    anchor.href = imageUrl;
    anchor.text = "un super canapé";

    const items = document.querySelector("#items");
    if (items != null){
    items.appendChild(anchor)
    }
}








//  function getArticles(){
//     return fetch("http://localhost:3000/api/products")
//     .then(function(httpListArticles){
//         return httpListArticles.json()
//     })
//     .then(function(articles){
//         return articles
//     })
//     .catch(function(error){
//         alert(error)
//     })
//  }
// Affichage des articles page d'accueil //

//  function displayArticles(articles){
//     const anchor = document.createElement('a');
//     const items = document.querySelector('#items');
//     const contentArticle = document.createElement('article');
//     const imgArticle = document.createElement('img');
//     const titleArticle = document.createElement('h3');
//     const descArticle = document.createElement('p');
        
//     anchor.href += `./product.html?=${article._id}`;
//     imgArticle.src = `${article.imageUrl}`;
//     imgArticle.alt = `${article.altTxt}`;
//     titleArticle.textContent = `${articles.name}`;
//     titleArticle.classList.add('productName');
//     descArticle.textContent =`${articles.description}`;
//     descArticle.classList.add('productDescription');

//     anchor.appendChild(contentArticle);
//     contentArticle.appendChild(imgArticle);
//     contentArticle.appendChild(titleArticle);
//     contentArticle.appendChild(descArticle);
//     if(items != null){
//         items.appendChild(anchor);
//     }   
    
//  }
