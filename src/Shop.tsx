import ShopElement from "./ShopElement"
import { getProducts, Product } from "./handleProducts"
import { useLoaderData } from "react-router-dom"

export async function loader() {
  const products = await getProducts()
  
  return {products}
}

export default function Shop() {
  const {products} = useLoaderData() as {products: Product[]}


  return (
    <>
      <h1>Awesome Shop</h1>
      <ShopElement products={products}/>
    </>


  )
}