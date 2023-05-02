// import Navigation from "./components/Navigation";

import { UserProvider } from "./hooks/useUser";
import Layout from "./layout/Layout";

function App() {
  return (
    <UserProvider>
      <Layout/>
    </UserProvider>
  );
}

export default App;
