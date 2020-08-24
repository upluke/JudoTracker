import React from "react";
import axios from "axios";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableRow from "@material-ui/core/TableRow";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import Paper from "@material-ui/core/Paper";
import MyTable from "./MyTable";

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});

export default () => {
  const [exercises, setExercises] = React.useState([]);
  const classes = useStyles();

  React.useEffect(() => {
    axios
      .get("http://localhost:5000/exercises/")
      .then((res) => {
        setExercises(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const deleteExercise = (id) => {
    axios
      .delete("http://localhost:5000/exercises/" + id)
      .then((res) => console.log(res.data));
    setExercises(exercises.filter((el) => el._id !== id));
  };

  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Username</TableCell>
            <TableCell align="right">Description</TableCell>
            <TableCell align="right">Duration</TableCell>
            <TableCell align="right">Date</TableCell>
            <TableCell align="right">Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {exercises.map((currentExercise) => {
            return (
              <MyTable
                exercise={currentExercise}
                deleteExercise={deleteExercise}
                id={currentExercise._id}
                key={currentExercise._id}
              />
            );
          })}
        </TableBody>
      </Table>
    </TableContainer>
  );
};
