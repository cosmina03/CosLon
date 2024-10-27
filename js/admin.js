const URL = "https://6715383c33bc2bfe40b9ccf5.mockapi.io/products";

document.addEventListener("DOMContentLoaded", displayProducts);

const productsTableBody = document.getElementById("products-table").querySelector("tbody");

function displayProducts() {
    fetch(URL)
        .then(response => response.json())
        .then(products => {
            productsTableBody.innerHTML = products.map(product => `
                <tr>
                    <td>${product.Name}</td>
                    <td>${product.Price}</td>
                    <td><img src="${product.ImageURL}" width="50px"/></td>
                    <td>${product.Details}</td>
                    <td><button data-productId=${product.id}>Edit</button></td>
                     <td><button data-productId=${product.id}>Delete</button></td>
                </tr>
            `).join("");
        })
}
