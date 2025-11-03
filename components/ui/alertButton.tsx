interface AlertButtonProps {
  message: string;
  onClick: () => void;
}

export default function AlertButton({
  message = "Default Alert",
  onClick,
}: AlertButtonProps) {
  return (
    <button
      className="bg-[#007AFF] py-2 px-3 relative w-fit shadow-[0_0_5px_2px_rgba(0,0,0,0.1)] overflow-hidden rounded-lg"
      onClick={onClick}
    >
      <h1 className="relative z-10 text-white">{message}</h1>
      <div className="absolute bg-linear-0 from-black/17 w-full h-full top-0 left-0" />
    </button>
  );
}
