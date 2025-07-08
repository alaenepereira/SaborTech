import React, { useState, useEffect } from 'react';
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
import EditIcon from '@mui/icons-material/Edit';

function Menu() {
  const isSmallScreen = useMediaQuery('(max-width:600px)');
  const [activeCategory, setActiveCategory] = useState('coffees');
  const [produtos, setProdutos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadProducts = () => {
      try {
        const savedProducts = JSON.parse(localStorage.getItem('produtos')) || [];
        
        // Normaliza os dados dos produtos
        const normalizedProducts = savedProducts.map(produto => ({
          id: produto.id || Date.now(),
          name: produto.nome || produto.name || 'Produto sem nome',
          description: produto.descricao || produto.description || 'Sem descrição',
          price: parseFloat(produto.preco || produto.price || 0),
          image: produto.imagem || produto.image || '',
          category: produto.categoria || produto.category || '',
          stockQuantity: parseInt(produto.estoque || produto.stockQuantity || 0)
        }));
        
        setProdutos(normalizedProducts);
      } catch (error) {
        console.error('Erro ao carregar produtos:', error);
      } finally {
        setLoading(false);
      }
    };

    loadProducts();
    window.addEventListener('storage', loadProducts);
    return () => window.removeEventListener('storage', loadProducts);
  }, []);

  const getProductsByCategory = () => {
    if (!produtos.length) return [];
    
    return produtos.filter(produto => {
      const productCategory = produto.category?.toLowerCase() || '';
      const activeCat = activeCategory.toLowerCase();
      
      // Mapeamento de categorias alternativas
      const categoryMap = {
        'dishes': ['pratos principais', 'dishes'],
        'mass': ['massas', 'mass'],
        'extras': ['acompanhamentos', 'extras']
      };
      
      return (
        productCategory === activeCat ||
        (categoryMap[activeCat]?.includes(productCategory)) ||
        productCategory.includes(activeCat)
      );
    });
  };

  const categories = [
    { value: 'coffees', label: 'Cafés' },
    { value: 'salads', label: 'Saladas' },
    { value: 'dishes', label: 'Pratos Principais' },
    { value: 'mass', label: 'Massas' },
    { value: 'extras', label: 'Acompanhamentos' },
    { value: 'desserts', label: 'Sobremesas' },
    { value: 'drinks', label: 'Bebidas' }
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
                    Preço: R$ {typeof item.price === 'number' ? item.price.toFixed(2) : '0.00'}
                  </Typography>
                </CardContent>
                <CardContent>
                  <Button
                    variant="contained"
                    color="primary"
                    component={Link}
                    to={`/editar/${item.id}`}
                    startIcon={<EditIcon />}
                    sx={{ mr: 1 }}
                  >
                    Editar
                  </Button>
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