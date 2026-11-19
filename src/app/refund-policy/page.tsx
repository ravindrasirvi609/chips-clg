import PolicyPage, { type PolicySection } from "@/components/PolicyPage";

const sections: PolicySection[] = [
  {
    title: "Registration fees",
    content: (
      <p>
        Registration fees are non-refundable after payment. A paid registration
        cannot be replaced or transferred to another person. Please check the
        selected participation mode and registration details before completing
        payment.
      </p>
    ),
  },
  {
    title: "Payment issues",
    content: (
      <p>
        If the payment gateway reports a failed payment but your bank or payment
        provider shows a debit, contact the conference team before trying again.
        Include your name, registration email, date of payment, and transaction
        reference so the team can check the payment status.
      </p>
    ),
  },
  {
    title: "Contact",
    content: (
      <p>
        For registration or payment questions, email chipsabap2026@gmail.com or
        use the contact details on the Contact page. Please do not send card
        PINs, passwords, or one-time verification codes.
      </p>
    ),
  },
];

export default function RefundPolicyPage() {
  return (
    <PolicyPage
      title="Refund Policy"
      intro="Please review this policy before paying a conference registration fee."
      sections={sections}
    />
  );
}
