
interface SistemaMetricoProps {
  sistema: string;
  setSistema: (sistema: string) => void;
}

export const Sistema_Metrico= ({ sistema, setSistema }:SistemaMetricoProps):JSX.Element => {
  return (
    <div className="medidas">
      <button
        onClick={() => setSistema('decimal')}
        style={{ backgroundColor: sistema === 'decimal' ? 'skyblue' : '#d6d1d1',
                 border: sistema === 'decimal' ? 'skyblue' : '#d6d1d1'
         }}
      >
        Sistema Decimal
      </button>
      <button
        onClick={() => setSistema('imperial')}
        style={{ backgroundColor: sistema === 'imperial' ? 'skyblue' : '#d6d1d1',
                 border: sistema === 'decimal' ? 'skyblue' : '#d6d1d1'
        }}
      >
        Sistema Imperial
      </button>
    </div>
  );
};
