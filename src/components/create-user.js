import React from "react";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      margin: theme.spacing(1),
      width: "25ch",
    },
  },
}));

export default () => {
  const [state, setState] = React.useState({ username: "" });
  const classes = useStyles();

  const onChange = (e) => {
    setState({ username: e.target.value });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    const display = state.username;
    console.log("username: ", display);
    setState({ username: " " });
  };

  return (
    <form className={classes.root} noValidate autoComplete="off">
      <TextField
        id="outlined-basic"
        label="User"
        variant="outlined"
        value={state.username}
        onChange={(e) => onChange(e)}
      />
      <Button
        variant="contained"
        color="primary"
        href="#contained-buttons"
        onClick={(e) => onSubmit(e)}
      >
        Submit
      </Button>
    </form>
  );
};
