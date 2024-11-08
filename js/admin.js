import { getAllProducts, updateProduct,addNewProduct,getProductById,deleteProduct } from "../api/products.js";
import { mapProductToAdminTableRow } from "../utils/layout.js";



const productsTableBody = document.getElementById("products-table").querySelector("tbody");
document.addEventListener('DOMContentLoaded', displayTableRows);


async function displayTableRows(){
    const products=await getAllProducts();

    productsTableBody.innerHTML=products.map(mapProductToAdminTableRow).join("");

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

async function saveProduct(event) {
    event.preventDefault();

    const product = {
        Name: nameInput.value,
        Price: Number(priceInput.value),
        ImageURL: ImageURLInput.value,
        Details: detailsInput.value
    };

    if (editMode) {
        const editedProduct= await updateProduct(
            product, currentEditableProduct
        );
        if(editedProduct!==null){
            form.reset();
            await displayTableRows();
            editMode=false;
        }
    } else {
       const newProduct=await addNewProduct(product);
       if(newProduct!==null){
        form.reset();
        await displayTableRows();
       }
    }
}


productsTableBody.addEventListener("click", handleActions);

async function handleActions(event) {
    if (event.target.classList.contains("edit-btn")) {
    
        currentEditableProduct = event.target.getAttribute("data-productId");
        console.log("Editing product ID:", currentEditableProduct); // Verifică dacă ID-ul este corect

        const currentEditable = await getProductById(currentEditableProduct);
        console.log("Product data:", currentEditable); // Verifică dacă datele sunt preluate corect

        nameInput.value = currentEditable.Name;
        priceInput.value = currentEditable.Price;
        ImageURLInput.value = currentEditable.ImageURL;
        detailsInput.value = currentEditable.Details;
            

        editMode = true;
    }
    else if(event.target.classList.contains("delete-btn")){
        const id=event.target.getAttribute("data-productId");
        await deleteProduct(id);
        await displayTableRows();
    }
}
