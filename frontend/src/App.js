import { UserProvider } from "./hooks/useUser";
import Layout from "./layout/Layout";
import Axios from "axios";

function App() {
  Axios.defaults.baseURL = "https://axios-app.onrender.com";

  return (
    <UserProvider>
      <Layout/>
    </UserProvider>
  );
}

export default App;
