import FormPedido from '@/components/FormPedido';

export const metadata = {
  title: 'Pedir um roteiro novo | Roteiros de Estudo',
  description: 'Solicite a criação de um novo roteiro de estudos revisado por professores.',
};

export default function PaginaPedido() {
  return (
    <div className="space-y-4">
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold text-zinc-900 tracking-tight">
          Pedir um roteiro novo
        </h1>
        <p className="text-sm text-zinc-600 mt-1">
          Preencha todos os campos. A revisão leva uma semana.
        </p>
      </div>

      <div className="pt-2">
        <FormPedido />
      </div>
    </div>
  );
}
