async function fetchJSON(
  url: string,
  method: string,
  data?: Record<string, any>,
  params?: Record<string, any>
) {
  try {
    let fullUrl = url;

    if (params) {
      const queryString = new URLSearchParams(params).toString();
      fullUrl = `${url}?${queryString}`;
    }

    const res = await fetch(fullUrl, {
      method,
      headers: {
        "Content-Type": "application/json",
      },
      body: data ? JSON.stringify(data) : undefined,
    });

    if (!res.ok) {
      throw new Error(`API response status: ${res.status}`);
    }

    return await res.json();
  } catch (error) {
    console.error(`Error in ${method} fetch:`, error);
    throw error;
  }
}

export async function postJSON(url: string, data: Record<string, any> = {}) {
  return fetchJSON(url, "POST", data);
}

export async function getJSON(url: string, params: Record<string, any> = {}) {
  return fetchJSON(url, "GET", undefined, params);
}

export async function putJSON(url: string, data: Record<string, any> = {}) {
  return fetchJSON(url, "PUT", data);
}

export async function deleteJSON(url: string, data: Record<string, any> = {}) {
  return fetchJSON(url, "DELETE", data);
}
