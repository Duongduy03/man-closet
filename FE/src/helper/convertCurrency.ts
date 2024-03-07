const parseNumberToCurrency = (cost: number) => {
  const resultCost = Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
  }).format(cost);
  return resultCost;
};

const parseCurrencyToNumber = (formattedCost: string) => {
  const regex = /[.,]/g;
  try {
    if (!formattedCost) {
      return 0;
    }
    const clearSym = formattedCost.split("").slice(0, formattedCost.length - 2).join("")
    const clearKamar = clearSym.replace(regex, '')

    return +clearKamar
  } catch (error) {
    throw error;
  }
};

export { parseNumberToCurrency, parseCurrencyToNumber };
