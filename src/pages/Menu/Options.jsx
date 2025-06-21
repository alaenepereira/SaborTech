// Menu.jsx
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
  CardActions
} from '@mui/material';
import { Modal } from '@mui/material'

import './Options.css';
import Header from '../../Components/Header/Index';



function Menu() {


  const [activeCategory, setActiveCategory] = useState('coffees');

  const coffeesList = [
    { id: 1, name: ' ☕ Café Expresso', description: 'Intenso e aromático', price: 'R$ 9,00', stockQuantity: '📦 Quantidade disponíveis: 5', image: 'src/assets/cafe-expresso.jpg' },
    { id: 2, name: ' ☕Café Latte', description: 'Com leite cremoso', price: 'R$ 13,00', stockQuantity: 'Quantidade disponíveis: 8', image: 'src/assets/cafe-latte.jpg' },
    { id: 3, name: ' ☕Café Coado', description: 'O tradicional "cafezinho" brasileiro', price: 'R$ 4,00', stockQuantity: 'Quantidade disponíveis: 3', image: 'src/assets/Café_coado.jpg' },
    { id: 4, name: ' ☕Mocha', description: ' Uma variação do cappuccino, com adição de chocolate.', price: 'R$ 12,00', stockQuantity: 'Quantidade disponíveis: 4', image: 'src/assets/Mocha.png' }
  ];

  const saladsList = [
    { id: 1, name: ' 🍽️ Vinagrete', description: ['É um molho clássico,conhecido', 'por seu sabor refrescante e levemente ácido'], price: 'R$ 15,00', stockQuantity: 'Quantidade disponíveis: 3', image: 'src/assets/Vinagrete.jpg' },
    { id: 2, name: ' 🍽️ Salada de Batata com Maionese', description: ['É combinação clássica e irresistível,', 'Cubos de batata cozida com cenoura, milho, ervilha e creme de maionese.'], price: 'R$ 35,00', stockQuantity: 'Quantidade disponíveis: 4', image: 'src/assets/batata.jpg' },
    { id: 3, name: '🍽️ Salada de Alface', description: 'Sabor: Neutro e suave e crocante', price: 'R$ 5,00', stockQuantity: 'Quantidade disponíveis: 6', image: 'src/assets/salada-de-alface.jpg' }
  ]

  const mainDishes = [
    { id: 1, name: ' 🍽️ Filé à Parmegiana', description: ['Filé empanado ao molho de tomate', 'coberto com queijo gratinado.', 'Servido com arroz e batata frita.'], price: 'R$ 74,00', stockQuantity: 'Quantidade disponíveis: 6', image: 'src/assets/bife-a-parmegiana.jpg' },
    { id: 2, name: ' 🍽️ Picanha na chapa', description: 'Acompanha arroz, farofa, vinagrete e batata frita.', price: 'R$ 96,00', stockQuantity: 'Quantidade disponíveis: 5', image: 'src/assets/picanha.png' },
    { id: 3, name: ' 🍽️ Moqueca de Peixe', description: 'Peixe cozido com pimentões, cebola, coentro, leite de coco e azeite de dendê.', price: 'R$ 4,00', stockQuantity: 'Quantidade disponíveis: 3', image: 'src/assets/moqueca.jpg' },
    { id: 4, name: ' 🍽️ Frango à Passarinho', description: 'Pequenos pedaços de frango fritos com alho e cheiro-verde.', price: 'R$ 34,00', stockQuantity: 'Quantidade disponíveis: 5', image: 'src/assets/frango.jpg' },
  ]

  const massLists = [
    { id: 1, name: ' 🍽️ Espaguete à Bolonhesa', description: 'Massa al dente com molho de carne moída ao molho de tomate caseiro.', price: 'R$ 26,00', stockQuantity: 'Quantidade disponíveis: 2', image: 'src/assets/espaguete.jpg' },
    { id: 1, name: '🍽️ Penne ao Molho Branco com Frango', description: 'Penne ao molho cremoso com tiras de frango grelhado e champignon', price: 'R$ 64,00', stockQuantity: 'Quantidade disponíveis: 6', image: 'src/assets/molho-branco.jpg' },
  ]

  const extraSideDishes = [
    { id: 1, name: ' 🍽️ Arroz branco', price: 'R$ 6,00', stockQuantity: 'Quantidade disponíveis: 10 Porções', image: 'src/assets/arroz.jpg' },
    { id: 2, name: ' 🍽️ Feijão tropeiro', price: 'R$ 5,00', stockQuantity: 'Quantidade disponíveis: 8', image: 'src/assets/feijão.jpg' },
    { id: 3, name: ' 🍽️ Batata frita', price: 'R$ 4,00', stockQuantity: 'Quantidade disponíveis: 5', image: 'src/assets/batata-frita.jpg' },
    { id: 4, name: ' 🍽️ Farofa de manteiga', price: 'R$ 7,00', stockQuantity: 'Quantidade disponíveis: 6', image: 'src/assets/Farofa-de-manteiga.jpg' },

  ]

  const dessertsList = [
    { id: 1, name: 'Brownie', description: 'Chocolate delicioso', price: 'R$ 9,00', stockQuantity: 'Quantidade disponíveis: 9', image: 'src/assets/Brownie.jpg' },
    { id: 2, name: 'Cheesecake', description: 'Leve e saborosa', price: 'R$ 15,00', stockQuantity: 'Quantidade disponíveis: 5', image: 'src/assets/Cheesecake-de-baunilha.jpg' },
    { id: 3, name: 'Pudim de leite condensado', description: 'Cremoso e com calda de caramelo.', price: 'R$ 30,00', stockQuantity: 'Quantidade disponíveis: 8', image: 'src/assets/pudim.jpg' },

  ];

  const drinksList = [
    { id: 1, name: ' 🍹 Sucos naturais ', description: 'laranja, abacaxi, maracujá', price: 'R$ 4,00', stockQuantity: 'Quantidade disponíveis: 13', image: 'src/assets/sucos.jpg' },
    { id: 2, name: 'Refrigerantes', price: 'R$ 11,00', stockQuantity: 'Quantidade disponíveis: 15', image: 'src/assets/refri.jpg' },
    { id: 2, name: 'Água mineral', price: 'R$ 2,00', stockQuantity: 'Quantidade disponíveis: 30', image: 'src/assets/agua.jpg' },
    { id: 2, name: ' 🍺 Cervejas', stockQuantity: 'Quantidade disponíveis: 50', price: 'R$ 6,00', image: 'src/assets/cerveja.jpg' },
  ]



  const renderCategoryContent = () => {
    let items = []

    switch (activeCategory) {
      case 'coffees':
        items = coffeesList
        break;
      case 'salads':
        items = saladsList
        break
      case 'dishes':
        items = mainDishes
        break
      case 'desserts':
        items = dessertsList
        break
      case 'mass':
        items = massLists
        break
      case 'extras':
        items = extraSideDishes
        break
      case 'drinks':
        items = drinksList
        break


      default:
        break;
    }

    return (
      <Grid container spacing={2} className="card-grid">
        {items.map((item) => (
          <Grid item xs={12} sm={6} md={4} key={item.id}>
            <Card className="product-card">
              <CardMedia
                component="img"
                height="150"

                image={item.image}
                alt={item.name}
              />
              <CardContent>
                <Typography variant="h6" className="product-title">{item.name}</Typography>
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
              <CardContent className='price'>

                <Typography variant='subtitle1' color='text.primary' fontWeight={'bold'} >
                  {item.stockQuantity}
                </Typography> <br />

                <Typography variant="body2" color="blue" >
                  {item.price}

                </Typography>

              </CardContent>
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
      <Box sx={{ padding: 2 }} className="category-buttons">
        <Stack direction="row" spacing={2}>
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
