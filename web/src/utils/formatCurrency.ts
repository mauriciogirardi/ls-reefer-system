const formatCurrency = (current: number): string =>
  current.toLocaleString('pt-br', {
    style: 'currency',
    currency: 'BRL',
  });

export default formatCurrency;
