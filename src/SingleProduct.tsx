import { useLoaderData, useOutletContext, Link } from "react-router-dom";
import { Product, getSingleProduct } from "./handleProducts";
import { Button } from "@mui/material";

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
        <div className="product-card" key={product.title}>
          <h1>Single Product</h1>
          <img src={product.image} height={250}/>
          <h3>{product.title}</h3>
          <p>€ {Number(product.price).toFixed(2)}</p>
          <Button onClick={() => addToCart(product)}>Add to Card</Button>
        </div>
        <Link to={"/shop"}>
          <Button>Back</Button>
        </Link>
          
      </>

    )
}