import "bootstrap/dist/css/bootstrap.min.css";
import { useState } from "react";
import FormMatricula from "./components/FormMatricula";
import NavBar from "./components/NavBar";
import TabelaAlunos from "./components/Table";

export default function App() {
  const [livros, setLivros] = useState([]);
  const [pagina, setPagina] = useState("form"); // controla qual página está ativa

  return (
    <div className="container py-5">
      <header>
        <NavBar paginaAtual={pagina} onMudarPagina={setPagina} />
      </header>

      {/* só aparece quando a página ativa é "form" */}
      {pagina === "form" && (
        <>
          <h1 className="h3 mb-4">Livros ({livros.length})</h1>
          <FormMatricula
            onEnviar={(dados) => {
              console.log("Novo livro recebido:", dados);
              setLivros((a) => [...a, dados]);
            }}
          />
        </>
      )}

      {/* só aparece quando a página ativa é "Table" */}
      {pagina === "Table" && (
        <>
          <h1 className="h3 mb-4">Lista de Livros</h1>
          <TabelaAlunos alunos={livros}/>
        </>
      )}
    </div>
  );
}