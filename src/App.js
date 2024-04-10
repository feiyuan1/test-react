import DemoWithSuspense from './DemoWithSuspense';
import Calculator from './calculator/calculator'
import DemoForKey from './DemoForKey';
import DemoForTs from './DemoForTs'
import DemoForRedux from './DemoForRedux'

function App() {
  return (
    <div className="App">
      <Calculator/>
      <DemoWithSuspense />
      <DemoForKey />
      <DemoForTs />
      <DemoForRedux />
    </div>
  );
}

export default App;
