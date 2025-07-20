export default function Footer() {
  return (
    <footer className="bg-orange-200 p-4 text-center">
      <p className="text-sm sm:text-base font-medium tracking-wide">
        © {new Date().getFullYear()} AI Recipe Generator. Crafted with 🍳 and ❤️
      </p>
    </footer>
  );
}
