import PolicyPage, { type PolicySection } from "@/components/PolicyPage";

const sections: PolicySection[] = [
  {
    title: "Who this policy applies to",
    content: (
      <p>
        This policy covers information handled through the ABAP 2026 conference
        website and registration, abstract submission, and contact processes.
        The conference is organized at Chebrolu Hanumaiah Institute of
        Pharmaceutical Sciences (CHIPS), Guntur, Andhra Pradesh.
      </p>
    ),
  },
  {
    title: "Information we collect",
    content: (
      <>
        <p>
          Depending on how you use the site, we may receive your name, email
          address, phone number, affiliation, designation, date of birth,
          address, registration choices, accommodation or dietary requests, and
          identity information submitted in the registration form.
        </p>
        <p>
          Abstract submissions may include author names and affiliations, the
          abstract text, and files you upload. Contact requests may include the
          details and message you send us. Payment processing is handled through
          the online payment gateway; the conference team receives payment
          status, amount, and transaction reference information to manage
          registrations.
        </p>
      </>
    ),
  },
  {
    title: "How we use information",
    content: (
      <p>
        We use submitted information to process registrations and payments,
        review abstracts, communicate about the conference, coordinate
        accommodation and accessibility requests, issue confirmations, manage
        event participation, and respond to questions. Accepted abstracts may
        be included in the ISBN-indexed Abstract Book as described in the
        submission information on this website.
      </p>
    ),
  },
  {
    title: "When information is shared",
    content: (
      <p>
        Access is limited to conference organizers and service providers who
        help operate the website, store submitted files, send conference
        communications, or process payments. Information may also be shared
        when required to address a legal obligation or protect the conference
        and its participants. We do not sell registration or abstract
        information.
      </p>
    ),
  },
  {
    title: "Publication and public information",
    content: (
      <p>
        If an abstract is accepted, its abstract text and submitted author
        information may appear in the conference Abstract Book. Authors are
        responsible for ensuring they have permission to submit the work and
        associated author details for review and publication.
      </p>
    ),
  },
  {
    title: "Storage, security, and retention",
    content: (
      <p>
        We use administrative and technical safeguards intended to protect the
        information handled through the site. No online service can guarantee
        absolute security. Information is retained for as long as needed to
        administer the conference, maintain registration and payment records,
        and meet applicable recordkeeping requirements.
      </p>
    ),
  },
  {
    title: "Your requests and contact",
    content: (
      <p>
        To request access to or correction of information you submitted, or to
        ask a privacy question, email chipsabap2026@gmail.com. We may need to
        retain some information to complete conference administration or meet
        recordkeeping obligations.
      </p>
    ),
  },
];

export default function PrivacyPolicyPage() {
  return (
    <PolicyPage
      title="Privacy Policy"
      intro="How the ABAP 2026 conference team handles information submitted through this website."
      sections={sections}
    />
  );
}
