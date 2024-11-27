import React from 'react'

interface DeleteModalProps {
    isVisible: boolean
    onCancel: () => void
    onDelete: () => void
}
const DeleteModal: React.FC<DeleteModalProps> = ({
    isVisible,
    onCancel,
    onDelete,
}) => {
    if (!isVisible) return null
    return (
        <div className="fixed inset-0 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg shadow-lg max-w-sm w-full p-6">
                <div className="modal-header">
                    <h2 className="text-2xl font-bold">Confirm Delete </h2>
                </div>
                <div className="modal-body">
                    <p>Are you sure you want to delete this ?</p>
                </div>
                <div className="modal-footer mt-4 flex justify-end space-x-2">
                    <button className="btn-secondary" onClick={onCancel}>
                        Cancel
                    </button>
                    <button className="btn-primary" onClick={onDelete}>
                        Delete
                    </button>
                </div>
            </div>
        </div>
    )
}
export default DeleteModal
