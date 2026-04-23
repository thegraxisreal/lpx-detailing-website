'use client';

import Image from 'next/image';
import { useEffect, useState } from 'react';
import {
  ArrowLeft,
  ArrowRight,
  Car,
  Check,
  Clock3,
  Mail,
  MapPin,
  Phone,
  Sparkles,
  Truck,
  X
} from 'lucide-react';

type BrandId = 'toyota' | 'ford' | 'honda' | 'chevrolet' | 'bmw' | 'other';
type SizeId = 'small' | 'midsize' | 'large';
type ServiceId = 'basic' | 'full' | 'exterior' | 'interior';
type AddOnId = 'engine-bay' | 'wax';
type ConditionId = 'light' | 'moderate' | 'heavy';

interface EstimateWizardProps {
  open: boolean;
  onClose: () => void;
}

interface EstimateDraft {
  brand: BrandId | '';
  model: string;
  size: SizeId | '';
  service: ServiceId | '';
  addons: AddOnId[];
  condition: ConditionId | '';
}

interface BookingDraft {
  fullName: string;
  phone: string;
  email: string;
  preferredDate: string;
  location: string;
  notes: string;
}

interface BookingResponse {
  success: boolean;
  error?: string;
  id?: string | null;
}

export interface EstimateResult {
  brandLabel: string;
  model: string;
  vehicleSizeLabel: string;
  serviceLabel: string;
  serviceId: ServiceId;
  addonsLabels: string[];
  conditionLabel: string;
  estimateMin: number;
  estimateMax: number;
  estimatedTime: string;
}

interface BrandOption {
  id: BrandId;
  label: string;
  logoUrl?: string;
  models: string[];
}

interface ServiceOption {
  id: ServiceId;
  title: string;
  badge?: string;
  description: string;
  bullets: string[];
  estimatedTime: string;
  baseMin: number;
  baseMax: number;
  premium?: boolean;
}

interface AddOnOption {
  id: AddOnId;
  label: string;
  price: number;
  imageSrc: string;
}

interface ConditionOption {
  id: ConditionId;
  label: string;
  adjustment: number;
  imageSrc: string;
}

const brandOptions: BrandOption[] = [
  {
    id: 'toyota',
    label: 'Toyota',
    logoUrl: 'https://cdn.simpleicons.org/toyota/ffffff',
    models: ['Camry', 'Corolla', 'RAV4', 'Other']
  },
  {
    id: 'ford',
    label: 'Ford',
    logoUrl: 'https://cdn.simpleicons.org/ford/ffffff',
    models: ['F-150', 'Explorer', 'Escape', 'Other']
  },
  {
    id: 'honda',
    label: 'Honda',
    logoUrl: 'https://cdn.simpleicons.org/honda/ffffff',
    models: ['Civic', 'Accord', 'CR-V', 'Other']
  },
  {
    id: 'chevrolet',
    label: 'Chevrolet',
    logoUrl: 'https://cdn.simpleicons.org/chevrolet/ffffff',
    models: ['Silverado 1500', 'Equinox', 'Malibu', 'Other']
  },
  {
    id: 'bmw',
    label: 'BMW',
    logoUrl: 'https://cdn.simpleicons.org/bmw/ffffff',
    models: ['3 Series', 'X3', 'X5', 'Other']
  },
  {
    id: 'other',
    label: 'Other',
    models: ['Sedan', 'SUV', 'Truck', 'Other']
  }
];

const sizeOptions = [
  {
    id: 'small' as const,
    label: 'Small car / sedan',
    adjustment: 0,
    icon: Car
  },
  {
    id: 'midsize' as const,
    label: 'Midsize SUV / crossover',
    adjustment: 10,
    icon: Car
  },
  {
    id: 'large' as const,
    label: 'Large SUV / truck',
    adjustment: 20,
    icon: Truck
  }
];

const serviceOptions: ServiceOption[] = [
  {
    id: 'basic',
    title: 'Basic Detail',
    description: 'A fast refresh for vehicles that need a clean reset.',
    bullets: ['Exterior wash', 'Window cleaning', 'Interior vacuum', 'Interior panel wipe-down'],
    estimatedTime: 'About 1.5 hours',
    baseMin: 40,
    baseMax: 60
  },
  {
    id: 'full',
    title: 'Full Detail',
    badge: 'Most Popular',
    description: 'The premium LPX package for the most complete finish.',
    bullets: [
      'Everything in Basic Detail',
      'Tire shine',
      'Deep, careful wash with higher attention to detail',
      'Extra finishing pass throughout'
    ],
    estimatedTime: 'About 3 hours',
    baseMin: 90,
    baseMax: 120,
    premium: true
  },
  {
    id: 'exterior',
    title: 'Exterior Detail',
    description: 'Exterior-first care with a polished finish.',
    bullets: ['Foam cannon wash', 'Extra attention to exterior', 'Tire shine', 'Window cleaning'],
    estimatedTime: 'About 1 hour',
    baseMin: 50,
    baseMax: 60
  },
  {
    id: 'interior',
    title: 'Interior Detail',
    description: 'A deeper interior clean for daily-use buildup.',
    bullets: ['Deep interior cleaning', 'Vacuuming', 'Interior surface wipe-down', 'Interior cleaner throughout'],
    estimatedTime: 'About 2 hours',
    baseMin: 65,
    baseMax: 75
  }
];

