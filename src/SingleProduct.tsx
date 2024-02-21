import { useLoaderData } from "react-router-dom";
import { Product, getSingleProduct } from "./handleProducts";

export async function loader({params}: { params: { id: number}}) {
    const product = await getSingleProduct(params.id);

    return {product};
  }

export default function SingleProduct() {

    const {product} = useLoaderData() as {product: Product}

    return(
        <div className="product-card" key={product.title}>
            <h1>Single Product</h1>
            <a href={`/shop/${product.id}`}>
            <img src={product.image} height={250}/>
            <h3>{product.title}</h3>
            <p>€ {product.price}</p>
            </a>
            <button onClick={() => console.log("Added to Card")}>Add to Card</button>
      </div>
    )
}