const ErrorModal = ({ errorMessage }) => {
  if (errorMessage) {
    return (
      <div class="alert alert-danger">
        <strong>Error: </strong> {errorMessage}
      </div>
    );
  } else {
    <></>;
  }
};

export default ErrorModal;
