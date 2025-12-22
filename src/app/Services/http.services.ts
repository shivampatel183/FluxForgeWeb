export function httpServices() {
  function get(url: string): Promise<Response> {
    return fetch(url);
  }
  function post(url: string, data: any): Promise<Response> {
    return fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
  }
}
