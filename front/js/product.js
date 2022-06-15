
 

         var url_string = window.location.href; 
         var url = new URL(url_string);
         var id = url.searchParams.get(`id`);
         console.log('id',id)
 

// (async function(){
//     const Items = await getItems()
//     for(item of Items){
//        contentItems(Items)
//    }
// })()
// function getItems(){
//     return fetch("http://localhost:3000/api/products")
//     .then(function(httpListitems){
//         // console.log(httpListitems.json())
//         return httpListitems.json()
//     })
//     .then(function(items){
//         // console.log(items)
//         return items
//     })
//     .catch(function(error){
//         alert(error)
//     })
//  }
//  function contentItems(){
//     const articleImg = document.createElement('img');
//     const blocImg = document.querySelector('.item__img');
//     blocImg.append(articleImg);
//     articleImg.src=`${imageUrl}`;
//  }