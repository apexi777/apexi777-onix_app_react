import { useCallback } from 'react';

// eslint-disable-next-line import/prefer-default-export
export const useHttp = () => {
  const usaCurrency = 'Долар США';

  const euroCurrency = 'Євро';

  const getResource = useCallback(async (
    url, 
    method = 'GET', 
    body = null, 
    headers = {}
  ) => {
    try {
      let res;
      if (method === 'POST') {
        res = await fetch(url, { 
          method, 
          body, 
          headers: { 'Content-Type': 'application/json' }
        });
      } else {
        res = await fetch(url, { method, body, headers });
      }
        
      if (!res.ok) {
        throw new Error(`Could not fetch ${url}, status${res.status}`);
      }
      
      return res.json();
    } catch (error) {
      throw new Error(error);
    }
  });

  const getValuesUnpacking = useCallback((data, inside) => {
    const includesItem = data.filter((item) => {
      return item.txt.toLowerCase().includes(inside.toLowerCase());
    });
    const { cc, rate, r030 } = includesItem[0];
    return { cc, r030, rate: rate.toFixed(2) };
  });

  const transformData = useCallback((data) => {
    return [
      { cc: 'UAH', rate: 1, r030: 890 },
      getValuesUnpacking(data, usaCurrency),
      getValuesUnpacking(data, euroCurrency)
    ];
  });

  const request = useCallback(async (
    url, 
    custom = false,
    method = 'GET', 
    body = null
  ) => {
    const res = await getResource(url, method, body);
    if (!custom) {
      return transformData(res);
    } 
    return res;
  }, []);

  return { request };
};

// export default usedHttp;
