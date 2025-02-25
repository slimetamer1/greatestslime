import { MdDelete } from "react-icons/md";
import { MdOutlineEdit } from "react-icons/md";
import { MdDeleteOutline } from "react-icons/md";
import { FaRegEdit } from "react-icons/fa";



const Notes = ({note, onDelete, onEdit}) => {
    const formattedDate = new Date(note.created_at).toLocaleDateString("en-US")
    
    return (
        <div className = {`flex flex-col justify-between ${note.bg_color || "bg-yellow-400"} m-3 p-3 rounded-lg min-h-[200px] text-center hover:scale-105 transition-transform duration-300 ease-out will-change-transform`}>
            <span className="pt-[55px]">{note.content} </span>
            
            <div className ='flex justify-between items-center '>
                <small>{formattedDate}</small>
                <div className="flex scale-110 "> 
                    <div className="hover:scale-150 transition-transform duration-300 ease-out will-change-transform" onClick={() => onEdit(note)}>
                        <MdOutlineEdit />
                    </div>
   
                    <div className="hover:scale-150 transition-transform duration-300 ease-out will-change-transform">
                        <MdDeleteOutline onClick={() => onDelete(note.id)}/>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Notes;