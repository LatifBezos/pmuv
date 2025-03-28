interface CircleAnimatedProps {
  className?: string;
}

export const CircleAnimated = ({ className }: CircleAnimatedProps) => {
  return (
    <div
      className={`relative h-3 w-3 xl:h-4 xl:w-4 inline-block mr-2 xl:mr-3 ${className}`}
    >
      <div className="absolute right-1/2 top-1/2 transform translate-x-1/2 -translate-y-1/2 bg-black w-full h-full rounded-full inline-block group-hover:h-1.5 group-hover:w-1.5 xl:group-hover:h-2 xl:group-hover:w-2 transition-all"></div>
      <div className="absolute right-1/2 top-1/2 transform translate-x-1/2 -translate-y-1/2 border rounded-full border-black w-3.5 h-3.5 xl:w-4 xl:h-4 opacity-0 group-hover:opacity-100 transition-opacity"></div>
      <div className="absolute right-1/2 top-1/2 transform translate-x-1/2 -translate-y-1/2 border rounded-full border-black w-5 h-5 xl:w-6 xl:h-6 opacity-0 group-hover:opacity-100 transition-opacity"></div>
    </div>
  );
};
