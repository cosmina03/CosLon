const URL="https://6715383c33bc2bfe40b9ccf5.mockapi.io/products"

document.addEventListener("DOMContentLoaded",displayProducts);
const productContainer=document.querySelector(".products");

function displayProducts(){
    fetch(URL).then(response=>response.json()).then((products)=> (productContainer.innerHTML=
    products.map((products) => `
    <div class="card flex-col items-center gap-20">
                <div class="img">
                    <img src=${products.ImageURL} alt="">
                </div>
                <!-- Containerul pentru nume, preț și buton -->
                <div class="info">
                    <div class="name">
                        <h3>${products.Name}  </h3>
                        <h4>${products.Details}</h4>
                    </div>
                    <div class="price">${products.Price} lei</div>
                    <button class="add-to-cart">Adauga in cos</button>
            </div>
        </div>
    </div>        
    `
    ).join(""))
);
}