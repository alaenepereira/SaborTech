import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
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
  TextField
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';

function ControleEstoque() {
  const isSmallScreen = useMediaQuery('(max-width:600px)');
  const [produtos, setProdutos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchProdutos = async () => {
      try {
        const response = await fetch('http://localhost:3000/produtos');
        if (!response.ok) {
          throw new Error('Erro ao carregar produtos');
        }
        const data = await response.json();
        setProdutos(data);
      } catch (error) {
        console.error('Erro:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProdutos();
  }, []);

  const handleUpdateStock = async (id, newStock) => {
    try {
      const response = await fetch(`http://localhost:3000/produtos/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ stockQuantity: parseInt(newStock) }),
      });

      if (!response.ok) {
        throw new Error('Erro ao atualizar estoque');
      }

      const updatedProdutos = produtos.map(produto => 
        produto.id === id ? { ...produto, stockQuantity: parseInt(newStock) } : produto
      );
      setProdutos(updatedProdutos);
    } catch (error) {
      console.error('Erro:', error);
    }
  };

  const filteredProdutos = produtos.filter(produto =>
    produto.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="60vh">
        <CircularProgress />
      </Box>
    );
  }

  return (
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
            <Card sx={{ maxWidth: isSmallScreen ? '100%' : '345px', m: 1 }}>
              <CardMedia
                component="img"
                height="200"
                image={produto.image}
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
                    value={produto.stockQuantity}
                    onChange={(e) => handleUpdateStock(produto.id, e.target.value)}
                    size="small"
                    sx={{ width: '80px' }}
                  />
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}

export default ControleEstoque;