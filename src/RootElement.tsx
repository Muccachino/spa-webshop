import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Icon from '@mdi/react';
import { mdiCartOutline } from '@mdi/js';
import { Link, Outlet } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Product } from './handleProducts';

interface Props {

  window?: () => Window;
}

const drawerWidth = 240;

export default function RootElement(props: Props) {
  const [productsInCart, setProductsInCart] = useState<Product[]>([])
  const [totalProducts, setTotalProducts] = useState(0);

  useEffect(() => {
    const countTotal = () => {
      let newCount = 0;
      productsInCart.map(product => {
        newCount += product.counter
      })
      setTotalProducts(newCount);
    }
    countTotal()
  }, [productsInCart])

  const { window } = props;
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen((prevState) => !prevState);
  };

  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: 'center' }}>
      <Typography variant="h6" sx={{ my: 2 }}>
        Awesome Shop
      </Typography>
      <Divider />
      <List>
          <ListItem disablePadding>
            <ListItemButton sx={{ textAlign: 'center' }}>
              <ListItemText primary="Home" />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton sx={{ textAlign: 'center' }}>
              <ListItemText primary="Shop" />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton sx={{ textAlign: 'center' }}>
              <Icon path={mdiCartOutline} size={1} />
            </ListItemButton>
          </ListItem>
      </List>
    </Box>
  );

  const container = window !== undefined ? () => window().document.body : undefined;

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar component="nav">
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: 'none' } }}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            variant="h6"
            component="div"
            sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' } }}
          >
            Awesome Shop
          </Typography>
          <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
            <Link to={"/"}>
                <Button sx={{ color: '#fff' }}>
                    Home
                </Button>
            </Link>
            <Link to={"/shop"}>
                <Button sx={{ color: '#fff' }}>
                    Shop
                </Button>
            </Link>
            <Link to={"/shoppingCart"}>
              
              <div className="cart">
                {(productsInCart.length >= 1) && <span className="count">{totalProducts}</span>}
                <Icon path={mdiCartOutline} size={1.5} style={{color: "#fff"}} className='material-icons'/>
              </div>
            </Link>
          </Box>
        </Toolbar>
      </AppBar>
      <nav>
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: 'block', sm: 'none' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
          }}
        >
          {drawer}
        </Drawer>
      </nav>
      <Box component="main" sx={{ p: 3 }}>
        <Toolbar />
        <div id='content'>{<Outlet context={[productsInCart, setProductsInCart]}/>}</div>
      </Box>
    </Box>
  );
}