interface ToggleButtonProps {
  message: string;
  onClick: () => void;
}

export default function ToggleButton({
  message = "Default Alert",
  onClick,
}: ToggleButtonProps) {
  return (
    <button
      className="bg-white py-2 px-3 relative shadow-[0_0_5px_2px_rgba(0,0,0,0.1)] w-fit overflow-hidden rounded-lg"
      onClick={onClick}
    >
      <h1 className="relative z-10 text-[#007AFF]">{message}</h1>
    </button>
  );
}
