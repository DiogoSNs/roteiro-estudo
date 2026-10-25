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
    let cancelado = false;

    // Chamada inicial na API Wikipédia
    fetch(`https://pt.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(busca)}`)
      .then((res) => {
        if (!res.ok) {
          throw new Error('Falha na resposta da Wikipédia');
        }
        return res.json();
      })
      .then((dados) => {
        if (cancelado) return;
        if (dados.extract) {
          setResumo(dados.extract);
          setLinkArtigo(dados.content_urls?.desktop?.page || `https://pt.wikipedia.org/wiki/${busca}`);
        } else {
          setResumo('Resumo não encontrado.');
        }
        setCarregando(false);
      })
      .catch(() => {
        if (cancelado) return;
        setErro(true);
        setCarregando(false);
      });

    return () => {
      cancelado = true;
    };
  }, [busca]);

  function tentarNovamente() {
    setCarregando(true);
    setErro(false);

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
  }

  return (
    <div className="border border-zinc-200 rounded-lg p-4 bg-white">
      {/* Estado: Carregando */}
      {carregando && (
        <div className="space-y-2 py-1">
          <div className="h-2.5 bg-zinc-200 rounded animate-pulse w-3/4"></div>
          <div className="h-2.5 bg-zinc-200 rounded animate-pulse w-full"></div>
          <div className="h-2.5 bg-zinc-200 rounded animate-pulse w-2/3"></div>
          <p className="text-xs text-zinc-500 pt-1">
            Carregando texto de apoio da Wikipédia...
          </p>
        </div>
      )}

      {/* Estado: Erro */}
      {!carregando && erro && (
        <div className="text-sm text-zinc-600 space-y-2">
          <p className="font-medium text-zinc-800">
            Não foi possível carregar o texto de apoio da Wikipédia.
          </p>
          <p className="text-xs text-zinc-500">
            O restante do roteiro pode ser estudado normalmente.
          </p>
          <div>
            <button
              type="button"
              onClick={tentarNovamente}
              className="inline-block mt-1 bg-zinc-900 hover:bg-black text-white text-xs font-medium px-3 py-1.5 rounded-md transition-colors cursor-pointer"
            >
              Tentar de novo
            </button>
          </div>
        </div>
      )}

      {/* Estado: Sucesso */}
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
              className="text-zinc-800 underline hover:text-black"
            >
              Link para ler o artigo completo.
            </a>
          </p>
        </div>
      )}
    </div>
  );
}
