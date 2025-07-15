import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
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
  CircularProgress
} from '@mui/material';
import './Options.css';
import Header from '../../Components/Header/Index';
import { productService } from '../../services/productService';

function Menu() {
  const isSmallScreen = useMediaQuery('(max-width:600px)');
  const [activeCategory, setActiveCategory] = useState('coffees');
  const [produtos, setProdutos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadProducts = async () => {
      try {
        const data = await productService.getAllProducts();
        const normalizedProducts = data.map(produto => ({
          id: produto.id,
          name: produto.name || 'Produto sem nome',
          description: produto.description || 'Sem descrição',
          price: parseFloat(produto.price || 0),
          image: produto.image || 'https://via.placeholder.com/150',
          category: produto.category || '',
          stockQuantity: parseInt(produto.stockQuantity || 0)
        }));
        setProdutos(normalizedProducts);
      } catch (error) {
        console.error('Erro ao carregar produtos:', error);
      } finally {
        setLoading(false);
      }
    };

    loadProducts();
  }, []);

  const getProductsByCategory = () => {
    return produtos.filter(produto => 
      produto.category?.toLowerCase() === activeCategory.toLowerCase()
    );
  };

 const categories = [
    { value: 'coffee', label: 'Cafés' },
    { value: 'salad', label: 'Saladas' },
    { value: 'mainDish', label: 'Pratos Principais' },
    { value: 'massas', label: 'Massas' },
    { value: 'extraSideDish', label: 'Acompanhamentos' },
    { value: 'dessert', label: 'Sobremesas' },
    { value: 'drink', label: 'Bebidas' }
  ];


  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="60vh">
        <CircularProgress />
      </Box>
    );
  }

  return (
    <>
      <Header />
      <Box sx={{ p: 2, display: 'flex', justifyContent: 'space-between' }}>
        <Typography variant="h4">Cardápio</Typography>
        <Button
          variant="contained"
          color="success"
          component={Link}
          to="/add"
        >
          Novo Produto
        </Button>
      </Box>
      
      <Box sx={{ p: 2 }}>
        <Stack direction="row" spacing={2} sx={{ overflowX: 'auto', py: 1 }}>
          {categories.map((category) => (
            <Button
              key={category.value}
              variant={activeCategory === category.value ? 'contained' : 'outlined'}
              onClick={() => setActiveCategory(category.value)}
              sx={{ minWidth: 'max-content' }}
            >
              {category.label}
            </Button>
          ))}
        </Stack>
      </Box>
      
      <Box sx={{ p: 4 }}>
        <Grid container spacing={2} className="card-grid">
          {getProductsByCategory().map((item) => (
            <Grid item xs={12} sm={6} md={4} key={item.id}>
              <Card sx={{ maxWidth: isSmallScreen ? '100%' : '345px', m: 1 }}>
                <CardMedia
                  component="img"
                  height="200"
                  image={item.image}
                  alt={item.name}
                  style={{ objectFit: 'cover' }}
                />
                <CardContent>
                  <Typography variant="h6">{item.name}</Typography>
                  <Typography variant="body2" color="text.secondary">
                    {item.description}
                  </Typography>
                </CardContent>
                <CardContent>
                  <Typography>Estoque: {item.stockQuantity}</Typography>
                  <Typography color="primary">
                    Preço: R$ {item.price.toFixed(2)}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>
    </>
  );
}

export default Menu;