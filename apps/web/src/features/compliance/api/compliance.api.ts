/**
 * Compliance API client
 */

export async function checkCompliance(graphId: string) {
  const response = await fetch('/api/compliance/check', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ graphId })
  });

  return response.json();
}

export async function getRules() {
  const response = await fetch('/api/compliance/rules');
  return response.json();
}
