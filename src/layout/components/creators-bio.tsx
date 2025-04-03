interface CreatorBioProps {
  bio: string;
  color: string;
}
function CreatorBio ({ bio, color }: CreatorBioProps) {
  return (
    <div className="flex items-center w-full justify-center gap-2 px-4 py-2" style={{ backgroundColor: `${color}` }}>
        <p className="font-serif text-xl text-center text-white">
            {bio} 
        </p>
    </div>
  );
};

export {CreatorBio}