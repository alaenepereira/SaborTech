import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import "./CadastrarProduto.css";

const categories = [
  { value: 'coffees', label: 'Cafés' },
  { value: 'salads', label: 'Saladas' },
  { value: 'dishes', label: 'Pratos Principais' },
  { value: 'mass', label: 'Massas' },
  { value: 'extras', label: 'Acompanhamentos Extras' },
  { value: 'desserts', label: 'Sobremesas' },
  { value: 'drinks', label: 'Bebidas' }
];

export default function EditarProduto() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState(null);
  const [errors, setErrors] = useState({});
  const [message, setMessage] = useState(null);

  useEffect(() => {
    const produtos = JSON.parse(localStorage.getItem("produtos")) || [];
    const produtoEditado = produtos.find((p) => String(p.id) === id);

    if (produtoEditado) {
      setFormData(produtoEditado);
    } else {
      navigate("/cardapio");
    }
  }, [id, navigate]);

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));

    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.nome.trim()) newErrors.nome = 'Nome é obrigatório';
    if (!formData.preco || parseFloat(formData.preco) <= 0) newErrors.preco = 'Preço inválido';
    if (!formData.categoria) newErrors.categoria = 'Categoria obrigatória';
    if (!formData.descricao.trim()) newErrors.descricao = 'Descrição obrigatória';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
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

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateForm()) {
      setMessage({ text: 'Corrija os erros.', type: 'error' });
      return;
    }

    const produtos = JSON.parse(localStorage.getItem("produtos")) || [];
    const novosProdutos = produtos.map(p =>
      String(p.id) === id
        ? {
            ...formData,
            preco: parseFloat(formData.preco),
            estoque: parseInt(formData.estoque || 0),
            price: parseFloat(formData.preco),
            stockQuantity: parseInt(formData.estoque || 0),
            name: formData.nome,
            description: formData.descricao,
            image: formData.imagem
          }
        : p
    );

    localStorage.setItem("produtos", JSON.stringify(novosProdutos));
    window.dispatchEvent(new Event("storage"));
    setMessage({ text: 'Produto editado com sucesso!', type: 'success' });

    setTimeout(() => navigate("/cardapio"), 2000);
  };

  if (!formData) return <p>Carregando...</p>;

  return (
    <div className="cadastro-container">
      <div className="cadastro-card">
        <div className="cadastro-header">
          <h1 className="cadastro-title">Editar Produto</h1>
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
                value={formData.codigoBarras || ""}
                onChange={(e) => handleInputChange('codigoBarras', e.target.value)}
              />
            </div>

            {/* Peso e Tamanho */}
            <div className="form-group">
              <label className="form-label">Peso e Tamanho</label>
              <input
                type="text"
                className="form-input"
                value={formData.pesoTamanho || ""}
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
                value={formData.desconto || ""}
                onChange={(e) => handleInputChange('desconto', e.target.value)}
              />
            </div>

            {/* Palavras-chave */}
            <div className="form-group">
              <label className="form-label">Palavras-chave</label>
              <input
                type="text"
                className="form-input"
                value={formData.palavrasChave || ""}
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
                rows={4}
                value={formData.descricao}
                onChange={(e) => handleInputChange('descricao', e.target.value)}
              />
              {errors.descricao && <div className="form-error">{errors.descricao}</div>}
            </div>

            {/* Botão de Salvar */}
            <div className="form-group full-width">
              <button type="submit" className="submit-button">
                Salvar Alterações
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}