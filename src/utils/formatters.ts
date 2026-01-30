export const formatCNPJ = (value: string): string => {
  const numbers = value.replace(/\D/g, '');
  
  if (numbers.length <= 2) return numbers;
  if (numbers.length <= 5) return `${numbers.slice(0, 2)}.${numbers.slice(2)}`;
  if (numbers.length <= 8) return `${numbers.slice(0, 2)}.${numbers.slice(2, 5)}.${numbers.slice(5)}`;
  if (numbers.length <= 12) return `${numbers.slice(0, 2)}.${numbers.slice(2, 5)}.${numbers.slice(5, 8)}/${numbers.slice(8)}`;
  return `${numbers.slice(0, 2)}.${numbers.slice(2, 5)}.${numbers.slice(5, 8)}/${numbers.slice(8, 12)}-${numbers.slice(12, 14)}`;
};

export const unformatCNPJ = (value: string): string => {
  return value.replace(/\D/g, '');
};

export const formatCompetencia = (value: string): string => {
  const numbers = value.replace(/\D/g, '');
  
  if (numbers.length <= 2) return numbers;
  return `${numbers.slice(0, 2)}/${numbers.slice(2, 6)}`;
};

export const competenciaToApi = (competencia: string): string => {
  // Converte MM/AAAA para AAAAMM
  const numbers = competencia.replace(/\D/g, '');
  if (numbers.length === 6) {
    const mm = numbers.slice(0, 2);
    const aaaa = numbers.slice(2, 6);
    return `${aaaa}${mm}`;
  }
  return numbers;
};

export const formatDate = (value: string): string => {
  const numbers = value.replace(/\D/g, '');
  
  if (numbers.length <= 2) return numbers;
  if (numbers.length <= 4) return `${numbers.slice(0, 2)}/${numbers.slice(2)}`;
  return `${numbers.slice(0, 2)}/${numbers.slice(2, 4)}/${numbers.slice(4, 8)}`;
};

export const dateToApi = (date: string): string => {
  // Converte DD/MM/AAAA para AAAAMMDD
  const numbers = date.replace(/\D/g, '');
  if (numbers.length === 8) {
    const dd = numbers.slice(0, 2);
    const mm = numbers.slice(2, 4);
    const aaaa = numbers.slice(4, 8);
    return `${aaaa}${mm}${dd}`;
  }
  return numbers;
};

export const apiDateToDisplay = (apiDate: string): string => {
  // Converte AAAAMMDD para DD/MM/AAAA
  if (apiDate.length === 8) {
    const aaaa = apiDate.slice(0, 4);
    const mm = apiDate.slice(4, 6);
    const dd = apiDate.slice(6, 8);
    return `${dd}/${mm}/${aaaa}`;
  }
  return apiDate;
};

export const apiCompetenciaToDisplay = (apiComp: string): string => {
  // Converte AAAAMM para MM/AAAA
  if (apiComp.length === 6) {
    const aaaa = apiComp.slice(0, 4);
    const mm = apiComp.slice(4, 6);
    return `${mm}/${aaaa}`;
  }
  return apiComp;
};

export const formatCurrency = (value: number): string => {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(value);
};

export const validateCNPJ = (cnpj: string): boolean => {
  const numbers = cnpj.replace(/\D/g, '');
  return numbers.length === 14;
};

export const validateCompetencia = (competencia: string): boolean => {
  const numbers = competencia.replace(/\D/g, '');
  if (numbers.length !== 6) return false;
  
  const mm = parseInt(numbers.slice(0, 2));
  const aaaa = parseInt(numbers.slice(2, 6));
  
  return mm >= 1 && mm <= 12 && aaaa >= 2000 && aaaa <= 2100;
};

export const validateDate = (date: string): boolean => {
  const numbers = date.replace(/\D/g, '');
  if (numbers.length !== 8) return false;
  
  const dd = parseInt(numbers.slice(0, 2));
  const mm = parseInt(numbers.slice(2, 4));
  const aaaa = parseInt(numbers.slice(4, 8));
  
  if (mm < 1 || mm > 12) return false;
  if (dd < 1 || dd > 31) return false;
  if (aaaa < 2000 || aaaa > 2100) return false;
  
  return true;
};
