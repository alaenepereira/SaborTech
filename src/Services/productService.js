
// A URL base para o recurso de produtos
const API_URL = 'https://6864793d5b5d8d03397d5080.mockapi.io/cadastro_produto';


/**
 * Busca todos os produtos da API.
 * @returns {Promise<Array>} Uma promessa que resolve para a lista de produtos.
 */

const getAllProducts = async () => {
    try{
        const response = await fetch(API_URL);
        if (!response.ok) {
            throw new Error(`Erro ao buscar produtos: ${response.statusText}`);
        }
        const data = await response.json();
        return data;
    } catch(error){
        console.error('Erro ao buscar produtos:', error);
        return []; //retorna uma lista vazia em caso de erro
    }
};

/**
 * Busca um único produto pelo seu ID.
 * @param {string} productId - O ID do produto a ser buscado.
 * @returns {Promise<Object>} Uma promessa que resolve para o objeto do produto.
 */
const getProductById = async (productId) => {
  try {
    const response = await fetch(`${API_URL}/${productId}`);
    if (!response.ok) {
      throw new Error(`Erro ao buscar o produto com ID ${productId}.`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Falha em getProductById:', error);
    return null; // Retorna nulo se não encontrar ou der erro
  }
};


/**
 * (NOVO) Busca produtos filtrando por categoria.
 * @param {string} category - A categoria para filtrar (ex: "coffee", "salad").
 * @returns {Promise<Array>} Uma promessa que resolve para a lista de produtos da categoria.
 */
const getProductByCategory = async (category) => {
  try {
    // MockAPI permite filtrar com query params: /recurso?chave=valor
    const response = await fetch(`${API_URL}?category=${category}`);
    if (!response.ok) {
      throw new Error(`Erro ao buscar produtos da categoria ${category}.`);
    }
    return await response.json();
  } catch (error) {
    console.error('Falha em getProductByCategory:', error);
    return [];
  }
};

/**
 * Cria um novo produto na API.
 * @param {Object} newProductData - Objeto com os dados do novo produto (sem o id).
 * @returns {Promise<Object|null>} O produto recém-criado, incluindo o id gerado pela API.
 */
const createProduct = async (newProductData) => {
  try {
    const response = await fetch(API_URL, {
      method: 'POST', // Usamos POST para criar
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newProductData), // Converte o objeto JS para uma string JSON
    });
    if (!response.ok) {
      throw new Error('Erro ao criar o produto.');
    }
    return await response.json();
  } catch (error) {
    console.error('Falha em createProduct:', error);
    return null;
  }
};

/**
 * (NOVO) Atualiza um produto existente na API.
 * @param {string} productId - O ID do produto a ser atualizado.
 * @param {Object} productData - Objeto com os campos e valores a serem atualizados.
 * @returns {Promise<Object|null>} O produto atualizado.
 */
const updateProduct = async (productId, productData) => {
  try {
    const response = await fetch(`${API_URL}/${productId}`, {
      method: 'PUT', // Usamos PUT para atualizar (substitui o objeto inteiro)
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(productData),
    });
    if (!response.ok) {
      throw new Error('Erro ao atualizar o produto.');
    }
    return await response.json();
  } catch (error) {
    console.error('Falha em updateProduct:', error);
    return null;
  }
};

/**
 * (BÔNUS) Deleta um produto da API.
 * @param {string} productId - O ID do produto a ser deletado.
 * @returns {Promise<boolean>} Retorna true se a operação foi bem-sucedida.
 */
const deleteProduct = async (productId) => {
  try {
    const response = await fetch(`${API_URL}/${productId}`, {
      method: 'DELETE', // Usamos DELETE para remover
    });
    if (!response.ok) {
      throw new Error('Erro ao deletar o produto.');
    }
    return true; // Sucesso
  } catch (error) {
    console.error('Falha em deleteProduct:', error);
    return false; // Falha
  }
};


// Exportamos um objeto com todas as funções do serviço
export const productService = {
  getAllProducts,
  getProductById,
  getProductByCategory,
  createProduct,
  updateProduct,
  deleteProduct
};