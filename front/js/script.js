(async function main(){
    const articles = await getArticles()
    for(article of articles){
       displayArticles(articles)
   }
})()

 function getArticles(){
    return fetch("http://localhost:3000/api/products")
    .then(function(httpListArticles){
        // console.log(httpListArticles.json())
        return httpListArticles.json()
    })
    .then(function(articles){
        // console.log(articles)
        return articles
    })
    .catch(function(error){
        alert(error)
    })
 }
// Affichage des articles page d'accueil //

 function displayArticles(articles){
        const lienArticle = document.createElement('a');
        const contentArticle = document.createElement('article');
        const imgArticle = document.createElement('img');
        const titleArticle = document.createElement('h3');
        const descArticle = document.createElement('p');
       
        document.getElementById('items').appendChild(lienArticle);
        
        lienArticle.href += `./product.html?id=${article._id}`;
        imgArticle.src = `${article.imageUrl}`
        titleArticle.textContent = `${article.name}`
        descArticle.textContent =`${article.description}`;

        lienArticle.appendChild(contentArticle);
        contentArticle.appendChild(imgArticle);
        contentArticle.appendChild(titleArticle);
        contentArticle.appendChild(descArticle);
        console.log(article);
    
 }
 