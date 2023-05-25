const usaCurrency = 'Долар США';

const euroCurrency = 'Євро';

export const getValuesUnpacking = (data, inside) => {
  const includesItem = data.filter((item) => {
    return item.txt.toLowerCase().includes(inside.toLowerCase());
  });
  const { cc, rate, r030 } = includesItem[0];
  return { cc, r030, rate: rate.toFixed(2) };
};

export const transformData = async (data) => {
  if (data.length !== 0) {
    return [
      { cc: 'UAH', rate: 1, r030: 890 },
      getValuesUnpacking(data, usaCurrency),
      getValuesUnpacking(data, euroCurrency)
    ];
  }
  return data;
};
