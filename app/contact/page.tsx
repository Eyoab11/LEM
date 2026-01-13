import { Header } from '../../components/layout/Header';
import { Footer } from '../../components/layout/Footer';
import { ContactForm } from '../../components/sections/ContactForm';
import { FAQ } from '../../components/sections/FAQ';

export default function Contact() {
  return (
    <main>
      <Header />
      <ContactForm />
      <FAQ />
      <Footer />
    </main>
  );
}