import type { QueryClient } from "@tanstack/react-query";
import { createRootRouteWithContext, Outlet } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";
import { AppBar } from "@/components";

interface MyRouterContext {
  queryClient: QueryClient;
}

export const Route = createRootRouteWithContext<MyRouterContext>()({
  component: () => (
    <div className="h-screen flex flex-col">
      <AppBar />
      <div className="flex-1 h-full">
        <Outlet />
      </div>
      <TanStackRouterDevtools />
    </div>
  ),
});
