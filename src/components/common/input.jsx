import React from "react";

const Input = ({ label, id, value, error, onChange }) => {
  return (
    <div className="form-group">
      <label htmlFor={id}>{label}</label>
      <input
        autoFocus
        value={value}
        onChange={onChange}
        id={id}
        type="text"
        className="form-control"
      />
      {error && <div className="alert alert-danger">{error}</div>}
    </div>
  );
};

export default Input;
