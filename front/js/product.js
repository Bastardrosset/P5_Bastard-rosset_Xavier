const url_string = window.location.search; 
const url = new URLSearchParams(url_string);
const articleId = url.get('id');

if (articleId == null){// recupere le prix de l'article et le transmet a localStorage
    var itemPrice = 0;
}
// console.log({articleId});
 
fetch (`http://localhost:3000/api/products/${articleId}`)// appel les items en fonction de leur id
.then((response) => response.json())
.then((res) => detailsArticle(res))

function detailsArticle(kanap){
    // console.log(kanap);
    // const altTxt = kanap.altTxt;
    // const colors = kanap.colors;
    // const description = kanap.description;
    // const imageUrl = kanap.imageUrl;
    // const name = kanap.name;
    // const price = kanap.price;
    // const _id = kanap._id;
    const{altTxt, colors, description, imageUrl, name, price, _id} = kanap // attribut une constante a chaque item de l'article
    itemPrice = price;
    attachImage(imageUrl, altTxt);
    attachTitle(name);
    attachPrice(price);
    attachDescription(description);
    attachColors(colors);
}

function attachImage(imageUrl, altTxt){
    const image = document.createElement('img');// creation de l'élément img
    image.src = imageUrl;// attribut l'image de l'article
    image.alt = altTxt;// attribut le text alternatif de l'article

    const blocImg = document.querySelector('.item__img');// selection du div itemm__img
    if (blocImg != null)// si item__img existe, attribut l'image dans le bloc
    {
        blocImg.appendChild(image);
    }
}

function attachTitle(name){
    const title = document.querySelector('#title');
    if(title != null){
        title.textContent = name;
    }
}

function attachPrice(price){
    const span = document.querySelector('#price');
    if (span != null){
        span.textContent = price;
    }
}

function attachDescription(description){
    const p = document.querySelector('#description');
    if (p != null){
        p.textContent = description;
    }
}

function attachColors(colors){
    const select = document.querySelector('#colors');// selection de élément auquel on attribut option value
    
     if (select != null){
         colors.forEach((color) => {// boucle sur les options couleurs disponible dans l'array
            const option = document.createElement('option');// creation de l'élément option value
            option.value = color;// attribue une couleur a une value
            option.textContent = color;// attribut le text correspondant
            select.appendChild(option);// attribue option value comme élément de select
         })
     }
    }


    var button = document.querySelector('#addToCart');// attribut une variable button a l'élément button

    if(button != null){
        button.addEventListener('click', (e)=>{// au click de button
            const color = document.querySelector('#colors').value
            const quantity = document.querySelector('#quantity').value
                if(color == null || quantity == null || color === '' || quantity === ''){
                    alert("Veuillez choisir une couleur et une quantitée !")// si les choix n'ont pas de valeur, message alert s'execute
                    return
                }

            const data ={// objet auquel on attribut les valeurs a enregistrer
                articleId : articleId,
                color : color,
                quantity : Number(quantity),
                price : itemPrice
            }
            localStorage.setItem(articleId, JSON.stringify(data))// store les valeurs enregistrés dans l'objet data et les sérialises en format json 
            window.location.href = "cart.html";
    })
}

