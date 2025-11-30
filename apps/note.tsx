import AppHandler from "@/components/appHandler";
import { useAppStore } from "@/stores/appStore";
import { useState } from "react";

interface NoteAppProps {
  buttonPosition?: { x: number; y: number };
}

export default function NoteApp({ buttonPosition }: NoteAppProps) {
  const { apps, restoreApp, closeApp, minimizeApp } = useAppStore();
  const app = apps["Notes"];
  const [searchValue, setSearchValue] = useState("");
  const [notes, setNotes] = useState([
    {
      id: 1,
      name: "Jebać Smardza",
      lastEdited: "8.11.2023, 10:30",
      contents:
       ` ────────────────────██████──────────
──────────────────██▓▓▓▓▓▓██────────
────────────────██▓▓▓▓▒▒▒▒██────────
────────────────██▓▓▒▒▒▒▒▒██────────
──────────────██▓▓▓▓▒▒▒▒██──────────
──────────────██▓▓▒▒▒▒▒▒██──────────
────────────██▓▓▓▓▒▒▒▒▒▒██──────────
────────────████▒▒████▒▒██──────────
────────────██▓▓▒▒▒▒▒▒▒▒██──────────
──────────██────▒▒────▒▒██──────────
──────────████──▒▒██──▒▒██──────────
──────────██────▒▒────▒▒██──────────
──────────██▒▒▒▒▒▒▒▒▒▒▒▒██──────────
──────────████████████▒▒▒▒██────────
────────██▓▓▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒██──────
──────██▓▓▓▓▒▒▒▒▒▒▒▒▒▒▒▒▒▒▓▓▒▒██────
────██▓▓▓▓▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▓▓▒▒▒▒██──
──██▓▓▓▓▓▓▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▓▓▒▒▒▒██
██▓▓▒▒▓▓▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▓▓▒▒▒▒██
██▓▓▒▒▓▓▒▒▒▒▒▒▓▓▓▓▒▒▒▒▒▒▒▒▒▒▓▓▓▓▒▒██
██▓▓▓▓▓▓▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▓▓▓▓██
──████▐▌▓▓▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▐▌▐▌████──
────██▐▌▐▌▌▌▌▌▌▌▌▌▐▌▐▌▐▌▐▌▌▌▐▌██────
────██▌▌▐▌▐▌▌▌▐▌▌▌▌▌▐▌▌▌▌▌▌▌▌▌██────
──────██▌▌▐▌▐▌▐▌▐▌▐▌▐▌▐▌▌▌▌▌██──────
──────██▐▌▐▌▐▌████████▐▌▌▌▌▌██──────
────────██▒▒██────────██▒▒██────────
────────██████────────██████────────`,
isOpen:false,
    },
    {
      id: 2,
      name: "Another Note",
      lastEdited: "8.11.2024, 12:45",
      contents: "This is another sample note content.",
      isOpen: false,
    },
  ]);

  const [modal, setModal] = useState(false);
  const [name, setName] = useState("");
  const [contents, setContents] = useState("");
  const [currentNoteId, setCurrentNoteId] = useState<number | null>(null);

  const openModal = (index: number) => {
    const note = notes.find((note) => note.id === index);
    if (note) {
      setName(note.name);
      setContents(note.contents);
      setNotes((prevNotes) =>
        prevNotes.map((note) =>
          note.id === index
            ? {
                ...note,
                isOpen: true,
                name,
                contents,
                lastEdited:
                  new Date().toLocaleString().split(":")[0] +
                  ":" +
                  new Date().toLocaleString().split(":")[1],
              }
            : { ...note, isOpen: false }
        )
      );
      setModal(true);
      setCurrentNoteId(index);
    }
  };
  const newModal = () => {
    setName("");
    setContents("");
    setModal(true);
    setCurrentNoteId(notes.length + 2);
    setNotes((prevNotes) => [
      ...prevNotes,
      {
        id: notes.length + 2,
        name: "",
        lastEdited:
          new Date().toLocaleString().split(":")[0] +
          ":" +
          new Date().toLocaleString().split(":")[1],
        contents: "",
        isOpen: true,
      },
    ]);
  };
  const closeModal = () => {
    setModal(false);
    setName("");
    setContents("");
    setNotes((prevNotes) =>
      prevNotes.map((note) =>
        note.id === currentNoteId
          ? { ...note, isOpen: true, name, contents }
          : { ...note, isOpen: false }
      )
    );
    setCurrentNoteId(null);
  };
  const deleteNote = (id: number[]) => {
    setNotes((prevNotes) => prevNotes.filter((note) => !id.includes(note.id)));
  };
  const [isDeleting, setIsDeleting] = useState(false);
  const [selectedNotes, setSelectedNotes] = useState<number[]>([]);

  return (
    <AppHandler
      standardWidth={600}
      standardHeight={400}
      isOverLayed={false}
      navigateBarBGColor="bg-white"
      searchValue={searchValue}
      isSidebar={false}
      onSearchChange={setSearchValue}
      isSearchBar={true}
      buttonPosition={buttonPosition}
      isMinimized={app?.isMinimized || false}
      onRestore={() => restoreApp("Notes")}
      onClose={() => closeApp("Notes")}
      onMinimize={() => minimizeApp("Notes")}
      appName="Notes"
    >
      <div className=" w-full h-full bg-white p-4 border-none overflow-auto pb-24 hide-scrollbar">
        {modal ? (
            <div className="flex flex-col h-full">
            <div className="flex flex-row justify-between items-center flex-shrink-0">
              <input
              className="text-xl font-bold mb-3 p-1 border border-transparent focus:border-3 focus:border-gray-300 focus:outline-none"
              placeholder="Note name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              />
              <button
              onClick={closeModal}
              className="font-medium mb-4 px-3 py-1 bg-white border-red-500 text-red-600 border-3 hover:text-white rounded hover:bg-red-600 cursor-pointer"
              >
              Close Note
              </button>
            </div>
            <textarea
              className="w-full flex-1 p-2 border-2 border-gray-200 focus:border-gray-300 rounded resize-none"
              placeholder="Start writing your note here..."
              value={contents}
              onChange={(e) => setContents(e.target.value)}
              onMouseDown={(e) => e.stopPropagation()}
            />
            </div>
        ) : (
          <>
            <div className="flex flex-row items-center justify-between mb-4">
              <h2 className=" text-2xl font-semibold ">Your Notes</h2>
              <div className="flex flex-row gap-2">
                <button
                  className="bg-zinc-100 font-medium p-2 text-sm rounded-lg border-2 hover:bg-zinc-200 cursor-pointer"
                  onClick={() => newModal()}
                >
                  Add new
                </button>
                <button
                  className="bg-red-500 text-white font-medium p-2 text-sm rounded-lg border-2 border-red-500 hover:bg-red-400 cursor-pointer"
                  onClick={() => setIsDeleting(!isDeleting)}
                >
                  {isDeleting ? "Cancel" : "Delete"}
                </button>
              </div>
            </div>
            <section className="gap-y-2 w-full">
              {notes
                .filter((f) =>
                  f.name.toLocaleLowerCase().includes(searchValue.toLowerCase())
                )
                .map((note, index) => (
                  <button
                    onClick={() =>
                      isDeleting
                        ? setSelectedNotes((prev) =>
                            prev.includes(note.id)
                              ? prev.filter((id) => id !== note.id)
                              : [...prev, note.id]
                          )
                        : openModal(note.id)
                    }
                    key={index}
                    className="flex flex-row justify-between w-full mb-2 p-4 border border-zinc-300 rounded-lg shadow-sm hover:shadow-md cursor-pointer"
                  >
                    <h3 className="text-lg font-semibold ">{note.name}</h3>
                    <div className="flex flex-row items-center gap-4">
                      <p className="text-xs">{note.lastEdited}</p>
                      <input
                        type="checkbox"
                        className={`w-4 h-4 ${isDeleting ? "block" : "hidden"}`}
                        checked={selectedNotes.includes(note.id)}
                        readOnly
                      />
                    </div>
                  </button>
                ))}
              {isDeleting && (
                <div className="flex flex-row justify-end mt-4">
                  <button
                    className=" bg-white text-red-500 font-medium p-2 text-sm rounded-lg border-2 border-red-500 hover:bg-gray-100 cursor-pointer"
                    onClick={() => {
                      deleteNote(selectedNotes);
                      setIsDeleting(false);
                      setSelectedNotes([]);
                    }}
                  >
                    Delete Selected Notes
                  </button>
                </div>
              )}
            </section>
          </>
        )}
      </div>
    </AppHandler>
  );
}
