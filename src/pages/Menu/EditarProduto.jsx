import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./CadastrarProduto.css";
import EditIcon from '@mui/icons-material/Edit';

export default function EditarProduto() {
  const navigate = useNavigate();
  const { id } = useParams();

  // Estado inicial 
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

  // Categorias 
  const categories = [
    { value: 'coffees', label: 'Cafés' },
    { value: 'salads', label: 'Saladas' },
    { value: 'dishes', label: 'Pratos Principais' },
    { value: 'mass', label: 'Massas' },
    { value: 'extras', label: 'Acompanhamentos' },
    { value: 'desserts', label: 'Sobremesas' },
    { value: 'drinks', label: 'Bebidas' }
  ];

  // Carrega os dados do produto ao iniciar
  useEffect(() => {
    const produtosSalvos = JSON.parse(localStorage.getItem("produtos")) || [];
    const produto = produtosSalvos.find(p => p.id === parseInt(id));
    if (produto) {
      setFormData(produto);
    }
  }, [id]);

  // Função 
  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) setErrors(prev => ({ ...prev, [field]: '' }));
  };

  // Validação 
  const validateForm = () => {
    const newErrors = {};
    if (!formData.nome.trim()) newErrors.nome = 'Nome é obrigatório';
    if (!formData.preco || parseFloat(formData.preco) <= 0) newErrors.preco = 'Preço inválido';
    if (!formData.categoria) newErrors.categoria = 'Selecione uma categoria';
    if (!formData.descricao.trim()) newErrors.descricao = 'Descrição é obrigatória';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Submit adaptado para edição
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateForm()) {
      setMessage({ text: 'Corrija os erros no formulário', type: 'error' });
      return;
    }

    const produtosSalvos = JSON.parse(localStorage.getItem("produtos")) || [];
    const atualizados = produtosSalvos.map(p => 
      p.id === parseInt(id) ? formData : p
    );
    localStorage.setItem("produtos", JSON.stringify(atualizados));
    setMessage({ text: 'Produto atualizado com sucesso!', type: 'success' });
    setTimeout(() => navigate('/cardapio'), 1500);
  };

  // Estrutura HTML 
  return (
    <div className="cadastro-container">
      <div className="cadastro-card">
        <div className="cadastro-header">
          <h1 className="cadastro-title">
            <EditIcon sx={{ verticalAlign: 'middle', mr: 1 }} />
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
            {/* Nome do Produto */}
            <div className="form-group">
              <label className="form-label">Nome do Produto *</label>
              <input
                type="text"
                className="form-input"
                placeholder="Ex: Café Expresso"
                value={formData.nome}
                onChange={(e) => handleInputChange('nome', e.target.value)}
              />
              {errors.nome && <div className="form-error">{errors.nome}</div>}
            </div>

            {/* Preço */}
            <div className="form-group">
              <label className="form-label">Preço *</label>
              <input
                type="number"
                step="0.01"
                min="0.01"
                className="form-input"
                placeholder="0.00"
                value={formData.preco}
                onChange={(e) => handleInputChange('preco', e.target.value)}
              />
              {errors.preco && <div className="form-error">{errors.preco}</div>}
            </div>

            {/* Categoria */}
            <div className="form-group">
              <label className="form-label">Categoria *</label>
              <select
                className="form-select"
                value={formData.categoria}
                onChange={(e) => handleInputChange('categoria', e.target.value)}
              >
                <option value="">Selecione uma categoria</option>
                {categories.map((category) => (
                  <option key={category.value} value={category.value}>
                    {category.label}
                  </option>
                ))}
              </select>
              {errors.categoria && <div className="form-error">{errors.categoria}</div>}
            </div>

            {/* URL da Imagem */}
            <div className="form-group">
              <label className="form-label">URL da Imagem</label>
              <input
                type="url"
                className="form-input"
                placeholder="https://exemplo.com/imagem.jpg"
                value={formData.imagem}
                onChange={(e) => handleInputChange('imagem', e.target.value)}
              />
            </div>

            {/* Estoque */}
            <div className="form-group">
              <label className="form-label">Estoque</label>
              <input
                type="number"
                min="0"
                className="form-input"
                placeholder="0"
                value={formData.estoque}
                onChange={(e) => handleInputChange('estoque', e.target.value)}
              />
            </div>

            {/* Código de Barras */}
            <div className="form-group">
              <label className="form-label">Código de Barras</label>
              <input
                type="text"
                className="form-input"
                placeholder="123456789"
                value={formData.codigoBarras}
                onChange={(e) => handleInputChange('codigoBarras', e.target.value)}
              />
            </div>

            {/* Peso/Tamanho */}
            <div className="form-group">
              <label className="form-label">Peso/Tamanho</label>
              <input
                type="text"
                className="form-input"
                placeholder="Ex: 500g, 250ml"
                value={formData.pesoTamanho}
                onChange={(e) => handleInputChange('pesoTamanho', e.target.value)}
              />
            </div>

            {/* Desconto */}
            <div className="form-group">
              <label className="form-label">Desconto (%)</label>
              <input
                type="number"
                min="0"
                max="100"
                step="1"
                className="form-input"
                placeholder="0"
                value={formData.desconto}
                onChange={(e) => handleInputChange('desconto', e.target.value)}
              />
            </div>

            {/* Palavras-chave */}
            <div className="form-group">
              <label className="form-label">Palavras-chave</label>
              <input
                type="text"
                className="form-input"
                placeholder="café, bebida, quente"
                value={formData.palavrasChave}
                onChange={(e) => handleInputChange('palavrasChave', e.target.value)}
              />
            </div>

            {/* Descrição */}
            <div className="form-group full-width">
              <label className="form-label">Descrição *</label>
              <textarea
                className="form-textarea"
                placeholder="Descreva o produto..."
                rows={4}
                value={formData.descricao}
                onChange={(e) => handleInputChange('descricao', e.target.value)}
              />
              {errors.descricao && <div className="form-error">{errors.descricao}</div>}
            </div>

            {/* Botão de Submit */}
            <div className="form-group full-width">
              <button
                type="submit"
                className="submit-button"
              >
                ATUALIZAR PRODUTO
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}