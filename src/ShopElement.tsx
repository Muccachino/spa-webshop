import { Link, useOutletContext } from "react-router-dom";
import { Product } from "./handleProducts";
import { Button, Paper, Grid, Typography } from "@mui/material";
import sx from "mui-sx"

interface Props {
  products: Product[]
}

export default function ShopElement({products}: Props) {
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


  const sxCard = {
    p: 2,
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    height: "100%",
    width: "350px"
  };
  const sxParagraph = {
    mt: 2,
    mb: 2,
  };
  

  return (
    <Grid container spacing={2} sx={{padding: "50px 10%"}}>
      {products.map(product => {
      return(
        <Grid key={product.id} item xs={12} sm={6} md={3} zeroMinWidth >
        <Paper elevation={4} sx={sx(sxCard)}>
          <Link
            to={`/shop/${product.id}`}
            style={{ textDecoration: "none", color: "inherit" }}
          >
            {" "}
            <div style={{textAlign: "center"}}>
              <img src={product.image} alt={product.title} width={200}/>
              <Typography
                sx={sx(sxParagraph)}
                variant="subtitle1"
                component="h6"
              >
                {product.title}
              </Typography>

            </div>
          </Link>
          <div
            style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}
          >
            <Typography
                sx={{alignSelf: "center"}}
                variant="h6"
                component="span"
              >
                € {Number(product.price).toFixed(2)}
            </Typography>
            <Button
              sx={{ mx: 0}}
              variant="contained"
              onClick={() => addToCart(product)}
            >
              Add to Cart
            </Button>
          </div>
        </Paper>
      </Grid>
      )
    })}
    </Grid>
    

  )
}