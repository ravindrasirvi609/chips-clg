import Link from "next/link";
import React from "react";
import {
  Trash2,
  CheckCircle,
  AlertCircle,
  Clock,
  UserCheck,
} from "lucide-react";

interface Registration {
  _id: string;
  name: string;
  email: string;
  registrationType: string;
  paymentStatus: string;
  registrationStatus: string;
  createdAt: string;
  registrationCode: string;
  affiliation: string;
  whatsappNumber: string;
  includeGalaDinner: boolean;
}

interface RegistrationTableProps {
  registrations: Registration[];
  onDelete?: (id: string) => void;
  onConfirmGroup?: (id: string) => void;
  onConfirmIndividual?: (id: string) => void;
}

const RegistrationTable: React.FC<RegistrationTableProps> = ({
  registrations,
  onDelete,
  onConfirmGroup,
  onConfirmIndividual,
}) => {
  const handleDelete = async (id: string, paymentStatus: string) => {
    // Prevent deletion if payment is completed
    if (paymentStatus === "Completed") {
      alert("Cannot delete registration with completed payment status");
      return;
    }

    if (onDelete) {
      onDelete(id);
    }
  };

  const handleConfirmGroup = async (id: string) => {
    if (onConfirmGroup) {
      onConfirmGroup(id);
    }
  };

  const handleConfirmIndividual = async (id: string) => {
    if (onConfirmIndividual) {
      onConfirmIndividual(id);
    }
  };

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full">
        <thead className="bg-gradient-to-r from-blue-600 to-purple-600 text-white">
          <tr>
            <th className="px-6 py-4 text-left text-sm font-semibold tracking-wide">
              Regn ID
            </th>
            <th className="px-6 py-4 text-left text-sm font-semibold tracking-wide">
              Name
            </th>
            <th className="px-6 py-4 text-left text-sm font-semibold tracking-wide">
              Email
            </th>
            <th className="px-6 py-4 text-left text-sm font-semibold tracking-wide">
              Registration Type
            </th>
            <th className="px-6 py-4 text-left text-sm font-semibold tracking-wide">
              Payment Status
            </th>
            <th className="px-6 py-4 text-left text-sm font-semibold tracking-wide">
              Registration Status
            </th>
            <th className="px-6 py-4 text-left text-sm font-semibold tracking-wide">
              College Name
            </th>
            <th className="px-6 py-4 text-left text-sm font-semibold tracking-wide">
              Mobile No.
            </th>
            <th className="px-6 py-4 text-left text-sm font-semibold tracking-wide">
              Regn Date
            </th>
            <th className="px-6 py-4 text-left text-sm font-semibold tracking-wide">
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-100">
          {registrations.length === 0 ? (
            <tr>
              <td colSpan={10} className="px-6 py-12 text-center">
                <div className="flex flex-col items-center justify-center text-gray-500">
                  <AlertCircle size={48} className="mb-4 text-gray-300" />
                  <p className="text-lg font-medium">
                    No matching registrations found
                  </p>
                  <p className="text-sm">Try adjusting your search criteria</p>
                </div>
              </td>
            </tr>
          ) : (
            registrations.map((registration) => (
              <tr
                key={registration._id}
                className={`hover:bg-gray-50 transition-colors duration-150 ${
                  registration.includeGalaDinner
                    ? "bg-pink-50 hover:bg-pink-100"
                    : ""
                }`}
              >
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-gray-900">
                    {registration.registrationCode || "Pending"}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <Link
                    href={`/abstractForm/${registration._id}`}
                    className="text-blue-600 hover:text-blue-800 font-medium transition-colors duration-150"
                  >
                    {registration.name}
                  </Link>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">
                    {registration.email}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span
                    className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${
                      registration.registrationType === "Group"
                        ? "bg-purple-100 text-purple-800"
                        : "bg-blue-100 text-blue-800"
                    }`}
                  >
                    {registration.registrationType}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span
                    className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${getPaymentStatusColor(
                      registration.paymentStatus
                    )}`}
                  >
                    {registration.paymentStatus === "Completed" && (
                      <CheckCircle size={12} className="mr-1" />
                    )}
                    {registration.paymentStatus === "Pending" && (
                      <Clock size={12} className="mr-1" />
                    )}
                    {registration.paymentStatus === "Failed" && (
                      <AlertCircle size={12} className="mr-1" />
                    )}
                    {registration.paymentStatus}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span
                    className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${getRegistrationStatusColor(
                      registration.registrationStatus
                    )}`}
                  >
                    {registration.registrationStatus === "Confirmed" && (
                      <UserCheck size={12} className="mr-1" />
                    )}
                    {registration.registrationStatus === "Pending" && (
                      <Clock size={12} className="mr-1" />
                    )}
                    {registration.registrationStatus}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">
                    {registration.affiliation}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">
                    {registration.whatsappNumber}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">
                    {new Date(registration.createdAt).toLocaleDateString()}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex space-x-2">
                    {registration.registrationType === "Group" &&
                      registration.registrationStatus === "Pending" && (
                        <button
                          onClick={() => handleConfirmGroup(registration._id)}
                          className="inline-flex items-center px-3 py-1.5 rounded-lg text-xs font-medium bg-gradient-to-r from-green-500 to-emerald-500 text-white hover:from-green-600 hover:to-emerald-600 transition-all duration-200 shadow-sm hover:shadow-md"
                          title="Confirm Group Registration"
                        >
                          <CheckCircle size={12} className="mr-1" />
                          Confirm Group
                        </button>
                      )}
                    {registration.registrationType !== "Group" &&
                      registration.registrationStatus === "Pending" && (
                        <button
                          onClick={() =>
                            handleConfirmIndividual(registration._id)
                          }
                          className="inline-flex items-center px-3 py-1.5 rounded-lg text-xs font-medium bg-gradient-to-r from-blue-500 to-cyan-500 text-white hover:from-blue-600 hover:to-cyan-600 transition-all duration-200 shadow-sm hover:shadow-md border border-blue-400"
                          title="Confirm Individual Registration (₹1 Payment)"
                        >
                          <UserCheck size={12} className="mr-1" />
                          Confirm Individual
                        </button>
                      )}
                    <button
                      onClick={() =>
                        handleDelete(
                          registration._id,
                          registration.paymentStatus
                        )
                      }
                      disabled={registration.paymentStatus === "Completed"}
                      className={`inline-flex items-center px-3 py-1.5 rounded-lg text-xs font-medium transition-all duration-200 ${
                        registration.paymentStatus === "Completed"
                          ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                          : "bg-gradient-to-r from-red-500 to-pink-500 text-white hover:from-red-600 hover:to-pink-600 shadow-sm hover:shadow-md"
                      }`}
                      title={
                        registration.paymentStatus === "Completed"
                          ? "Cannot delete - Payment completed"
                          : "Delete Registration"
                      }
                    >
                      <Trash2 size={12} className="mr-1" />
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

function getPaymentStatusColor(status: string): string {
  switch (status) {
    case "Completed":
      return "bg-green-100 text-green-800";
    case "Pending":
      return "bg-yellow-100 text-yellow-800";
    case "Failed":
      return "bg-red-100 text-red-800";
    default:
      return "bg-gray-100 text-gray-800";
  }
}

function getRegistrationStatusColor(status: string): string {
  switch (status) {
    case "Confirmed":
      return "bg-green-100 text-green-800";
    case "Pending":
      return "bg-orange-100 text-orange-800";
    default:
      return "bg-gray-100 text-gray-800";
  }
}

export default RegistrationTable;
