import Toast from "react-bootstrap/Toast";

function SimpleToast({ message }) {
  return (
    <Toast>
      <Toast.Header>
        <img
          src="holder.js/20x20?text=%20"
          className="rounded me-2"
          alt=""
        />
        <strong className="me-auto">Message</strong>
        <small>11 mins ago</small>
      </Toast.Header>
      <Toast.Body>{message}</Toast.Body>
    </Toast>
  );
}

export default SimpleToast;
