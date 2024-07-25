interface Errores {
    edad: string;
    peso: string;
    altura: string;
  }
  
  interface CaloriasResult {
    calorias: string;
    errores: Errores;
  }
  
  export const calcularCalorias = (
    edad: number | '',
    peso: number | '',
    altura: number | '',
    sistema: string,
    errores: Errores
  ): CaloriasResult => {
    let pesoEnKg = peso as number;
    let alturaEnCm = altura as number;
  
    if (sistema === 'imperial') {
      pesoEnKg = (peso as number) * 0.453592;
      alturaEnCm = (altura as number) * 2.54;
    }
  
    const nuevosErrores = { ...errores };
  
    if (pesoEnKg < 40.5 || pesoEnKg > 300) {
      nuevosErrores.peso = "El peso no está en el rango permitido";
    } else {
      nuevosErrores.peso = '';
    }
  
    if (alturaEnCm < 140 || alturaEnCm > 225) {
      nuevosErrores.altura = "La altura no está en el rango permitido";
    } else {
      nuevosErrores.altura = '';
    }
  
    if (typeof edad === 'number' && (edad < 16 || edad > 105)) {
      nuevosErrores.edad = "La edad no está en el rango permitido";
    } else {
      nuevosErrores.edad = '';
    }
  
    if (!nuevosErrores.peso && !nuevosErrores.altura && !nuevosErrores.edad) {
      let factor;
      if (pesoEnKg < 75) factor = 1.6;
      else if (pesoEnKg <= 90) factor = 1.4;
      else if (pesoEnKg <= 100) factor = 1.2;
      else factor = 1.0;
  
      const calorias = (10 * pesoEnKg + 6.25 * alturaEnCm - 10 * (edad as number) + 5) * factor;
      return { calorias: calorias.toFixed(2), errores: nuevosErrores };
    }
  
    return { calorias: '', errores: nuevosErrores };
  };
  