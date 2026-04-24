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
  { label: 'Home', target: 'home' },
  { label: 'Services', target: 'services' },
  { label: 'Why Us', target: 'why-us' },
  { label: 'Contact', target: 'contact' }
] as const;

const features = [
  {
    icon: CalendarCheck2,
    title: 'Easy Booking',
    text: 'Book online in minutes.'
  },
  {
    icon: MapPin,
    title: 'We Come To You',
    text: 'Serving the 518 area in Upstate NY.'
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
    bullets: ['Exterior wash', 'Window cleaning', 'Interior vacuum', 'Interior panel wipe-down']
  },
  {
    icon: Sparkles,
    title: 'Full Detail',
    price: '$90–$120',
    premium: true,
    bullets: ['Everything in Basic Detail', 'Tire shine', 'Deep, careful wash', 'Extra finishing detail']
  },
  {
    icon: Sparkles,
    title: 'Exterior Detail',
    price: '$50+',
    bullets: ['Foam cannon wash', 'Extra attention to exterior', 'Tire shine', 'Window cleaning']
  },
  {
    icon: Car,
    title: 'Interior Detail',
    price: '$65+',
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
          <div className="relative h-14 w-[11.5rem] shrink-0 sm:w-[13.5rem] lg:w-[16rem]">
            <Image
              src="/logo-header.png"
              alt="LPX Mobile Detailing logo"
              fill
              className="object-contain object-left"
              priority
            />
          </div>
          <ul className="hidden items-center gap-10 text-lg text-zinc-300 lg:flex">
            {navLinks.map((link) => (
              <li key={link.label}>
                <button
                  type="button"
                  onClick={() => scrollToSection(link.target)}
                  className="transition hover:text-white"
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
        <div className="hero-edge-mirror" aria-hidden="true" />
        <div className="section-container relative z-10 flex min-h-[calc(100svh-5rem)] items-center py-16">
          <div className="max-w-2xl">
            <p className="mb-6 text-sm font-semibold tracking-[0.22em] text-accent">PREMIUM MOBILE DETAILING</p>
            <p className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-4 py-2 text-sm font-semibold text-zinc-200">
              <MapPin className="h-4 w-4 text-accent" />
              Serving Upstate NY and the 518 area
            </p>
            <h1 className="max-w-xl text-5xl font-extrabold leading-[0.95] sm:text-6xl lg:text-7xl">
              WE BRING THE DETAILING <span className="text-accent">TO YOU.</span>
            </h1>
            <p className="mt-8 max-w-lg text-xl text-zinc-300">
              Mobile detailing deals for drivers across the 518 area.
            </p>
            <div className="mt-10 flex flex-col gap-3 sm:flex-row">
              <button
                type="button"
                onClick={handleBookNow}
                className="rounded-lg bg-accent px-7 py-4 text-xl font-semibold text-white shadow-glow transition hover:bg-blue-500"
              >
                Book Now
              </button>
              <button
                type="button"
                onClick={() => setIsEstimateOpen(true)}
                className="rounded-lg border border-white/12 bg-white/[0.03] px-7 py-4 text-xl font-semibold text-white transition hover:border-white/20 hover:bg-white/[0.06]"
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

      <section id="why-us" className="border-b border-white/10">
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

          <div className="mt-12 grid gap-4 lg:grid-cols-2">
            {services.map(({ icon: Icon, title, price, bullets, premium }) => (
              <article
                key={title}
                className={`rounded-2xl border p-6 shadow-[0_18px_35px_rgba(0,0,0,0.35)] ${
                  premium ? 'border-accent/30 bg-[#071120]' : 'border-border bg-panel/80'
                }`}
              >
                {premium ? (
                  <span className="inline-flex rounded-full border border-accent/30 bg-accent/[0.10] px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-accent">
                    Premium Option
                  </span>
                ) : null}
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <Icon className="h-9 w-9 text-accent" />
                    <h3 className="mt-4 text-2xl font-bold tracking-tight">{title}</h3>
                  </div>
                  <p className="text-2xl font-semibold text-accent">{price}</p>
                </div>
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
              Tell us about your vehicle and where you are in the 518. We&apos;ll take care of the rest.
            </p>
            <div className="mt-10 space-y-6 text-lg text-zinc-200">
              <p className="flex items-center gap-3">
                <Phone className="h-5 w-5 text-accent" /> 518-502-4630
              </p>
              <p className="flex items-center gap-3">
                <Mail className="h-5 w-5 text-accent" /> lpxmobiledetailing@gmail.com
              </p>
              <p className="flex items-center gap-3">
                <MapPin className="h-5 w-5 text-accent" /> Mobile service across Upstate NY&apos;s 518 area
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
