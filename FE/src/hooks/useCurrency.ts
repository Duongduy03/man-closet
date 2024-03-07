const useCurrency = (cost: number) => {
  const resultCost = Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(cost);
  return resultCost
}

export default useCurrency