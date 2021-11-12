import { React, useValues,useState } from "react";
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
import {withFormik } from "formik";
import * as Yup from "yup";
import { CheckBoxOutlineBlank } from "@mui/icons-material";
import { FormHelperText } from "@mui/material";
import {connect} from 'react-redux';
function Login(props) {
  const { values, touched, errors, handleChange, handleSubmit } =props;
  

  const [state, setstate] = useState({
    showPassword: false,
    isPass: true,
    isUser: true,
  });
  const history = useHistory();
  const dispatch = useDispatch();
  
  const { accessToken, loading, error, currentUser, isLogined,isRegister } = useSelector(
    (values) => values.authReducer
  );
  const checked = (isChecked) => {
    dispatch(actSaveUserCheck(isChecked));
  };
  const saveLoginInfo = () => {
    const isChecked = !isLogined;
    checked(isChecked);
  };
  
  const actSignIn=(isLogined,isRegister,history)=>{
    if (isLogined) {
      localStorage.setItem("userLogin", JSON.stringify(currentUser));
      localStorage.setItem("accessToken", accessToken);

    }
    if(isRegister){
      history.push('/');
    }
    else{
      history.goBack();
    }
  }
  if(currentUser){
    actSignIn(isLogined,isRegister,history);
  }
  

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
  return !currentUser? (
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
            sx={{ m: 1, width: "30ch" }}
          >
            <InputLabel sx={{ color: "#fff" }} htmlFor="email">
              Email
            </InputLabel>
            <Input
              type="email"
              name="email"
              className="input-form"
              id="email"
              value={values.email}
              onChange={handleChange}
              aria-describedby="standard-email-helper-text"
              inputProps={{
                "aria-label": "email",
              }}
            />
            {touched.email && errors.email ? (
              <FormHelperText>{errors.email}</FormHelperText>
            ):""}
          </FormControl>
          <FormControl
            sx={{ m: 1, width: "30ch" }}
            variant="standard"
          >
            <InputLabel sx={{ color: "#fff" }} htmlFor="password">
              Password
            </InputLabel>
            <Input
              name="password"
              className="input-form"
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
            {touched.password && errors.password ? 
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
              Save account
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
  
  handleSubmit: (values, { props,setSubmitting }) => {
    props.dispatch(actLogin(values))
  },

  displayName: "BasicForm",
})(Login);
export default connect()( LoginWithFormik);
