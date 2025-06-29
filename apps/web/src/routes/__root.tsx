import type { QueryClient } from "@tanstack/react-query";
import {
  createRootRouteWithContext,
  Link,
  Outlet,
} from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";

interface MyRouterContext {
  queryClient: QueryClient;
}

export const Route = createRootRouteWithContext<MyRouterContext>()({
  component: () => (
    <div className="h-screen flex flex-col">
      <div className="p-2 flex gap-2">
        <Link to="/" className="[&.active]:font-bold">
          Pokédex
        </Link>
      </div>
      <div className="flex-1 overflow-y-auto h-full">
        <Outlet />
      </div>
      <TanStackRouterDevtools />
    </div>
  ),
});
