import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Shop, {loader as shopLoader} from "./Shop";
import SingleProduct, {loader as singleProductLoader} from "./SingleProduct";
import RootElement from "./RootElement";
import ShoppingCart from "./ShoppingCart";
//import ShopPage, {loader as shopLoader} from "./test";


export default function Router() {
    const router = createBrowserRouter([
        {
            path: "/",
            element: <RootElement/>,
            children: [
                {
                    path: "/shop",
                    element: <Shop/>,
                    loader: shopLoader,
                },
 /*                {
                    path: "/shop",
                    element: <ShopPage/>,
                    loader: shopLoader
                }, */
                {
                    path: "/shop/:id",
                    element: <SingleProduct/>,
                    loader: singleProductLoader as any 
                },
                {
                    path: "/shoppingCart",
                    element: <ShoppingCart/>
                }
            ]
        },

    ])
    return <RouterProvider router={router}/>
}