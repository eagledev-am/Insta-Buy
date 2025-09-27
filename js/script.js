import { displayProducts } from "./rendering.js";
import { getFeaturedProducts, getLatestProducts } from "./service/furnature-service.js"




document.addEventListener('DOMContentLoaded', async () => {
    const { products: featuredProducts } = await getFeaturedProducts();
    const { products: latestProducts } = await getLatestProducts();
    // displayFeaturedProducts(featuredProducts)
    displayProducts('featured-products',featuredProducts);
    displayProducts('latest-products',latestProducts,'fixed-card');
    searchForm.addEventListener("submit", (e) => {
        e.preventDefault();
    })
});