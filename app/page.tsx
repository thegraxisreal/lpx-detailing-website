'use client';

import Image from 'next/image';
import { useState } from 'react';
import {
  CalendarCheck2,
  Car,
  Check,
  Clock3,
  ChevronRight,
  Mail,
  MapPin,
  MoveRight,
  Music2,
  Phone,
  ShieldCheck,
  Sparkles
} from 'lucide-react';
import { EstimateWizard } from '@/components/EstimateWizard';

const navLinks = [
  { label: 'Pricing', target: 'services' },
  { label: 'Why LPX', target: 'why-us' },
  { label: 'Add-ons', target: 'add-ons' },
  { label: 'Book', target: 'contact' }
] as const;

const features = [
  {
    icon: CalendarCheck2,
    title: 'Easy Booking',
    text: 'Book online in minutes.'
  },
  {
    icon: MapPin,
    title: 'Semi-Mobile Service',
    text: 'We travel throughout the 518 area in Upstate NY.'
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
    prices: [
      ['Small car', '$100'],
      ['SUV', '$120'],
      ['Large SUV or truck', '$150']
    ],
    bullets: ['Exterior wash', 'Window cleaning', 'Interior vacuum', 'Interior panel wipe-down']
  },
  {
    icon: Sparkles,
    title: 'Full Detail',
    prices: [
      ['Small car', '$240'],
      ['SUV', '$295'],
      ['Large SUV or truck', '$375']
    ],
    premium: true,
    bullets: ['Everything in Basic Detail', 'Tire shine', 'Deep, careful wash', 'Extra finishing detail']
  },
  {
    icon: Sparkles,
    title: 'Exterior Detail',
    prices: [
      ['Small car', '$90'],
      ['SUV', '$110'],
      ['Large SUV or truck', '$140']
    ],
    bullets: ['Foam cannon wash', 'Extra attention to exterior', 'Tire shine', 'Window cleaning']
  },
  {
    icon: Car,
    title: 'Interior Detail',
    prices: [
      ['Small car', '$175'],
      ['SUV', '$215'],
      ['Large SUV or truck', '$275']
    ],
    bullets: ['Deep interior cleaning', 'Vacuuming', 'Interior surface wipe-down', 'Interior cleaner throughout']
  }
];

