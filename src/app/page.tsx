import AboutSection from "@/components/AboutSection";
import CallForAbstracts from "@/components/CallForAbstracts";
import EventScheduleTeaser from "@/components/EventScheduleTeaser";
import HeroSection from "@/components/HeroSection";
import KeyHighlights from "@/components/KeyHighlights";
import SponsorsPartnersSection from "@/components/SponsorsPartnersSection";
import TestimonialsSection from "@/components/TestimonialsSection";
import OrganizingCommittee from "@/components/OrganizingCommittee";
import CollegeInfo from "@/components/CollegeInfo";

export default function Home() {
  return (
    <div className="relative min-h-screen w-full">
      <div className="relative">
        <HeroSection />

        {/* Page sections with smooth transitions */}
        <div className="relative z-10">
          <div className="curved-divider bg-background h-16 sm:h-24 rounded-t-[50%]" />
          <AboutSection />

          <div className="relative">
            <div className="absolute inset-0 bg-accent-light pointer-events-none" />
            <KeyHighlights />
          </div>

          <CollegeInfo />

          {/* <OrganizingCommittee /> */}

          <CallForAbstracts />

          <div className="relative">
            <div className="absolute inset-0 bg-accent-dark pointer-events-none" />
            {/* <EventScheduleTeaser /> */}
          </div>

          {/* <SponsorsPartnersSection /> */}

          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#00FFCC]/5 pointer-events-none" />
            <TestimonialsSection />
          </div>
        </div>
      </div>
    </div>
  );
}
