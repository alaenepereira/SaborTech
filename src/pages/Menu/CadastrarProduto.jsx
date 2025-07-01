import { useState } from "react";
// REMOVER -> import { useLocation } from "wouter";
import { useNavigate } from "react-router-dom"; // Importar useNavigate de react-router-dom
import "./CadastrarProduto.css";

// Altere o objeto de categorias para usar os mesmos valores do Menu
const categories = [
  { value: 'coffees', label: 'Cafés' },
  { value: 'salads', label: 'Saladas' },
  { value: 'dishes', label: 'Pratos Principais' }, // Mudado de 'pratos-principais' para 'dishes'
  { value: 'mass', label: 'Massas' }, // Mudado de 'massas' para 'mass'
  { value: 'extras', label: 'Acompanhamentos Extras' }, // Mudado de 'acompanhamentos' para 'extras'
  { value: 'desserts', label: 'Sobremesas' },
  { value: 'drinks', label: 'Bebidas' }
];

export default function CadastrarProduto() {
  const navigate = useNavigate(); // Usar useNavigate de react-router-dom
  const [message, setMessage] = useState(null);
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
    palavrasChave: '',
  });
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};

    if (!formData.nome.trim()) {
      newErrors.nome = 'Nome é obrigatório';
    }

    if (!formData.preco || parseFloat(formData.preco) <= 0) {
      newErrors.preco = 'Preço deve ser maior que zero';
    }

    if (!formData.categoria) {
      newErrors.categoria = 'Categoria é obrigatória';
    }

    if (!formData.descricao.trim()) {
      newErrors.descricao = 'Descrição é obrigatória';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
  e.preventDefault();

  if (!validateForm()) {
    setMessage({ text: 'Por favor, corrija os erros no formulário.', type: 'error' });
    return;
  }

  const produtosSalvos = JSON.parse(localStorage.getItem('produtos')) || [];
  
  const novoProduto = {
    id: Date.now(),
    ...formData,
    // Adicione estes campos para compatibilidade com o Menu
    name: formData.nome,
    price: parseFloat(formData.preco),
    description: formData.descricao,
    stockQuantity: parseInt(formData.estoque) || 0,
    image: formData.imagem,
    // Mantenha os campos originais também
    preco: parseFloat(formData.preco),
    estoque: parseInt(formData.estoque) || 0
  };

  produtosSalvos.push(novoProduto);
  localStorage.setItem('produtos', JSON.stringify(produtosSalvos));
  
  // Forçar atualização em todas as abas
  window.dispatchEvent(new Event('storage'));

  setMessage({ text: 'Produto cadastrado com sucesso!', type: 'success' });
  setTimeout(() => navigate('/cardapio'), 2000);
};

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));

    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: ''
      }));
    }
  };

  const handleFileUpload = (e) => {
    const file = e.target.files && e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const result = event.target && event.target.result;
        handleInputChange('imagem', result);
      };
      reader.readAsDataURL(file);
    }
  };

   return (
    <div className="cadastro-container">
      <div className="cadastro-card">
        <div className="cadastro-header">
          <h1 className="cadastro-title">Cadastro de Produto</h1>
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
                <option value="">Secione uma categoria</option>
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

            {/* Peso e Tamanho */}
            <div className="form-group">
              <label className="form-label">Peso e Tamanho</label>
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
                step="0.01"
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

            {/* Upload de arquivo */}
            <div className="form-group file-upload">
              <label className="form-label" htmlFor="file-upload">Ou selecione um arquivo:</label>
              <input
                id="file-upload"
                type="file"
                accept="image/*"
                className="form-input"
                onChange={handleFileUpload}
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
                <span>+</span>
                Cadastrar Produto
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
