import React from 'react'
import Box from "@mui/material/Box";
import Input from "@mui/material/Input";
import Container from "@mui/material/Container";
import IconButton from "@mui/material/IconButton";
import InputLabel from "@mui/material/InputLabel";
import InputAdornment from "@mui/material/InputAdornment";
import FormControl from "@mui/material/FormControl";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import LoginWelcome from "assets/images/imgWelcome.svg";
import BgLogin from "assets/images/wave.png";
import "../../Auth/FormLogin.scss";
import { Redirect, useHistory } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import Loader from "components/Loader/Loader";
import { Link } from "react-router-dom";
export default function Register(props) {
  const [values, setValues] = React.useState({
    email: "",
    password: "",
    rePassword:"",
    name:"",
    phoneNumberNumber: "",
    showPassword: false,
  });

  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };
  
  const handleClickShowPassword = () => {
    setValues({
      ...values,
      showPassword: !values.showPassword,
    });
  };


  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };
  const history = useHistory();
  const dispatch = useDispatch();
  const { loading, error, currentUser } = useSelector(
    (state) => state.authReducer
  );

  if (loading) return <Loader />;
  return !currentUser ? (
    <div className="login-banner">
      <img className="wave" src={BgLogin} alt="login background" />
      <Container>
        <div className="img">
          <img src={LoginWelcome} alt="images personal" />
        </div>
        <Box className="login-box">
          <h1>Register</h1>
          {error && <div className="alert alert-danger">{error}</div>}
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}

          ></div>
          <FormControl variant="standard" sx={{ m: 1, width: "30ch" }}>
          
            <InputLabel
              sx={{ color: "#fff" }}
              htmlFor="standard-adornment-email"
            >
              Email
            </InputLabel>
            
            <Input
              
              className="input-form"
              id="standard-adornment-email"
              value={values.email}
              onChange={handleChange("email")}
              aria-describedby="standard-email-helper-text"
              inputProps={{
                "aria-label": " email",
              }}
              
            />
            
          </FormControl>
          <FormControl sx={{ m: 1, width: "30ch" }} variant="standard">
            <InputLabel
              sx={{ color: "#fff" }}
              htmlFor="standard-adornment-password"
            >
              Password
            </InputLabel>
            <Input
              className="input-form"
              id="standard-adornment-password"
              type={values.showPassword ? "text" : "password"}
              value={values.password}
              onChange={handleChange("password")}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                  >
                    {values.showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              }
            />
          </FormControl>
          <FormControl className="confirm-password" sx={{ m: 1, width: "30ch" }} variant="standard">
            <InputLabel
              sx={{ color: "#fff" }}
              htmlFor="standard-adornment-rePassword"
            >
              Confirm
            </InputLabel>
            <Input
              className="input-form"
              id="standard-adornment-rePassword"
              type={values.showPassword ? "text" : "password"}
              value={values.rePassword}
              onChange={handleChange("rePassword")}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                  >
                    {values.showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              }
            />
          </FormControl>
          <FormControl variant="standard" sx={{ m: 1, width: "30ch" }}>
            <InputLabel
              sx={{ color: "#fff" }}
              htmlFor="standard-adornment-name"
            >
              Name
            </InputLabel>
            <Input
              className="input-form"
              id="standard-adornment-name"
              value={values.name}
              onChange={handleChange("name")}
              aria-describedby="standard-name-helper-text"
              inputProps={{
                "aria-label": "name",
              }}
            />
          </FormControl>
          <FormControl variant="standard" sx={{ m: 1, width: "30ch" }}>
            <InputLabel
              sx={{ color: "#fff" }}
              htmlFor="standard-adornment-phoneNumber"
            >
              Phone Number
            </InputLabel>
            <Input
              className="input-form"
              id="standard-adornment-phoneNumber"
              value={values.phoneNumber}
              onChange={handleChange("phoneNumber")}
              aria-describedby="standard-phoneNumber-helper-text"
              inputProps={{
                "aria-label": "phoneNumber",
              }}
            />
          </FormControl>
          <button type="submit" className="btn ">
            Register
          </button>
        </Box>
      </Container>
    </div>
  ) : (
    <Redirect to="/" />
  );
}
