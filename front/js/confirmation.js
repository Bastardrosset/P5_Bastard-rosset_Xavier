function getOrderId(){
    const url_string = window.location.search; 
    const url = new URLSearchParams(url_string);
    return url.get('orderId');
    // console.log('orderId as', orderId);
    
}
function displayOrderId(orderId){
    const order = getOrderId(orderId);
    const orderIdElement = document.getElementById('orderId');
    orderIdElement.textContent = ('\n', order);
}
function removeStorage(){
    const storage = window.sessionStorage;
    storage.clear();
}
getOrderId();
displayOrderId(orderId);
removeStorage();