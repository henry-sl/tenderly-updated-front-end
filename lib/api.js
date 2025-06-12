export async function api(path, options = {}) {
  const { method = 'GET', body, ...rest } = options;
  
  const config = {
    method,
    headers: {
      'Content-Type': 'application/json',
      ...rest.headers,
    },
    ...rest,
  };

  if (body) {
    config.body = JSON.stringify(body);
  }

  const res = await fetch(path, config);
  
  if (!res.ok) {
    const errorText = await res.text();
    throw new Error(errorText || `HTTP ${res.status}`);
  }
  
  return res.json();
}

export const fetcher = (url) => api(url);