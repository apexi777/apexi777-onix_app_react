class BankService {
  usaCurrency = 'Долар США';

  euroCurrency = 'Євро';

  getResource = async (url) => {
    try {
      const res = await fetch(url);

      if (!res.ok) {
        throw new Error(`Could not fetch ${url}, status${res.status}`);
      }
    
      return res.json();
    } catch (error) {
      throw new Error(error);
    }
  };

  getValues = async () => {
    const res = await this.getResource('https://bank.gov.ua/NBUStatService/v1/statdirectory/exchange?json');
    return this.transformData(res);
  };

  transformData = (data) => {
    return [
      { cc: 'UAH', rate: 1, r030: 890 },
      this.getValuesUnpacking(data, this.usaCurrency),
      this.getValuesUnpacking(data, this.euroCurrency)
    ];
  };

  getValuesUnpacking = (data, inside) => {
    const includesItem = data.filter((item) => {
      return item.txt.toLowerCase().includes(inside.toLowerCase());
    });
    const { cc, rate, r030 } = includesItem[0];
    return { cc, r030, rate: rate.toFixed(2) };
  };
}

export default BankService;
