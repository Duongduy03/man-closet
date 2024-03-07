const useLocalStorage = (key: string) => {
  const setItem = (value: unknown) => {
    try {
      window.localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.log(error);
    }
  };

  const getItem = () => {
    try {
      const item = window.localStorage.getItem(key);
      item ? JSON.parse(item) : undefined;
    } catch (error) {
      console.log(error);
    }
  };

  const removeItem = () => {
    try {
      window.localStorage.removeItem(key);
    } catch (error) {
      console.log(error);
    }
  };

  const getItemAndSetValue = () => {
    try {
      const item = window.localStorage.getItem(key);
      const value = item ? JSON.parse(item) : undefined;
      return value
    } catch (error) {
      console.log(error)
    }
  }
  return {
    setItem,
    getItem,
    removeItem,
    getItemAndSetValue
  };
};

export default useLocalStorage;
