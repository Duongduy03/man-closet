const useHash = () => {
  // object
  const encodeObjectBase64 = (object: { [key: string]: unknown }) => {
    const json = JSON.stringify(object);
    return Buffer.from(json).toString("base64");
  };

  const decodeObjectBase64 = (base64String: string) => {
    try {
      if(!base64String){
        return {}
      }
      const json = Buffer.from(base64String, "base64").toString();
      return JSON.parse(json);
    } catch (error) {
      
    }
  }

  const encodeStringBtoa = (value: string) => {
    return btoa(value)
  }

  const decodeStringAtob = (value: string) => {
    return atob(value)
  }

  return {
    encodeObjectBase64,
    decodeObjectBase64,
    encodeStringBtoa,
    decodeStringAtob
  };
};

export default useHash;
