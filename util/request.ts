export async function postJSON(url: string, data: Record<string, any> = {}) {
  try {
    const res = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (!res.ok) {
      throw new Error(`API response status: ${res.status}`);
    }

    return await res.json();
  } catch (error) {
    console.error("Error in POST fetch:", error);
    throw error;
  }
}

export async function getJSON(url: string, params: Record<string, any> = {}) {
  try {
    // Convert params object to query string
    const queryString = new URLSearchParams(params).toString();
    const fullUrl = `${url}?${queryString}`;

    const res = await fetch(fullUrl, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!res.ok) {
      throw new Error(`API response status: ${res.status}`);
    }

    return await res.json();
  } catch (error) {
    console.error("Error in GET fetch:", error);
    throw error;
  }
}
