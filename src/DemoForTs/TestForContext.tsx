import React, { createContext, useContext } from "react";

type StoreContextValue = {
  store: object;
};
const StoreContext = createContext<StoreContextValue>(null);

const StoreProvider = ({
  initStore,
  children,
}: {
  initStore: object;
  children: React.ReactNode;
}) => {
  return (
    <StoreContext.Provider value={{ store: initStore }}>
      {children}
    </StoreContext.Provider>
  );
};

const Content = () => {
  const { store } = useContext(StoreContext) || {};

  return <>{JSON.stringify(store)}</>;
};

export default function TestForContext() {
  return (
    <StoreProvider initStore={{}}>
      <Content />
    </StoreProvider>
  );
}
