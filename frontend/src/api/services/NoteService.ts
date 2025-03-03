import api from "@/api/api";

export const getNotes = async (): Promise<any> => {
  try {
    const response = await api.get("/api/notes/");
    return response.data;
  } catch (error) {
    throw new Error("Failed to fetch notes");
  }
};

export const deleteNote = async (id: number): Promise<void> => {
  try {
    const response = await api.delete(`/api/notes/delete/${id}/`);
    if (response.status !== 204) {
      throw new Error("Failed to delete note");
    }
  } catch (error) {
    throw new Error("Failed to delete note");
  }
};