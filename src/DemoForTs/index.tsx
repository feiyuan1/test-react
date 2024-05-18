import React from "react";
import TestForProps, { TestForHook } from "./TestForProps";
import { TestForErrorBoundary } from "./ErrorBoundary";
import DemoForFormEvent from "./DemoForFormEvent";
import TestForPortal from "./TestForPortal";
import testForModule from "./testForModule";

const module = new testForModule({ a: "1" }, "a");
console.log(module.get());

export default function DemoForTs() {
  return (
    <>
      <TestForProps mode="testing" />
      <TestForHook />
      <TestForErrorBoundary />
      <DemoForFormEvent />
      <TestForPortal />
    </>
  );
}
