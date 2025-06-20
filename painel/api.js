const isProd = location.hostname === "api-cuida-sus.onrender.com"

const api_url = isProd ? "https://api-cuida-sus.onrender.com" : "http://localhost:8080";

export async function getFilaIntercalada(tipoAtendimento) {
  const requestInit = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
    },
  };

  const response = await fetch(
    `${api_url}/fila/${tipoAtendimento}`,
    requestInit
  );

  if (!response.ok) {
    throw new Error(`Error fetching fila intercalada: ${response.statusText}`);
  }

  const dados = await response.json();

  return dados;
}
