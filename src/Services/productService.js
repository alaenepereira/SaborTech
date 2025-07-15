const API_URL = 'https://6864793d5b5d8d03397d5080.mockapi.io/cadastro_produto';

let productsCache = [];

const getAllProducts = async () => {
  try {
    const response = await fetch(API_URL);
    if (!response.ok) throw new Error(`Erro HTTP: ${response.status}`);
    const data = await response.json();
    productsCache = data;
    return data;
  } catch (error) {
    console.error('Erro ao buscar produtos:', error);
    return productsCache.length > 0 ? productsCache : [];
  }
};

const getProductById = async (id) => {
  try {
    const cachedProduct = productsCache.find(p => p.id === id);
    if (cachedProduct) return cachedProduct;

    const response = await fetch(`${API_URL}/${id}`);
    if (!response.ok) throw new Error(`Produto não encontrado (ID: ${id})`);
    return await response.json();
  } catch (error) {
    console.error('Erro ao buscar produto:', error);
    return null;
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

const createProduct = async (productData) => {
  try {
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        ...productData,
        createdAt: new Date().toISOString()
      })
    });

    if (!response.ok) throw new Error('Erro ao criar produto');
    const newProduct = await response.json();
    productsCache.push(newProduct);
    return newProduct;
  } catch (error) {
    console.error('Erro ao criar produto:', error);
    return null;
  }
};

const updateProduct = async (id, updates) => {
  try {
    const response = await fetch(`${API_URL}/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        ...updates,
        updatedAt: new Date().toISOString()
      })
    });

    if (!response.ok) throw new Error(`Erro ao atualizar produto ID: ${id}`);
    const updatedProduct = await response.json();
    productsCache = productsCache.map(p => p.id === id ? updatedProduct : p);
    return updatedProduct;
  } catch (error) {
    console.error('Erro ao atualizar produto:', error);
    return null;
  }
};

const deleteProduct = async (id) => {
  try {
    const response = await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
    if (!response.ok) throw new Error(`Erro ao deletar produto ID: ${id}`);
    productsCache = productsCache.filter(p => p.id !== id);
    return true;
  } catch (error) {
    console.error('Erro ao deletar produto:', error);
    return false;
  }
};

const clearCache = () => {
  productsCache = [];
  return Promise.resolve();
};

export const productService = {
  getAllProducts,
  getProductById,
  getProductByCategory,
  createProduct,
  updateProduct,
  deleteProduct,
  clearCache
};