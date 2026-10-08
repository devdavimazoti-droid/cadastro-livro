// src/components/TabelaAlunos.jsx

// dados de exemplo, só para visualizar a tabela funcionando
const alunosExemplo = [
  { id: 1, título: "Maria Silva", anoPublicacao: 2001 },
  { id: 2, título: "João Pereira", anoPublicacao: 1902 },
  { id: 3, título: "Ana Costa", anoPublicacao: 1988 },
];

function TabelaAlunos({ alunos = alunosExemplo }) {
  return (
    <div className="table-responsive">
      <table className="table table-striped align-middle">
        <thead className="table-dark">
          <tr>
            <th>Título</th>
            <th className="text-end">Autor</th>
            <th className="text-end">Ano de Publicação</th>
          </tr>
        </thead>
        <tbody>
          {alunos.map((a) => (
            <tr key={a.id}>
              <td>{a.título}</td>
              <td className="text-end">{a.autor}{console.log(alunos)}</td>
              <td className="text-end">{a.anoPublicacao}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default TabelaAlunos;