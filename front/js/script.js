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
        const lienArticle = document.createElement('a');
        lienArticle.href += `./product.html?id=${article._id}`;
        const contentArticle = document.createElement('article');

        const imgArticle = document.createElement('img');
        imgArticle.src = `${article.imageUrl}`

        const titleArticle = document.createElement('h3');
        titleArticle.textContent = `${article.name}`

        const descArticle = document.createElement('p');
        descArticle.textContent =`${article.description}`;

        document.getElementById('items').appendChild(lienArticle);
        lienArticle.appendChild(contentArticle);
        contentArticle.appendChild(imgArticle);
        contentArticle.appendChild(titleArticle);
        contentArticle.appendChild(descArticle);
        console.log(article);
    }
 }