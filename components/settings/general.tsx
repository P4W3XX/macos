import Image from "next/image";

export default function GeneralPage() {
  return (
    <div className=" w-full p-4">
      <div className=" bg-zinc-100 border items-center rounded-lg w-full flex flex-col justify-center mb-6 p-4">
        <Image
          src="/general.png"
          alt="General"
          width={800}
          height={800}
          className=" rounded-lg size-24"
        />
        <h1 className=" font-bold text-2xl my-1">General</h1>
        <p className=" text-black/50 font-medium max-w-[80%]">
          Manage your general system settings and preferences.
        </p>
      </div>
    </div>
  );
}
