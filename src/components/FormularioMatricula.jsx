import { useState } from "react";

// estado inicial em um só objeto
const vazio = { título: "", autor: "", categoria: "" };

export default function FormularioMatricula({ onEnviar }) {
  const [dados, setDados] = useState(vazio);
  const [erros, setErros] = useState({});
  const [ok, setOk] = useState(false);

  // um único onChange atende todos os campos
  function handleChange(e) {
    const { name, value } = e.target;   // name = chave
    setDados((atual) => ({ ...atual, [name]: value }));
  }
  function validar() {
    const novos = {};
    if (dados.título.trim().length < 3) novos.título = "título curto";
    if (!dados.autor.trim().length < 3) novos.autor = "autor inválido";
    if (!dados.categoria) novos.categoria = "Escolha uma categoria";
    return novos;
  }

  function handleSubmit(e) {
    e.preventDefault();
    const novos = validar();
    console.log("Erros de validação:", novos); // ← adicione temporariamente
    setErros(novos);
    if (Object.keys(novos).length > 0) return;
    onEnviar(dados);
    setDados(vazio);
    setOk(true);
  }
  return (
    <form className="row g-3" onSubmit={handleSubmit} noValidate>
      <div className="col-md-6">
        <label htmlFor="título" className="form-label">título</label>
        <input
          id="título"
          name="título"
          className={`form-control ${erros.título ? "is-invalid" : ""}`}
          value={dados.título}
          onChange={handleChange}
        />
        <div className="invalid-feedback">{erros.título}</div>
      </div>

      <div className="col-md-6">
        <label htmlFor="autor" className="form-label">E-mail</label>
        <input
          id="autor"
          name="autor"
          type="autor"
          className={`form-control ${erros.autor ? "is-invalid" : ""}`}
          value={dados.autor}
          onChange={handleChange}
        />
        <div className="invalid-feedback">{erros.autor}</div>
      </div>
      <div className="col-md-6">
        <label htmlFor="categoria" className="form-label">categoria</label>
        <select
          id="categoria" name="categoria" value={dados.categoria} onChange={handleChange}
          className={`form-select ${erros.categoria ? "is-invalid" : ""}`}
        >
          <option value="">Selecione…</option>
          <option value="Romance">Romance</option>
          <option value="Técnico">Técnico</option>
          <option value="Infantil">Infantil</option>
          <option value="Biografia">Biografia</option>
        </select>
        <div className="invalid-feedback">{erros.categoria}</div>
      </div>

      <div className="col-12 d-flex gap-3">
        <button className="btn btn-secondary rounded-pill px-3">Enviar</button>
        {ok && <span className="text-success">Enviada!</span>}
      </div>
    </form>
  );
}