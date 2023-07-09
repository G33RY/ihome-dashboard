import solid from "solid-start/vite";
import { defineConfig } from "vite";
import dotenv from "dotenv";

export default defineConfig(() => {
  dotenv.config();
  return {
    plugins: [
      solid({
        ssr: true,
        // adapter: cloudflareWorkers({
        //   durableObjects: {
        //     DO_WEBSOCKET: "WebSocketDurableObject"
        //   },
        //   kvNamespaces: ["app"]
        // })
      }),
    ],
  }
});
