const Message = ({ type = "info", children }) => {
  return (
    <div className={`alert alert-${type}`} role="alert">
      {children}
    </div>
  );
};

export default Message;
