"use client";
import React, { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import { useFirebaseStorage } from "@/app/hooks/useFirebaseStorage";
import { useDropzone } from "react-dropzone";
import { formatDate } from "@/lib/utils";
import { RegistrationInfo } from "@/lib/interface";

interface ClientProps {
  id: string;
}

const ClientAbstractForm: React.FC<ClientProps> = ({ id }) => {
  const [registrationInfo, setRegistrationInfo] =
    useState<RegistrationInfo | null>(null);
  const [abstractFile, setAbstractFile] = useState<File | null>(null);

  const {
    uploadFile,
    uploadProgress,
    isUploading,
    error: uploadError,
  } = useFirebaseStorage();

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch("/api/qrcode", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id }),
      });
      const data = await res.json();
      setRegistrationInfo(data.props);
    };

    fetchData();
  }, [id]);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    setAbstractFile(acceptedFiles[0]);
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "application/msword": [".doc"],
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document":
        [".docx"],
    },
    maxSize: 5 * 1024 * 1024,
  });

  const handleFileUpload = async () => {
    if (!abstractFile || !registrationInfo) return;

    try {
      const downloadURL = await uploadFile(abstractFile);
      const updateRes = await fetch("/api/updateAbstract", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ _id: id, abstractFileUrl: downloadURL }),
      });

      if (updateRes.ok) {
        const updatedData = await updateRes.json();
        setRegistrationInfo((prevState) => ({
          ...prevState!,
          abstract: updatedData.abstract,
        }));
      } else {
        throw new Error("Failed to update abstract");
      }
    } catch (error) {
      console.error("Failed to upload file or update abstract:", error);
    }
  };

  if (!registrationInfo) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-orange-100 to-indigo-200">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-danger"></div>
      </div>
    );
  }

  const { abstract, registration } = registrationInfo;

  const InfoItem = ({
    label,
    value,
  }: {
    label: string;
    value: React.ReactNode;
  }) => (
    <div className="mb-4">
      <span className="font-semibold text-danger">{label}</span>
      <p className="mt-1 text-gray-800">{value || "N/A"}</p>
    </div>
  );

  return (
    <div className="bg-[#F7F7FA] py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        <div className="bg-white rounded-3xl shadow-xl overflow-hidden border border-[#E0E0E0]">
          <div className="p-8 bg-gradient-to-r from-[#4B3F72] to-[#22223B] text-white">
            <h1 className="text-4xl font-extrabold text-center tracking-tight">
              Participant Dashboard
            </h1>
          </div>
          <div className="flex flex-col md:flex-row gap-8 p-8">
            {/* Profile Card */}
            <div className="md:w-1/3 bg-[#F7F7FA] rounded-2xl shadow-md p-6 flex flex-col items-center">
              {registration?.imageUrl && (
                <div className="mb-6 flex justify-center">
                  <Image
                    src={registration?.imageUrl}
                    alt="Participant"
                    width={120}
                    height={120}
                    className="rounded-full shadow-lg border-4 border-white object-cover"
                  />
                </div>
              )}
              <div className="w-full">
                <InfoItem
                  label="Name"
                  value={registration?.name || abstract?.name}
                />
                <InfoItem
                  label="Email"
                  value={registration?.email || abstract?.email}
                />
                <InfoItem
                  label="Registration Code"
                  value={registration?.registrationCode}
                />
                <InfoItem
                  label="Registration Type"
                  value={registration?.registrationType}
                />
              </div>
              <div className="mt-8 w-full">
                <h2 className="text-lg font-bold mb-2 text-[#FF6B6B] text-center">
                  QR Code
                </h2>
                {(abstract?.qrCodeUrl || registration?.qrCodeUrl) &&
                  typeof (abstract?.qrCodeUrl || registration?.qrCodeUrl) ===
                  "string" &&
                  (abstract?.qrCodeUrl || registration?.qrCodeUrl) !== "" && (
                    <div className="flex justify-center mb-2">
                      <Image
                        src={
                          abstract?.qrCodeUrl ||
                          (registration?.qrCodeUrl as string)
                        }
                        alt="QR Code"
                        width={100}
                        height={100}
                        className="rounded-lg shadow-md border border-[#E0E0E0]"
                      />
                    </div>
                  )}
                <p className="text-center font-semibold text-[#4B3F72] text-sm">
                  {abstract?.AbstractCode ||
                    abstract?.temporyAbstractCode ||
                    "N/A"}
                </p>
                <p className="mt-1 text-xs text-center text-[#6D6875]">
                  Scan to check abstract updates
                </p>
              </div>
            </div>

            {/* Main Content */}
            <div className="md:w-2/3 flex flex-col gap-8">
              {/* Abstract Card */}
              {abstract && (
                <div className="bg-white rounded-2xl shadow-md p-6 border border-[#E0E0E0]">
                  <h2 className="text-2xl font-bold mb-4 text-[#4B3F72] flex items-center gap-2">
                    <svg
                      className="w-6 h-6 text-[#FF6B6B]"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 21H5a2 2 0 01-2-2V7a2 2 0 012-2h5l2-2h5a2 2 0 012 2v12a2 2 0 01-2 2z"
                      />
                    </svg>
                    Scientific Abstract
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <InfoItem
                      label="Status"
                      value={
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-bold tracking-wide shadow-sm ${abstract.Status === "Pending"
                              ? "bg-[#FFD166] text-[#4B3F72]"
                              : abstract.Status === "Revision"
                                ? "bg-[#FF6B6B]/20 text-[#FF6B6B]"
                                : abstract.Status === "Rejected"
                                  ? "bg-[#D7263D]/20 text-[#D7263D]"
                                  : "bg-[#38B000]/20 text-[#38B000]"
                            }`}
                        >
                          {abstract.Status}
                        </span>
                      }
                    />
                    <InfoItem label="Title" value={abstract.title} />
                    <InfoItem label="Co-Author" value={abstract.coAuthor} />
                    <InfoItem
                      label="Submitted On"
                      value={
                        abstract.createdAt && formatDate(abstract.createdAt)
                      }
                    />
                    <InfoItem
                      label="Presentation Type"
                      value={abstract?.presentationType}
                    />
                    <InfoItem
                      label="Affiliation"
                      value={abstract.affiliation}
                    />
                    <InfoItem
                      label="Article Type"
                      value={abstract.articleType}
                    />
                    <InfoItem
                      label="Submitted At"
                      value={
                        abstract.createdAt && formatDate(abstract.createdAt)
                      }
                    />
                    <div className="col-span-2">
                      <InfoItem
                        label="Abstract File"
                        value={
                          abstract.abstractFileUrl ? (
                            <a
                              href={abstract.abstractFileUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-[#4B3F72] hover:text-[#FF6B6B] underline flex items-center gap-1 font-medium"
                            >
                              <svg
                                className="w-4 h-4"
                                fill="currentColor"
                                viewBox="0 0 20 20"
                              >
                                <path
                                  fillRule="evenodd"
                                  d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z"
                                  clipRule="evenodd"
                                />
                              </svg>
                              Download Abstract
                            </a>
                          ) : (
                            <span className="text-[#6D6875]">Not uploaded</span>
                          )
                        }
                      />
                    </div>
                  </div>

                  {(abstract.Status === "Revision" ||
                    abstract.Status === "Rejected") && (
                      <div className="mt-8 bg-[#FFF0F3] border border-[#FFD6D6] rounded-lg p-4">
                        <h3 className="text-lg font-bold mb-2 text-[#D7263D]">
                          Rejection Comment
                        </h3>
                        <p className="text-[#6D6875]">
                          {abstract.rejectionComment || "No comment provided"}
                        </p>
                        <div className="mt-6">
                          <h3 className="text-lg font-bold mb-3 text-[#FF6B6B]">
                            Update Abstract File
                          </h3>
                          <div
                            {...getRootProps()}
                            className={`w-full p-6 border-2 border-dashed rounded-lg text-center cursor-pointer transition-colors duration-200 ease-in-out ${isDragActive
                                ? "border-[#FF6B6B] bg-[#FFF0F3]"
                                : "border-[#E0E0E0] hover:border-[#FF6B6B] hover:bg-[#F7F7FA]"
                              }`}
                          >
                            <input {...getInputProps()} />
                            <p className="text-[#4B3F72] font-medium">
                              {isDragActive
                                ? "Drop the file here..."
                                : "Drag & drop your abstract file here, or click to select"}
                            </p>
                            <p className="text-xs text-[#6D6875] mt-1">
                              Supported formats: .doc, .docx (Max size: 5MB)
                            </p>
                          </div>
                          {abstractFile && (
                            <div className="flex items-center space-x-2 text-sm text-[#38B000] mt-2">
                              <svg
                                className="w-5 h-5"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                                />
                              </svg>
                              <span>{abstractFile.name}</span>
                            </div>
                          )}
                          {isUploading && (
                            <div className="mt-4">
                              <div className="flex justify-between mb-1">
                                <span className="text-xs font-medium text-[#4B3F72]">
                                  Uploading
                                </span>
                                <span className="text-xs font-medium text-[#4B3F72]">
                                  {uploadProgress}%
                                </span>
                              </div>
                              <div className="w-full bg-[#E0E0E0] rounded-full h-2.5">
                                <div
                                  className="bg-[#FF6B6B] h-2.5 rounded-full transition-all duration-300 ease-in-out"
                                  style={{ width: `${uploadProgress}%` }}
                                ></div>
                              </div>
                            </div>
                          )}
                          {uploadError && (
                            <div className="flex items-center space-x-2 text-[#D7263D] mt-2">
                              <svg
                                className="w-5 h-5"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                                />
                              </svg>
                              <span>{uploadError}</span>
                            </div>
                          )}
                          <button
                            onClick={handleFileUpload}
                            disabled={!abstractFile || isUploading}
                            className="mt-4 w-full bg-[#FF6B6B] text-white py-2 px-4 rounded-md font-semibold hover:bg-[#D7263D] transition-colors duration-200 ease-in-out disabled:opacity-50 disabled:cursor-not-allowed shadow"
                          >
                            {isUploading ? "Uploading..." : "Upload New Abstract"}
                          </button>
                        </div>
                      </div>
                    )}
                </div>
              )}

              {/* Registration Card */}
              {registration && (
                <div className="bg-white rounded-2xl shadow-md p-6 border border-[#E0E0E0]">
                  <h2 className="text-2xl font-bold mb-4 text-[#4B3F72] flex items-center gap-2">
                    <svg
                      className="w-6 h-6 text-[#38B000]"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                    Registration Details
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <InfoItem
                      label="Salutation"
                      value={registration.Salutations}
                    />
                    <InfoItem
                      label="Affiliation"
                      value={registration.affiliation}
                    />
                    <InfoItem
                      label="Designation"
                      value={registration.designation}
                    />
                    <InfoItem label="Gender" value={registration.gender} />
                    <InfoItem
                      label="Date of Birth"
                      value={registration.dob && formatDate(registration.dob)}
                    />
                    <InfoItem
                      label="Payment Status"
                      value={registration.paymentStatus}
                    />
                    <InfoItem
                      label="Payment Amount"
                      value={
                        registration.paymentAmount !== undefined
                          ? `₹${registration.paymentAmount}`
                          : undefined
                      }
                    />
                    <InfoItem
                      label="Payment Date"
                      value={
                        registration.paymentDate &&
                        formatDate(registration.paymentDate)
                      }
                    />
                    <InfoItem
                      label="Need Accommodation"
                      value={registration.needAccommodation ? "Yes" : "No"}
                    />
                    <InfoItem label="Address" value={registration.address} />
                    <InfoItem label="City" value={registration.city} />
                    <InfoItem label="State" value={registration.state} />
                    <InfoItem label="Pincode" value={registration.pincode} />
                    <InfoItem label="Country" value={registration.country} />
                    <InfoItem
                      label="WhatsApp Number"
                      value={registration.whatsappNumber}
                    />
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
        <div className="mt-8 text-center text-[#6D6875]">
          <p>
            For any queries, please contact our support team at{" "}
            <a
              href="mailto:innovatepharma2026@gmail.com"
              className="text-[#FF6B6B] hover:underline font-semibold"
            >
              innovatepharma2026@gmail.com
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default ClientAbstractForm;
