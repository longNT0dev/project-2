const base64Converter = (file) => {
  return new Promise((resolve) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onload = () => {
      resolve(reader.result);
    };
  });
};

export default base64Converter;
