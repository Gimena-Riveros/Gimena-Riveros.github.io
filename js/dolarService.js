const DOLAR_API_URL = "https://dolarapi.com/v1/dolares";
const CACHE_KEY = "dolar_data";
const CACHE_TIME_KEY = "dolar_last_update";
const PREV_KEY = "dolar_prev_values";

const TTL = 7 * 60 * 1000; // 7 minutos

function getCachedData() {
  const data = localStorage.getItem(CACHE_KEY);
  const time = localStorage.getItem(CACHE_TIME_KEY);

  if (!data || !time) return null;

  const isValid = (Date.now() - parseInt(time)) < TTL;
  return isValid ? JSON.parse(data) : null;
}

function saveCache(data) {
  localStorage.setItem(CACHE_KEY, JSON.stringify(data));
  localStorage.setItem(CACHE_TIME_KEY, Date.now().toString());
}

function savePreviousValues(data) {
  const prev = {};
  data.forEach(d => {
    prev[d.casa] = d.venta;
  });
  localStorage.setItem(PREV_KEY, JSON.stringify(prev));
}

function getPreviousValues() {
  return JSON.parse(localStorage.getItem(PREV_KEY) || "{}");
}

function fetchDolarData(callback, errorCallback) {
  const xhr = new XMLHttpRequest();
  xhr.open("GET", DOLAR_API_URL);

  xhr.onload = function () {
    /* if (xhr.status === 200) {
      const data = JSON.parse(xhr.responseText);
      saveCache(data);
      callback(data);
    } else {
      errorCallback();
    } */
   if (xhr.status === 200) {
   const data = JSON.parse(xhr.responseText);

   const prev = getPreviousValues();

   // agregar variación
    data.forEach(d => {
      const oldValue = prev[d.casa];

      if (oldValue !== undefined) {
        d.variacion = d.venta - oldValue;
      } else {
        d.variacion = 0;
      } 
    });

  savePreviousValues(data); // guardar para próxima comparación
  saveCache(data);

  callback(data);
}
  };

  xhr.onerror = errorCallback;
  xhr.send();
}

function getDolarData(callback, errorCallback) {
  const cached = getCachedData();

  if (cached) {
    callback(cached);

    // actualización en background (estrategia híbrida)
    fetchDolarData(
      (fresh) => callback(fresh),
      () => {} // silencioso
    );

  } else {
    fetchDolarData(callback, () => {
      /* const fallback = localStorage.getItem(CACHE_KEY);
      if (fallback) {
        callback(JSON.parse(fallback));
      } */ 
     const fallback = localStorage.getItem(CACHE_KEY);

    if (fallback) {
      const data = JSON.parse(fallback);
      const prev = getPreviousValues();

      data.forEach(d => {
        const oldValue = prev[d.casa];
        d.variacion = oldValue ? d.venta - oldValue : 0;
      });

      callback(data);
    } else {
            errorCallback();
          }
        });
      }
}