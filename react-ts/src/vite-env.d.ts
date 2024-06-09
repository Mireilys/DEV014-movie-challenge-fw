/// <reference types="vite/client" />
interface ImportMetaEnv {
  readonly VITE_TOKEN_API: string;
}
interface ImportMeta {
  readonly env: ImportMetaEnv;
}
