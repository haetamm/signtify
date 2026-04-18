export async function backendFetch(path: string, body: unknown) {
  return fetch(`${process.env.BACKEND_API_URL}${path}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify(body),
  });
}
