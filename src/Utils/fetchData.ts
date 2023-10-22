async function fetchData<T>(url: string): Promise<T | null> {
  const controller = new AbortController();
  const signal = controller.signal;
  try {
    const response = await fetch(url, {
      method: "get",
      signal: signal,
    });
    const json = await response.json();
    if (!response.ok) throw new Error("Erro: " + response.status);
    return json;
  } catch (error) {
    if (error instanceof Error) console.error("fetchData" + error.message);
    return null;
  } finally {
    controller.abort();
  }
}

export default fetchData;
