import http from 'k6/http';
import { check, sleep } from 'k6';
import { htmlReport } from "https://raw.githubusercontent.com/benc-uk/k6-reporter/main/dist/bundle.js";

export const options = {
  stages: [
    { duration: '1m', target: 500 }, 
    { duration: '5m', target: 500 }, 
    { duration: '1m', target: 0 },   
  ],
  
  thresholds: {
    'http_req_failed': ['rate<0.01'], 
    'http_req_duration': ['p(95)<500'], 
  },
};

export default function () {
  const res = http.get('http://localhost:3000/');
  check(res, {
    'status is 200': (r) => r.status === 200, 
    'response body contains data': (r) => r.body.includes('data'), 
  });
  sleep(1);
}

export function handleSummary(data) {
  return {
    "relatorio-de-carga.html": htmlReport(data),
  };
}