const addOnOptions: AddOnOption[] = [
  {
    id: 'engine-bay',
    label: 'Engine Bay Cleanup',
    price: 20,
    imageSrc: '/estimate-icons/engine-bay-cleanup.png'
  },
  {
    id: 'wax',
    label: 'Wax',
    price: 25,
    imageSrc: '/estimate-icons/wax.png'
  }
];

const conditionOptions: ConditionOption[] = [
  {
    id: 'light',
    label: 'Light cleanup needed',
    adjustment: 0,
    imageSrc: '/estimate-icons/condition-light.png'
  },
  {
    id: 'moderate',
    label: 'Moderate dirt / normal use',
    adjustment: 10,
    imageSrc: '/estimate-icons/condition-moderate.png'
  },
  {
    id: 'heavy',
    label: 'Heavy dirt / deep cleanup needed',
    adjustment: 20,
    imageSrc: '/estimate-icons/condition-heavy.png'
  }
];

const initialDraft: EstimateDraft = {
  brand: '',
  model: '',
  size: '',
  service: '',
  addons: [],
  condition: ''
};

const initialBookingDraft: BookingDraft = {
  fullName: '',
  phone: '',
  email: '',
  preferredDate: '',
  location: '',
  notes: ''
};

const stepLabels = ['Brand', 'Model', 'Size', 'Service', 'Add-ons', 'Condition'];

function getBrandOption(brandId: BrandId | '') {
  return brandOptions.find((option) => option.id === brandId);
}

function getServiceOption(serviceId: ServiceId | '') {
  return serviceOptions.find((option) => option.id === serviceId);
}

function getConditionOption(conditionId: ConditionId | '') {
  return conditionOptions.find((option) => option.id === conditionId);
}

function getSizeOption(sizeId: SizeId | '') {
  return sizeOptions.find((option) => option.id === sizeId);
}

function getAddOnLabel(addonId: AddOnId) {
  return addOnOptions.find((option) => option.id === addonId)?.label ?? addonId;
}

function formatCurrency(value: number) {
  return `$${value}`;
}

function buildEstimate(draft: EstimateDraft): EstimateResult | null {
  if (!draft.brand || !draft.model || !draft.size || !draft.service || !draft.condition) {
    return null;
  }

  const brand = getBrandOption(draft.brand);
  const size = getSizeOption(draft.size);
  const service = getServiceOption(draft.service);
  const condition = getConditionOption(draft.condition);

  if (!brand || !size || !service || !condition) {
    return null;
  }

  const addOnTotal = draft.addons.reduce((total, addonId) => {
    const addon = addOnOptions.find((option) => option.id === addonId);
    return total + (addon?.price ?? 0);
  }, 0);

  const adjustmentTotal = size.adjustment + condition.adjustment + addOnTotal;

  return {
    brandLabel: brand.label,
    model: draft.model,
    vehicleSizeLabel: size.label,
    serviceLabel: service.title,
    serviceId: service.id,
    addonsLabels: draft.addons.map(getAddOnLabel),
    conditionLabel: condition.label,
    estimateMin: service.baseMin + adjustmentTotal,
    estimateMax: service.baseMax + adjustmentTotal,
    estimatedTime: service.estimatedTime
  };
}

function isStepComplete(step: number, draft: EstimateDraft) {
  if (step === 0) {
    return Boolean(draft.brand);
  }

  if (step === 1) {
    return Boolean(draft.model);
  }

  if (step === 2) {
    return Boolean(draft.size);
  }

  if (step === 3) {
    return Boolean(draft.service);
  }

  if (step === 4) {
    return true;
  }

  return Boolean(draft.condition);
}

