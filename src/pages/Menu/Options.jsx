

import React, { useState, useEffect } from 'react';
import {
  Button,
  Typography,
  Box,
  Stack,
  Grid,
  Card,
  CardContent,
  CardMedia,
  useMediaQuery,
  CircularProgress,
} from '@mui/material';
import './Options.css';
import Header from '../../Components/Header/Index';
import { productService } from '../../services/productService.js';
import BackButton from '../../Components/Utils/BackButton.jsx';

function Menu() {
  const isSmallScreen = useMediaQuery('(max-width:600px)');


  const [activeCategory, setActiveCategory] = useState('coffee');
  const [menuItems, setMenuItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);


  useEffect(() => {
    const fetchItemsByCategory = async () => {
      try {
        setIsLoading(true);
        const data = await productService.getProductByCategory(activeCategory);
        setMenuItems(data);
      } catch (error) {
        console.error('Erro ao carregar itens:', error)
        setMenuItems([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchItemsByCategory();
  }, [activeCategory]);

  return (
    <>
      <Header />
      <Box sx={{ padding: 2 }}>
        <Stack direction="row" spacing={1} className="category-buttons" sx={{ flexWrap: 'wrap', gap: 1 }}>
          <Button variant={activeCategory === 'coffee' ? 'contained' : 'outlined'} onClick={() => setActiveCategory('coffee')}>Cafés</Button>
          <Button variant={activeCategory === 'salad' ? 'contained' : 'outlined'} onClick={() => setActiveCategory('salad')}>Saladas</Button>
          <Button variant={activeCategory === 'mainDish' ? 'contained' : 'outlined'} onClick={() => setActiveCategory('mainDish')}>Pratos Principais</Button>
          <Button variant={activeCategory === 'massas' ? 'contained' : 'outlined'} onClick={() => setActiveCategory('massas')}>Massas</Button>
          <Button variant={activeCategory === 'extraSideDish' ? 'contained' : 'outlined'} onClick={() => setActiveCategory('extraSideDish')}>Acompanhamentos</Button>
          <Button variant={activeCategory === 'dessert' ? 'contained' : 'outlined'} onClick={() => setActiveCategory('dessert')}>Sobremesas</Button>
          <Button variant={activeCategory === 'drink' ? 'contained' : 'outlined'} onClick={() => setActiveCategory('drink')}>Bebidas</Button>
        </Stack>
      </Box>

      <Box sx={{ padding: 2, display: 'flex', justifyContent: 'center' }}>
        {isLoading ? (
          <CircularProgress />
        ) : (
          <Grid container spacing={2} className="card-grid">
            {menuItems.map((item) => (
              <Grid item xs={12} sm={6} md={4} lg={3} key={item.id}>
                <Card sx={{ maxWidth: 345, width: '100%', m: 'auto', display: 'flex', flexDirection: 'column', height: '100%' }} className='product-card'>
                  <CardMedia
                    component="img"
                    sx={{ height: isSmallScreen ? 180 : 200, objectFit: 'cover' }}
                    image={item.image}
                    alt={item.name}
                  />
                  <CardContent sx={{ flexGrow: 1, minHeight: 120 }}>
                    <Typography variant="h6" component='div' className="product-title"
                      sx={{ minHeight: 40, overflow: 'hidden', textOverflow: 'ellipsis' }}
                    >{item.name}</Typography>
                    <Typography variant="body2" color="text.secondary"
                      sx={{ minHeight: 60, overflow: 'hidden', textOverflow: 'ellipsis' }}
                    >{item.description}</Typography>
                  </CardContent>
                  <CardContent>
                    <Typography variant='subtitle1' color='text.primary' fontWeight={'bold'}>
                      {`Disponíveis: ${item.stockQuantity}`}
                    </Typography>
                    <Typography variant="h6" color="primary">
                      {`R$ ${item.price.toFixed(2).replace('.', ',')}`}
                    </Typography>
                  </CardContent>

                </Card>
              </Grid>
            ))}
          </Grid>
        )}
      </Box>
    </>
  );
}

export default Menu;