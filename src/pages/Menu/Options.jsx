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
  useMediaQuery
} from '@mui/material';
import './Options.css';
import Header from '../../Components/Header/Index';
import { coffeesList, dessertsList, drinksList, extraSideDishes, mainDishes, massLists, saladsList } from '../../Services/Json';

function Menu() {
  const isSmallScreen = useMediaQuery('(max-width:600px)');
  const [activeCategory, setActiveCategory] = useState('coffees');
  const [produtosSalvos, setProdutosSalvos] = useState([]);

  useEffect(() => {
    const carregarProdutos = () => {
      const salvos = JSON.parse(localStorage.getItem('produtos')) || [];
      setProdutosSalvos(salvos);
    };
    carregarProdutos();
    window.addEventListener('storage', carregarProdutos);
    return () => window.removeEventListener('storage', carregarProdutos);
  }, []);

  useEffect(() => {
    console.log('Produtos salvos:', produtosSalvos);
    console.log('Categoria ativa:', activeCategory);
    
    const produtosFiltrados = produtosSalvos.filter(produto => {
      const categoriaProduto = produto.categoria?.toLowerCase() || '';
      const categoriaAtiva = activeCategory.toLowerCase();
      
      return (
        categoriaProduto === categoriaAtiva ||
        categoriaProduto.replace(/-/g, ' ') === categoriaAtiva ||
        (categoriaAtiva === 'dishes' && categoriaProduto.includes('pratos')) ||
        (categoriaAtiva === 'mass' && categoriaProduto.includes('massas')) ||
        (categoriaAtiva === 'extras' && categoriaProduto.includes('acompanhamentos'))
      );
    });
    
    console.log('Produtos filtrados:', produtosFiltrados);
  }, [activeCategory, produtosSalvos]);

  const renderCategoryContent = () => {
    let items = [];

    // Primeiro carrega os itens padrão do JSON
    switch (activeCategory) {
      case 'coffees':
        items = [...coffeesList];
        break;
      case 'salads':
        items = [...saladsList];
        break;
      case 'dishes':
        items = [...mainDishes];
        break;
      case 'desserts':
        items = [...dessertsList];
        break;
      case 'mass':
        items = [...massLists];
        break;
      case 'extras':
        items = [...extraSideDishes];
        break;
      case 'drinks':
        items = [...drinksList];
        break;
      default:
        break;
    }

    // Filtra produtos salvos por categoria com mais opções de compatibilidade
    const produtosDaCategoria = produtosSalvos.filter(produto => {
      const categoriaProduto = produto.categoria?.toLowerCase() || '';
      const categoriaAtiva = activeCategory.toLowerCase();
      
      return (
        categoriaProduto === categoriaAtiva ||
        categoriaProduto.replace(/-/g, ' ') === categoriaAtiva ||
        (categoriaAtiva === 'dishes' && categoriaProduto.includes('pratos')) ||
        (categoriaAtiva === 'mass' && categoriaProduto.includes('massas')) ||
        (categoriaAtiva === 'extras' && categoriaProduto.includes('acompanhamentos'))
      );
    });

    // Converte os produtos salvos para o formato esperado
    const produtosConvertidos = produtosDaCategoria.map(produto => {
      const price = typeof produto.preco === 'number' ? 
                   produto.preco : 
                   Number(produto.preco || produto.price || 0);
      
      return {
        id: produto.id || Date.now(),
        image: produto.imagem || produto.image || '',
        name: produto.nome || produto.name || 'Produto sem nome',
        description: produto.descricao || produto.description || 'Sem descrição',
        price: isNaN(price) ? 0 : price, // Garante que é sempre um número válido
        stockQuantity: typeof produto.estoque === 'number' ? 
                      produto.estoque : 
                      Number(produto.estoque || produto.stockQuantity || 0)
      };
    });

    // Combina todos os produtos
    const todosProdutos = [...items, ...produtosConvertidos];

    return (
      <Grid container spacing={2} className="card-grid">
        {todosProdutos.map((item) => {
          // Verificação adicional para debug
          console.log('Renderizando produto:', {
            id: item.id,
            name: item.name,
            price: item.price,
            priceType: typeof item.price
          });
          
          return (
            <Grid item xs={12} sm={6} md={4} key={item.id}>
              <Card sx={{ 
                maxWidth: isSmallScreen ? '100%' : '345px', 
                m: 1 
              }} className="product-card">
                <CardMedia
                  component="img"
                  height="200"
                  image={item.image}
                  alt={item.name}
                  style={{ objectFit: 'cover' }}
                />
                <CardContent>
                  <Typography variant="h6" component="div" className="product-title">
                    {item.name}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {item.description}
                  </Typography>
                </CardContent>
                <CardContent className="price">
                  <Typography variant="subtitle1" color="text.primary" fontWeight="bold">
                    Estoque: {item.stockQuantity}
                  </Typography>
                  <Typography variant="body2" color="blue">
                    Preço: R$ {typeof item.price === 'number' && !isNaN(item.price) ? 
                             item.price.toFixed(2) : 
                             '0.00'}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          );
        })}
      </Grid>
    );
  };

  return (
    <>
      <Header />
      <Box sx={{ padding: 2 }} className="category-buttons">
        <Stack direction="row" spacing={2} sx={{ overflowX: 'auto', py: 1 }}>
          {[
            { value: 'coffees', label: 'Cafés' },
            { value: 'salads', label: 'Saladas' },
            { value: 'dishes', label: 'Pratos Principais' },
            { value: 'mass', label: 'Massas' },
            { value: 'extras', label: 'Acompanhamentos' },
            { value: 'desserts', label: 'Sobremesas' },
            { value: 'drinks', label: 'Bebidas' }
          ].map((category) => (
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

      <Box sx={{ padding: 4 }}>
        {renderCategoryContent()}
      </Box>
    </>
  );
}

export default Menu;