export function EstimateWizard({ open, onClose }: EstimateWizardProps) {
  const [step, setStep] = useState(0);
  const [draft, setDraft] = useState<EstimateDraft>(initialDraft);
  const [bookingDraft, setBookingDraft] = useState<BookingDraft>(initialBookingDraft);
  const [showBookingForm, setShowBookingForm] = useState(false);
  const [submitState, setSubmitState] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [submitMessage, setSubmitMessage] = useState('');

  useEffect(() => {
    if (!open) {
      return undefined;
    }

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        onClose();
      }
    }

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [open, onClose]);

  const selectedBrand = getBrandOption(draft.brand);
  const selectedService = getServiceOption(draft.service);
  const estimate = buildEstimate(draft);
  const isResultStep = step === stepLabels.length;
  const progress = isResultStep || showBookingForm ? 100 : ((step + 1) / stepLabels.length) * 100;
  const canSendBooking = Boolean(bookingDraft.fullName && bookingDraft.phone && bookingDraft.email && estimate);

  if (!open) {
    return null;
  }

  function handleNext() {
    if (isResultStep || !isStepComplete(step, draft)) {
      return;
    }

    setStep((current) => current + 1);
  }

  function handleBack() {
    if (showBookingForm) {
      setShowBookingForm(false);
      return;
    }

    if (step === 0) {
      onClose();
      return;
    }

    setStep((current) => current - 1);
  }

  function handleRestart() {
    setDraft(initialDraft);
    setBookingDraft(initialBookingDraft);
    setStep(0);
    setShowBookingForm(false);
    setSubmitState('idle');
    setSubmitMessage('');
  }

  function toggleAddon(addonId: AddOnId) {
    setDraft((current) => {
      const hasAddon = current.addons.includes(addonId);

      return {
        ...current,
        addons: hasAddon ? current.addons.filter((id) => id !== addonId) : [...current.addons, addonId]
      };
    });
  }

  function updateBookingField(field: keyof BookingDraft, value: string) {
    setBookingDraft((current) => ({
      ...current,
      [field]: value
    }));
  }

  async function handleSendBookingRequest() {
    if (!estimate || !canSendBooking || submitState === 'loading') {
      return;
    }

    setSubmitState('loading');
    setSubmitMessage('');

    try {
      const response = await fetch('/api/bookings', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          fullName: bookingDraft.fullName.trim(),
          phone: bookingDraft.phone.trim(),
          email: bookingDraft.email.trim(),
          preferredDateTime: bookingDraft.preferredDate.trim(),
          location: bookingDraft.location.trim(),
          notes: bookingDraft.notes.trim(),
          brandLabel: estimate.brandLabel,
          model: estimate.model,
          vehicleSizeLabel: estimate.vehicleSizeLabel,
          serviceLabel: estimate.serviceLabel,
          addonsLabels: estimate.addonsLabels,
          conditionLabel: estimate.conditionLabel,
          estimateMin: estimate.estimateMin,
          estimateMax: estimate.estimateMax,
          estimatedTime: estimate.estimatedTime
        })
      });

      const result = (await response.json()) as BookingResponse;

      if (!response.ok || !result.success) {
        throw new Error(result.error || 'Unable to submit your booking right now.');
      }

      setSubmitState('success');
      setSubmitMessage('Booking request sent. LPX will reach out using the details you provided.');
    } catch (error) {
      setSubmitState('error');
      setSubmitMessage(
        error instanceof Error ? error.message : 'Unable to submit your booking right now.'
      );
    }
  }

  function renderCurrentStep() {
    if (showBookingForm && estimate) {
      if (submitState === 'success') {
        return (
          <div className="wizard-fade-in space-y-6">
            <div className="rounded-[1.75rem] border border-accent/30 bg-[#071120] p-6 shadow-[0_30px_80px_rgba(2,10,24,0.65)]">
              <p className="text-xs font-semibold uppercase tracking-[0.26em] text-accent/80">
                Booking Request Sent
              </p>
              <h3 className="mt-4 text-3xl font-semibold tracking-tight text-white sm:text-4xl">
                You&apos;re all set
              </h3>
              <p className="mt-3 max-w-2xl text-sm text-zinc-300 sm:text-base">{submitMessage}</p>
            </div>

            <div className="rounded-[1.5rem] border border-white/10 bg-white/[0.03] p-5">
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-zinc-400">Booking Summary</p>
              <div className="mt-4 grid gap-4 sm:grid-cols-2">
                <div>
                  <p className="text-sm text-zinc-500">Customer</p>
                  <p className="mt-1 text-lg font-medium text-white">{bookingDraft.fullName}</p>
                </div>
                <div>
                  <p className="text-sm text-zinc-500">Contact</p>
                  <p className="mt-1 text-lg font-medium text-white">{bookingDraft.phone}</p>
                </div>
                <div>
                  <p className="text-sm text-zinc-500">Vehicle</p>
                  <p className="mt-1 text-lg font-medium text-white">
                    {estimate.brandLabel} {estimate.model}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-zinc-500">Package</p>
                  <p className="mt-1 text-lg font-medium text-white">{estimate.serviceLabel}</p>
                </div>
              </div>
            </div>

            <div className="grid gap-3 sm:grid-cols-2">
              <button
                type="button"
                onClick={handleRestart}
                className="rounded-2xl bg-accent px-5 py-4 text-base font-semibold text-white shadow-glow transition hover:bg-blue-500"
              >
                Start New Estimate
              </button>
              <button
                type="button"
                onClick={onClose}
                className="rounded-2xl border border-white/12 bg-white/[0.03] px-5 py-4 text-base font-semibold text-white transition hover:border-white/20 hover:bg-white/[0.05]"
              >
                Close
              </button>
            </div>
          </div>
        );
      }

      return (
        <div className="wizard-fade-in space-y-6">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-accent/80">Booking Details</p>
            <h3 className="mt-3 text-3xl font-semibold tracking-tight text-white sm:text-4xl">
              Finish your booking request
            </h3>
            <p className="mt-3 max-w-2xl text-sm text-zinc-400 sm:text-base">
              Add your contact details and LPX can confirm the appointment from your estimate.
            </p>
          </div>

          <div className="rounded-[1.5rem] border border-accent/20 bg-accent/[0.08] p-4">
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-accent">Selected Service</p>
            <p className="mt-3 text-xl font-semibold text-white">
              {estimate.serviceLabel} for {estimate.brandLabel} {estimate.model}
            </p>
            <p className="mt-2 text-zinc-300">
              Estimate: ${estimate.estimateMin}-${estimate.estimateMax}
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <input
              type="text"
              placeholder="Full Name"
              value={bookingDraft.fullName}
              onChange={(event) => updateBookingField('fullName', event.target.value)}
              className="rounded-xl border border-white/10 bg-black/30 px-4 py-3 text-zinc-100 placeholder:text-zinc-500 focus:border-accent focus:outline-none"
            />
            <input
              type="text"
              placeholder="Phone Number"
              value={bookingDraft.phone}
              onChange={(event) => updateBookingField('phone', event.target.value)}
              className="rounded-xl border border-white/10 bg-black/30 px-4 py-3 text-zinc-100 placeholder:text-zinc-500 focus:border-accent focus:outline-none"
            />
            <input
              type="email"
              placeholder="Email Address"
              value={bookingDraft.email}
              onChange={(event) => updateBookingField('email', event.target.value)}
              className="rounded-xl border border-white/10 bg-black/30 px-4 py-3 text-zinc-100 placeholder:text-zinc-500 focus:border-accent focus:outline-none"
            />
            <input
              type="text"
              placeholder="Preferred Date & Time"
              value={bookingDraft.preferredDate}
              onChange={(event) => updateBookingField('preferredDate', event.target.value)}
              className="rounded-xl border border-white/10 bg-black/30 px-4 py-3 text-zinc-100 placeholder:text-zinc-500 focus:border-accent focus:outline-none"
            />
          </div>

          <input
            type="text"
            placeholder="Service Address or Area"
            value={bookingDraft.location}
            onChange={(event) => updateBookingField('location', event.target.value)}
            className="w-full rounded-xl border border-white/10 bg-black/30 px-4 py-3 text-zinc-100 placeholder:text-zinc-500 focus:border-accent focus:outline-none"
          />

          <textarea
            rows={4}
            placeholder="Anything else we should know?"
            value={bookingDraft.notes}
            onChange={(event) => updateBookingField('notes', event.target.value)}
            className="w-full rounded-xl border border-white/10 bg-black/30 px-4 py-3 text-zinc-100 placeholder:text-zinc-500 focus:border-accent focus:outline-none"
          />

          {submitState === 'error' ? (
            <div className="rounded-2xl border border-rose-500/30 bg-rose-500/10 px-4 py-3 text-sm text-rose-100">
              {submitMessage}
            </div>
          ) : null}

          <div className="grid gap-3 sm:grid-cols-2">
            <button
              type="button"
              onClick={handleSendBookingRequest}
              disabled={!canSendBooking || submitState === 'loading'}
              className="rounded-2xl bg-accent px-5 py-4 text-base font-semibold text-white shadow-glow transition hover:bg-blue-500 disabled:cursor-not-allowed disabled:opacity-40"
            >
              {submitState === 'loading' ? 'Sending Request...' : 'Submit Booking Request'}
            </button>
            <a
              href="tel:5185024630"
              className="rounded-2xl border border-white/12 bg-white/[0.03] px-5 py-4 text-center text-base font-semibold text-white transition hover:border-white/20 hover:bg-white/[0.05]"
            >
              Call Us Instead
            </a>
          </div>
        </div>
      );
    }

    if (isResultStep && estimate) {
      return (
        <div className="wizard-fade-in space-y-6">
          <div className="rounded-[1.75rem] border border-accent/30 bg-[#071120] p-6 shadow-[0_30px_80px_rgba(2,10,24,0.65)]">
            <p className="text-xs font-semibold uppercase tracking-[0.26em] text-accent/80">
              Estimate Ready
            </p>
            <div className="mt-4 flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
              <div>
                <h3 className="text-3xl font-semibold tracking-tight text-white sm:text-4xl">
                  Estimated Price: {formatCurrency(estimate.estimateMin)}-{formatCurrency(estimate.estimateMax)}
                </h3>
                <p className="mt-3 max-w-xl text-sm text-zinc-300 sm:text-base">
                  Final price depends on vehicle size, condition, and level of buildup.
                </p>
              </div>
              <div className="rounded-2xl border border-white/10 bg-black/20 px-4 py-3 text-sm text-zinc-200">
                {estimate.estimatedTime}
              </div>
            </div>
          </div>

          <div className="grid gap-4 lg:grid-cols-[1.1fr_0.9fr]">
            <div className="rounded-[1.6rem] border border-white/10 bg-white/[0.03] p-5">
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-zinc-400">Selections</p>
              <div className="mt-5 grid gap-4 sm:grid-cols-2">
                <div>
                  <p className="text-sm text-zinc-500">Vehicle</p>
                  <p className="mt-1 text-lg font-medium text-white">
                    {estimate.brandLabel} {estimate.model}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-zinc-500">Package</p>
                  <p className="mt-1 text-lg font-medium text-white">{estimate.serviceLabel}</p>
                </div>
                <div>
                  <p className="text-sm text-zinc-500">Size</p>
                  <p className="mt-1 text-lg font-medium text-white">{estimate.vehicleSizeLabel}</p>
                </div>
                <div>
                  <p className="text-sm text-zinc-500">Condition</p>
                  <p className="mt-1 text-lg font-medium text-white">{estimate.conditionLabel}</p>
                </div>
                <div className="sm:col-span-2">
                  <p className="text-sm text-zinc-500">Add-ons</p>
                  <p className="mt-1 text-lg font-medium text-white">
                    {estimate.addonsLabels.length > 0 ? estimate.addonsLabels.join(', ') : 'No add-ons'}
                  </p>
                </div>
              </div>
            </div>

            <div className="rounded-[1.6rem] border border-white/10 bg-white/[0.03] p-5">
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-zinc-400">LPX Mobile</p>
              <div className="mt-5 space-y-4 text-zinc-200">
                <p className="flex items-center gap-3">
                  <MapPin className="h-4 w-4 text-accent" />
                  LPX Mobile Detailing comes to your home, office, or parking spot.
                </p>
                <p className="flex items-center gap-3">
                  <Phone className="h-4 w-4 text-accent" />
                  <a href="tel:5185024630" className="transition hover:text-white">
                    518-502-4630
                  </a>
                </p>
                <p className="flex items-center gap-3">
                  <Mail className="h-4 w-4 text-accent" />
                  <a
                    href="mailto:lpxmobiledetailing@gmail.com"
                    className="break-all transition hover:text-white"
                  >
                    lpxmobiledetailing@gmail.com
                  </a>
                </p>
                <p className="text-sm text-zinc-400">TikTok: @lpxmobiledetailing</p>
              </div>
            </div>
          </div>

          <div className="grid gap-3 sm:grid-cols-2">
            <button
              type="button"
              onClick={() => setShowBookingForm(true)}
              className="rounded-2xl bg-accent px-5 py-4 text-base font-semibold text-white shadow-glow transition hover:bg-blue-500"
            >
              Continue to Booking
            </button>
            <button
              type="button"
              onClick={handleRestart}
              className="rounded-2xl border border-white/12 bg-white/[0.03] px-5 py-4 text-base font-semibold text-white transition hover:border-white/20 hover:bg-white/[0.05]"
            >
              Start Over
            </button>
            <a
              href="tel:5185024630"
              className="rounded-2xl border border-white/12 bg-white/[0.03] px-5 py-4 text-center text-base font-semibold text-white transition hover:border-white/20 hover:bg-white/[0.05]"
            >
              Call Us
            </a>
            <a
              href="mailto:lpxmobiledetailing@gmail.com"
              className="rounded-2xl border border-white/12 bg-white/[0.03] px-5 py-4 text-center text-base font-semibold text-white transition hover:border-white/20 hover:bg-white/[0.05]"
            >
              Email Us
            </a>
          </div>
        </div>
      );
    }

    if (step === 0) {
      return (
        <div className="wizard-fade-in space-y-6">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-accent/80">Step 1</p>
            <h3 className="mt-3 text-3xl font-semibold tracking-tight text-white sm:text-4xl">
              What brand of car do you have?
            </h3>
            <p className="mt-3 max-w-2xl text-sm text-zinc-400 sm:text-base">
              Choose the closest match to tailor the estimate flow.
            </p>
          </div>

          <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
            {brandOptions.map((brand) => {
              const selected = draft.brand === brand.id;

              return (
                <button
                  key={brand.id}
                  type="button"
                  onClick={() =>
                    setDraft((current) => ({
                      ...current,
                      brand: brand.id,
                      model: ''
                    }))
                  }
                  className={`group rounded-[1.5rem] border p-5 text-left transition duration-300 ${
                    selected
                      ? 'translate-y-[-1px] border-accent/60 bg-accent/[0.12] shadow-glow'
                      : 'border-white/10 bg-white/[0.03] hover:border-white/20 hover:bg-white/[0.05]'
                  }`}
                >
                  <div className="flex items-center justify-between gap-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-white/10 bg-black/25">
                      {brand.logoUrl ? (
                        <Image
                          src={brand.logoUrl}
                          alt={`${brand.label} logo`}
                          width={30}
                          height={30}
                          className="h-8 w-8 object-contain"
                          unoptimized
                        />
                      ) : (
                        <Car className="h-7 w-7 text-zinc-100" />
                      )}
                    </div>
                    {selected ? <Check className="h-5 w-5 text-accent" /> : null}
                  </div>
                  <p className="mt-6 text-xl font-semibold text-white">{brand.label}</p>
                </button>
              );
            })}
          </div>
        </div>
      );
    }

    if (step === 1 && selectedBrand) {
      const prompt =
        selectedBrand.id === 'other'
          ? 'What type of vehicle do you have?'
          : `What type of ${selectedBrand.label} do you have?`;

      return (
        <div className="wizard-fade-in space-y-6">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-accent/80">Step 2</p>
            <h3 className="mt-3 text-3xl font-semibold tracking-tight text-white sm:text-4xl">{prompt}</h3>
            <p className="mt-3 max-w-2xl text-sm text-zinc-400 sm:text-base">
              Select the closest fit so pricing can stay realistic.
            </p>
          </div>

          <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
            {selectedBrand.models.map((model) => {
              const selected = draft.model === model;

              return (
                <button
                  key={model}
                  type="button"
                  onClick={() => setDraft((current) => ({ ...current, model }))}
                  className={`rounded-[1.5rem] border p-5 text-left transition duration-300 ${
                    selected
                      ? 'translate-y-[-1px] border-accent/60 bg-accent/[0.12] shadow-glow'
                      : 'border-white/10 bg-white/[0.03] hover:border-white/20 hover:bg-white/[0.05]'
                  }`}
                >
                  <p className="text-lg font-semibold text-white">{model}</p>
                </button>
              );
            })}
          </div>
        </div>
      );
    }

    if (step === 2) {
      return (
        <div className="wizard-fade-in space-y-6">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-accent/80">Step 3</p>
            <h3 className="mt-3 text-3xl font-semibold tracking-tight text-white sm:text-4xl">
              What size is your vehicle?
            </h3>
            <p className="mt-3 max-w-2xl text-sm text-zinc-400 sm:text-base">
              Vehicle size affects time on site and pricing.
            </p>
          </div>

          <div className="grid gap-3 lg:grid-cols-3">
            {sizeOptions.map(({ id, label, icon: Icon, adjustment }) => {
              const selected = draft.size === id;

              return (
                <button
                  key={id}
                  type="button"
                  onClick={() => setDraft((current) => ({ ...current, size: id }))}
                  className={`rounded-[1.6rem] border p-5 text-left transition duration-300 ${
                    selected
                      ? 'translate-y-[-1px] border-accent/60 bg-accent/[0.12] shadow-glow'
                      : 'border-white/10 bg-white/[0.03] hover:border-white/20 hover:bg-white/[0.05]'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="rounded-2xl border border-white/10 bg-black/25 p-3">
                      <Icon className="h-7 w-7 text-zinc-100" />
                    </div>
                    <span className="text-sm font-medium text-zinc-400">+{formatCurrency(adjustment)}</span>
                  </div>
                  <p className="mt-5 text-xl font-semibold text-white">{label}</p>
                </button>
              );
            })}
          </div>
        </div>
      );
    }

    if (step === 3) {
      return (
        <div className="wizard-fade-in space-y-6">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-accent/80">Step 4</p>
            <h3 className="mt-3 text-3xl font-semibold tracking-tight text-white sm:text-4xl">
              How much do you want detailed?
            </h3>
            <p className="mt-3 max-w-2xl text-sm text-zinc-400 sm:text-base">
              Choose the level of service you want. Full Detail is the premium LPX package.
            </p>
          </div>

          <div className="grid gap-4 xl:grid-cols-2">
            {serviceOptions.map((service) => {
              const selected = draft.service === service.id;

              return (
                <button
                  key={service.id}
                  type="button"
                  onClick={() => setDraft((current) => ({ ...current, service: service.id }))}
                  className={`rounded-[1.7rem] border p-6 text-left transition duration-300 ${
                    selected
                      ? 'translate-y-[-1px] border-accent/60 bg-accent/[0.12] shadow-glow'
                      : service.premium
                        ? 'border-accent/30 bg-[#071120] hover:border-accent/50'
                        : 'border-white/10 bg-white/[0.03] hover:border-white/20 hover:bg-white/[0.05]'
                  }`}
                >
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      {service.badge ? (
                        <span className="inline-flex rounded-full border border-accent/30 bg-accent/[0.10] px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-accent">
                          {service.badge}
                        </span>
                      ) : null}
                      <h4 className="mt-3 text-2xl font-semibold text-white">{service.title}</h4>
                      <p className="mt-2 text-sm text-zinc-400">{service.description}</p>
                    </div>
                    <span className="rounded-full border border-white/10 bg-black/20 px-3 py-2 text-sm font-medium text-zinc-100">
                      {formatCurrency(service.baseMin)}-{formatCurrency(service.baseMax)}
                    </span>
                  </div>
                  <ul className="mt-6 space-y-3 border-t border-white/10 pt-5">
                    {service.bullets.map((bullet) => (
                      <li key={bullet} className="flex items-start gap-3 text-sm text-zinc-200">
                        <Check className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
                        <span>{bullet}</span>
                      </li>
                    ))}
                  </ul>
                  <div className="mt-6 flex items-center justify-between text-sm text-zinc-400">
                    <span className="flex items-center gap-2">
                      <Clock3 className="h-4 w-4 text-accent" />
                      {service.estimatedTime}
                    </span>
                    {selected ? <span className="font-medium text-white">Selected</span> : null}
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      );
    }

    if (step === 4) {
      return (
        <div className="wizard-fade-in space-y-6">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-accent/80">Step 5</p>
            <h3 className="mt-3 text-3xl font-semibold tracking-tight text-white sm:text-4xl">Any add-ons?</h3>
            <p className="mt-3 max-w-2xl text-sm text-zinc-400 sm:text-base">
              Add finishing services to round out the detail.
            </p>
          </div>

          <div className="grid gap-3 md:grid-cols-2">
            {addOnOptions.map((addon) => {
              const selected = draft.addons.includes(addon.id);

              return (
                <button
                  key={addon.id}
                  type="button"
                  onClick={() => toggleAddon(addon.id)}
                  className={`rounded-[1.5rem] border p-5 text-left transition duration-300 ${
                    selected
                      ? 'translate-y-[-1px] border-accent/60 bg-accent/[0.12] shadow-glow'
                      : 'border-white/10 bg-white/[0.03] hover:border-white/20 hover:bg-white/[0.05]'
                  }`}
                >
                  <div className="flex items-center gap-4">
                    <div className="relative h-[4.5rem] w-[4.5rem] shrink-0 overflow-hidden rounded-2xl border border-white/10 bg-black/20">
                      <Image
                        src={addon.imageSrc}
                        alt={addon.label}
                        fill
                        className="object-contain p-0.5"
                      />
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="text-xl font-semibold text-white">{addon.label}</p>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="text-sm font-medium text-zinc-400">+{formatCurrency(addon.price)}</span>
                      <span
                        className={`flex h-6 w-6 items-center justify-center rounded-full border ${
                          selected ? 'border-accent bg-accent text-white' : 'border-white/20 text-transparent'
                        }`}
                      >
                        <Check className="h-4 w-4" />
                      </span>
                    </div>
                  </div>
                </button>
              );
            })}

            {draft.addons.length === 0 ? (
              <button
                type="button"
                onClick={() => setDraft((current) => ({ ...current, addons: [] }))}
                className="rounded-[1.5rem] border border-accent/30 bg-accent/[0.08] p-5 text-left transition duration-300 hover:border-accent/50"
              >
                <p className="text-xl font-semibold text-white">No add-ons</p>
              </button>
            ) : null}
          </div>
        </div>
      );
    }

    return (
      <div className="wizard-fade-in space-y-6">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.24em] text-accent/80">Step 6</p>
          <h3 className="mt-3 text-3xl font-semibold tracking-tight text-white sm:text-4xl">
            How dirty is the vehicle?
          </h3>
          <p className="mt-3 max-w-2xl text-sm text-zinc-400 sm:text-base">
            This helps narrow the final estimate range before you book.
          </p>
        </div>

        <div className="rounded-[1.5rem] border border-white/10 bg-white/[0.03] p-4">
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-zinc-400">Summary</p>
          <div className="mt-4 flex flex-wrap gap-2">
            <span className="rounded-full border border-white/10 px-3 py-2 text-sm text-zinc-200">
              {selectedBrand?.label} {draft.model}
            </span>
            <span className="rounded-full border border-white/10 px-3 py-2 text-sm text-zinc-200">
              {getSizeOption(draft.size)?.label}
            </span>
            <span className="rounded-full border border-white/10 px-3 py-2 text-sm text-zinc-200">
              {selectedService?.title}
            </span>
            <span className="rounded-full border border-white/10 px-3 py-2 text-sm text-zinc-200">
              {draft.addons.length > 0 ? draft.addons.map(getAddOnLabel).join(', ') : 'No add-ons'}
            </span>
          </div>
        </div>

          <div className="grid gap-3">
            {conditionOptions.map((condition) => {
              const selected = draft.condition === condition.id;

              return (
              <button
                key={condition.id}
                type="button"
                onClick={() => setDraft((current) => ({ ...current, condition: condition.id }))}
                className={`rounded-[1.5rem] border p-5 text-left transition duration-300 ${
                  selected
                    ? 'translate-y-[-1px] border-accent/60 bg-accent/[0.12] shadow-glow'
                    : 'border-white/10 bg-white/[0.03] hover:border-white/20 hover:bg-white/[0.05]'
                }`}
              >
                <div className="flex items-center gap-4">
                  <div className="relative h-[4.5rem] w-[4.5rem] shrink-0 overflow-hidden rounded-2xl border border-white/10 bg-black/20">
                    <Image
                      src={condition.imageSrc}
                      alt={condition.label}
                      fill
                      className="object-contain p-0.5"
                    />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-xl font-semibold text-white">{condition.label}</p>
                  </div>
                  <span className="rounded-full border border-white/10 bg-black/20 px-3 py-2 text-sm font-medium text-zinc-100">
                    +{formatCurrency(condition.adjustment)}
                  </span>
                </div>
              </button>
            );
          })}
        </div>
      </div>
    );
  }

  return (
    <div
      className="fixed inset-0 z-[80] flex items-center justify-center bg-[#02060fcc]/90 px-3 py-3 sm:px-6"
      onClick={onClose}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="estimate-title"
        className="wizard-pop w-full max-w-5xl overflow-hidden rounded-[2rem] border border-white/10 bg-[#040913] shadow-[0_32px_90px_rgba(0,0,0,0.65)]"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="border-b border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.03),rgba(255,255,255,0))] px-5 py-5 sm:px-8">
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.26em] text-accent/80">Get Your Estimate</p>
              <h2 id="estimate-title" className="mt-3 text-2xl font-semibold tracking-tight text-white sm:text-3xl">
                A quick guided estimate for your vehicle
              </h2>
            </div>
            <button
              type="button"
              onClick={onClose}
              className="rounded-full border border-white/12 bg-white/[0.03] p-2 text-zinc-300 transition hover:border-white/20 hover:bg-white/[0.06] hover:text-white"
              aria-label="Close estimate wizard"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          <div className="mt-6">
            <div className="flex items-center justify-between text-xs font-medium uppercase tracking-[0.18em] text-zinc-500">
              <span>{showBookingForm ? 'Booking details' : isResultStep ? 'Estimate ready' : `Step ${step + 1} of ${stepLabels.length}`}</span>
              <span>{Math.round(progress)}%</span>
            </div>
            <div className="mt-3 h-1.5 rounded-full bg-white/10">
              <div
                className="h-full rounded-full bg-accent transition-all duration-500 ease-out"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>
        </div>

        <div className="max-h-[calc(100vh-9rem)] overflow-y-auto px-5 py-6 sm:px-8 sm:py-8">
          {renderCurrentStep()}
        </div>

        {!isResultStep && !showBookingForm ? (
          <div className="flex flex-col gap-3 border-t border-white/10 bg-black/20 px-5 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-8">
            <button
              type="button"
              onClick={handleBack}
              className="inline-flex items-center justify-center gap-2 rounded-2xl border border-white/12 bg-white/[0.03] px-5 py-3 text-sm font-semibold text-white transition hover:border-white/20 hover:bg-white/[0.05]"
            >
              <ArrowLeft className="h-4 w-4" />
              {step === 0 ? 'Close' : 'Back'}
            </button>
            <button
              type="button"
              onClick={handleNext}
              disabled={!isStepComplete(step, draft)}
              className="inline-flex items-center justify-center gap-2 rounded-2xl bg-accent px-5 py-3 text-sm font-semibold text-white shadow-glow transition hover:bg-blue-500 disabled:cursor-not-allowed disabled:opacity-40"
            >
              {step === stepLabels.length - 1 ? 'See Estimate' : 'Next'}
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        ) : null}
      </div>
    </div>
  );
}
