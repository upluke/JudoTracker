import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import Button from "@material-ui/core/Button";
import axios from "axios";
import { useParams } from "react-router-dom";
import moment from "moment";

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
  const isCreateMode = id === "new";
  // let flagURL = window.location.href.slice(-3); //fetch url last three letters

  React.useEffect(() => {
    // if (flagURL !== "new") {
    async function fetchData() {
      //fetch users
      const usersRes = await axios.get("http://localhost:5000/users");
      const usersData = usersRes?.data;
      const users = usersData?.map((user) => user.username); //get usernames
      //fetch specific exercise
      if (isCreateMode) {
        setState({
          users,
        });
      } else {
        const exerciseRes = await axios.get(
          "http://localhost:5000/exercises/" + id
        );
        const exerciseData = exerciseRes?.data;
        let { username, description, duration, date } = exerciseData;
        setState({
          users,
          username,
          description,
          duration,
          date: new Date(date),
        });
      }
    }
    fetchData();
    // fetchDataEdit();
    // // } else {
    //   async function fetchDateCreate() {
    //     const usersRes = await axios.get("http://localhost:5000/users");
    //     const usersData = usersRes?.data;
    //     const users = usersData?.map((user) => user.username);
    //     const username = usersData[0].username;
    //     setState({ users, username });
    //   // }
    //   fetchDateCreate();
    // }
  }, [id, isCreateMode]);

  const handleChange = (e, name) => {
    setState({
      ...state,
      [name]: e.target.value,
    });
  };
  const onSubmit = (e) => {
    e.preventDefault();
    const exercise = {
      username: state.username,
      description: state.description,
      duration: state.duration,
      date: state.date,
    };
    // if (flagURL === "new") {
    if (isCreateMode) {
      axios.post("http://localhost:5000/exercises/add", exercise);
      window.location = "/";
    } else {
      axios.post("http://localhost:5000/exercises/update/" + id, exercise);
      window.location = "/";
    }

    // .then((res) => console.log(res.data));
  };

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
        value={moment(state.date).format("YYYY-MM-DD")}
        onChange={(e) => handleChange(e, "date")}
      />
      <Button
        variant="contained"
        color="primary"
        href="#contained-buttons"
        onClick={(e) => onSubmit(e)}
      >
        {isCreateMode ? "Create Save" : "Edit Save"}
      </Button>
    </form>
  );
};
