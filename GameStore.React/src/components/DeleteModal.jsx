import React from "react";

const DeleteModal = ({ isOpen, onClose, onConfirm, itemName }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white p-6 rounded-lg shadow-lg w-80">

                <p className="text-gray-800 mb-4">
                    Are you sure you want to delete{" "}
                    <span className="font-semibold">{itemName}</span>?
                </p>

                <div className="flex justify-end space-x-2">
                    <button
                        onClick={onClose}
                        className="px-3 py-1 rounded bg-gray-300 hover:bg-gray-400"
                    >
                        Cancel
                    </button>

                    <button
                        onClick={onConfirm}
                        className="px-3 py-1 rounded bg-red-500 text-white hover:bg-red-600"
                    >
                        Delete
                    </button>
                </div>
            </div>
        </div>
    );
};

export default DeleteModal;