import {getProductById} from "../api/products.js";

document.addEventListener("DOMContentLoaded", showProductDetils);

async function showProductDetils(){
    const urlSearchParams = new URLSearchParams(window.location.search);
    console.log(window.location.search);
    const productId = urlSearchParams.get("id");
    console.log(productId);

    const product = await getProductById(productId);

    document.querySelector(".content").innerHTML = `
    <div class="product-details">
        <div class="product-image">
            <img src="${product.ImageURL}" alt="${product.Name}" />
        </div>
        <div class="product-rating">
            <div class="stars">
                <span>★</span>
                <span>★</span>
                <span>★</span>
                <span>★</span>
                <span>★</span>
            </div>
            <p id="rating-value">0/5</p>
        </div>
    </div>
    <h2>${product.Details}</h2>
`;

// Activează funcționalitatea stelelor de rating
setupRating();
}
function setupRating() {
    const stars = document.querySelectorAll('.stars span');
    const ratingValue = document.getElementById('rating-value');
    let currentRating = 0;

    stars.forEach((star, index) => {
        // Adaugă hover pentru stele
        star.addEventListener('mouseover', () => {
            highlightStars(index + 1);
        });

        // Resetează stelele la valoarea curentă
        star.addEventListener('mouseout', () => {
            highlightStars(currentRating);
        });

        // Salvează rating-ul la clic
        star.addEventListener('click', () => {
            currentRating = index + 1;
            ratingValue.innerText = `${currentRating}/5`;
        });
    });

    function highlightStars(rating) {
        stars.forEach((star, index) => {
            star.style.color = index < rating ? 'gold' : 'lightgray';
        });
    }
}