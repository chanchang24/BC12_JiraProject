import { React, usevalues } from "react";
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
import FacebookOutlinedIcon from "@mui/icons-material/FacebookOutlined";
import TwitterIcon from "@mui/icons-material/Twitter";
import GoogleIcon from "@mui/icons-material/Google";
import "../../Auth/FormLogin.scss";
import { Redirect, useHistory } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import Loader from "components/Loader/Loader";
import { actLogin, actSaveUserCheck } from "../module/action";
import { Link } from "react-router-dom";
import { withFormik } from "formik";
import * as Yup from "yup";
import { CheckBoxOutlineBlank } from "@mui/icons-material";
import { useState } from "react";
import { FormHelperText } from "@mui/material";

function Login(props) {
  const { values, touched, errors, handleChange, handleBlur, handleSubmit } =props;
  console.log(errors.password);

  const [state, setstate] = useState({
    showPassword: false,
    isPass: true,
    isUser: true,
  });
  const history = useHistory();
  const dispatch = useDispatch();
  const login = (user, history, token) => {
    dispatch(actLogin(user, history, token));
  };
  const checked = (isChecked) => {
    dispatch(actSaveUserCheck(isChecked));
  };
  const { accessToken, loading, error, currentUser, isLogined } = useSelector(
    (values) => values.authReducer
  );
  // const handleChange = (e) => {
  //   // e.preventDefault();
  //   const {name,value} = e.target;
  //   if (name === "email" && value !== "") {
  //     setvalues({ isUser: true });
  //   }
  //   if (name === "password" && value !== "") {
  //     setvalues({ isPass: true });
  //   }
  // };
  const saveLoginInfo = () => {
    const isChecked = !isLogined;
    checked(isChecked);
  };

  const loginSubmit = (e) => {
    // e.preventDefault();
    let user = {};
    let isUser = true;
    let isPass = true;
    for (let i = 0; i <= 1; i++) {
      const name = e.target[i].name;
      const value = e.target[i].value;
      if (name === "taiKhoan" && value === "") {
        isUser = false;
      }
      if (name === "matKhau" && value === "") {
        isPass = false;
      }
      const userInfo = { ...user, [name]: value };
      user = { ...userInfo };
    }
    if (!isUser || !isPass) {
      setstate((prevvalues) => ({
        ...prevvalues,
        isUser,
        isPass,
      }));
      return;
    }
    const token =
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0ZW5Mb3AiOiJCb290Y2FtcCAxMiIsIkhldEhhblN0cmluZyI6IjA4LzAzLzIwMjIiLCJIZXRIYW5UaW1lIjoiMTY0NjY5NzYwMDAwMCIsIm5iZiI6MTYxNzkwMTIwMCwiZXhwIjoxNjQ2ODQ1MjAwfQ.mPmSkXNXN1frPpzs9CbkOn1tlxu1XGzuT_3jPckLDnU";
    login(user, history, token);
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };
  const handleClickShowPassword = () => {
    setstate({
      ...state,
      showPassword: !state.showPassword,
    });
  };
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
        <form onSubmit={handleSubmit} className="login-box" method="post">
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
          <FormControl
            variant="standard"
            error={errors.email}
            sx={{ m: 1, width: "30ch" }}
          >
            <InputLabel sx={{ color: "#fff" }} htmlFor="email">
              Email
            </InputLabel>
            <Input
              type="email"
              name="email"
              className={errors.email && touched.email ? "input-error" : null}
              id="email"
              value={values.email}
              onChange={handleChange}
              aria-describedby="standard-email-helper-text"
              inputProps={{
                "aria-label": "email",
              }}
            />
            {errors.email ? (
              <FormHelperText>{errors.email}</FormHelperText>
            ):""}
          </FormControl>
          <FormControl
            sx={{ m: 1, width: "30ch" }}
            error={errors.password}
            variant="standard"
          >
            <InputLabel sx={{ color: "#fff" }} htmlFor="password">
              Password
            </InputLabel>
            <Input
              name="password"
              className={
                errors.password && touched.password ? "input-error" : null
              }
              id="password"
              type={state.showPassword ? "text" : "password"}
              value={values.password}
              onChange={handleChange}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                  >
                    {state.showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              }
            />
            {errors.password ? 
              <FormHelperText className="text-danger">
                {errors.password}
              </FormHelperText>
            :""}
          </FormControl>
          <div className="forgot__pass">
            <Link href="#">Forgot Password?</Link>
          </div>

          <div className="form-check mt-3formCheck-SaveUser">
            <div
              className={"checkBox " + (isLogined ? "saveUser" : "")}
              onClick={saveLoginInfo}
            ></div>
            <span>
              {" "}
              <CheckBoxOutlineBlank />
              Lưu tài khoản
            </span>
          </div>
          <button htmlType="submit" className="btn-submit ">
            Login
          </button>
          <div class="txt1 text-center p-t-54 p-b-20">
            <p>You don't have account</p>

            <span>
              <Link to="/register" id="sign-up">
                Sign Up
              </Link>{" "}
              Or Sign Up Using
            </span>
          </div>
          <div class="flex-c-m">
            <Link to="/login" class="login100-social-item bg1">
              <FacebookOutlinedIcon />
            </Link>
            <Link to="/login" class="login100-social-item bg2">
              <TwitterIcon />
            </Link>
            <Link to="/login" class="login100-social-item bg3">
              <GoogleIcon />
            </Link>
          </div>
        </form>
      </Container>
    </div>
  ) : (
    <Redirect to="/" />
  );
}

const LoginWithFormik = withFormik({
  mapPropsToValues: () => ({
    email: "",
    password: "",
  }),
  validationSchema: Yup.object().shape({
    email: Yup.string().required("Enter an email").email("Email is invalid!"),
    password: Yup.string()
      .required("Enter a password")
      .min(6, "Password is too short"),
  }),
  
  handleSubmit: (values, { setSubmitting }) => {
    console.log(values);
  },

  displayName: "BasicForm",
})(Login);
export default LoginWithFormik;
