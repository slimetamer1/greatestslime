import React, { useEffect } from 'react';

const NoteModal = ({ message, setShowModal }) => {
    useEffect(() => {
        const timer = setTimeout(() => {
            setShowModal(false);
        }, 1000);

        return () => clearTimeout(timer);
    }, [setShowModal]);

    return (
        <div className="fixed inset-0 flex items-center justify-center z-50 ">
            <div className="bg-white bg-opacity-25 border border-gray-300 p-2 rounded-lg text-center">
                <p className="  text-gray-700">{message}</p>
            </div>
        </div>
    );
};

export default NoteModal;