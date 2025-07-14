import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Button,
  Typography,
  Box,
  Grid,
  Card,
  CardContent,
  CardMedia,
  useMediaQuery,
  CircularProgress,
  TextField
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import Header from '../../Components/Header/Index';
import { productService } from '../../services/productService';

function ControleEstoque() {
  const isSmallScreen = useMediaQuery('(max-width:600px)');
  const [produtos, setProdutos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProdutos = async () => {
      try {
        const data = await productService.getAllProducts();
        setProdutos(data);
      } catch (error) {
        console.error('Erro ao carregar produtos:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProdutos();
  }, []);

  const handleUpdateStock = async (id, newStock) => {
    try {
      await productService.updateProduct(id, { stockQuantity: parseInt(newStock) });
      const updatedProdutos = produtos.map(produto => 
        produto.id === id ? { ...produto, stockQuantity: parseInt(newStock) } : produto
      );
      setProdutos(updatedProdutos);
    } catch (error) {
      console.error('Erro ao atualizar estoque:', error);
    }
  };

  const handleEditProduct = (productId) => {
    navigate(`/editar/${productId}`, { 
      state: { fromEstoque: true }
    });
  };

  const filteredProdutos = produtos.filter(produto =>
    produto.name?.toLowerCase().includes(searchTerm.toLowerCase())
  );

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
      <Box sx={{ p: 4 }}>
        <Typography variant="h4" gutterBottom>
          Controle de Estoque
        </Typography>
        
        <TextField
          label="Buscar produto"
          variant="outlined"
          fullWidth
          margin="normal"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          sx={{ mb: 3 }}
        />
        
        <Grid container spacing={2}>
          {filteredProdutos.map((produto) => (
            <Grid item xs={12} sm={6} md={4} key={produto.id}>
              <Card sx={{ maxWidth: isSmallScreen ? '100%' : 345, m: 1 }}>
                <CardMedia
                  component="img"
                  height="200"
                  image={produto.image || 'https://via.placeholder.com/150'}
                  alt={produto.name}
                  style={{ objectFit: 'cover' }}
                />
                <CardContent>
                  <Typography variant="h6">{produto.name}</Typography>
                  <Typography variant="body2" color="text.secondary">
                    {produto.description}
                  </Typography>
                </CardContent>
                <CardContent>
                  <Typography color="primary">
                    Preço: R$ {typeof produto.price === 'number' ? produto.price.toFixed(2) : '0.00'}
                  </Typography>
                  <Box sx={{ display: 'flex', alignItems: 'center', mt: 2 }}>
                    <Typography sx={{ mr: 2 }}>Estoque:</Typography>
                    <TextField
                      type="number"
                      value={produto.stockQuantity || 0}
                      onChange={(e) => handleUpdateStock(produto.id, e.target.value)}
                      size="small"
                      sx={{ width: '80px' }}
                      inputProps={{ min: 0 }}
                    />
                  </Box>
                </CardContent>
                <CardContent>
                  <Button
                    variant="contained"
                    color="primary"
                    startIcon={<EditIcon />}
                    onClick={() => handleEditProduct(produto.id)}
                    fullWidth
                  >
                    Editar Produto
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

export default ControleEstoque;