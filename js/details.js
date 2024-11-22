import {getProductById} from "../api/products.js";

document.addEventListener("DOMContentLoaded", showProductDetils);

async function showProductDetils(){
    const urlSearchParams = new URLSearchParams(window.location.search);
    console.log(window.location.search);
    const productId = urlSearchParams.get("id");
    console.log(productId);

    const product = await getProductById(productId);

    document.querySelector(".content").innerHTML = 
    `
    <h2>${product.details}</h2>
    
    `;
}