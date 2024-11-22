import { getAllProducts } from './api/products.js';
import { mapProductToCard } from './utils/layout.js';

const URL = "https://6715383c33bc2bfe40b9ccf5.mockapi.io/products";

document.addEventListener("DOMContentLoaded", displayProducts);
const productContainer = document.querySelector(".products");

async function displayProducts() {
    // Obține produsele
    const products = await getAllProducts();
    productContainer.innerHTML = products.map(mapProductToCard).join('');

    // Selectează butoanele "Adaugă în coș"
    const addToCartButtons = document.querySelectorAll('.add-to-cart');
    addToCartButtons.forEach((button) => {
        button.addEventListener('click', () => {
            // Obține datele produsului din atributele butonului
            const productId = button.getAttribute('data-productId');
            const name = button.getAttribute('data-name');
            const price = button.getAttribute('data-price');
            const imageURL = button.getAttribute('data-image');

            // Preia sau inițializează cart-ul din localStorage
            let cart = JSON.parse(localStorage.getItem('cart')) || {};

            // Actualizează cantitatea produsului sau adaugă un produs nou
            if (cart[productId]) {
                cart[productId].quantity++;
            } else {
                cart[productId] = {
                    quantity: 1,
                    price: Number(price),
                    image: imageURL,
                    name: name
                };
            }

            // Salvează cart-ul actualizat în localStorage
            localStorage.setItem('cart', JSON.stringify(cart));
        });
    });
}
