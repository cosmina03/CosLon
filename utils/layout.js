export function mapProductToCard(product) {
    return `
        <div class="card flex-col items-center gap-20">
            <div class="img">
                <img src="${product.ImageURL}" alt="${product.Name}">
            </div>
            <div class="info">
                <div class="name">
                    <h3>${product.Name}</h3>
                    <h4>${product.Details}</h4>
                </div>
                <div class="price">${product.Price} lei</div>
                <button class="add-to-cart" 
                    data-productId="${product.id}" 
                    data-name="${product.Name}" 
                    data-price="${product.Price}" 
                    data-image="${product.ImageURL}">
                    Adaugă în coș
                </button>
            </div>
        </div>
    `;
}

export function mapProductToAdminTableRow(product){
    return `
                <tr>
                    <td>${product.Name}</td>
                    <td>${product.Price}</td>
                    <td><img src="${product.ImageURL}" width="50px"/></td>
                    <td>${product.Details}</td>
                    <td><button class="edit-btn" data-productId="${product.id}">Edit</button></td>
                    <td><button class="delete-btn" data-productId="${product.id}">Delete</button></td>
                </tr>
            `;
}