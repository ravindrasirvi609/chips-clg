import AboutSection from "@/components/AboutSection";
import CallForAbstracts from "@/components/CallForAbstracts";
import HeroSection from "@/components/HeroSection";
import KeyHighlights from "@/components/KeyHighlights";
import Link from "next/link";

export default function Home() {
  return (
    <div className="relative min-h-screen w-full">
      <div className="mesh-overlay" />
      <div className="relative z-10">
        <HeroSection />

        <div className="space-y-2">
          <AboutSection />
          <KeyHighlights />
          <CallForAbstracts />

          <section className="page-shell py-10 sm:py-12">
            <div className="modern-card p-7 sm:p-9">
              <p className="eyebrow">Registration and Participation</p>
              <h2 className="mt-4 text-3xl font-extrabold text-foreground sm:text-4xl">
                Join The Conference Community
              </h2>
              <p className="mt-4 max-w-3xl text-sm leading-7 text-muted-foreground sm:text-base">
                Delegates can participate in offline or online mode. Special
                offer: for every fifteen bulk registrations, one registration is
                complimentary (15+1). Accommodation support is available on
                request at additional cost.
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                <Link href="/registration" className="btn-primary">
                  View Registration Plans
                </Link>
                <Link href="/group-registration" className="btn-outline">
                  Group Registration
                </Link>
                <Link href="/contact" className="btn-outline">
                  Contact Coordination Team
                </Link>
              </div>
            </div>
          </section>

          <section className="page-shell py-8 sm:py-10">
            <div className="grid gap-4 md:grid-cols-3">
              <div className="modern-card">
                <h3 className="text-lg font-bold text-foreground">Travel and Stay</h3>
                <p className="mt-2 text-sm text-muted-foreground">
                  Participants are requested to arrange their own travel.
                  Hostel and hotel accommodation can be arranged upon request.
                </p>
              </div>
              <div className="modern-card">
                <h3 className="text-lg font-bold text-foreground">Refund Policy</h3>
                <p className="mt-2 text-sm text-muted-foreground">
                  No refund will be made. Replacement or transfer of
                  registration will not be entertained.
                </p>
              </div>
              <div className="modern-card">
                <h3 className="text-lg font-bold text-foreground">Conference Email</h3>
                <p className="mt-2 text-sm font-semibold text-foreground">
                  chipsabap2026@gmail.com
                </p>
                <p className="mt-1 text-sm text-muted-foreground">
                  For abstract, registration, accommodation and technical
                  queries.
                </p>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
