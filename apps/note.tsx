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
      name: "Sample Note",
      lastEdited: "Yesterday 18:20",
      contents: "This is a sample note content.",
      isOpen: false,
    },
    {
      id: 2,
      name: "Another Note",
      lastEdited: "Today 09:15",
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
            ? { ...note, isOpen: true, name, contents }
            : { ...note, isOpen: false }
        )
      );
      setModal(true);
      setCurrentNoteId(index);
    }
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
      <div className=" w-full h-full bg-white p-4 border-none overflow-auto">
        {modal ? (
          <div>
            <div className="flex flex-row justify-between items-center">
              <input
                className="text-xl font-bold mb-3 p-1 border border-transparent focus:border-3 focus:border-gray-300 focus:outline-none"
                placeholder="Note name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                onMouseDown={(e) => e.stopPropagation()}
              />
            <button
              onClick={closeModal}
              className="font-medium mb-4 px-3 py-1 bg-white border-red-500 text-red-600 border-3 hover:text-white rounded hover:bg-red-600 cursor-pointer"
            >
              Close Note
            </button>
            </div>
            <textarea
              className="w-full h-[14rem] p-2 border-2 border-gray-200 focus:border-gray-300 rounded resize-none"
              placeholder="Start writing your note here..."
              value={contents}
              onChange={(e) => setContents(e.target.value)}
              onMouseDown={(e) => e.stopPropagation()}
            />
          </div>
        ) : (
          <>
            <h2 className=" text-2xl font-semibold mb-4">Your Notes</h2>
            <section className="gap-y-2 w-full">
              {notes.filter(f=>f.name.toLocaleLowerCase().includes(searchValue.toLowerCase())).map((note, index) => (
                <button
                  onClick={() => openModal(note.id)}
                  key={index}
                  className="flex flex-row justify-between w-full mb-2 p-4 border border-zinc-300 rounded-lg shadow-sm hover:shadow-md cursor-pointer"
                >
                  <h3 className="text-lg font-semibold ">{note.name}</h3>
                  <p className="text-xs">{note.lastEdited}</p>
                </button>
              ))}
            </section>
          </>
        )}
      </div>
    </AppHandler>
  );
}
