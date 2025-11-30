import { Plan } from "@/lib/interface";

export const plans: Plan[] = [
  {
    name: "OPF Members",
    description: "Includes entry to all sessions and conference kit.",
    earlyBird: 700,
    regular: 1000,
    spot: 2000,
  },
  {
    name: "Students (UG & PG)",
    description: "Includes entry to all sessions and conference kit.",
    earlyBird: 800,
    regular: 1500,
    spot: 2500,
  },
  {
    name: "Research Scholars & Faculty Members",
    description: "Includes entry to all sessions and conference kit.",
    earlyBird: 1200,
    regular: 2000,
    spot: 2500,
  },
  {
    name: "Industry Professionals",
    description: "Includes entry to all sessions and conference kit.",
    earlyBird: 1500,
    regular: 2500,
    spot: 3000,
  },
  {
    name: "International Delegates",
    description: "Includes entry to all sessions, conference kit, and lunch.",
    earlyBird: 60 * 83, // $60 USD converted to INR (assuming 1 USD = 83 INR)
    regular: 75 * 83, // $75 USD converted to INR
    spot: 100 * 83, // $100 USD converted to INR
  },
];

export const indianStates = [
  "Andhra Pradesh",
  "Arunachal Pradesh",
  "Assam",
  "Bihar",
  "Chhattisgarh",
  "Goa",
  "Gujarat",
  "Haryana",
  "Himachal Pradesh",
  "Jharkhand",
  "Karnataka",
  "Kerala",
  "Madhya Pradesh",
  "Maharashtra",
  "Manipur",
  "Meghalaya",
  "Mizoram",
  "Nagaland",
  "Odisha",
  "Punjab",
  "Rajasthan",
  "Sikkim",
  "Tamil Nadu",
  "Telangana",
  "Tripura",
  "Uttar Pradesh",
  "Uttarakhand",
  "West Bengal",
];

export const subjectOptions = [
  { value: "pharmaceuticalTechnology", label: "Pharmaceutical Technology" },
  { value: "medChem", label: "Pharmaceutical / Medicinal Chemistry" },

  {
    value: "pharmacognosy",
    label:
      "Pharmacognosy, Indigenous Drugs, Herbal Formulations, and Phytochemistry",
  },
  {
    value: "pharmacologyToxicology",
    label: "Pharmacology and Toxicology, Clinical Research & Pharmacovigilance",
  },
  {
    value: "pharmaceuticalAnalysis",
    label: "Pharmaceutical Analysis and Quality Assurance",
  },
  {
    value: "biopharmaceutics",
    label: "Biopharmaceutics, Pharmacokinetics & Drug Metabolism",
  },
  { value: "biotechnology", label: "Biotechnology and Biotherapeutics" },
  {
    value: "clinicalPharmacy",
    label: "Hospital, Community, and Clinical Pharmacy",
  },
  {
    value: "pharmaceuticalEducation",
    label: "Pharmaceutical Education and Professional Pharmacy",
  },
  {
    value: "drugRegulatoryAffairs",
    label: "Drug Regulatory Affairs & Pharmaceutical Management",
  },
  {
    value: "pharmacoeconomics",
    label: "Pharmacoeconomics and Pharmacoepidemiology",
  },
  {
    value: "aiBioinformatics",
    label: "Artificial Intelligence / Bioinformatics / Data Analytics",
  },
];

export const designationOptions = [
  { value: "UG", label: "Undergraduate Student(UG)" },
  { value: "PG", label: "Postgraduate Student(PG)" },
  {
    value: "RC",
    label: "Research Scholer/PhD Scholar",
  },
  {
    value: "FD",
    label: "Faculty",
  },
];
