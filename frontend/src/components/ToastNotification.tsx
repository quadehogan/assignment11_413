interface ToastNotificationProps {
  message: string;
  show: boolean;
}

function ToastNotification({ message, show }: ToastNotificationProps) {
  return (
    <div
      className="position-fixed bottom-0 end-0 p-3"
      style={{ zIndex: 1100 }}
    >
      <div
        className={`toast align-items-center text-bg-success border-0 ${show ? "show" : ""}`}
        role="alert"
      >
        <div className="d-flex">
          <div className="toast-body">{message}</div>
        </div>
      </div>
    </div>
  );
}

export default ToastNotification;
