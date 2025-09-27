import { createCard, displayProducts, loadCards } from './rendering.js';
import { getProductsByNameOrCategory } from './service/furnature-service.js';

let offset
let searchTerm;


function renderProducts(products) {
    const productsContainer = document.getElementById("products");
    displayProducts('products',products)
    offset = 12
    searchTerm = ''
}

/* loading more products */

const loadMore = document.getElementById('load-more')

loadMore.addEventListener('click', async () => {
    const productsContainer = document.getElementById("products");
    const searchTerm= new URLSearchParams(window.location.search).get("name") || '';
    const { products } = await getProductsByNameOrCategory(searchTerm, 12, offset);
    console.log(`search term : ${searchTerm}`)
    loadCards(productsContainer,products)
    offset += 12
    console.log(`offset = ${offset}`)
})


/* searching input */
const searchInput = document.getElementById('search-input')

searchInput.addEventListener('input', async (e) => {
    searchTerm = e.target.value;
    console.log(`searchTerm : ${searchTerm}`)
    const { products } = await getProductsByNameOrCategory(searchTerm, 12, offset);
    
    window.history.replaceState({}, "", `${location.pathname}?name=${searchTerm}`);

    displayProducts('products' , products);
})


document.addEventListener('DOMContentLoaded', async () => {
    const params = new URLSearchParams(window.location.search)
    let name = params.get("name")

    if (name == null) {
            name = ''
    }
    console.log(location.search)
    console.log(name)

    const { products } = await getProductsByNameOrCategory(name);
    renderProducts(products);
});
