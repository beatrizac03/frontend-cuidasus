const isProd = location.hostname !== "localhost";

const api_url = isProd
  ? "https://api-cuida-sus.onrender.com"
  : "http://localhost:8080";

export async function logarPaciente(obj) {
  const requestInit = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(obj),
  };

  const response = await fetch(`${api_url}/auth/login`, requestInit);

  if (!response.ok) {
    throw new Error("Erro ao logar o paciente");
  }

  const authToken = await response.text();

  return authToken;
}

export async function getInfoPaciente(authToken) {
  const requestInit = {
    method: "GET",
    headers: {
      Authorization: "Bearer " + authToken,
    },
  };

  const response = await fetch(`${api_url}/auth/me`, requestInit);

  if (!response.ok) {
    throw new Error("Erro ao obter informações do paciente");
  }

  const dadosPaciente = await response.json();

  return dadosPaciente;
}

export async function entrarNaFila(authToken, obj) {
  const requestInit = {
    // endpoint para inserir paciente na fila (criar atendimento, um atendimento smp estará relacionado a um paciente)
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + authToken,
    },
    body: JSON.stringify(obj),
  };

  const response = await fetch(`${api_url}/fila`, requestInit);

  if (!response.ok) {
    const textoErro = await response.text(); // <- pega o texto retornado
    throw new Error(textoErro); // <- lança com mensagem real
  }

  const data = await response.json();
  return data;
}

// retorna posicao da pessoa na fila
export async function posicaoNaFila(authToken, tipoAtendimento) {
  const requestInit = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + authToken,
    },
  };

  const response = await fetch(
    `${api_url}/fila/posicao?tipoAtendimento=${tipoAtendimento}`,
    requestInit
  );

  if (!response.ok) {
    throw new Error("Erro ao buscar posição na fila");
  }

  const posicao = await response.json();

  return posicao;
}

export async function infoAtendimento(authToken) {
  const requestInit = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + authToken,
    },
  };

  const response = await fetch(`${api_url}/atendimentos/me`, requestInit);

  if (response.status === 404) {
    return null;
  }

  if (!response.ok) {
    throw new Error("Erro ao obter informações do atendimento");
  }

  const atendimento = await response.json();
  return atendimento;
}

export async function sairDaFila(authToken) {
  const requestInit = {
    method: "DELETE",
    headers: {
      Authorization: "Bearer " + authToken,
    },
  };

  const response = await fetch(`${api_url}/fila`, requestInit);

  if (response.status === 204) {
    return "Você saiu da fila com sucesso.";
  } else {
    const textoErro = await response.text();
    return textoErro;
  }
}
