import React, { useEffect } from "react";
import ReactDOM from "react-dom";
import { useDispatch, useSelector } from "react-redux";
import { ErrorMessage, Field, Form, Formik } from "formik";
import * as Yup from "yup";
import {
  createUserAsync,
  editUserAsync,
} from "../../reducers/users/user_actions";
import { selectEditedUser } from "../../reducers/users/users_slice";
const body = document.body;
const Modal = ({ modalIsOpen, onClose, id }) => {
  const dispatch = useDispatch();
  const editedUser = useSelector(selectEditedUser);

  const handleSubmit = (values) => {
    // if (modalType === "users") {
    if (id) {
      dispatch(
        editUserAsync(
          { values, id },
          () => {},
          (err) => {
            alert(err);
          }
        )
      );
      onClose();
    } else {
      dispatch(
        createUserAsync(
          values,
          () => {},
          (err) => {
            alert(err);
          }
        )
      );
      onClose();
    }
  };

  if (!modalIsOpen) return null;
  return (
    <Formik
      enableReinitialize
      initialValues={{
        email: id ? editedUser.email : "",
        name: id ? editedUser.name : "",
        gender: id ? editedUser.gender : "male",
        status: id ? editedUser.status : "active",
      }}
      validationSchema={Yup.object({
        name: Yup.string().required("Name required"),
        email: Yup.string().email("Invalid email").required("Email Required"),
      })}
      onSubmit={(values, { setSubmitting }) => {
        console.log(values);
        setTimeout(() => {
          handleSubmit(values);
          alert(JSON.stringify(values, null, 2));
          setSubmitting(false);
        }, 400);
      }}
    >
      {({ values }) => (
        <Form>
          <div
            style={{
              width: "100%",
              height: "100%",
              backgroundColor: "rgba(0, 0, 0, 0.5)",
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              zIndex: 1000,
            }}
          >
            <div
              className="modal fade in"
              style={{
                display: "flex",
                position: "absolute",
                top: "50%",
                left: "50%",
                overflow: "visible",
                transform: "translate(-50%, -50%)",
              }}
              id="myModal"
              role="dialog"
            >
              <div className="modal-dialog">
                <div className="modal-content">
                  <div className="modal-header">
                    <button
                      type="button"
                      className="close"
                      data-dismiss="modal"
                      onClick={onClose}
                    >
                      &times;
                    </button>
                    <h4 className="modal-title">
                      {id ? "Edit" : "Create"} Users
                    </h4>
                  </div>
                  <div className="modal-body">
                    {/* <label htmlFor="name">name:</label> */}

                    <div className="form-group">
                      <Field
                        name="name"
                        className="form-control"
                        placeholder="Name"
                        value={values.name || ""}
                      />
                      <span className="error_message" style={{ color: "red" }}>
                        <ErrorMessage name="name" />
                      </span>
                    </div>

                    <div className="form-group">
                      {/* <label htmlFor="email">email:</label> */}
                      <Field
                        name="email"
                        className="form-control"
                        placeholder="Email"
                        value={values.email || ""}
                      />
                      <span className="error_message" style={{ color: "red" }}>
                        <ErrorMessage name="email" />
                      </span>
                    </div>

                    <div className="form-group">
                      <div>
                        <label htmlFor="gender">gender:</label>
                      </div>
                      <label className="radio-inline">
                        <Field type="radio" name="gender" value="male" />
                        male
                      </label>
                      <label className="radio-inline">
                        <Field type="radio" name="gender" value="female" />
                        female
                      </label>
                      <span className="error_message" style={{ color: "red" }}>
                        <ErrorMessage name="gender" />
                      </span>
                    </div>

                    <div className="form-group">
                      <Field
                        as="select"
                        name="status"
                        value={values.status || "active"}
                      >
                        <option value="active">active</option>
                        <option value="inactive">inActive</option>
                      </Field>
                    </div>
                  </div>
                  <div className="modal-footer">
                    <button
                      type="submit"
                      className={`btn btn-${id ? "danger" : "success"}`}
                    >
                      {id ? "Edit" : "Create"}
                    </button>
                    <button
                      type="button"
                      className="btn btn-default"
                      onClick={onClose}
                    >
                      Close
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Form>
      )}
    </Formik>
  );
};

ReactDOM.createPortal(Modal, body);
export default Modal;
