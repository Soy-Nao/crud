import axios from "axios";
import React from "react";
import { useEffect, useCallback } from "react";
import { useForm } from "react-hook-form";
import "./style/UsersForm.css";

const UsersForm = ({
  getUsers,
  userSelected,
  deselectUser,
  isOpen,
  handleClose,
}) => {
  const initialValues = {
    first_name: "",
    last_name: "",
    email: "",
    password: "",
    birthday: "",
  };

  const { register, handleSubmit, reset } = useForm();

  useEffect(() => {
    if (userSelected) {
      reset(userSelected);
    } else {
      console.log("initialValues", initialValues);
      reset(initialValues);
    }
  }, [userSelected]);

  useEffect(() => {
    console.log("isOpen", isOpen);
    if (!isOpen) {
      reset(initialValues);
    }
  }, [isOpen]);

  const submit = (data) => {
    console.log(data);
    if (userSelected) {
      axios
        .put(
          `https://users-crud1.herokuapp.com/users/${userSelected.id}/`,
          data
        )
        .then(() => {
          getUsers();
          deselectUser();
          handleClose();
        })
        .catch((error) => console.log(error.response?.data));
    } else {
      axios

        .post("https://users-crud1.herokuapp.com/users/", data)
        .then(() => {
          reset(initialValues);
          getUsers();
        })
        .catch((error) => console.log(error.response?.data));
    }
  };


  const onClose = (event) => {
    event.preventDefault();

    reset(initialValues); // llamar tu funcion de limpiar
    handleClose(); // llamar tu funcion de cerrar el modal
  };

  return (
    <div className="container-form">
      <form action="" className="form" onSubmit={handleSubmit(submit)}>
        <div className="title-user">
          <h2>New User</h2>
        </div>
        <div className="inf">
          <input
            {...register("first_name")}
            type="text"
            id="first_name"
            placeholder="First Name"
          />
        </div>
        <div className="inf">
          <input
            {...register("last_name")}
            type="text"
            id="last_name"
            placeholder="Last Name"
          />
        </div>
        <div className="inf">
          <input
            {...register("email")}
            type="text"
            id="_email"
            placeholder="Email"
          />
        </div>
        <div className="inf">
          <input
            {...register("password")}
            type="password"
            id="_password"
            placeholder="Password"
          />
        </div>
        <div className="inf">
          <input
            {...register("birthday")}
            type="date"
            id="birthday"
            placeholder="Birthday"
          />
        </div>
        <div className="btn-form">
          <button>Submit</button>
          <button className="cancel" onClick={onClose}>
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default UsersForm;
