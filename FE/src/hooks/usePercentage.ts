const usePercentage = (completeNum: number, kpiNum: number) => {
  const percentage = (completeNum / kpiNum) * 100
  return Number(percentage.toFixed(0))
};

export default usePercentage
