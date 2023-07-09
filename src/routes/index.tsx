import { createEffect, createSignal, onCleanup } from "solid-js";
import { useRouteData } from "solid-start";
import server$, {
  createServerAction$,
  createServerData$,
  redirect,
} from "solid-start/server";
import { createWebSocketServer } from "solid-start/websocket";
import { getUser, logout } from "~/session";
import Stats from "~/sections/Stats";
import Header from "~/sections/Header";
import Shortcuts from "~/sections/Shortcuts";

const pingPong = createWebSocketServer(
  server$(function (webSocket) {
    webSocket.addEventListener("message", async (msg) => {
      try {
        // Parse the incoming message
        let incomingMessage = JSON.parse(msg.data);
        console.log(incomingMessage);

        switch (incomingMessage.type) {
          case "ping":
            webSocket.send(
              JSON.stringify([
                {
                  type: "pong",
                  data: {
                    id: incomingMessage.data.id,
                    time: Date.now(),
                  },
                },
              ])
            );
            break;
        }
      } catch (err: any) {
        webSocket.send(JSON.stringify({ error: err.stack }));
      }
    });
  })
);



export default function Home() {
  return (
    <main>
      <div class="flex flex-col p-5 pt-10 items-center min-h-screen">
        <Header class={"mb-5"} />
        <Shortcuts className={"mb-16 mt-5"} />
        <Stats />
        <div></div>
      </div>
    </main>
  );
}
