// src/services/productService.js

const API_URL = 'https://6864793d5b5d8d03397d5080.mockapi.io/cadastro_produto';

// O cache do seu colega, que vamos manter.
let productsCache = [];

/**
 * Busca todos os produtos. Primeiro tenta usar o cache, se estiver vazio, busca na API.
 */
const getAllProducts = async () => {
  try {
    const response = await fetch(API_URL);
    if (!response.ok) throw new Error(`Erro HTTP: ${response.status}`);
    const data = await response.json();
    productsCache = data; // Atualiza o cache
    return data;
  } catch (error) {
    console.error('Erro ao buscar produtos:', error);
    // Se a API falhar mas o cache tiver algo, retorna o cache.
    return productsCache.length > 0 ? productsCache : [];
  }
};

/**
 * Busca um produto pelo ID, usando o cache primeiro.
 */
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
 * (RESTAURADA E MELHORADA) Busca produtos por categoria, usando o cache primeiro.
 * @param {string} category - A categoria para filtrar.
 * @returns {Promise<Array>} A lista de produtos da categoria.
 */
const getProductByCategory = async (category) => {
  try {
    // 1. Tenta usar o cache primeiro, se ele já tiver sido populado
    if (productsCache.length > 0) {
      const filteredFromCache = productsCache.filter(p => p.category === category);
      return filteredFromCache;
    }

    // 2. Se o cache estiver vazio, busca diretamente na API (como na sua versão antiga)
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
 * Cria um novo produto, adicionando timestamps e atualizando o cache.
 */
const createProduct = async (productData) => {
  try {
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        ...productData,
        createdAt: new Date().toISOString() // Adiciona timestamp
      })
    });

    if (!response.ok) throw new Error('Erro ao criar produto');
    const newProduct = await response.json();
    productsCache.push(newProduct); // Atualiza o cache
    return newProduct;
  } catch (error) {
    console.error('Erro ao criar produto:', error);
    return null;
  }
};

/**
 * Atualiza um produto, adicionando timestamps e atualizando o cache.
 */
const updateProduct = async (id, updates) => {
  try {
    const response = await fetch(`${API_URL}/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        ...updates,
        updatedAt: new Date().toISOString() // Adiciona timestamp
      })
    });

    if (!response.ok) throw new Error(`Erro ao atualizar produto ID: ${id}`);
    const updatedProduct = await response.json();
    // Atualiza o item modificado no cache
    productsCache = productsCache.map(p => p.id === id ? updatedProduct : p);
    return updatedProduct;
  } catch (error) {
    console.error('Erro ao atualizar produto:', error);
    return null;
  }
};

/**
 * Deleta um produto, removendo-o do cache.
 */
const deleteProduct = async (id) => {
  try {
    const response = await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
    if (!response.ok) throw new Error(`Erro ao deletar produto ID: ${id}`);
    productsCache = productsCache.filter(p => p.id !== id); // Atualiza o cache
    return true;
  } catch (error) {
    console.error('Erro ao deletar produto:', error);
    return false;
  }
};

/**
 * Limpa o cache local. Útil para forçar uma nova busca de dados.
 */
const clearCache = () => {
  productsCache = [];
  return Promise.resolve();
};

// Exporta todas as funções, incluindo a que foi restaurada.
export const productService = {
  getAllProducts,
  getProductById,
  getProductByCategory, // <-- A função que faltava está aqui!
  createProduct,
  updateProduct,
  deleteProduct,
  clearCache
};