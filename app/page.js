'use client';

import { useState } from 'react';
import roteiros from '@/data/roteiros.json';
import CardRoteiro from '@/components/CardRoteiro';
import Filtros from '@/components/Filtros';

export default function Home() {
  const [disciplina, setDisciplina] = useState('');
  const [ano, setAno] = useState('');

  // Filtra os roteiros com base no que foi selecionado
  const roteirosFiltrados = roteiros.filter((item) => {
    const bateDisciplina = disciplina === '' || item.disciplina === disciplina;
    const bateAno = ano === '' || item.ano === ano;
    return bateDisciplina && bateAno;
  });

  return (
    <div className="space-y-4">
      <div>
        <h1 className="text-2xl font-bold text-zinc-900">
          Roteiros disponíveis
        </h1>
        <p className="text-sm text-zinc-600 mt-1">
          Escolha a disciplina e o ano para ver os roteiros de estudo.
        </p>
      </div>

      <Filtros
        disciplina={disciplina}
        ano={ano}
        aoMudarDisciplina={setDisciplina}
        aoMudarAno={setAno}
      />

      {roteirosFiltrados.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 pt-2">
          {roteirosFiltrados.map((roteiro) => (
            <CardRoteiro key={roteiro.id} roteiro={roteiro} />
          ))}
        </div>
      ) : (
        <p className="text-sm text-zinc-600 py-6 text-center">
          Nenhum roteiro encontrado para essa combinação. Tente outro ano ou outra disciplina.
        </p>
      )}
    </div>
  );
}
