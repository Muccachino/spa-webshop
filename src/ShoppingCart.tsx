import { Link, useOutletContext } from "react-router-dom";
import { Product } from "./handleProducts";
import { Box, Button, Grid, Paper } from "@mui/material";
import { useEffect, useState } from "react";




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
      const updatedCart = productsInCart.map(item =>
        item.title === product.title ? {...item, counter: item.counter - 1}: item);

      setProductsInCart(updatedCart);
    }
  }

  return (
    <Box sx={{width: "100%"}}>
    <Grid container justifyContent="space-between">
      <Grid item xs={8}>
        {productsInCart.map(product => {
          return (
            <Paper className="product-card" key={product.title}>
              <img src={product.image} height={250}/>
              <h3>{product.title}</h3>
              <p>€ {Number(product.price).toFixed(2)}</p>
              <button onClick={() => changeAmount("reduce", product)}>-</button>
              <input type="number" value={product.counter} readOnly/>
              <button onClick={() => changeAmount("increase", product)}>+</button>
            </Paper>
          )
        })}

        <Link to={"/shop"}>
          <Button>Back to Shop</Button>
        </Link>
      </Grid>
      
      <Grid item xs={4}>
        <Paper>
          {productsInCart.map(product => {
            return(
              <div key={product.title}>
                <p>{product.counter}x {product.title}</p>
                <p>€ {product.counter * product.price}</p>
              </div>
            )
          })}

          <div id="finish-shopping">
            <span>Total: </span>
            <p>€ {Number(totalPrice).toFixed(2)}</p>
            <button>Order Now</button>
          </div>
        </Paper>
      </Grid>
    </Grid>
    </Box>


  )
}