'use client';

import { useState, useEffect } from 'react';

export default function TextoApoio({ tema, termoWiki }) {
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState(false);
  const [resumo, setResumo] = useState('');
  const [linkArtigo, setLinkArtigo] = useState('');

  // Termo para buscar na Wikipédia
  const busca = termoWiki || tema;

  useEffect(() => {
    setCarregando(true);
    setErro(false);

    // Chamada na API Wikipédia
    fetch(`https://pt.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(busca)}`)
      .then((res) => {
        if (!res.ok) {
          throw new Error('Falha na resposta da Wikipédia');
        }
        return res.json();
      })
      .then((dados) => {
        if (dados.extract) {
          setResumo(dados.extract);
          setLinkArtigo(dados.content_urls?.desktop?.page || `https://pt.wikipedia.org/wiki/${busca}`);
        } else {
          setResumo('Resumo não encontrado.');
        }
        setCarregando(false);
      })
      .catch(() => {
        setErro(true);
        setCarregando(false);
      });
  }, [busca]);

  return (
    <div className="border border-zinc-200 rounded-lg p-4 bg-white">
      {/* Botão para testar os estados na apresentação */}
      <div className="flex items-center gap-2 mb-3 text-xs text-zinc-500 pb-2 border-b border-zinc-100">
        <span>Teste:</span>
        <button
          type="button"
          onClick={() => { setCarregando(true); setErro(false); }}
          className={`px-2 py-0.5 border rounded ${carregando ? 'bg-zinc-800 text-white' : 'bg-zinc-50'}`}
        >
          Carregando
        </button>
        <button
          type="button"
          onClick={() => { setCarregando(false); setErro(false); }}
          className={`px-2 py-0.5 border rounded ${!carregando && !erro ? 'bg-zinc-800 text-white' : 'bg-zinc-50'}`}
        >
          Sucesso
        </button>
        <button
          type="button"
          onClick={() => { setCarregando(false); setErro(true); }}
          className={`px-2 py-0.5 border rounded ${erro ? 'bg-zinc-800 text-white' : 'bg-zinc-50'}`}
        >
          Erro
        </button>
      </div>

      {/* Carregando */}
      {carregando && (
        <p className="text-sm text-zinc-500">
          Carregando texto de apoio da Wikipédia...
        </p>
      )}

      {/*Erro */}
      {!carregando && erro && (
        <div className="text-sm text-zinc-600">
          <p className="font-medium text-zinc-800">
            Não foi possível carregar o texto de apoio da Wikipédia.
          </p>
          <p className="text-xs text-zinc-500 mt-1">
            O restante do roteiro pode ser estudado normalmente.
          </p>
        </div>
      )}

      {/*Deu bom */}
      {!carregando && !erro && (
        <div className="space-y-2 text-sm">
          <p className="text-zinc-700 leading-relaxed">
            {resumo || 'Resumo do artigo da Wikipédia sobre o tema aparece aqui, com poucas linhas de texto.'}
          </p>
          <p className="text-xs text-zinc-500">
            Fonte: Wikipédia.{' '}
            <a
              href={linkArtigo || `https://pt.wikipedia.org/wiki/${busca}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-zinc-800 underline"
            >
              Link para ler o artigo completo.
            </a>
          </p>
        </div>
      )}
    </div>
  );
}
