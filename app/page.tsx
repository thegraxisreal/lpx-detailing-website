import Image from 'next/image';
import {
  CalendarCheck2,
  Car,
  Check,
  Clock3,
  Mail,
  MapPin,
  Phone,
  ShieldCheck,
  Sparkles
} from 'lucide-react';

const navLinks = ['Home', 'Services', 'About', 'Why Us', 'Contact'];

const features = [
  {
    icon: CalendarCheck2,
    title: 'Easy Booking',
    text: 'Book online in minutes.'
  },
  {
    icon: MapPin,
    title: 'We Come To You',
    text: 'Home, office, or anywhere.'
  },
  {
    icon: ShieldCheck,
    title: 'Premium Quality',
    text: 'Top products. Expert techniques.'
  },
  {
    icon: Clock3,
    title: 'Save Time',
    text: 'Professional results without the hassle.'
  }
];

const services = [
  {
    icon: Car,
    title: 'Basic Detail',
    price: '$40–$60',
    bullets: ['Exterior wash', 'Window cleaner', 'Interior vacuum', 'Wipe down of inside panels']
  },
  {
    icon: Sparkles,
    title: 'Exterior Detail',
    price: 'About $50',
    bullets: ['Foam cannon', 'Extra attention to exterior', 'Tire shine', 'Window cleaner']
  },
  {
    icon: Car,
    title: 'Interior Detail',
    price: 'Around $65',
    bullets: ['Full deep clean inside', 'Vacuuming', 'Wipe down', 'Interior cleaner', 'Restores a like-new feel']
  }
];

