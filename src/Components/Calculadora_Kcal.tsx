import React, { useState, useEffect, ChangeEvent } from 'react';
import {Sistema_Metrico} from './Sistema_Metrico';
import { calcularCalorias } from '../helpers/calcularCalorias';

interface Errores {
  edad: string;
  peso: string;
  altura: string;
}

interface Selected {
  edad: boolean;
  peso: boolean;
  altura: boolean;
}

export const Calculadora_Kcal: React.FC = () => {
  const [edad, setEdad] = useState<number | ''>('');
  const [peso, setPeso] = useState<number | ''>('');
  const [altura, setAltura] = useState<number | ''>('');
  const [sistema, setSistema] = useState<string>(''); 
  const [calorias, setCalorias] = useState<string>('');
  const [errores, setErrores] = useState<Errores>({
    edad: '',
    peso: '',
    altura: ''
  });
  const [selected, setSelected] = useState<Selected>({
    edad: false,
    peso: false,
    altura: false
  });

  useEffect(() => {
    if (edad || peso || altura) {
      const { calorias, errores: nuevosErrores } = calcularCalorias(edad, peso, altura, sistema, errores);
      setCalorias(calorias);
      setErrores(nuevosErrores);
    }
  }, [edad, peso, altura, sistema]);

  const handleInputChange = (setter: React.Dispatch<React.SetStateAction<number | ''>>, fieldName: keyof Errores) => (e: ChangeEvent<HTMLInputElement>) => {
    const value = Number(e.target.value);
    if (value >= 0) {
      setter(value);
      setErrores({ ...errores, [fieldName]: '' });
    }
  };

  const handleBlur = (fieldName: keyof Selected) => {
    setSelected({ ...selected, [fieldName]: true });
  };

  return (
    <main className='calculadora'>
      <h1>Calculadora de Calorías</h1>
      <Sistema_Metrico sistema={sistema} setSistema={setSistema} />
      {sistema && (
        <form>
          <label>Edad:</label>
          <input
            type="number"
            value={edad}
            onChange={handleInputChange(setEdad, 'edad')}
            onBlur={() => handleBlur('edad')}
            min="16"
            max="105"
            required
          />
          {selected.edad && errores.edad && <span>{errores.edad}</span>}
          <label>Peso:</label>
          <input
            type="number"
            value={peso}
            onChange={handleInputChange(setPeso, 'peso')}
            onBlur={() => handleBlur('peso')}
            min={sistema === 'decimal' ? 40.5 : (40.5 / 0.453592).toFixed(2)}
            step="0.01"
            max={sistema === 'decimal' ? 300 : (300 / 0.453592).toFixed(2)}
            required
          />
          {selected.peso && errores.peso && <span>{errores.peso}</span>}
          <label>Altura:</label>
          <input
            type="number"
            value={altura}
            onChange={handleInputChange(setAltura, 'altura')}
            onBlur={() => handleBlur('altura')}
            min={sistema === 'decimal' ? 140 : (140 / 2.54).toFixed(2)}
            step="0.01"
            max={sistema === 'decimal' ? 225 : (225 / 2.54).toFixed(2)}
            required
          />
          {selected.altura && errores.altura && <span>{errores.altura}</span>}
        </form>
      )}
      {calorias && !errores.edad && !errores.peso && !errores.altura && (
        <h3>
          Calorías a consumir: <br />
          {calorias} kcal
        </h3>
      )}
    </main>
  );
};
