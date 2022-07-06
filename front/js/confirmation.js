// recupere les infos url de la page
function getOrderId(){
    const url_string = window.location.search; 
    const url = new URLSearchParams(url_string);
    return url.get('orderId');
    // console.log('orderId as', orderId);
    
}
// attribut orderId au span de confirmation
function displayOrderId(orderId){
    const order = getOrderId(orderId);
    const orderIdElement = document.getElementById('orderId');
    orderIdElement.textContent = order;
}
// vide les infos du localStorage une fois la validation éffectué
function removeStorage(){
    const storage = window.localStorage;
    storage.clear();
}
getOrderId();
displayOrderId(orderId);
removeStorage();