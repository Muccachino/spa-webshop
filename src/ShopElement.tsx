import { Link } from "react-router-dom";
import { Product } from "./handleProducts";
import { Paper } from "@mui/material";

interface Props {
  products: Product[]
}

export default function ShopElement({products}: Props) {

  return (
    products.map(product => {
      return(
        <Paper className="product-card" key={product.title}>
          <Link to={`/shop/${product.id}`}>
            <img src={product.image} height={250}/>
            <h3>{product.title}</h3>
            <p>€ {product.price}</p>
          </Link>
          <button onClick={() => console.log("Added to Card")}>Add to Card</button>
        </Paper>
      )
    })

  )
}