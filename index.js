import { getAllProducts} from './api/products.js';
import { mapProductToCard } from './utils/layout.js';

const URL="https://6715383c33bc2bfe40b9ccf5.mockapi.io/products"

document.addEventListener("DOMContentLoaded",displayProducts);
const productContainer=document.querySelector(".products");

async function displayProducts() {
   
        const products = await getAllProducts();
       document.querySelector('.products').innerHTML=products.map(mapProductToCard).join('');

       
}
   
