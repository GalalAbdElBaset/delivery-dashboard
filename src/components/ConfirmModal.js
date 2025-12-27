
const ConfirmModal = ({ title, message, onConfirm, onCancel }) => {
    return (
        <div className="modal-overlay">
        <div className="modal-card">
            <i className="fa-solid fa-triangle-exclamation modal-icon"></i>

            <h3>{title}</h3>
            <p>{message}</p>

            <div className="modal-actions">
            <button className="btn cancel" onClick={onCancel}>
                Cancel
            </button>
            <button className="btn confirm" onClick={onConfirm}>
                Logout
            </button>
            </div>
        </div>
        </div>
    );
};

export default ConfirmModal;
