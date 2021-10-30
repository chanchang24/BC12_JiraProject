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
import FacebookOutlinedIcon from '@mui/icons-material/FacebookOutlined';
import TwitterIcon from '@mui/icons-material/Twitter';
import GoogleIcon from '@mui/icons-material/Google';
import "../Login/Login.scss";
import { Redirect, useHistory } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import Loader from "components/Loader/Loader";
import { actLogin } from "../module/action";
import { Link } from "react-router-dom";

export default function Login(props) {
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
  const history = useHistory();
  const dispatch = useDispatch();
  const { loading, error, currentUser } = useSelector(
    (state) => state.authReducer
  );
  const { accessToken } = useSelector((state) => state.authReducer);

  const onFinish = (values) => {
    console.log("Received values of form: ", values);
    dispatch(actLogin(values, history, accessToken));
  };

  if (loading) return <Loader />;
  return !currentUser ? (
    <div className="login-banner">
      <img className="wave" src={BgLogin} alt="login background" />
      <Container>
        <div className="img">
          <img src={LoginWelcome} alt="images personal" />
        </div>
        <Box className="login-box">
          <h1>Login</h1>
          {error && <div className="alert alert-danger">{error}</div>}
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
            onFinish={onFinish}
          ></div>
          <FormControl variant="standard" sx={{ m: 1, width: "30ch" }}>
            <InputLabel
              sx={{ color: "#fff" }}
              htmlFor="standard-adornment-username"
            >
              Username
            </InputLabel>
            <Input
              className="input-form"
              id="standard-adornment-username"
              value={values.username}
              onChange={handleChange("username")}
              aria-describedby="standard-username-helper-text"
              inputProps={{
                "aria-label": "username",
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
          <Link className="forgot__Pass" href="#">Forgot Password?</Link>
          <button type="submit" className="btn ">
            Login
          </button>
          <div class="txt1 text-center p-t-54 p-b-20">
            <p>You don't have account</p>
            
            <span><Link>Sign Up</Link> Or Sign Up Using</span>
          </div>
          <div class="flex-c-m">
            <Link to ="/login" class="login100-social-item bg1">
            <FacebookOutlinedIcon/>
            </Link>
            <Link to="/login" class="login100-social-item bg2">
              <TwitterIcon/>
            </Link>
            <Link to="/login" class="login100-social-item bg3">
            <GoogleIcon/>
            </Link>
          </div>
        </Box>
      </Container>
    </div>
  ) : (
    <Redirect to="/" />
  );
}