export default function Home() {
  const [isEstimateOpen, setIsEstimateOpen] = useState(false);

  function scrollToSection(sectionId: string) {
    document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  function handleBookNow() {
    scrollToSection('contact');
  }

  return (
    <main className="min-h-screen bg-background text-white">
      <header className="sticky top-0 z-50 border-b border-white/10 bg-background/95 backdrop-blur">
        <nav className="section-container flex h-20 items-center justify-between gap-4">
          <button
            type="button"
            onClick={() => scrollToSection('home')}
            aria-label="Back to top"
            className="relative h-14 w-[11.5rem] shrink-0 transition hover:scale-[1.02] sm:w-[13.5rem] lg:w-[16rem]"
          >
            <Image
              src="/logo-header.png"
              alt="LPX Mobile Detailing logo"
              fill
              className="object-contain object-left"
              priority
            />
          </button>
          <ul className="hidden items-center gap-10 text-lg text-zinc-300 lg:flex">
            {navLinks.map((link) => (
              <li key={link.label}>
                <button
                  type="button"
                  onClick={() => scrollToSection(link.target)}
                  className="relative py-2 text-zinc-300 transition hover:text-white focus:outline-none focus-visible:text-white after:absolute after:inset-x-0 after:-bottom-0.5 after:h-px after:origin-left after:scale-x-0 after:bg-[#8eafff] after:transition-transform hover:after:scale-x-100"
                >
                  {link.label}
                </button>
              </li>
            ))}
          </ul>
          <button
            type="button"
            onClick={handleBookNow}
            className="rounded-lg bg-accent px-4 py-2 text-sm font-semibold text-white shadow-glow transition hover:bg-blue-500 sm:hidden"
          >
            Book Now
          </button>
          <div className="hidden items-center gap-3 sm:flex">
            <button
              type="button"
              onClick={() => setIsEstimateOpen(true)}
              className="rounded-lg border border-white/12 bg-white/[0.03] px-5 py-3 text-base font-semibold text-white transition hover:border-white/20 hover:bg-white/[0.06]"
            >
              Get Your Estimate
            </button>
            <button
              type="button"
              onClick={handleBookNow}
              className="rounded-lg bg-accent px-6 py-3 text-base font-semibold text-white shadow-glow transition hover:bg-blue-500"
            >
              Book Now
            </button>
          </div>
        </nav>
      </header>

      <section
        id="home"
        className="hero-background relative min-h-[calc(100svh-5rem)] overflow-hidden border-b border-white/10 bg-cover bg-no-repeat"
        style={{
          backgroundColor: '#000611',
          backgroundImage: "url('/hero.png')"
        }}
      >
        <div className="section-container relative z-10 flex min-h-[calc(100svh-5rem)] items-center py-16">
          <div className="max-w-2xl">
            <p className="mb-6 text-sm font-semibold tracking-[0.22em] text-[#8eafff]">LPX MOBILE DETAILING</p>
            <p className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/15 bg-black/25 px-4 py-2 text-sm font-semibold text-zinc-100 backdrop-blur">
              <MapPin className="h-4 w-4 text-accent" />
              Serving Upstate NY and the 518 area
            </p>
            <h1 className="max-w-xl text-5xl font-extrabold leading-[0.92] tracking-[-0.045em] sm:text-6xl lg:text-7xl">
              YOUR CAR, <span className="text-[#6f9bff]">REINTRODUCED.</span>
            </h1>
            <p className="mt-8 max-w-lg text-xl text-zinc-300">
              Semi-mobile detailing for drivers across the 518 area, with free online quotes plus photo or in-person estimates.
            </p>
            <div className="mt-10 flex flex-col gap-3 sm:flex-row">
              <button
                type="button"
                onClick={handleBookNow}
                className="rounded-xl bg-[linear-gradient(135deg,#1e5bff,#4b88ff)] px-7 py-4 text-xl font-semibold text-white shadow-[0_15px_35px_rgba(30,91,255,0.32)] transition hover:-translate-y-0.5 hover:shadow-[0_18px_42px_rgba(30,91,255,0.44)]"
              >
                Book Now
              </button>
              <button
                type="button"
                onClick={() => setIsEstimateOpen(true)}
                className="rounded-xl border border-white/20 bg-black/25 px-7 py-4 text-xl font-semibold text-white backdrop-blur transition hover:border-white/40 hover:bg-white/[0.08]"
              >
                Get Your Estimate
              </button>
            </div>
            <p className="mt-4 flex items-center gap-2 text-sm text-zinc-400">
              <MoveRight className="h-4 w-4 text-accent" />
              Guided in a few quick steps with pricing tailored to your vehicle.
            </p>
          </div>
        </div>
      </section>

      <section id="why-us" className="scroll-mt-24 border-b border-white/10 bg-[linear-gradient(180deg,rgba(30,91,255,0.055),transparent)] py-16">
        <div className="section-container">
          <div className="max-w-2xl">
            <p className="text-sm font-semibold tracking-[0.24em] text-[#8eafff]">WHY LPX</p>
            <h2 className="mt-3 text-4xl font-bold tracking-tight sm:text-5xl">DETAILING THAT FITS YOUR DAY.</h2>
            <p className="mt-4 text-lg text-zinc-300">
              Straightforward pricing, thoughtful care, and a semi-mobile service built around your schedule.
            </p>
          </div>
        </div>
        <div className="section-container mt-10 grid grid-cols-1 divide-y divide-white/10 border-y border-white/10 md:grid-cols-2 md:divide-x md:divide-y-0 lg:grid-cols-4">
          {features.map(({ icon: Icon, title, text }) => (
            <div key={title} className="flex flex-col items-center gap-3 px-8 py-9 text-center">
              <div className="rounded-2xl border border-accent/20 bg-accent/[0.08] p-3"><Icon className="h-7 w-7 text-[#8eafff]" /></div>
              <h3 className="text-3xl font-bold uppercase tracking-wide md:text-xl">{title}</h3>
              <p className="text-lg text-zinc-300 md:text-base">{text}</p>
            </div>
          ))}
        </div>
      </section>

      <section id="services" className="scroll-mt-24 border-b border-white/10 py-20">
        <div className="section-container">
          <p className="text-center text-sm font-semibold tracking-[0.24em] text-accent">OUR SERVICES</p>
          <h2 className="mt-3 text-center text-4xl font-bold tracking-tight sm:text-5xl">CHOOSE YOUR DETAIL</h2>

          <div className="mt-12 grid gap-4 lg:grid-cols-2">
            {services.map(({ icon: Icon, title, prices, bullets, premium }) => (
              <article
                key={title}
                className={`group rounded-[1.75rem] border p-7 transition duration-300 hover:-translate-y-1 hover:shadow-[0_22px_45px_rgba(0,0,0,0.34)] ${
                  premium ? 'border-accent/40 bg-[linear-gradient(145deg,#10213d,#071120)]' : 'border-border bg-[linear-gradient(145deg,rgba(18,29,44,0.95),rgba(8,13,23,0.95))] hover:border-white/20'
                }`}
              >
                {premium ? (
                  <span className="inline-flex rounded-full border border-accent/30 bg-accent/[0.10] px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-accent">
                    Premium Option
                  </span>
                ) : null}
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <div className="inline-flex rounded-2xl border border-white/10 bg-black/20 p-3"><Icon className="h-7 w-7 text-[#8eafff]" /></div>
                    <h3 className="mt-4 text-2xl font-bold tracking-tight">{title}</h3>
                  </div>
                  <p className="rounded-full border border-accent/20 bg-accent/[0.08] px-3 py-1 text-xs font-semibold uppercase tracking-[0.14em] text-[#8eafff]">Starting prices</p>
                </div>
                <dl className="mt-5 space-y-2 border-t border-white/10 pt-5 text-sm">
                  {prices.map(([vehicle, price]) => (
                    <div key={vehicle} className="flex items-baseline justify-between gap-4 text-zinc-300">
                      <dt>{vehicle}</dt>
                      <dd className="text-lg font-semibold text-white">{price}</dd>
                    </div>
                  ))}
                </dl>
                <ul className="mt-5 space-y-2 border-t border-white/10 pt-5 text-zinc-200">
                  {bullets.map((bullet) => (
                    <li key={bullet} className="flex items-start gap-3 text-base">
                      <Check className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
                      <span>{bullet}</span>
                    </li>
                  ))}
                </ul>
              </article>
            ))}
          </div>

          <div id="add-ons" className="scroll-mt-24 mt-14 grid gap-8 rounded-[2rem] border border-white/10 bg-[linear-gradient(120deg,rgba(30,91,255,0.11),rgba(255,255,255,0.02))] p-7 sm:p-10 lg:grid-cols-[0.9fr_1.1fr]">
            <div>
              <p className="text-sm font-semibold tracking-[0.24em] text-accent">ADD-ONS</p>
              <h3 className="mt-3 text-3xl font-bold tracking-tight">MORE FINISHING, MORE VALUE.</h3>
              <p className="mt-4 max-w-md text-zinc-300">
                Add any finishing touch to your service. Every add-on is discounted when you choose a Full Detail.
              </p>
            </div>
            <dl className="grid gap-x-8 gap-y-4 sm:grid-cols-2">
              {[
                ['Ceramic spray wax', '$25', '$15 with Full Detail'],
                ['Paint sealant / hydrophobic protection', '$35', '$25 with Full Detail'],
                ['Engine bay cleanup', '$40', '$30 with Full Detail'],
                ['Trim & plastic restorer', '$20-$30', 'Free with Full Detail'],
                ['Pet hair removal', '$30', '$20 with Full Detail']
              ].map(([name, standard, fullDetail]) => (
                <div key={name} className="border-b border-white/10 pb-4">
                  <dt className="font-semibold text-white">{name}</dt>
                  <dd className="mt-1 text-zinc-300">{standard}</dd>
                  <dd className="mt-1 text-sm font-medium text-accent">{fullDetail}</dd>
                </div>
              ))}
            </dl>
          </div>

          <div className="mt-8 grid gap-4 text-sm text-zinc-300 md:grid-cols-3">
            <p><span className="font-semibold text-white">Free estimates:</span> Send photos, meet us in person, or complete the free online estimate form. Once submitted, your quote request is sent to LPX by email.</p>
            <p><span className="font-semibold text-white">Mobile fee:</span> An approximately $20 mobile fee may apply, depending on location.</p>
            <p><span className="font-semibold text-white">Final price:</span> Confirmed after a photo or in-person estimate and may change slightly if issues such as stains or mold are found.</p>
          </div>
        </div>
      </section>

      <section id="contact" className="grid-overlay scroll-mt-24 py-20">
        <div className="section-container grid gap-10 lg:grid-cols-[1fr_1.2fr]">
          <div>
            <p className="text-sm font-semibold tracking-[0.24em] text-accent">BOOK YOUR DETAIL</p>
            <h2 className="mt-3 text-5xl font-bold leading-tight">READY WHEN YOU ARE</h2>
            <p className="mt-5 max-w-md text-xl text-zinc-300">
              Tell us about your vehicle and where you are in the 518. We&apos;ll confirm whether semi-mobile service is available for your location.
            </p>
            <div className="mt-10 space-y-6 text-lg text-zinc-200">
              <p className="flex items-center gap-3">
                <Phone className="h-5 w-5 text-accent" /> 518-502-4630
              </p>
              <p className="flex items-center gap-3">
                <Mail className="h-5 w-5 text-accent" /> lpxmobiledetailing@gmail.com
              </p>
              <p className="flex items-center gap-3">
                <MapPin className="h-5 w-5 text-accent" /> Semi-mobile service across Upstate NY&apos;s 518 area
              </p>
              <p className="flex items-center gap-3">
                <Music2 className="h-5 w-5 text-accent" /> TikTok: @lpxmobiledetailing
              </p>
            </div>
          </div>

          <div className="rounded-2xl border border-white/10 bg-panel/70 p-6 shadow-[0_18px_35px_rgba(0,0,0,0.35)] sm:p-8">
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-accent">Guided Booking</p>
            <h3 className="mt-3 text-3xl font-semibold text-white">Book through the estimate flow</h3>
            <p className="mt-4 max-w-md text-lg text-zinc-300">
              Start with the quiz, get your price range, then add your name, contact details, and preferred timing at the end.
            </p>
            <div className="mt-8 space-y-3 text-sm text-zinc-400">
              <p>1. Choose your vehicle and package</p>
              <p>2. Review your estimate</p>
              <p>3. Finish with your booking details</p>
            </div>
            <button
              type="button"
              onClick={() => setIsEstimateOpen(true)}
              className="mt-5 w-full rounded-lg bg-accent px-6 py-3 text-xl font-semibold text-white shadow-glow transition hover:bg-blue-500"
            >
              <span className="inline-flex items-center gap-2">
                Book Now
                <ChevronRight className="h-5 w-5" />
              </span>
            </button>
          </div>
        </div>
      </section>

      <footer className="border-t border-white/10 bg-black/35 py-8">
        <div className="section-container flex flex-col items-center justify-between gap-2 text-zinc-400 sm:flex-row">
          <p className="text-white">LPX Mobile Detailing</p>
          <p>© {new Date().getFullYear()} LPX Mobile Detailing. All rights reserved.</p>
        </div>
      </footer>

      <EstimateWizard
        open={isEstimateOpen}
        onClose={() => setIsEstimateOpen(false)}
      />
    </main>
  );
}
