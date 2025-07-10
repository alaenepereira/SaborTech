import React, { useState } from 'react';
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
  CardActions,
  IconButton,
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
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

  const renderCategoryContent = (onEdit, onDelete) => {
    let items = []

    // Primeiro carregar os itens padrão do JSON
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

        {items.map((item) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={item.id}>
            <Card sx={{
              maxWidth: 345,
              width: '100%',
              m: 'auto',
            }} className='product-card' >
              <CardMedia className='product-card'
                component="img"
                sx={{
                  height: isSmallScreen ? 180 : 200,
                  objectFit: 'cover'
                }}

                image={item.image}
                alt={item.name}
              />
              <CardContent >
                <Typography variant="h6" component='div' className="product-title">{item.name} </Typography>
                <Typography variant="body2" color="text.secondary">
                  {Array.isArray(item.description)
                    ? item.description.map((line, idx) => (
                      <React.Fragment key={idx}>
                        {line}
                        <br />
                      </React.Fragment>
                    ))
                    : item.description}
                </Typography>
              </CardContent>
              <CardContent>

                <Typography variant='subtitle1' color='text.primary' fontWeight={'bold'} >
                  {item.stockQuantity}
                </Typography> <br />

                <Typography variant="body2" color="blue" >
                  {item.price}
                </Typography>
              </CardContent>

              <CardActions disableSpacing>
                <IconButton aria-label="editar" onClick={onEdit}>
                  <EditIcon />
                </IconButton>
                <IconButton className='icons' aria-label="excluir" onClick={onDelete}>
                  <DeleteIcon />
                </IconButton>
              </CardActions>
            </Card>
          </Grid>
        ))
        }
      </Grid>
    );
  };

  return (
    <>
      <Header />
      <Box sx={{ padding: 2 }} >
        <Stack direction="row" spacing={1} className="category-buttons">
          <Button
            variant={activeCategory === 'coffees' ? 'contained' : 'outlined'}
            onClick={() => setActiveCategory('coffees')}
          >
            Cafés
          </Button>
          <Button
            variant={activeCategory === 'salads' ? 'contained' : 'outlined'}
            onClick={() => setActiveCategory('salads')}
          >
            Saladas
          </Button>

          <Button
            variant={activeCategory === 'dishes' ? 'contained' : 'outlined'}
            onClick={() => setActiveCategory('dishes')}
          >
            Pratos Principais
          </Button>
          <Button
            variant={activeCategory === 'mass' ? 'contained' : 'outlined'}
            onClick={() => setActiveCategory('mass')}
          >
            Massas
          </Button>
          <Button
            variant={activeCategory === 'extras' ? 'contained' : 'outlined'}
            onClick={() => setActiveCategory('extras')}
          >
            Acompanhamentos Extras
          </Button>
          <Button
            variant={activeCategory === 'desserts' ? 'contained' : 'outlined'}
            onClick={() => setActiveCategory('desserts')}
          >
            Sobremesas
          </Button>
          <Button
            variant={activeCategory === 'drinks' ? 'contained' : 'outlined'}
            onClick={() => setActiveCategory('drinks')}
          >
            Bebidas
          </Button>
        </Stack>
      </Box>

      <Box sx={{ padding: 2 }}>
        {renderCategoryContent()}
      </Box>
    </>
  );
}

export default Menu;