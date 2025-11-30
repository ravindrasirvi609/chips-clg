import React, { useState, useCallback } from "react";

interface RejectPopupProps {
  isOpen: boolean;
  onClose: () => void;
  onReject: (comment: string) => Promise<void>;
}

const RejectPopup: React.FC<RejectPopupProps> = ({
  isOpen,
  onClose,
  onReject,
}) => {
  const [comment, setComment] = useState("");

  const handleCommentChange = useCallback(
    (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      setComment(e.target.value);
    },
    []
  );

  const handleReject = useCallback(async () => {
    await onReject(comment);
    setComment("");
    onClose();
  }, [comment, onReject, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg w-96 border border-gray-200 dark:border-gray-600">
        <h2 className="text-xl font-bold mb-4 text-gray-900 dark:text-white">
          Reject Abstract
        </h2>
        <textarea
          className="w-full h-32 p-2 border border-gray-300 dark:border-gray-600 rounded mb-4 bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          placeholder="Enter rejection reason..."
          value={comment}
          onChange={handleCommentChange}
        />
        <div className="flex justify-end">
          <button
            className="bg-gray-300 hover:bg-gray-400 dark:bg-gray-600 dark:hover:bg-gray-500 text-gray-900 dark:text-white font-bold py-2 px-4 rounded mr-2 transition-colors"
            onClick={onClose}
          >
            Cancel
          </button>
          <button
            className="bg-red-500 hover:bg-red-600 dark:bg-red-600 dark:hover:bg-red-700 text-white font-bold py-2 px-4 rounded transition-colors"
            onClick={handleReject}
          >
            Confirm Reject
          </button>
        </div>
      </div>
    </div>
  );
};

export default RejectPopup;
