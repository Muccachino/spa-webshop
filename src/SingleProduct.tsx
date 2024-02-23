import { useLoaderData, useOutletContext, Link } from "react-router-dom";
import { Product, getSingleProduct } from "./handleProducts";
import { Box, Button, Grid, Rating, Typography } from "@mui/material";

export async function loader({params}: { params: { id: number}}) {
    const product = await getSingleProduct(params.id);

    return {product};
  }

export default function SingleProduct() {
    const {product} = useLoaderData() as {product: Product}
    const [productsInCart, setProductsInCart] = useOutletContext() as [productsInCart: Product[], setProductsInCart: React.Dispatch<React.SetStateAction<Product[]>>];

    const addToCart = (product: Product) => {

      const inCart = productsInCart.find(item => item.title === product.title)
  
      if(inCart) {
        const updatedCart = productsInCart.map(item =>
          item.title === product.title ? {...item, counter: item.counter +1}: item);
  
        setProductsInCart(updatedCart);
      } else {
        setProductsInCart(prevCart => [...prevCart, {...product, counter: 1}]);
      }
      console.log(productsInCart)    
    }
 
    return(
      <>
        <Box sx={{ width: "80%", margin: "100px 10%"}}>
          <Link to={"/shop"}>
            <Button sx={{marginBottom: "50px"}} variant="outlined">Back</Button>
          </Link>
          <Grid container>
            <Grid item xs={3}>
              <img src={product.image} height={400}/>
            </Grid>
            <Grid item xs={7} sx={{padding: "20px", marginLeft: "50px"}}>
              <Typography sx={{marginBottom:"15px"}} variant="h4">{product.title}</Typography>
              <div style={{display: "flex", marginBottom: "20px"}}>
                <Rating name="read-only" value={product.rating.rate} readOnly></Rating>
                <Typography
                  variant="body2"
                  component="span"
                  sx={{ color: "#808080" }}
                >
                  ({product.rating.count} total votes)
                </Typography>
              </div>
              <Typography sx={{marginBottom:"30px"}} variant="body1">{product.description}</Typography>
              <Typography variant="h6" sx={{textAlign: "end"}}>€ {Number(product.price).toFixed(2)}</Typography>
              <Button sx={{marginTop:"100px"}} variant="contained" onClick={() => addToCart(product)}>Add to Card</Button>


            </Grid>

          </Grid>

        </Box>
      </>

    )
}