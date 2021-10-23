import * as React from "react";
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
import "../Login/Login.scss";

export default function Login() {
  const [values, setValues] = React.useState({
    username: "",
    password: "",
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

  return (
    <div className="login-banner">
      <img className="wave" src={BgLogin} alt="login background" />
      <Container>
        <div className="img">
          <img src={LoginWelcome} alt="images personal" />
        </div>
        
        <Box className="login-box">
          <h2>Login</h2>
          <FormControl variant="standard" sx={{ m: 1, width: "25ch" }}>
            <InputLabel htmlFor="standard-adornment-password">
              Username
            </InputLabel>
            <Input
              id="standard-adornment-username"
              value={values.username}
              onChange={handleChange("username")}
              aria-describedby="standard-username-helper-text"
              inputProps={{
                "aria-label": "username",
              }}
            />
          </FormControl>
          <FormControl sx={{ m: 1, width: "25ch" }} variant="standard">
            <InputLabel htmlFor="standard-adornment-password">
              Password
            </InputLabel>
            <Input
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
        </Box>
      </Container>
    </div>
  );
}
