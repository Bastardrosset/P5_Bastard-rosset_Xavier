
//   (async function(){

//         var url_string = window.location.href; 
//         var url = new URL(url_string);
//         var id = url.searchParams.name(`${id}`);
//         console.log('id',id)
// })

(async function (){
    const items = await getItems()
    for(item of items){
       contentItems(items)
   }
})()


function getItems(){
   return fetch("http://localhost:3000/api/products")
   .then(function(httpListItems){
       // console.log(httpListItems.json())
       return httpListItems.json()
   })
   .then(function(items){
       // console.log(items)
       return items
   })
   .catch(function(error){
       alert(error)
   })
}

function contentItems(){
    var myImg = document.getElementsByClassName('item__img');
    var imgArticle = document.createElement('img');
    document.myImg.append(imgArticle);
    myImg.src = `${items.imageUrl}`;
    
}