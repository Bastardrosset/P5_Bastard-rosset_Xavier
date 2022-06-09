 async function main(){
     const articles = await getArticles()
    //  console.log(articles)
     displayArticles(articles)
 }

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
 main()
// Affichage des articles page d'accueil //

 function displayArticles(articles){
    for(let article of articles){
        let lienArticle = document.createElement('a');
        lienArticle.href += `./product.html?id=${article._id}`;
        let contentArticle = document.createElement('article');

        let imgArticle = document.createElement('img');
        imgArticle.src = `${article.imageUrl}`

        let titleArticle = document.createElement('h3');
        titleArticle.textContent = `${article.name}`

        let descArticle = document.createElement('p');
        descArticle.append =`${article.description}`;

        document.getElementById('items').appendChild(lienArticle);
        lienArticle.appendChild(contentArticle);
        contentArticle.appendChild(imgArticle,titleArticle,descArticle)
        console.log(article);
    }
 }