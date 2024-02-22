import { Grid, Card, CardActionArea, CardContent, Typography, Button } from '@mui/material';
import { getProducts, Product } from './handleProducts';
import { useLoaderData } from 'react-router-dom';




export async function loader() {
    const products = await getProducts()
    
    return {products}
  }
  
export default function ShopPage() {
    const {products} = useLoaderData() as {products: Product[]}


  return (
    <div className="root">
      <div className="header">
        <div className="headerText">My Awesome Shop</div>
      </div>
      <Grid container spacing={2}>
        {products.map((product) => (
          <Grid item key={product.id}>
            <Card className="productCard">
              <CardActionArea>
                <img src={product.image} className='media' height={300}/>
                <CardContent>
                  <Typography variant="h6" component="p">
                    {product.title}
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    ${product.price.toFixed(2)}
                  </Typography>
                </CardContent>
              </CardActionArea>
              <Button variant="contained" color="primary">
                View Details
              </Button>
            </Card>
          </Grid>
        ))}
      </Grid>
    </div>
  );
}