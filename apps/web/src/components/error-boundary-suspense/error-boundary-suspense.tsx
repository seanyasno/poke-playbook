import { QueryErrorResetBoundary } from "@tanstack/react-query";
import { Suspense, type ComponentProps, type PropsWithChildren } from "react";
import { ErrorBoundary } from "react-error-boundary";
import {
  ErrorFallback,
  LoadingFallback,
} from "./error-boundary-suspense-components";

export const ErrorBoundarySuspense: React.FC<PropsWithChildren> = ({
  children,
}) => {
  return (
    <QueryErrorResetBoundary>
      {({ reset }) => (
        <ErrorBoundary
          onReset={reset}
          fallbackRender={(fallbackProps) => (
            <ErrorFallback {...fallbackProps} />
          )}
        >
          <Suspense fallback={<LoadingFallback />}>{children}</Suspense>
        </ErrorBoundary>
      )}
    </QueryErrorResetBoundary>
  );
};

export const withErrorBoundarySuspense = (
  Component: React.FC,
  props?: ComponentProps<typeof ErrorBoundarySuspense>
) => {
  return (componentProps: ComponentProps<typeof Component>) => (
    <ErrorBoundarySuspense {...props}>
      <Component {...componentProps} />
    </ErrorBoundarySuspense>
  );
};
