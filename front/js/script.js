 async function main(){
     const articles = await getArticles()
     console.log(articles)
     displayArticles(articles)
 }

 function getArticles(){
    return fetch("http://localhost:3000/api/products")
    .then(function(httpListArticles){
        // console.log(httpListArticles.json())
        return httpListArticles.json()
    })
    .then(function(articles){
        console.log(articles)
        return articles
    })
    .catch(function(error){
        alert(error)
    })
 }
// 
 function displayArticles(articles){
    for(let article of articles){
        console.log(article);
    }
 }
 main()