export default function Home() {
  return (
    <main className="min-h-screen bg-background text-white">
      <header className="sticky top-0 z-50 border-b border-white/10 bg-background/95 backdrop-blur">
        <nav className="section-container flex h-20 items-center justify-between">
          <div>
            <p className="text-4xl font-black tracking-tight">LPX</p>
            <p className="-mt-1 text-xs tracking-[0.35em] text-muted">MOBILE DETAILING</p>
          </div>
          <ul className="hidden items-center gap-10 text-lg text-zinc-300 lg:flex">
            {navLinks.map((link) => (
              <li key={link} className="cursor-pointer transition hover:text-white">
                {link}
              </li>
            ))}
          </ul>
          <button className="rounded-lg bg-accent px-6 py-3 text-base font-semibold text-white shadow-glow transition hover:bg-blue-500">
            Book Now
          </button>
        </nav>
      </header>

      <section className="border-b border-white/10">
        <div className="section-container grid min-h-[620px] items-center gap-12 py-14 lg:grid-cols-[1fr_1.15fr]">
          <div>
            <p className="mb-6 text-sm font-semibold tracking-[0.22em] text-accent">PREMIUM MOBILE DETAILING</p>
            <h1 className="max-w-xl text-5xl font-extrabold leading-[0.95] sm:text-6xl lg:text-7xl">
              WE BRING THE DETAILING <span className="text-accent">TO YOU.</span>
            </h1>
            <p className="mt-8 max-w-lg text-xl text-zinc-300">
              Professional care. Premium products. Showroom results—at your location.
            </p>
            <button className="mt-10 rounded-lg bg-accent px-7 py-4 text-xl font-semibold text-white shadow-glow transition hover:bg-blue-500">
              Book Now
            </button>
          </div>
          <div className="relative min-h-[380px] overflow-hidden rounded-2xl border border-white/10 bg-zinc-900/40">
            <Image
              src="https://www.nicepng.com/png/detail/377-3779595_lamborghini-aventador-s-matte-black.png"
              alt="Black Lamborghini sports car"
              fill
              className="object-contain p-4 md:p-6"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-r from-background/60 via-background/20 to-transparent" />
          </div>
        </div>
      </section>

      <section className="border-b border-white/10">
        <div className="section-container grid grid-cols-1 divide-y divide-white/10 py-6 md:grid-cols-2 md:divide-x md:divide-y-0 lg:grid-cols-4">
          {features.map(({ icon: Icon, title, text }) => (
            <div key={title} className="flex flex-col items-center gap-4 px-8 py-10 text-center">
              <Icon className="h-10 w-10 text-accent" />
              <h3 className="text-3xl font-bold uppercase tracking-wide md:text-xl">{title}</h3>
              <p className="text-lg text-zinc-300 md:text-base">{text}</p>
            </div>
          ))}
        </div>
      </section>

      <section id="services" className="border-b border-white/10 py-20">
        <div className="section-container">
          <p className="text-center text-sm font-semibold tracking-[0.24em] text-accent">OUR SERVICES</p>
          <h2 className="mt-3 text-center text-4xl font-bold tracking-tight sm:text-5xl">CHOOSE YOUR DETAIL</h2>

          <div className="mt-14 grid gap-6 lg:grid-cols-3">
            {services.map(({ icon: Icon, title, price, bullets }) => (
              <article
                key={title}
                className="rounded-2xl border border-border bg-panel/80 p-8 shadow-[0_18px_35px_rgba(0,0,0,0.35)]"
              >
                <Icon className="h-11 w-11 text-accent" />
                <h3 className="mt-6 text-3xl font-bold tracking-tight">{title}</h3>
                <p className="mt-2 text-3xl font-semibold text-accent">{price}</p>
                <ul className="mt-8 space-y-3 border-t border-white/10 pt-7 text-zinc-200">
                  {bullets.map((bullet) => (
                    <li key={bullet} className="flex items-start gap-3 text-lg">
                      <Check className="mt-0.5 h-5 w-5 shrink-0 text-accent" />
                      <span>{bullet}</span>
                    </li>
                  ))}
                </ul>
              </article>
            ))}
          </div>

          <p className="mt-7 text-center text-zinc-400">
            Final price depends on vehicle size and condition.
          </p>
        </div>
      </section>

      <section id="contact" className="grid-overlay py-20">
        <div className="section-container grid gap-10 lg:grid-cols-[1fr_1.2fr]">
          <div>
            <p className="text-sm font-semibold tracking-[0.24em] text-accent">BOOK YOUR DETAIL</p>
            <h2 className="mt-3 text-5xl font-bold leading-tight">READY WHEN YOU ARE</h2>
            <p className="mt-5 max-w-md text-xl text-zinc-300">
              Tell us about your vehicle and location. We&apos;ll take care of the rest.
            </p>
            <div className="mt-10 space-y-6 text-lg text-zinc-200">
              <p className="flex items-center gap-3">
                <Phone className="h-5 w-5 text-accent" /> (555) 123-4567
              </p>
              <p className="flex items-center gap-3">
                <Mail className="h-5 w-5 text-accent" /> hello@lpxdetailing.com
              </p>
              <p className="flex items-center gap-3">
                <MapPin className="h-5 w-5 text-accent" /> Serving [Your City] and Surrounding Areas
              </p>
            </div>
          </div>

          <form className="rounded-2xl border border-white/10 bg-panel/70 p-6 shadow-[0_18px_35px_rgba(0,0,0,0.35)] sm:p-8">
            <div className="grid gap-4 sm:grid-cols-2">
              {['Full Name', 'Phone Number', 'Email Address', 'Vehicle Make & Model'].map((field) => (
                <input
                  key={field}
                  type="text"
                  placeholder={field}
                  className="rounded-lg border border-white/10 bg-black/30 px-4 py-3 text-zinc-100 placeholder:text-zinc-500 focus:border-accent focus:outline-none"
                />
              ))}
            </div>
            <input
              type="text"
              placeholder="Preferred Date & Time"
              className="mt-4 w-full rounded-lg border border-white/10 bg-black/30 px-4 py-3 text-zinc-100 placeholder:text-zinc-500 focus:border-accent focus:outline-none"
            />
            <textarea
              placeholder="Additional Details"
              rows={5}
              className="mt-4 w-full rounded-lg border border-white/10 bg-black/30 px-4 py-3 text-zinc-100 placeholder:text-zinc-500 focus:border-accent focus:outline-none"
            />
            <button className="mt-5 w-full rounded-lg bg-accent px-6 py-3 text-xl font-semibold text-white shadow-glow transition hover:bg-blue-500">
              Book Now
            </button>
          </form>
        </div>
      </section>

      <footer className="border-t border-white/10 bg-black/35 py-8">
        <div className="section-container flex flex-col items-center justify-between gap-2 text-zinc-400 sm:flex-row">
          <p className="text-white">LPX Mobile Detailing</p>
          <p>© {new Date().getFullYear()} LPX Mobile Detailing. All rights reserved.</p>
        </div>
      </footer>
    </main>
  );
}
