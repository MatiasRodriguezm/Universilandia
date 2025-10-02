interface TitleProps {
  title: string;
  subtitle: string;
}

export default function Title({ title, subtitle }: TitleProps) {
  return (
    <div className="flex flex-col items-center mb-6">
      <div className="bg-[#EEE6E0] w-[300px] h-[120px] rounded-lg flex justify-center items-center mb-4">
        <h1 className="font-bold text-[50px]">{title}</h1>
      </div>
      <h2 className="font-semibold text-3xl">{subtitle}</h2>
    </div>
  );
}
