const isFrontProd = window.location.hostname === "beatrizac03.github.io"

const api_url = isFrontProd ? "https://api-cuida-sus.onrender.com" : "http://localhost:8080";

// retorna token do usuário autenticado
export async function logarFuncionario(obj) {
  const requestInit = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(obj),
  };

  const response = await fetch(
    api_url + "/auth/login/funcionarios",
    requestInit
  );

  if (!response.ok) {
    const error = await response.text();
    throw new Error(error.message || "Erro ao fazer login");
  }

  const token = await response.text();

  return token;
}

export async function infoFuncionario(authToken) {
  const requestInit = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${authToken}`,
    },
  };

  const response = await fetch(api_url + "/auth/funcionarios/me", requestInit);

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || "Erro ao fazer login");
  }

  const dadosFuncionario = await response.json();

  return dadosFuncionario;
}

// cria um novo funcionário e retorna o token
export async function cadastrarFuncionario(obj) {
  const requestInit = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(obj),
  };

  const response = await fetch(
    api_url + "/auth/register/funcionarios",
    requestInit
  );

  if (!response.ok) {
    const text = await response.text();
    throw new Error(text || "Erro ao cadastrar funcionário");
  }

  const token = await response.text();

  return token;
}

export async function chamarPacienteNaSala(authToken, obj) {
  const requestInit = {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${authToken}`,
    },
    body: JSON.stringify(obj),
  };

  const response = await fetch(
    api_url + `/atendimentos/${obj.idAtendimento}`,
    requestInit
  );

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(errorText || "Erro ao chamar paciente na sala");
  }

  return null;
}

export async function buscarCargos() {
  const requestInit = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  };

  const response = await fetch(api_url + "/cargos", requestInit);

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || "Erro ao buscar cargos");
  }

  const cargos = await response.json();

  return cargos;
}

export async function buscarFila(tipoAtendimento, authToken) {
  const requestInit = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${authToken}`,
    },
  };

  const response = await fetch(
    api_url + `/fila/${tipoAtendimento}`,
    requestInit
  );

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || "Erro ao buscar cargos");
  }

  const fila = await response.json();

  return fila;
}

export async function listarSalasDisponiveis(authToken, tipoAtendimento) {
  const requestInit = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${authToken}`,
    },
  };

  const response = await fetch(
    api_url + `/salas/${tipoAtendimento}`,
    requestInit
  );

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || "Erro ao buscar cargos");
  }

  const salas = await response.json();

  return salas;
}

export async function listarMeusAtendimentos(authToken) {
  const requestInit = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${authToken}`,
    },
  };

  const response = await fetch(api_url + `/atendimentos`, requestInit);

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || "Erro ao buscar atendimentos");
  }

  const atendimentos = await response.json();

  return atendimentos;
}

export async function atualizarAtendimento(authToken, obj) {
  const requestInit = {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${authToken}`,
    },
    body: JSON.stringify(obj),
  };

  const response = await fetch(api_url + `/atendimentos/att`, requestInit);

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(errorText || "Erro ao atualizar atendimento");
  }

  return null;
}
