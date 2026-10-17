import { BrowserRouter } from "react-router-dom";
import { AppShell, Penyedia } from "./AppShell";

const App = () => (
  <Penyedia>
    <BrowserRouter>
      <AppShell />
    </BrowserRouter>
  </Penyedia>
);

export default App;
