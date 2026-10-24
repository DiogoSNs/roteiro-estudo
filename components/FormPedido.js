'use client';

import { useState } from 'react';

export default function FormPedido() {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [disciplina, setDisciplina] = useState('');
  const [ano, setAno] = useState('');
  const [tema, setTema] = useState('');
  const [quantidadeQuestoes, setQuantidadeQuestoes] = useState('');
  const [dataUso, setDataUso] = useState('');

  const [erros, setErros] = useState({});
  const [enviadoComSucesso, setEnviadoComSucesso] = useState(false);
  const [dadosEnviados, setDadosEnviados] = useState(null);

  // Calcula a data mínima (7 dias a partir de hoje)
  const dataMinima = new Date();
  dataMinima.setDate(dataMinima.getDate() + 7);
  const stringDataMinima = dataMinima.toISOString().split('T')[0];

  function validarFormulario() {
    const novosErros = {};

    if (!nome.trim()) {
      novosErros.nome = 'Informe o seu nome completo.';
    }

    if (!email.trim()) {
      novosErros.email = 'Informe o seu e-mail institucional.';
    } else if (!email.trim().toLowerCase().endsWith('@escola.educa.gov.br')) {
      novosErros.email = 'O e-mail deve terminar obrigatoriamente com @escola.educa.gov.br';
    }

    if (!disciplina) {
      novosErros.disciplina = 'Selecione a disciplina.';
    }

    if (!ano) {
      novosErros.ano = 'Selecione o ano escolar.';
    }

    if (!tema.trim()) {
      novosErros.tema = 'Informe o tema do roteiro.';
    }

    const qtd = Number(quantidadeQuestoes);
    if (!quantidadeQuestoes || isNaN(qtd) || qtd < 3 || qtd > 10) {
      novosErros.quantidadeQuestoes = 'A quantidade de questões deve ser entre 3 e 10.';
    }

    if (!dataUso) {
      novosErros.dataUso = 'Informe a data pretendida.';
    } else {
      const dataSelecionada = new Date(`${dataUso}T00:00:00`);
      const dataLimite = new Date();
      dataLimite.setHours(0, 0, 0, 0);
      dataLimite.setDate(dataLimite.getDate() + 7);

      if (dataSelecionada < dataLimite) {
        novosErros.dataUso = 'A data de uso deve ter no mínimo 7 dias de antecedência.';
      }
    }

    setErros(novosErros);
    return Object.keys(novosErros).length === 0;
  }

  function aoEnviar(evento) {
    evento.preventDefault();

    if (!validarFormulario()) {
      return;
    }

    // Como especificado no projeto: o pedido não vai para nenhum back-end real,
    // apenas exibe o feedback visual de sucesso na tela.
    setDadosEnviados({
      nome,
      email,
      disciplina,
      ano,
      tema,
      quantidadeQuestoes,
      dataUso,
    });
    setEnviadoComSucesso(true);
  }

  function novoPedido() {
    setNome('');
    setEmail('');
    setDisciplina('');
    setAno('');
    setTema('');
    setQuantidadeQuestoes('');
    setDataUso('');
    setErros({});
    setEnviadoComSucesso(false);
    setDadosEnviados(null);
  }

  if (enviadoComSucesso && dadosEnviados) {
    return (
      <div className="rounded-lg border border-emerald-300 bg-emerald-50/70 p-6 sm:p-8 space-y-4">
        <div className="flex items-center gap-3">
          <span className="flex items-center justify-center w-8 h-8 rounded-full bg-emerald-600 text-white font-bold text-lg">
            ✓
          </span>
          <h2 className="text-xl font-bold text-emerald-950">
            Pedido de roteiro registrado com sucesso!
          </h2>
        </div>

        <p className="text-sm text-emerald-900 leading-relaxed">
          Obrigado, professor(a) <strong>{dadosEnviados.nome}</strong>. Seu pedido para o tema{' '}
          <strong>&quot;{dadosEnviados.tema}&quot;</strong> ({dadosEnviados.disciplina} - {dadosEnviados.ano}) foi registrado. A revisão pelos nossos docentes leva em média 7 dias úteis.
        </p>

        <div className="bg-white/80 rounded-md p-4 text-xs text-zinc-700 space-y-1 border border-emerald-200">
          <p><strong>E-mail de confirmação:</strong> {dadosEnviados.email}</p>
          <p><strong>Quantidade de questões:</strong> {dadosEnviados.quantidadeQuestoes}</p>
          <p><strong>Data de uso pretendida:</strong> {dadosEnviados.dataUso.split('-').reverse().join('/')}</p>
        </div>

        <div className="pt-2">
          <button
            type="button"
            onClick={novoPedido}
            className="bg-zinc-900 hover:bg-black text-white text-xs font-medium px-4 py-2 rounded-md transition-colors cursor-pointer"
          >
            Fazer outro pedido
          </button>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={aoEnviar} className="space-y-4 max-w-xl">
      {/* Nome */}
      <div>
        <label htmlFor="nome" className="block text-xs font-semibold text-zinc-800 mb-1">
          Nome
        </label>
        <input
          id="nome"
          type="text"
          placeholder="Seu nome completo"
          value={nome}
          onChange={(e) => setNome(e.target.value)}
          className={`w-full border rounded-md px-3 py-2 text-sm bg-white text-zinc-900 focus:outline-none focus:ring-1 ${
            erros.nome ? 'border-red-500 focus:ring-red-500' : 'border-zinc-300 focus:ring-zinc-900'
          }`}
        />
        {erros.nome && <p className="text-xs text-red-600 mt-1">{erros.nome}</p>}
      </div>

      {/* E-mail Institucional */}
      <div>
        <label htmlFor="email" className="block text-xs font-semibold text-zinc-800 mb-1">
          E-mail institucional
        </label>
        <input
          id="email"
          type="email"
          placeholder="nome@escola.educa.gov.br"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className={`w-full border rounded-md px-3 py-2 text-sm bg-white text-zinc-900 focus:outline-none focus:ring-1 ${
            erros.email ? 'border-red-500 focus:ring-red-500' : 'border-zinc-300 focus:ring-zinc-900'
          }`}
        />
        <p className="text-[11px] text-zinc-500 mt-0.5">Deve terminar em @escola.educa.gov.br</p>
        {erros.email && <p className="text-xs text-red-600 mt-1">{erros.email}</p>}
      </div>

      {/* Disciplina */}
      <div>
        <label htmlFor="disciplina" className="block text-xs font-semibold text-zinc-800 mb-1">
          Disciplina
        </label>
        <select
          id="disciplina"
          value={disciplina}
          onChange={(e) => setDisciplina(e.target.value)}
          className={`w-full border rounded-md px-3 py-2 text-sm bg-white text-zinc-900 focus:outline-none focus:ring-1 ${
            erros.disciplina ? 'border-red-500 focus:ring-red-500' : 'border-zinc-300 focus:ring-zinc-900'
          }`}
        >
          <option value="">Selecione</option>
          <option value="Matemática">Matemática</option>
          <option value="Ciências">Ciências</option>
          <option value="História">História</option>
          <option value="Geografia">Geografia</option>
          <option value="Português">Português</option>
        </select>
        {erros.disciplina && <p className="text-xs text-red-600 mt-1">{erros.disciplina}</p>}
      </div>

      {/* Ano */}
      <div>
        <label htmlFor="ano" className="block text-xs font-semibold text-zinc-800 mb-1">
          Ano
        </label>
        <select
          id="ano"
          value={ano}
          onChange={(e) => setAno(e.target.value)}
          className={`w-full border rounded-md px-3 py-2 text-sm bg-white text-zinc-900 focus:outline-none focus:ring-1 ${
            erros.ano ? 'border-red-500 focus:ring-red-500' : 'border-zinc-300 focus:ring-zinc-900'
          }`}
        >
          <option value="">Selecione</option>
          <option value="6º ano">6º ano</option>
          <option value="7º ano">7º ano</option>
          <option value="8º ano">8º ano</option>
          <option value="9º ano">9º ano</option>
        </select>
        {erros.ano && <p className="text-xs text-red-600 mt-1">{erros.ano}</p>}
      </div>

      {/* Tema */}
      <div>
        <label htmlFor="tema" className="block text-xs font-semibold text-zinc-800 mb-1">
          Tema
        </label>
        <input
          id="tema"
          type="text"
          placeholder="Ex.: frações"
          value={tema}
          onChange={(e) => setTema(e.target.value)}
          className={`w-full border rounded-md px-3 py-2 text-sm bg-white text-zinc-900 focus:outline-none focus:ring-1 ${
            erros.tema ? 'border-red-500 focus:ring-red-500' : 'border-zinc-300 focus:ring-zinc-900'
          }`}
        />
        {erros.tema && <p className="text-xs text-red-600 mt-1">{erros.tema}</p>}
      </div>

      {/* Quantidade de Questões */}
      <div>
        <label htmlFor="quantidadeQuestoes" className="block text-xs font-semibold text-zinc-800 mb-1">
          Quantidade de questões
        </label>
        <input
          id="quantidadeQuestoes"
          type="number"
          min="3"
          max="10"
          placeholder="De 3 a 10"
          value={quantidadeQuestoes}
          onChange={(e) => setQuantidadeQuestoes(e.target.value)}
          className={`w-full border rounded-md px-3 py-2 text-sm bg-white text-zinc-900 focus:outline-none focus:ring-1 ${
            erros.quantidadeQuestoes ? 'border-red-500 focus:ring-red-500' : 'border-zinc-300 focus:ring-zinc-900'
          }`}
        />
        <p className="text-[11px] text-zinc-500 mt-0.5">Mínimo 3 e máximo 10.</p>
        {erros.quantidadeQuestoes && (
          <p className="text-xs text-red-600 mt-1">{erros.quantidadeQuestoes}</p>
        )}
      </div>

      {/* Data de Uso */}
      <div>
        <label htmlFor="dataUso" className="block text-xs font-semibold text-zinc-800 mb-1">
          Data em que pretende usar o material
        </label>
        <input
          id="dataUso"
          type="date"
          min={stringDataMinima}
          value={dataUso}
          onChange={(e) => setDataUso(e.target.value)}
          className={`w-full border rounded-md px-3 py-2 text-sm bg-white text-zinc-900 focus:outline-none focus:ring-1 ${
            erros.dataUso ? 'border-red-500 focus:ring-red-500' : 'border-zinc-300 focus:ring-zinc-900'
          }`}
        />
        <p className="text-[11px] text-zinc-500 mt-0.5">Precisa ser pelo menos 7 dias depois de hoje.</p>
        {erros.dataUso && <p className="text-xs text-red-600 mt-1">{erros.dataUso}</p>}
      </div>

      {/* Botão de Envio */}
      <div className="pt-2">
        <button
          type="submit"
          className="bg-zinc-900 hover:bg-black text-white text-xs sm:text-sm font-medium px-5 py-2.5 rounded-md transition-colors cursor-pointer"
        >
          Enviar pedido
        </button>
      </div>
    </form>
  );
}
