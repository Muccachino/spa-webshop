import { Link, useOutletContext } from "react-router-dom";
import { Product } from "./handleProducts";
import { Box, Button, Grid, Paper, Typography, IconButton } from "@mui/material";
import { useEffect, useState } from "react";
import DeleteIcon from "@mui/icons-material/Delete";



export default function ShoppingCart() {
  const [productsInCart, setProductsInCart] = useOutletContext() as [productsInCart: Product[], setProductsInCart: React.Dispatch<React.SetStateAction<Product[]>>];
  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    const addPrices = () => {
      let newTotal = 0;
      productsInCart.map(product => {
        newTotal += product.counter * product.price
      })
      setTotalPrice(newTotal);
    }
    addPrices()
  }, [productsInCart])

  const changeAmount = (change: string, product: Product) => {
    if(change === "increase"){
      const updatedCart = productsInCart.map(item =>
        item.title === product.title ? {...item, counter: item.counter + 1}: item);

      setProductsInCart(updatedCart);
    }
    if (change === "reduce") {
      let updatedCart
      if (product.counter === 1) {
        updatedCart = productsInCart.filter(item => item.title !== product.title)
      }
      else {
        updatedCart = productsInCart.map(item => 
        item.title === product.title ? {...item, counter: item.counter - 1}: item);
      }
      setProductsInCart(updatedCart);
    }
  }

  const deleteProduct = (product: Product) => {
    const updatedCart = productsInCart.filter(item => item.title !== product.title)

    setProductsInCart(updatedCart)
  }

  return (
    <Box sx={{margin: "50px 10%"}}>
    <Grid container justifyContent="space-between">
      <Link to={"/shop"}>
        <Button sx={{marginBottom: "50px"}} variant="outlined">Back to Shop</Button>
      </Link>
      <Grid item xs={12}>
        <Box >
          {productsInCart.map(product => {
            return (
              <Paper className="product-card" key={product.title}>
                <img src={product.image} height={200}/>
                <h3>{product.title}</h3>
                <p>€ {Number(product.price).toFixed(2)}</p>
                <div>
                  <Button sx={{ fontSize:"large"}} variant="contained" onClick={() => changeAmount("reduce", product)}>-</Button>
                  <span style={{margin: "0 20px", fontSize:"large"}}>{product.counter}</span>
                  <Button sx={{marginRight: "20px", fontSize:"large"}} variant="contained" onClick={() => changeAmount("increase", product)}>+</Button>
                  <IconButton
                    edge="end"
                    aria-label="delete"
                    onClick={() => deleteProduct(product)}
                  >
                    <DeleteIcon/>
                  </IconButton>
                </div>
  
              </Paper>
            )
          })}
        </Box>

      </Grid>
            
        <Paper sx={{display: "grid", width: "20%", marginTop: "20px"}}>
            <Typography sx={{fontWeight: "bold", fontSize: "1.3rem"}}>Total: € {Number(totalPrice).toFixed(2)}</Typography>
            <Button sx={{marginTop: "20px"}} variant="contained" >Order Now</Button>
        </Paper>
    </Grid>
    </Box>


  )
}