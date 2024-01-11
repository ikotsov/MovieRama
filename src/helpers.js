export const fetchJsonData = async function (url) {
  try {
    const response = await fetch(url);
    const data = await response.json();
    if (!response.ok) throw new Error(`${data.status_message} (${data.status_code})`);

    return data;
  } catch (error) {
    console.error(`fetchJsonData ${error} 💥💥💥💥`);
    throw error;
  }
};

export const debounce = (callback, delay = 30000) => {
  let timer;

  return (...args) => {
    clearTimeout(timer);

    timer = setTimeout(() => {
      callback(...args);
    }, delay);
  };
};
