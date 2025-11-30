"use client";
import React from "react";
import Image from "next/image";

interface CommitteeMemberProps {
  imageUrl: string;
  name: string;
  role: string;
  designation?: string;
}

const CommitteeMember: React.FC<CommitteeMemberProps> = ({
  imageUrl,
  name,
  role,
  designation,
}) => {
  return (
    <div className="glassmorphism-card rounded-xl p-6 text-center transform transition-all duration-300 hover:shadow-[0_0_30px_rgba(0,204,255,0.2)] hover:-translate-y-1">
      <div className="mb-4 relative mx-auto w-32 h-32 overflow-hidden rounded-full border-4 border-gradient-to-r from-[#00FFCC] to-[#00CCFF]">
        <Image
          src={imageUrl}
          alt={name}
          fill
          className="object-cover"
          sizes="(max-width: 128px) 100vw, 128px"
        />
      </div>
      <h3 className="text-xl font-bold mb-1 text-white">{name}</h3>
      <p className="text-[#00FFCC] font-medium mb-1">{role}</p>
      {designation && <p className="text-gray-300 text-sm">{designation}</p>}
    </div>
  );
};

const OrganizingCommittee = () => {
  const committeeMembers = {
    chiefPatron: {
      name: "Dr. Rayapati Srinivas",
      role: "Chief Patron",
      designation: "President, NES",
      imageUrl: "/members/President.jpg",
    },
    patron: {
      name: "Dr. Chebrolu N. Srinivas",
      role: "Patron",
      designation: "Secretary & Correspondent, NES",
      imageUrl: "/members/Secretary.jpg",
    },
    convener: {
      name: "Dr. S. Vidyadhara",
      role: "Convener",
      designation: "Principal, CHIPS",
      imageUrl: "/members/Dr. A. Saravanakumar.jpg",
    },
    organizingSecretary: {
      name: "Dr. P. PARTHIBAN M.Pharm, Ph.D., MBA (Hosp. Mgt)",
      role: "Organizing Secretary",
      designation:
        "Vice Principal & Head, Department of Pharmaceutical Chemistry",
      imageUrl: "/members/Dr. P.Parthiban.JPG",
    },
    coOrganizingSecretaries: [
      {
        name: "Dr. P. MOHAN M.Pharm, Ph.D.",
        role: "Co-Organizing Secretary",
        designation: "Professor & Head, Department of Pharmaceutics",
        imageUrl: "/members/Dr. P. Mohan.jpg",
      },
      {
        name: "Dr. S. MOHANRAJ M.Pharm, Ph.D.",
        role: "Co-Organizing Secretary",
        designation: "Professor & Head, Department of Pharmacology",
        imageUrl: "/members/Dr. S. Mohanraj.jpg",
      },
    ],
    organizingMembers: [
      {
        name: "Mrs. S. Sangeetha M.Pharm.",
        role: "Organizing Member",
        designation: "Associate Professor",
        imageUrl: "/members/Mrs. S. Sangeetha.jpeg",
      },
      {
        name: "Mr. MC. Kavin kumar M.Pharm.",
        role: "Organizing Member",
        designation: "Assistant Professor",
        imageUrl: "/members/Mr. MC. Kavinkumar.jpeg",
      },
      {
        name: "Mr. M. Loganathan M.Pharm.",
        role: "Organizing Member",
        designation: "Assistant Professor",
        imageUrl: "/members/Mr. M. Loganathan.jpeg",
      },
      {
        name: "Mr. M. Muthuraj M.Pharm.",
        role: "Organizing Member",
        designation: "Assistant Professor",
        imageUrl: "/members/Mr. M. Muthuraj.jpg",
      },
      {
        name: "Mr. N. Vivekanandan M.Pharm.",
        role: "Organizing Member",
        designation: "Assistant Professor",
        imageUrl: "/members/Mr. N. Vivekanandan.jpg",
      },
      {
        name: "Ms. G. Heera M.Pharm.",
        role: "Organizing Member",
        designation: "Assistant Professor",
        imageUrl: "/members/Ms. G. Heera.jpg",
      },
    ],
  };

  return (
    <section className="py-16 bg-background relative" id="organizing-committee">
      <div className="max-w-6xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4 text-gradient">
            Organizing Committee
          </h2>
          <div className="w-24 h-0.5 mx-auto bg-gradient-to-r from-[#00FFCC] to-[#00CCFF] rounded-full"></div>
          <p className="mt-6 text-gray-300 text-lg max-w-3xl mx-auto">
            Chebrolu Hanumaiah Institute of Pharmaceutical Sciences
          </p>
          <p className="mt-2 text-[#00FFCC] text-xl font-medium max-w-3xl mx-auto">
            &quot;Artificial Intelligence and machine learning: A Game changer
            in the Pharma field&quot;
          </p>
        </div>

        {/* Committee Members Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          <div className="md:col-span-1">
            <CommitteeMember
              imageUrl={committeeMembers.chiefPatron.imageUrl}
              name={committeeMembers.chiefPatron.name}
              role={committeeMembers.chiefPatron.role}
              designation={committeeMembers.chiefPatron.designation}
            />
          </div>
          <div className="md:col-span-1">
            <CommitteeMember
              imageUrl={committeeMembers.patron.imageUrl}
              name={committeeMembers.patron.name}
              role={committeeMembers.patron.role}
              designation={committeeMembers.patron.designation}
            />
          </div>
          <div className="md:col-span-1">
            <CommitteeMember
              imageUrl={committeeMembers.convener.imageUrl}
              name={committeeMembers.convener.name}
              role={committeeMembers.convener.role}
              designation={committeeMembers.convener.designation}
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          <div className="md:col-span-3 md:col-start-2 md:col-end-3">
            <CommitteeMember
              imageUrl={committeeMembers.organizingSecretary.imageUrl}
              name={committeeMembers.organizingSecretary.name}
              role={committeeMembers.organizingSecretary.role}
              designation={committeeMembers.organizingSecretary.designation}
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          {committeeMembers.coOrganizingSecretaries.map((member, index) => (
            <div key={index}>
              <CommitteeMember
                imageUrl={member.imageUrl}
                name={member.name}
                role={member.role}
                designation={member.designation}
              />
            </div>
          ))}
        </div>

        <h3 className="text-2xl font-bold mb-6 text-center text-transparent bg-clip-text bg-gradient-to-r from-[#00FFCC] to-[#00CCFF]">
          Organizing Members
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {committeeMembers.organizingMembers.map((member, index) => (
            <div key={index}>
              <CommitteeMember
                imageUrl={member.imageUrl}
                name={member.name}
                role={member.role}
                designation={member.designation}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default OrganizingCommittee;
