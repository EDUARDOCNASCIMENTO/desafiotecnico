// src/env/Env.ts
import dotenv from 'dotenv';

// Carregar variáveis de ambiente do arquivo .env
dotenv.config();

export class Env {
  // Variáveis de ambiente fixas e estáticas
  public static URL_BASE = process.env.URL_BASE;
  public static TOKEN = process.env.TOKEN;

  // Variáveis dinâmicas que podem ser alteradas durante a execução dos testes
  public static USER_ID: string | undefined;
  public static NULL_USER: string | undefined;
  public static CATEGORY_ID: string | undefined;
}



/* export class Env {
public static USER_ID = process.env.USER_ID
public static CATEGORY_ID = process.env.CATEGORY_ID
public static TOKEN = process.env.TOKEN
}  */