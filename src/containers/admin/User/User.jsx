import userApi from "apis/userApi";
import React from "react";
import { useState } from "react";
import { useSelector } from "react-redux";

export default function User() {
  const [user, setUser] = useState({});

  const currentUser =useSelector(state=>state.authReducer.currentUser)
  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setUser((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };
  const handleOnSubmit = (e) => {
    e.preventDefault();
    userApi.addUserApi(user,currentUser.accessToken).then(res=>{
      console.log(res);
    }).catch(error => {
      console.log(error);
    })
  };

  return (
    <div className="container">
      <form className="text-left" onSubmit={handleOnSubmit}>
        <div className="row">
          <div className="col-6">
            <div className="form-group">
              <label>Tài khoản</label>
              <input
                type="text"
                name="taiKhoan"
                className="form-control"
                onChange={handleOnChange}
              />
            </div>
          </div>
          <div className="col-6">
            <div className="form-group">
              <label>Mật khẩu</label>
              <input
                type="text"
                name="matKhau"
                className="form-control"
                onChange={handleOnChange}
              />
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-6">
            <div className="form-group">
              <label>Email</label>
              <input
                type="text"
                name="email"
                className="form-control"
                onChange={handleOnChange}
              />
            </div>
          </div>
          <div className="col-6">
            <div className="form-group">
              <label>Số điện thoại</label>
              <input
                type="text"
                name="soDt"
                className="form-control"
                onChange={handleOnChange}
              />
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-6">
            <div className="form-group">
              <label>Mã nhóm</label>
              <input
                type="text"
                name="maNhom"
                className="form-control"
                onChange={handleOnChange}
              />
            </div>
          </div>
          <div className="col-6">
            <div className="form-group">
              <label>Mã loại người dùng</label>
              <input
                type="text"
                name="maLoaiNguoiDung"
                className="form-control"
                onChange={handleOnChange}
              />
            </div>
          </div>
        </div>
        <div className="form-group">
          <label>Họ tên</label>
          <input
            type="text"
            name="hoTen"
            className="form-control"
            onChange={handleOnChange}
          />
        </div>

        <button type="submit" className="btn btn-success">
          Add user
        </button>
      </form>
    </div>
  );
}
