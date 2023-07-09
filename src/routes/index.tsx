import {json, useRouteData} from "solid-start";
import {
  createServerData$,
} from "solid-start/server";
import Stats from "~/sections/Stats";
import Header from "~/sections/Header";
import Shortcuts from "~/sections/Shortcuts";
import {RouteDataFuncArgs} from "@solidjs/router";
import {Resource} from "solid-js";
import {getStats, StatsState} from "~/services/stats";


export function routeData(): Resource<StatsState|undefined> {
  return createServerData$(() => {
    return  getStats()
  });
}



export default function Index() {
  const stats = useRouteData<typeof routeData>();
  return (
    <main>
      <div class="flex flex-col p-5 pt-10 items-center min-h-screen">
        <Header class={"mb-5"} />
        <Shortcuts className={"mb-16 mt-5"} />
        <Stats stats={stats()} />
      </div>
    </main>
  );
}
