import { useState } from 'react';
import { Button } from "@/components/ui/button";
import api from "../../api";


const AddNote = ({setNotes, showModalMessage}) => {
    const [content, setContent] = useState("");

    const getNotes = () => {
        api
            .get("/api/notes/")
            .then((res) => res.data)
            .then((data) => {
                setNotes(data);
                console.log(data);
            })
            .catch((err) => showModalMessage("Error fetching notes: " + err.message));
    };
    const createNote = (e) => {
        e.preventDefault();
        api
            .post("/api/notes/", {content})
            .then((res) => {
                if (res.status === 201) {
                    getNotes();
                    setContent("");
                } else {
                    showModalMessage("Failed to Make Note.");
                }
                

            })
            .catch((err) => {
                showModalMessage("Error: " + err.message);
            });

    };


    return (
    <div className='flex flex-col justify-between bg-[#B3B3B3] m-3 p-3 rounded-lg min-h-[200px] text-center text motion-preset-expand motion-duration-1000 ' >
            <form onSubmit={createNote} >
                <textarea className='resize-none bg-inherit border-none outline-none text-center pt-[55px]'
                    id="content"
                    name="content"
                    rows='3'
                    placeholder='Type to add new todo....'
                    required
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                ></textarea>
                <div className ='flex flex-row-reverse justify-between items-center translate-y-[10px] '>
                    <div className='hover:scale-105 transition-transform duration-300 ease-out will-change-transform'>
                        <Button variant="default" value="Submit" className='bg-gray-400'>Note</Button>
                    </div>
                </div>
            </form>

    </div>
  )
}

export default AddNote