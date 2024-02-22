import { Box } from "@mui/material"
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
    <Box sx={{width: "100%"}}>
      <div className="header-image">
        <h1>My Awesome Shop</h1>
      </div>


      <ShopElement products={products}/>
    </Box>


  )
}