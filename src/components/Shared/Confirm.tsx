import React from 'react';

interface ConfirmProps {
  message: string;
  onConfirm: () => void;
  onCancel: () => void;
}

const Confirm: React.FC<ConfirmProps> = ({ message, onConfirm, onCancel }) => {
  return (
    <div className="confirm-dialog">
      <p>{message}</p>
      <div className="confirm-buttons">
        <button onClick={onConfirm}>Confirm</button>
        <button onClick={onCancel}>Cancel</button>
      </div>
    </div>
  );
};

export default Confirm;