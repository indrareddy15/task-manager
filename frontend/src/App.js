import { Container } from "@mui/material";
import { TaskManager } from "./components/TaskManager";
import { Nav } from "./components/AppBar";
import TaskManager2 from "./compo/prime";

const App = () => {
  return (
    <>
      <Nav />
      <Container maxWidth="lg">
        {/* <TaskManager /> */}
        <TaskManager2 />
      </Container>
    </>
  );
};

export default App;
