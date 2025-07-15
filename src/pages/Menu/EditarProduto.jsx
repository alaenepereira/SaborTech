import React, { useEffect, useState } from "react";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import "./CadastrarProduto.css";
import EditIcon from '@mui/icons-material/Edit';
import { productService } from '../../services/productService';
import Header from "../../Components/Header/Index";
import BackButton from "../../Components/Utils/BackButton";


export default function EditarProduto() {
  const navigate = useNavigate();
  const { id } = useParams();
  const { state } = useLocation();

  const [formData, setFormData] = useState({
    nome: '',
    preco: '',
    categoria: '',
    descricao: '',
    imagem: '',
    estoque: '0',
    codigoBarras: '',
    pesoTamanho: '',
    desconto: '0',
    palavrasChave: ''
  });

  const [errors, setErrors] = useState({});
  const [message, setMessage] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const categories = [
    { value: 'coffees', label: 'Cafés' },
    { value: 'salads', label: 'Saladas' },
    { value: 'dishes', label: 'Pratos Principais' },
    { value: 'mass', label: 'Massas' },
    { value: 'extras', label: 'Acompanhamentos' },
    { value: 'desserts', label: 'Sobremesas' },
    { value: 'drinks', label: 'Bebidas' }
  ];

  useEffect(() => {
    const fetchProduto = async () => {
      try {
        const produto = await productService.getProductById(id);
        if (produto) {
          setFormData({
            nome: produto.name || '',
            preco: produto.price || '',
            categoria: produto.category || '',
            descricao: produto.description || '',
            imagem: produto.image || '',
            estoque: produto.stockQuantity || '0',
            codigoBarras: produto.codigoBarras || '',
            pesoTamanho: produto.pesoTamanho || '',
            desconto: produto.desconto || '0',
            palavrasChave: produto.palavrasChave || ''
          });
        }
      } catch (error) {
        console.error('Erro ao carregar produto:', error);
        setMessage({ text: 'Erro ao carregar produto', type: 'error' });
      }
    };

    fetchProduto();
  }, [id]);

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) setErrors(prev => ({ ...prev, [field]: '' }));
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.nome.trim()) newErrors.nome = 'Nome é obrigatório';
    if (!formData.preco || parseFloat(formData.preco) <= 0) newErrors.preco = 'Preço inválido';
    if (!formData.categoria) newErrors.categoria = 'Selecione uma categoria';
    if (!formData.descricao.trim()) newErrors.descricao = 'Descrição é obrigatória';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) {
      setMessage({ text: 'Corrija os erros no formulário', type: 'error' });
      return;
    }

    setIsSubmitting(true);

    try {
      await productService.updateProduct(id, {
        name: formData.nome,
        price: parseFloat(formData.preco),
        category: formData.categoria,
        description: formData.descricao,
        image: formData.imagem || 'https://via.placeholder.com/150',
        stockQuantity: parseInt(formData.estoque) || 0,
        codigoBarras: formData.codigoBarras,
        pesoTamanho: formData.pesoTamanho,
        desconto: parseFloat(formData.desconto) || 0,
        palavrasChave: formData.palavrasChave,
        updatedAt: new Date().toISOString()
      });

      setMessage({ text: 'Produto atualizado com sucesso!', type: 'success' });
      setTimeout(() => navigate(state?.fromEstoque ? '/estoque' : '/menu'), 1500);
    } catch (error) {
      console.error('Erro:', error);
      setMessage({ text: 'Erro ao atualizar produto', type: 'error' });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="cadastro-container">
      <div className="cadastro-card">
        <div className="cadastro-header">
          <h1 className="cadastro-title">
            <EditIcon sx={{ verticalAlign: 'middle', mr: 1 }} />
            <BackButton />
            Editar Produto
          </h1>
        </div>

        <div className="cadastro-content">
          {message && (
            <div className={`alert ${message.type === 'success' ? 'alert-success' : 'alert-error'}`}>
              {message.text}
            </div>
          )}

          <form onSubmit={handleSubmit} className="form-grid">

            <div className="form-group">
              <label htmlFor="nome">Nome*</label>
              <input
                id="nome"
                type="text"
                value={formData.nome}
                onChange={(e) => handleInputChange('nome', e.target.value)}
                className={errors.nome ? 'input-error' : ''}
                disabled={isSubmitting}
                placeholder="Nome do produto"
              />
              {errors.nome && <span className="error-message">{errors.nome}</span>}
            </div>


            <div className="form-group">
              <label htmlFor="preco">Preço*</label>
              <input
                id="preco"
                type="number"
                step="0.01"
                min="0"
                value={formData.preco}
                onChange={(e) => handleInputChange('preco', e.target.value)}
                className={errors.preco ? 'input-error' : ''}
                disabled={isSubmitting}
                placeholder="0.00"
              />
              {errors.preco && <span className="error-message">{errors.preco}</span>}
            </div>


            <div className="form-group">
              <label htmlFor="categoria">Categoria*</label>
              <select
                id="categoria"
                value={formData.categoria}
                onChange={(e) => handleInputChange('categoria', e.target.value)}
                className={errors.categoria ? 'input-error' : ''}
                disabled={isSubmitting}
              >
                <option value="">Selecione uma categoria...</option>
                {categories.map((cat) => (
                  <option key={cat.value} value={cat.value}>
                    {cat.label}
                  </option>
                ))}
              </select>
              {errors.categoria && <span className="error-message">{errors.categoria}</span>}
            </div>


            <div className="form-group full-width">
              <label htmlFor="descricao">Descrição*</label>
              <textarea
                id="descricao"
                value={formData.descricao}
                onChange={(e) => handleInputChange('descricao', e.target.value)}
                className={errors.descricao ? 'input-error' : ''}
                rows="4"
                disabled={isSubmitting}
                placeholder="Descrição detalhada do produto"
              />
              {errors.descricao && <span className="error-message">{errors.descricao}</span>}
            </div>


            <div className="form-group full-width">
              <label htmlFor="imagem">URL da Imagem</label>
              <input
                id="imagem"
                type="text"
                value={formData.imagem}
                onChange={(e) => handleInputChange('imagem', e.target.value)}
                disabled={isSubmitting}
                placeholder="https://exemplo.com/imagem.jpg"
              />
            </div>


            <div className="form-group">

              <label htmlFor="estoque">Estoque</label>
              <input
                id="estoque"
                type="number"
                min="0"
                value={formData.estoque}
                onChange={(e) => handleInputChange('estoque', e.target.value)}
                disabled={isSubmitting}
              />
            </div>


            <div className="form-group">
              <label htmlFor="codigoBarras">Código de Barras</label>
              <input
                id="codigoBarras"
                type="text"
                value={formData.codigoBarras}
                onChange={(e) => handleInputChange('codigoBarras', e.target.value)}
                disabled={isSubmitting}
              />
            </div>


            <div className="form-group">
              <label htmlFor="pesoTamanho">Peso/Tamanho</label>
              <input
                id="pesoTamanho"
                type="text"
                value={formData.pesoTamanho}
                onChange={(e) => handleInputChange('pesoTamanho', e.target.value)}
                disabled={isSubmitting}
                placeholder="Ex: 500g, 300ml"
              />
            </div>


            <div className="form-group">
              <label htmlFor="desconto">Desconto (%)</label>
              <input
                id="desconto"
                type="number"
                min="0"
                max="100"
                value={formData.desconto}
                onChange={(e) => handleInputChange('desconto', e.target.value)}
                disabled={isSubmitting}
              />
            </div>


            <div className="form-group full-width">
              <label htmlFor="palavrasChave">Palavras-chave (separadas por vírgula)</label>
              <input
                id="palavrasChave"
                type="text"
                value={formData.palavrasChave}
                onChange={(e) => handleInputChange('palavrasChave', e.target.value)}
                disabled={isSubmitting}
                placeholder="Ex: café,expresso,quente"
              />
            </div>

            <div className="form-group full-width">
              <button
                type="submit"
                className="submit-button"
                disabled={isSubmitting}
              >
                {isSubmitting ? 'ATUALIZANDO...' : 'ATUALIZAR PRODUTO'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}