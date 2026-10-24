/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_SERVER_ADDRESS: string;
  readonly VITE_SERVER_EDITION: 'java' | 'bedrock';
  readonly VITE_STATS_MODE: 'demo' | 'plan' | 'custom';
  readonly VITE_STATS_API_URL: string;
  readonly VITE_MAP_URL: string;
  readonly VITE_MAP_EMBEDDABLE: string;
  readonly VITE_MAP_NAME: string;
  readonly VITE_STORE_URL: string;
  readonly VITE_DISCORD_URL: string;
  readonly VITE_GA_ID: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}