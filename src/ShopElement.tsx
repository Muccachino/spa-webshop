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

    const inCart = productsInCart.find(product => product.title === product.title)

    if(inCart) {
      const updatedCart = productsInCart.map(product =>
        product.title === product.title ? {...product, counter: product.counter +1}: product);

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
    height: "100%", //"fit-content",
  };
  const sxParagraph = {
    mt: 2,
    mb: 2,
  };
  
  const sxPrice = {
    display: "block",
  };

  return (
    products.map(product => {
      return(
        <Grid key={product.id} item xs={12} sm={6} md={3} zeroMinWidth>
        <Paper elevation={4} sx={sx(sxCard)}>
          <Link
            to={`${product.id}`}
            style={{ textDecoration: "none", color: "inherit" }}
          >
            {" "}
            <div>
              <img src={product.image} alt={product.title} width={300}/>
              <Typography
                sx={sx(sxParagraph)}
                variant="subtitle1"
                component="h6"
              >
                {product.title}
              </Typography>
              <Typography
                sx={sx(sxPrice)}
                variant="h6"
                component="span"
              >
                € {product.price}
              </Typography>
            </div>
          </Link>
          <div
            style={{ display: "flex", justifyContent: "flex-end" }}
          >
            <Button
              sx={{ mt: 2, mx: 0, justifyContent: "flex-end" }}
              variant="contained"
              onClick={() => addToCart}
            >
              Add to Cart
            </Button>
          </div>
        </Paper>
      </Grid>
      )
    })

  )
}