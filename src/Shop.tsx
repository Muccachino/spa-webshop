import { Box, TextField } from "@mui/material"
import ShopElement from "./ShopElement"
import { getProducts, Product } from "./handleProducts"
import { Form, useLoaderData, useSubmit } from "react-router-dom"
import { useEffect } from "react";

export async function loader({request}: {request: Request}) {
  const url = new URL(request.url);
  const term = url.searchParams.get("term");
  const products = await getProducts(term!)
  
  return {products, term}
}

export default function Shop() {
  const {products, term} = useLoaderData() as {products: Product[], term: string}
  const submit = useSubmit();

  useEffect(() => {
    (document.getElementById("term")! as HTMLInputElement).value = term
  }, [term])


  return (
    <Box sx={{width: "100%"}}>
      <div className="header-image">
        <h1 id="header-text">Awesome Shop</h1>
      </div>
      <Form role="search">
      <TextField 
        id="term"
        variant="outlined" 
        placeholder="Search"
        sx={{display: "flex", justifySelf:"center", margin: "30px 40%"}}
        name="term"
        type="search"
        defaultValue={term}
        onChange={(e) => submit(e.currentTarget.form!)}/>
      </Form>

      <ShopElement products={products}/>
    </Box>


  )
}