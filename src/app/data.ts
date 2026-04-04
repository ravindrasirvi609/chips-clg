import { Plan } from "@/lib/interface";

export const plans: Plan[] = [
  {
    name: "Faculty / Scientist (Offline)",
    description:
      "Faculty members, scientists and industry professionals attending in offline mode. Includes sessions, conference kit and lunch.",
    earlyBird: 1200,
    regular: 1300,
    spot: 1500,
  },
  {
    name: "Research Scholar / Student (Offline)",
    description:
      "Research scholars, UG and PG students attending in offline mode. Includes sessions, conference kit and lunch.",
    earlyBird: 900,
    regular: 1000,
    spot: 1200,
  },
  {
    name: "Online Mode",
    description:
      "Online participation mode for delegates across categories with virtual access to conference sessions.",
    earlyBird: 600,
    regular: 600,
    spot: 600,
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
  {
    value: "pharmaceutics",
    label: "Pharmaceutical Technology and Pharmaceutics",
  },

  {
    value: "pharmchem_analysis",
    label: "Pharmaceutical Chemistry and Pharmaceutical Analysis",
  },
  {
    value: "pharmacognosy_biotech",
    label: "Pharmacognosy, Phytochemistry and Biotechnology",
  },
  {
    value: "pharmacology_toxicology",
    label: "Pharmacology and Toxicology",
  },
  {
    value: "pharmacy_practice_education",
    label: "Pharmacy Practice and Pharmacy Education",
  },
  {
    value: "regulatory_affairs",
    label: "Pharmaceutical Regulatory Affairs",
  },
  {
    value: "pharmacovigilance",
    label: "Pharmacovigilance and Pharmacoepidemiology",
  },
  {
    value: "agri_biotechnology",
    label: "Agriculture Biotechnology and Sustainable Development",
  },
  {
    value: "ai_ml_health",
    label: "Artificial Intelligence and Machine Learning in Health Sector",
  },
  {
    value: "other",
    label: "Other Relevant Fields",
  },
];

export const designationOptions = [
  { value: "Scientist", label: "Scientist" },
  { value: "Faculty", label: "Faculty" },
  {
    value: "ResearchScholar",
    label: "Research Scholar / PhD Scholar",
  },
  { value: "Student", label: "Student (UG/PG)" },
  {
    value: "IndustryPerson",
    label: "Industry Person",
  },
];
