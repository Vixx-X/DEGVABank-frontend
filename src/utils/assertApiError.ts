export async function assertApiError(resp: Response) {
  if (resp.ok) return;

  const error = new Error(`[API ERROR] (${resp.url})`);

  // Attach extra info to the error object.
  const info = await resp.json();
  const status = resp.status;

  throw Object.assign({}, error, {
    info: info,
    status: status,
  });
}
