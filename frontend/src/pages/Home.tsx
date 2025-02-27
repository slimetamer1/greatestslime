import { useState, useEffect } from "react";
import api, { getCurrentUser }  from "../api";
import NoteLists from "@/components/body/NoteLists";
import Headers from "@/components/header/Headers";
import NoteModal from "@/components/ux/NoteModal";
import SideBar from "@/components/header/SideBar";

interface NoteType {
    id: number;
    content: string;
    bg_color?: string;
    created_at: string;
}

function Home(): JSX.Element {
    const [notes, setNotes] = useState<NoteType[]>([]);
    const [modalMessage, setModalMessage] = useState<string>("");
    const [showModal, setShowModal] = useState<boolean>(false);
    const [showSidebar, setShowSidebar] = useState<boolean>(false);
    const [username, setUsername] = useState<string>("");

    useEffect(() => {
        getNotes();
        fetchUsername();
    }, []);

    const getNotes = async (): Promise<void> => {
        try {
            const response = await api.get("/api/notes/");
            setNotes(response.data);
        } catch (err) {
            showModalMessage("Failed to fetch notes");
        }
    };

    const fetchUsername = async (): Promise<void> => {
        const user = await getCurrentUser();
        if (user) {
            console.log("Username fetched:", user.username);
            setUsername(user.username);
        } else {
            console.error("Failed to fetch username");
            showModalMessage("Failed to fetch username");
        }
    };


    const deleteNote = async (id: number): Promise<void> => {
        const noteElement = document.getElementById(`note-${id}`);
        if (noteElement) {
            noteElement.classList.add("motion-opacity-out-[0%]"); 
        }

        try {
            const response = await api.delete(`/api/notes/delete/${id}/`);
            if (response.status !== 204) {
                showModalMessage("Failed to Delete Note.");
            }
            getNotes();
        } catch (error) {
            showModalMessage("Error: " + (error as Error).message);
        }
    };

    const showModalMessage = (message: string): void => {
        setModalMessage(message);
        setShowModal(true);
        setTimeout(() => {
            setShowModal(false);
        }, 3000);
    };

    return (
        <div className="relative">
            <Headers toggleSidebar={() => setShowSidebar(!showSidebar)} />
            <SideBar closeSidebar={() => setShowSidebar(false)} isVisible={showSidebar} username={username}/>
            <div className="transition-all duration-300">
                <NoteLists 
                    notes={notes} 
                    setNotes={setNotes} 
                    deleteNote={deleteNote} 
                    showModalMessage={showModalMessage} 
                />
                {showModal && <NoteModal message={modalMessage} setShowModal={setShowModal} />}
            </div>
        </div>
    );
}

export default Home;