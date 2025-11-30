"use client";
import LoadingExample from "@/components/Loader";
import RegistrationTable from "@/components/RegistrationTable";
import { exportToExcel, Registration } from "@/lib/excelExport";
import Link from "next/link";
import { useState, useEffect } from "react";
import {
  Search,
  Download,
  FileText,
  Users,
  Calendar,
  TrendingUp,
} from "lucide-react";

export default function RegistrationList() {
  const [registrations, setRegistrations] = useState<Registration[]>([]);
  const [filteredRegistrations, setFilteredRegistrations] = useState<
    Registration[]
  >([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    async function fetchRegistrations() {
      try {
        const response = await fetch("/api/registrationsList");
        const data = await response.json();
        setRegistrations(data);
        setFilteredRegistrations(data);
      } catch (error) {
        console.error("Failed to fetch registrations:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchRegistrations();
  }, []);

  useEffect(() => {
    const filtered = registrations.filter((registration) =>
      Object.values(registration).some(
        (value) =>
          value &&
          value.toString().toLowerCase().includes(searchTerm.toLowerCase())
      )
    );
    setFilteredRegistrations(filtered);
  }, [searchTerm, registrations]);

  const handleExport = () => {
    exportToExcel(filteredRegistrations, "Registrations");
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const handleDelete = async (id: string) => {
    try {
      const response = await fetch(`/api/delete-registration?id=${id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        // Remove the deleted registration from both arrays
        setRegistrations((prev) => prev.filter((reg) => reg._id !== id));
        setFilteredRegistrations((prev) =>
          prev.filter((reg) => reg._id !== id)
        );
      } else {
        const error = await response.json();
        alert(`Failed to delete registration: ${error.error}`);
      }
    } catch (error) {
      console.error("Error deleting registration:", error);
      alert("Failed to delete registration. Please try again.");
    }
  };

  const handleConfirmGroup = async (id: string) => {
    if (!confirm("Are you sure you want to confirm this group registration?")) {
      return;
    }

    try {
      const response = await fetch("/api/confirm-group-registration", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ registrationId: id }),
      });

      if (response.ok) {
        // Update the registration status in both arrays
        setRegistrations((prev) =>
          prev.map((reg) =>
            reg._id === id
              ? {
                  ...reg,
                  registrationStatus: "Confirmed",
                  paymentStatus: "Completed",
                }
              : reg
          )
        );
        setFilteredRegistrations((prev) =>
          prev.map((reg) =>
            reg._id === id
              ? {
                  ...reg,
                  registrationStatus: "Confirmed",
                  paymentStatus: "Completed",
                }
              : reg
          )
        );
        alert("Group registration confirmed successfully!");
      } else {
        const error = await response.json();
        alert(
          `Failed to confirm registration: ${error.error || error.message}`
        );
      }
    } catch (error) {
      console.error("Error confirming group registration:", error);
      alert("Failed to confirm group registration. Please try again.");
    }
  };

  const handleConfirmIndividual = async (id: string) => {
    if (
      !confirm(
        "Are you sure you want to confirm this individual registration with ₹1 payment?"
      )
    ) {
      return;
    }

    try {
      const response = await fetch("/api/confirm-individual-registration", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ registrationId: id }),
      });

      if (response.ok) {
        // Update the registration status in both arrays
        setRegistrations((prev) =>
          prev.map((reg) =>
            reg._id === id
              ? {
                  ...reg,
                  registrationStatus: "Confirmed",
                  paymentStatus: "Completed",
                  paymentAmount: 1,
                }
              : reg
          )
        );
        setFilteredRegistrations((prev) =>
          prev.map((reg) =>
            reg._id === id
              ? {
                  ...reg,
                  registrationStatus: "Confirmed",
                  paymentStatus: "Completed",
                  paymentAmount: 1,
                }
              : reg
          )
        );
        alert(
          "Individual registration confirmed successfully with ₹1 payment!"
        );
      } else {
        const error = await response.json();
        alert(
          `Failed to confirm individual registration: ${
            error.error || error.message
          }`
        );
      }
    } catch (error) {
      console.error("Error confirming individual registration:", error);
      alert("Failed to confirm individual registration. Please try again.");
    }
  };

  if (loading)
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 flex items-center justify-center">
        <LoadingExample />
      </div>
    );

  // Calculate statistics
  const totalRegistrations = registrations.length;
  const confirmedRegistrations = registrations.filter(
    (reg) => reg.registrationStatus === "Confirmed"
  ).length;
  const pendingRegistrations = registrations.filter(
    (reg) => reg.registrationStatus === "Pending"
  ).length;
  const completedPayments = registrations.filter(
    (reg) => reg.paymentStatus === "Completed"
  ).length;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header Section */}
        <div className="mb-8">
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6">
            <div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Registration Dashboard
              </h1>
              <p className="text-gray-600 mt-2 text-lg">
                Manage and monitor all conference registrations
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-3">
              <Link href={"/admin/abstractList"}>
                <button className="inline-flex items-center gap-2 bg-gradient-to-r from-emerald-500 to-teal-500 text-white px-6 py-3 rounded-xl hover:from-emerald-600 hover:to-teal-600 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5">
                  <FileText size={20} />
                  Abstract List
                </button>
              </Link>
              <button
                onClick={handleExport}
                className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-500 to-indigo-500 text-white px-6 py-3 rounded-xl hover:from-blue-600 hover:to-indigo-600 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
              >
                <Download size={20} />
                Export to Excel
              </button>
            </div>
          </div>
        </div>

        {/* Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">
                  Total Registrations
                </p>
                <p className="text-3xl font-bold text-gray-900">
                  {totalRegistrations}
                </p>
              </div>
              <div className="p-3 bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl">
                <Users className="text-white" size={24} />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Confirmed</p>
                <p className="text-3xl font-bold text-green-600">
                  {confirmedRegistrations}
                </p>
              </div>
              <div className="p-3 bg-gradient-to-r from-green-500 to-emerald-600 rounded-xl">
                <TrendingUp className="text-white" size={24} />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Pending</p>
                <p className="text-3xl font-bold text-orange-600">
                  {pendingRegistrations}
                </p>
              </div>
              <div className="p-3 bg-gradient-to-r from-orange-500 to-amber-600 rounded-xl">
                <Calendar className="text-white" size={24} />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">
                  Payments Completed
                </p>
                <p className="text-3xl font-bold text-purple-600">
                  {completedPayments}
                </p>
              </div>
              <div className="p-3 bg-gradient-to-r from-purple-500 to-violet-600 rounded-xl">
                <TrendingUp className="text-white" size={24} />
              </div>
            </div>
          </div>
        </div>

        {/* Search and Filters */}
        <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 mb-8">
          <div className="flex flex-col sm:flex-row gap-4 items-center">
            <div className="relative flex-1">
              <Search
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                size={20}
              />
              <input
                type="text"
                placeholder="Search registrations by name, email, or any field..."
                value={searchTerm}
                onChange={handleSearch}
                className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-700 placeholder-gray-400 transition-all duration-200"
              />
            </div>
            <div className="text-sm text-gray-600">
              Showing {filteredRegistrations.length} of {registrations.length}{" "}
              registrations
            </div>
          </div>
        </div>

        {/* Table Section */}
        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
          <RegistrationTable
            registrations={filteredRegistrations}
            onDelete={handleDelete}
            onConfirmGroup={handleConfirmGroup}
            onConfirmIndividual={handleConfirmIndividual}
          />
        </div>
      </div>
    </div>
  );
}
