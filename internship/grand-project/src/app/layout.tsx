import './globals.css';
import Navbar from '@/components/navbar';
import Footer from '@/components/footer';
export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}