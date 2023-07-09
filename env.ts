/// <reference types="@cloudflare/workers-types" />

declare global {
  interface Env {
    app: KVNamespace;
  }
}

export {};
