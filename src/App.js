import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";

import Navbar from "./components/navbar";
import ExercisesList from "./components/exercises-list";
import EditExercise from "./components/edit-exercise";
// import CreateExercise from "./components/create-exercise";
import CreateUser from "./components/create-user";
import CssBaseline from "@material-ui/core/CssBaseline";
import Container from "@material-ui/core/Container";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: "#eeeeee",
    minHeight: "100vh",
    maxHeight: "auto",
  },
}));

function App() {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Router>
        <React.Fragment>
          <CssBaseline />
          <Container maxWidth="lg">
            <Navbar />
            <br />
            <Route path="/" exact component={ExercisesList} />
            <Route path="/edit/:id" component={EditExercise} />
            {/* <Route path="/create" component={CreateExercise} /> */}
            <Route path="/user" component={CreateUser} />
          </Container>
        </React.Fragment>
      </Router>
    </div>
  );
}

export default App;
