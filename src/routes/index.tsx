import {json, refetchRouteData, useRouteData} from "solid-start";
import {
  createServerData$,
} from "solid-start/server";
import Stats from "~/sections/Stats";
import Header from "~/sections/Header";
import Shortcuts from "~/sections/Shortcuts";
import {RouteDataFuncArgs} from "@solidjs/router";
import {createEffect, createResource, createSignal, onCleanup, Resource} from "solid-js";
import {getStats, StatsState} from "~/services/stats";






export default function Index() {

  const [stats, {refetch}] = createResource(getStats)


  const interval = setInterval(() => refetch(), 5000);
  onCleanup(() => clearInterval(interval));

  return (
    <main>
      <div class="flex flex-col p-5 pt-10 items-center min-h-screen">
        <Header class={"mb-5"} />
        <Shortcuts className={"mb-16 mt-5"} />
        <Stats stats={stats.latest ?? {}} />
      </div>
    </main>
  );
}
