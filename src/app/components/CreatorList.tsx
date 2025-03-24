export default function CreatorList() {
    return (
      <section className="p-8 h-screen">
        <h2 className="text-2xl font-bold mb-4">Featured Shows</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <div  className="bg-gray-800 p-4 rounded-md">
              <h3 className="text-lg font-semibold">name</h3>
              <p>description</p>
            </div>
        </div>
      </section>
    );
  }
  