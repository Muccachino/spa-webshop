

export type Product = {
    id: number,
    category: string,
    description: string,
    title: string,
    image: string,
    price: number,
    rating: {count: number, rate: number}
}

let fakeCache: {[key: string]: boolean} = {};

export function fakeDelay(key?: string) {
    if(!key) {
        fakeCache = {}
    }
    if(fakeCache[key!]) {
        return
    }
    fakeCache[key!] = true;
    return new Promise((resolve) => {
        setTimeout(resolve, 1000)
    })
}

export async function getProducts() {
    await fakeDelay(`getProducts`);
    
    const products: Product[] = await fetch('https://fakestoreapi.com/products?limit=5')
    .then(res=>res.json())

    return products
}

export async function getSingleProduct(id: number) {
    await fakeDelay(`getSingleProduct`);

    const product: Product = await fetch(`https://fakestoreapi.com/products/${id.toString()}`)
    .then(res=>res.json())

    return product
}