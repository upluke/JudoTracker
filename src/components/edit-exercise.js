import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import Button from "@material-ui/core/Button";
import axios from "axios";
import { useParams } from "react-router-dom";
const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      margin: theme.spacing(1),
      width: "25ch",
    },
    textField: {
      marginLeft: theme.spacing(1),
      marginRight: theme.spacing(1),
      width: 200,
    },
  },
}));
export default () => {
  const classes = useStyles();
  const [state, setState] = React.useState({
    username: "",
    description: "",
    duration: 0,
    date: new Date(),
    users: [],
  });
  let { id } = useParams();
  // console.log("parapms: ", id);
  React.useEffect(() => {
    async function fetchData() {
      const usersRes = await axios.get("http://localhost:5000/users");
      const usersData = usersRes?.data;
      const users = usersData?.map((user) => user.username);
      const userRes = await axios.get("http://localhost:5000/exercises/" + id);
      const userData = userRes?.data;
      let { username, description, duration, date } = userData;
      setState({
        users,
        username,
        description,
        duration,
        date: new Date(date),
      });
    }
    fetchData();
  }, [id]);

  const handleChange = (e, name) => {
    setState({
      ...state,
      [name]: e.target.value,
    });
  };
  const onSubmit = (e) => {
    console.log("inside");
    e.preventDefault();
    const exercise = {
      username: state.username,
      description: state.description,
      duration: state.duration,
      date: state.date,
    };
    axios
      .post("http://localhost:5000/exercises/update/" + id, exercise)
      .then((res) => console.log(res.data));
    // window.location = "/";
  };
  console.log("username: ", state.username);
  return (
    <form className={classes.root} noValidate autoComplete="off">
      <FormControl className={classes.formControl}>
        <InputLabel htmlFor="username">Username: </InputLabel>
        <Select
          native
          value={state.username || " "}
          // inputProps={{
          //   name: "username",
          //   id: "username",
          // }}
          onChange={(e) => handleChange(e, "username")}
        >
          <option aria-label="None" value="" />
          {state.users.map((user, index) => {
            return (
              <option value={user} key={index}>
                {user}
              </option>
            );
          })}
        </Select>
      </FormControl>
      <br />
      <TextField
        label="Description:"
        value={state.description || " "}
        onChange={(e) => handleChange(e, "description")}
      />
      <br />
      <TextField
        label="Duration (in minutes): "
        value={state.duration || " "}
        onChange={(e) => handleChange(e, "duration")}
      />
      <br />
      <TextField
        label="date"
        type="date"
        className={classes.textField}
        InputLabelProps={{
          shrink: true,
        }}
        value={state.date || " "}
        onChange={(e) => handleChange(e, "date")}
      />
      <Button
        variant="contained"
        color="primary"
        href="#contained-buttons"
        onClick={(e) => onSubmit(e)}
      >
        Edit Save
      </Button>
    </form>
  );
};
