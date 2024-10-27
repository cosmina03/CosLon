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
                    <td><button class="edit-btn" data-productId="${product.id}">Edit</button></td>
                    <td><button class="delete-btn" data-productId="${product.id}">Delete</button></td>
                </tr>
            `).join("");
        })
        .catch(error => {
            console.error("Eroare la afișarea produselor:", error);
            alert("A apărut o eroare la afișarea produselor.");
        });
}
const form=document.getElementById("product-form")
const nameInput = document.getElementById("name");
const priceInput = document.getElementById("price");
const ImageURLInput = document.getElementById("image-URL");
const detailsInput = document.getElementById("details");
const saveProductBtn = document.getElementById("save-btn");

let currentEditableProduct;
let editMode = false;

saveProductBtn.addEventListener("click", saveProduct);

function saveProduct(event) {
    event.preventDefault();

    const product = {
        Name: nameInput.value,
        Price: Number(priceInput.value),
        ImageURL: ImageURLInput.value,
        Details: detailsInput.value
    };

    if (editMode) {
        // Actualizează produsul existent
        fetch(`${URL}/${currentEditableProduct}`, {
            method: 'PUT',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify(product),
        })
        .then(() => {
            editMode = false; // Resetăm modul de editare
            form.reset();
            displayProducts(); // Reafișează produsele
        })
    } else {
        // Creează un produs nou
        fetch(URL, {
            method: 'POST',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify(product),
        })
        .then(() => {
            clearForm(); // Golește formularul
            displayProducts(); // Reafișează produsele
        })
    
    }
}



productsTableBody.addEventListener("click", handleActions);

function handleActions(event) {
    if (event.target.classList.contains("edit-btn")) {
        console.log("s-a apasat edit");
        currentEditableProduct = event.target.getAttribute("data-productId");

        fetch(`${URL}/${currentEditableProduct}`)
            .then(response => response.json())
            .then(product => {
                nameInput.value = product.Name;
                priceInput.value = product.Price;
                ImageURLInput.value = product.ImageURL;
                detailsInput.value = product.Details;
            })

        editMode = true;
    }
    else if(event.target.classList.contains("delete-btn")){
        const id=event.target.getAttribute("data-productId");
        fetch(`${URL}/${id}`,{
            method:"DELETE",

        }).then(()=>displayProducts());
    }
}
