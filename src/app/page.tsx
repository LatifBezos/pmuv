import Header from "./components/Header";
import CreatorList from "./components/CreatorList";
import Footer from "./components/Footer";

export default function Home() {
  const shows = [
    { id: 1, name: "Afro Indie Radio", description: "The best indie music from Africa." },
    { id: 2, name: "Morning Jam", description: "Start your day with great music." },
  ];

  return (
    <div>
      <Header />
      <CreatorList />
      <Footer />
    </div>
  );
}
