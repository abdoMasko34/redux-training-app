import React from "react";
import ReactDOM from "react-dom";
import { useDispatch, useSelector } from "react-redux";
import { ErrorMessage, Field, Form, Formik } from "formik";
import * as Yup from "yup";
import {
  createTodoAsync,
  editTodoAsync,
} from "../../reducers/todos/todos_actions";
import { selectEditedTodo } from "../../reducers/todos/todos_slice";
const body = document.body;
const Modal = ({ modalIsOpen, onClose, id, userId }) => {
  const dispatch = useDispatch();
  const editedTodo = useSelector(selectEditedTodo);
  const handleSubmit = (values) => {
    if (id) {
      dispatch(
        editTodoAsync(
          { values, id },
          () => {},
          (err) => {
            alert(err);
          }
        )
      );
      onClose();
    } else if (userId) {
      dispatch(
        createTodoAsync(
          { ...values, userId },
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
      initialValues={{
        title: id ? editedTodo.title : "",
        due_on: id ? editedTodo.due_on : new Date(),
        status: id ? editedTodo.status : "completed",
      }}
      validationSchema={Yup.object({
        title: Yup.string().required("title required"),
        due_on: Yup.string().required("due_on required"),
        status: Yup.string()
          .oneOf(["completed", "pending"])
          .required("status required"),
      })}
      enableReinitialize={true}
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
                      {id ? "Edit " : "Create "}
                      todos
                    </h4>
                  </div>
                  <div className="modal-body">
                    {/* <label htmlFor="name">name:</label> */}

                    <div className="form-group">
                      <Field
                        name="title"
                        className="form-control"
                        placeholder="Title"
                        value={values.title || ""}
                      />
                      <span className="error_message" style={{ color: "red" }}>
                        <ErrorMessage name="title" />
                      </span>
                    </div>

                    <div className="form-group">
                      {/* <label htmlFor="email">email:</label> */}
                      <Field
                        name="due_on"
                        className="form-control"
                        placeholder="due_on"
                        value={values.due_on || new Date()}
                      />
                      <span className="error_message" style={{ color: "red" }}>
                        <ErrorMessage name="due_on" />
                      </span>
                    </div>

                    <div className="form-group">
                      <Field
                        as="select"
                        name="status"
                        value={values.status || "completed"}
                      >
                        <option value="completed">Completed</option>
                        <option value="pending">Pending</option>
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
