import React, { ErrorInfo, useRef } from "react";

type Props = {
  fallback?: React.ReactNode;
  children: React.ReactNode;
};

type State = {
  isError: boolean;
};

class ErrorBoundary extends React.Component<Props, State> {
  state: State = {
    isError: false,
  };

  static getDerivedStateFromError() {
    return { isError: true };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.log("catch error: ", error, errorInfo);
  }

  render() {
    if (this.state.isError) {
      const { fallback } = this.props;
      if (fallback) {
        return fallback;
      }
      return <div>there is an error</div>;
    }
    return this.props.children;
  }
}

export default ErrorBoundary;

type TestProps = { age?: number };

export function Test() {
  const nullRef = useRef<TestProps | null>(null);

  return <div>{nullRef.current?.age}</div>;
}

export function TestForErrorBoundary() {
  return (
    <ErrorBoundary fallback={<>oops</>}>
      <Test />
    </ErrorBoundary>
  );
}
