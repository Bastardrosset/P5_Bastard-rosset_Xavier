fetch("http://localhost:3000/api/products")// je recupère la liste de mes articles
.then(data => data.json())
.then(jsonListArticle => {
//  console.log(jsonListArticle)
for(let jsonArticle of jsonListArticle){
    let article = new Article(jsonArticle);
    document.getElementById("items").innerHTML += //j'injecte les articles dans la page
    `<a href="./product.html?id=42">
        <article>
            <img src="${article.imageUrl}" alt="${article.altTxt}">
            <h3 class="productName">${article.name}</h3>
            <p class="productDescription">${article.description}</p> 
        </article>
    </a> `
}
});
// Je crée une class article pour définir article par article dans la list json
 class Article{
   constructor(jsonArticle){
             jsonArticle && Object.assign(this, jsonArticle);
     }
 }