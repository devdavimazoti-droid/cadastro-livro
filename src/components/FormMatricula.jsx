import { useState } from "react";

export default function FormMatricula({ onEnviar }) {
  // um useState separado para cada campo, em vez de um objeto único
  const [título, settítulo] = useState("");
  const [autor, setautor] = useState("");
  const [categoria, setcategoria] = useState("");
  const [anoPublicacao, setanoPublicacao] = useState(null)

  // states de controle da UI (erros de validação e feedback de envio)
  const [erros, setErros] = useState({});
  const [ok, setOk] = useState(false);


  // valida os três campos e retorna um objeto só com as mensagens de erro
  function validar() {
    const novos = {};
    if (título.trim().length < 3) novos.título = "título curto";
    if (autor.trim().length < 3) novos.autor = "autor inválido";
    if (anoPublicacao < 1900 || anoPublicacao > new Date().getFullYear()) novos.anoPublicacao = "ano de publicação inválido";
    if (!categoria) novos.categoria = "Escolha um categoria";
    return novos;
  }

  function handleSubmit(e) {
    e.preventDefault(); // não recarrega a página

    const novos = validar();
    setErros(novos);

    // se existe pelo menos uma chave de erro, interrompe o envio
    if (Object.keys(novos).length > 0) return;

    // monta o objeto de dados só na hora de entregar ao componente pai
    onEnviar({ título, autor, categoria, anoPublicacao });

    // limpa cada campo individualmente
    settítulo("");
    setautor("");
    setanoPublicacao("");
    setcategoria("");
    setOk(true);
  }

  return (
    <form className="row g-3" onSubmit={handleSubmit} noValidate>

      {/* campo título */}
      <div className="col-md-6">
        <label htmlFor="título" className="form-label">título</label>
        <input
          id="título"
          name="título"
          className={`form-control ${erros.título ? "is-invalid" : ""}`}
          value={título}
          // onChange inline: atualiza direto o state desse campo
          onChange={(e) => settítulo(e.target.value)}
        />
        <div className="invalid-feedback">{erros.título}</div>
      </div>

      {/* campo E-mail */}
      <div className="col-md-6">
        <label htmlFor="autor" className="form-label">Autor</label>
        <input
          id="autor"
          name="autor"
          type="autor"
          className={`form-control ${erros.autor ? "is-invalid" : ""}`}
          value={autor}
          // onChange inline: atualiza direto o state desse campo
          onChange={(e) => setautor(e.target.value)}
        />
        <div className="invalid-feedback">{erros.autor}</div>
      </div>

      {/* campo Ano de publicação */}
      <div className="col-md-6">
        <label htmlFor="anoPublicacao" className="form-label">Ano de Publicação</label>
        <input
          id="anoPublicacao"
          name="anoPublicacao"
          type="anoPublicacao"
          className={`form-control ${erros.anoPublicacao ? "is-invalid" : ""}`}
          value={anoPublicacao}
          // onChange inline: atualiza direto o state desse campo
          onChange={(e) => setanoPublicacao(e.target.value)}
        />
        <div className="invalid-feedback">{erros.anoPublicacao}</div>
      </div>

      {/* campo categoria */}
      <div className="col-md-6">
        <label htmlFor="categoria" className="form-label">categoria</label>
        <select
          id="categoria"
          name="categoria"
          value={categoria}
          // onChange inline: atualiza direto o state desse campo
          onChange={(e) => setcategoria(e.target.value)}
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

      {/* botão de envio + feedback de sucesso */}
      <div className="col-12 d-flex gap-3">
        <button className="btn btn-secondary rounded-pill px-3">Enviar</button>
        {ok && <span className="text-success">Enviada!</span>}
      </div>
    </form>
  );
}