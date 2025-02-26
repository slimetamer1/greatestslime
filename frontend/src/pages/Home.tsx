import { useState, useEffect } from "react";
import api from "../api";
import NoteLists from "@/components/body/NoteLists";
import Headers from "@/components/header/Headers";
import NoteModal from "@/components/ux/NoteModal";
import ThemeToggle from "@/components/ui/ThemeToggle";

interface NoteType {
    id: number;
    content: string;
    bg_color?: string;
    created_at: string;
}

function Home() {
    const [notes, setNotes] = useState<NoteType[]>([]);
    const [modalMessage, setModalMessage] = useState("");
    const [showModal, setShowModal] = useState(false);

    useEffect(() => {
        getNotes();
    }, []);

    const getNotes = () => {
        api.get("/api/notes/")
            .then((res) => setNotes(res.data))
            .catch((err) => alert(err));
    };

    const deleteNote = (id) => {
        const noteElement = document.getElementById(`note-${id}`);
        if (noteElement) {
            noteElement.classList.add("motion-opacity-out-[0%]"); // Apply fade-out animation
        }
        api
            .delete(`/api/notes/delete/${id}/`)
            .then((res) => {
                if (res.status != 204) {
                    showModalMessage("Failed to Delete Note.");
                }
                getNotes();
            })
            .catch((error) => showModalMessage(error.message));
    };

    const showModalMessage = (message: string) => {
        setModalMessage(message);
        setShowModal(true);
        setTimeout(() => {
            setShowModal(false);
        }, 3000);
    };

    return (
        <div>
            <Headers />
            <NoteLists notes={notes} setNotes={setNotes} deleteNote={deleteNote} showModalMessage={showModalMessage} />
            {showModal && <NoteModal message={modalMessage} setShowModal={setShowModal} />}
            
        </div>
    );
}

export default Home;
