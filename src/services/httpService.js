class HttpService {
  usaCurrency = 'Долар США';

  euroCurrency = 'Євро';

  getResource = async (url, method, body) => {
    const headers = { 'Content-Type': 'application/json' };
    try {
      let res;
      if (method === 'POST') {
        res = await fetch(url, { method, body, headers });
      } else {
        res = await fetch(url, { method, body });
      }
      
      if (!res.ok) {
        throw new Error(`Could not fetch ${url}, status${res.status}`);
      }
    
      return res.json();
    } catch (error) {
      throw new Error(error);
    }
  };

  getValues = async (
    url, 
    custom = false,
    method = 'GET', 
    body = null
  ) => {
    const res = await this.getResource(url, method, body);
    if (!custom) {
      return this.transformData(res);
    } 
    return res;
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

export default HttpService;
