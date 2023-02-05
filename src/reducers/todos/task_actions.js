// import {
//   loadTasks,
//   removeTask,
//   createTask,
//   completeTask,
//   openCreateModal,
// } from "./task_slice";
// import { timeConverter } from "./task_utils";
// import { db } from "../../firebase/firebase.utilis";

// // load the tasks
// export const loadTasksAsync = () => (dispatch) => {
//   const fetchTasks = [];
//   db.collection("tasks")
//     .get()
//     .then((snapshot) => {
//       const transformedCollection = snapshot.docs.map((doc) => {
//         const { task, date, completed } = doc.data();

//         return {
//           id: doc.id,
//           task,
//           // date: new Date(date.seconds * 1000).toString(),
//           date: timeConverter(date),
//           completed,
//         };
//       });
//       transformedCollection.forEach((doc) => {
//         fetchTasks.push(doc);
//       });
//     })
//     .then(() => {
//       dispatch(loadTasks(fetchTasks));
//     });
// };

// // create a task

// //  1 open modal

// export const openCreateTaskModalAsync = (toggleModal) => (dispatch) => {
//   dispatch(openCreateModal(toggleModal));
// };

// // add tasks
// export const createTaskAsync =
//   ({ task, date }) =>
//   (dispatch) => {
//     let taskId = "";
//     db.collection("tasks")
//       .add({
//         task: task,
//         date: date,
//         completed: false,
//       })
//       .then((docRef) => {
//         console.log("Document written with ID: ", docRef.id);
//         return docRef;
//       })
//       .then((docRef) => {
//         taskId = docRef.id;
//         dispatch(
//           createTask({
//             task: task,
//             date: date,
//             taskId,
//             completed: false,
//           })
//         );
//       })
//       .catch(function (error) {
//         console.error("Error adding document: ", error);
//       });
//   };

// // // toggle completed

// export const changeCompleteTask = (taskId) => (dispatch) => {
//   db.collection("tasks")
//     .doc(taskId)
//     .get()
//     .then(function (doc) {
//       if (doc.exists) {
//         return doc.ref.update({ completed: !doc.data().completed });
//       }
//     })
//     .then(function () {
//       dispatch(completeTask(taskId));
//       console.log("Task successfully updated!");
//     })
//     .catch(function (error) {
//       console.error("Error updating Task: ", error);
//     });
// };

// // // delete task

// export const deleteTaskAsync = (taskId) => (dispatch) => {
//   db.collection("tasks")
//     .doc(taskId)
//     .get()
//     .then(function (doc) {
//       if (doc.exists) {
//         return doc.ref.delete();
//       }
//     })
//     .then(function () {
//       console.log("Task successfully deleted!");
//       dispatch(removeTask(taskId));
//     })
//     .catch(function (error) {
//       console.error("Error deleting Task: ", error);
//     });
// };
