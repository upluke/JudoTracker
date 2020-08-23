import React from "react";
import TableCell from "@material-ui/core/TableCell";
import TableRow from "@material-ui/core/TableRow";
import { Link } from "react-router-dom";

export default ({ exercise, deleteExercise, id }) => {
  console.log("mytb: ", exercise);
  return (
    <TableRow>
      <TableCell component="th" scope="row">
        {exercise.username}
      </TableCell>
      <TableCell align="right">{exercise.description}</TableCell>
      <TableCell align="right">{exercise.duration}</TableCell>
      <TableCell align="right">{exercise.date.substring(0, 10)}</TableCell>
    </TableRow>
  );
};
