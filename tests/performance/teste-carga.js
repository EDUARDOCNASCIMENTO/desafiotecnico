// teste-carga.js

// 1. Importar os módulos do K6
import http from 'k6/http';
import { check, sleep } from 'k6';

// 2. Configurar as opções do teste de carga
export const options = {
  // Define os estágios do teste. É a melhor forma de simular a carga.
  stages: [
    { duration: '1m', target: 500 }, // Rampa de subida: vai de 0 a 500 usuários em 1 minuto
    { duration: '5m', target: 500 }, // Carga constante: mantém 500 usuários por 5 minutos
    { duration: '1m', target: 0 },   // Rampa de descida: vai de 500 a 0 usuários em 1 minuto
  ],
  // Define os "Thresholds" (limites de aceitação) do teste. Essencial para a avaliação!
  thresholds: {
    'http_req_failed': ['rate<0.01'], // A taxa de falhas deve ser menor que 1%
    'http_req_duration': ['p(95)<500'], // 95% das requisições devem ser mais rápidas que 500ms
  },
};

// 3. O código que cada usuário virtual (VU) irá executar
export default function () {
  // Faz uma requisição GET para a API
  const res = http.get('https://reqres.in/api/users/2');

  // 4. Verifica se a requisição foi bem-sucedida (boas práticas)
  check(res, {
    'status is 200': (r) => r.status === 200, // Verifica se o status code é 200
    'response body contains data': (r) => r.body.includes('data'), // Verifica o corpo da resposta
  });

  // Adiciona uma pausa de 1 segundo para simular o "tempo de pensamento" do usuário.
  // Isso evita sobrecarregar a API de forma irreal.
  sleep(1);
}