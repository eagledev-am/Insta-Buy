
const BASE_URL = 'https://furniture-api.fly.dev'

async function fetchFromApi(endpoint) {
    try {
        console.log(`${BASE_URL}${endpoint}`)
        const response = await fetch(`${BASE_URL}${endpoint}`)
        if(!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`)
        }

        const data = await response.json()
        return data
    } catch (error) {
        console.error('Error fetching data:', error)
        throw error
    }
}

export async function getLatestProducts(limit = 9) {
    const endpoint = `/v1/products?sort=newest&limit=${limit}`
    const result = await fetchFromApi(endpoint)
    return {
        products: result.data  ,
        total: result.count
    }
}

export async function getFeaturedProducts(limit = 12, sort = 'newest') {
    const endpoint = `/v1/products?featured=true&sort=${sort}&limit=${limit}`;
    const result = await fetchFromApi(endpoint);
    return {
        products: result.data,
        totalCount: result.count
    };
}

export async function getProductsByNameOrCategory(name='',limit=12,offset=0) {
    const endpoint = `/v1/products?name=${name}&limit=${limit}&offset=${offset}`;
    const result = await fetchFromApi(endpoint);
    
    return {
        products: result.data,
        totalCount: result.count
    };
}


// getLatestProducts(6).then(data => console.log(data))
// getFeaturedProducts(6).then(data => console.log(data))