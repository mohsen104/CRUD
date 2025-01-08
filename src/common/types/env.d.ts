declare namespace NodeJS {
  interface ProcessEnv {
    NODE_ENV: 'development' | 'production';
    PORT: number;
    MONGODB_URI: string;
    MONGODB_DATABASE: string;
    COLLECTION_LOGS: string;
  }
}
