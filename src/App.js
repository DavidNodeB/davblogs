import { Routes, Route } from "react-router-dom";
import Home from "./routes/Home";
import Login from "./routes/Login";
import Signup from "./routes/Signup";
import New from "./routes/New";
import Post from "./routes/Post";
import RestrictedRoutes from "./routes/RestrictedRoutes";
import Unauthorized from "./routes/Unauthorized";
import Edit from "./routes/Edit";

function App() {
  return (
    <Routes>
      <Route path="/" Component={Login} />
      <Route path="/signup" Component={Signup} />
      <Route path="/unauthorized" Component={Unauthorized} />
      <Route Component={RestrictedRoutes}>
        <Route path="/home" Component={Home} />
        <Route path="/new" Component={New} />
        <Route path="/post/:postId" Component={Post} />
        <Route path="/post/:postId/edit" Component={Edit} />
      </Route>
    </Routes>
  );
}

export default App;
