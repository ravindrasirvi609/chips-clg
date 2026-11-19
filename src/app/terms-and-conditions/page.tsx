import PolicyPage, { type PolicySection } from "@/components/PolicyPage";

const sections: PolicySection[] = [
  {
    title: "Using this website",
    content: (
      <p>
        By using this website, you agree to use it lawfully and to provide
        accurate information when registering, submitting an abstract, or
        contacting the conference team. Do not use the site to disrupt its
        services or submit content you do not have permission to share.
      </p>
    ),
  },
  {
    title: "Registration and payment",
    content: (
      <p>
        Complete registration using the applicable individual or group
        registration process. Individual registrations require successful
        payment through the conference payment gateway. For group registrations,
        follow the payment instructions provided after review. Fees are
        non-refundable after payment, and registrations cannot be replaced or
        transferred. Group benefits and payment instructions are subject to the
        information on the Group Registration page.
      </p>
    ),
  },
  {
    title: "Abstract submissions and publication",
    content: (
      <p>
        Authors are responsible for the accuracy of their submissions and for
        having permission to submit the work and author details. Acceptance and
        presentation are subject to the conference review process. Accepted
        abstracts will be published in an ISBN-indexed Abstract Book. The best
        research papers will be published in a special issue of Current Trends
        in Biotechnology and Pharmacy (Scopus- Q3), with nominal publication
        charges, as stated on the submission pages.
      </p>
    ),
  },
  {
    title: "Conference information",
    content: (
      <p>
        Conference dates, schedules, speakers, venue details, and program
        information are published for planning purposes and may be updated.
        Please check the website and conference communications for the latest
        information before travelling.
      </p>
    ),
  },
  {
    title: "Contact",
    content: (
      <p>
        Questions about these terms may be sent to chipsabap2026@gmail.com.
      </p>
    ),
  },
];

export default function TermsAndConditionsPage() {
  return (
    <PolicyPage
      title="Terms and Conditions"
      intro="Conditions for using the ABAP 2026 website and participating in conference registration and abstract submission."
      sections={sections}
    />
  );
}
