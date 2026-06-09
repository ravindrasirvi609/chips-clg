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
  CheckCircle,
  Clock,
  CreditCard,
  ChevronRight,
  TrendingUp,
} from "lucide-react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

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

  const handleSyncStatus = async (id: string) => {
    try {
      const response = await fetch("/api/verify-payment", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ registrationId: id }),
      });

      const data = await response.json();

      if (response.ok) {
        setRegistrations((prev) =>
          prev.map((reg) =>
            reg._id === id
              ? {
                  ...reg,
                  registrationStatus: "Confirmed",
                  paymentStatus: "Completed",
                  registrationCode: data.registration.registrationCode,
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
                  registrationCode: data.registration.registrationCode,
                }
              : reg
          )
        );
        alert("Payment verified and registration confirmed successfully!");
      } else {
        alert(`Failed to sync status: ${data.error || "Unknown error"}`);
      }
    } catch (error) {
      console.error("Error syncing payment status:", error);
      alert("Failed to sync payment status. Please try again.");
    }
  };

  if (loading)
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
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
    <div className="min-h-screen bg-slate-50/50 pb-12">
      <div className="mx-auto w-full max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        
        {/* Breadcrumb Navigation */}
        <div className="mb-6 flex items-center gap-1.5 text-xs font-semibold text-muted-foreground uppercase tracking-wide">
          <Link href="/admin/dashboard" className="hover:text-primary transition-colors">Admin</Link>
          <ChevronRight className="h-3.5 w-3.5 text-muted-foreground/60" />
          <span className="text-foreground">Registration List</span>
        </div>

        {/* Header Section */}
        <div className="mb-8 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl">
              Registration Dashboard
            </h1>
            <p className="text-muted-foreground mt-1.5 text-sm sm:text-base">
              Manage, monitor, and confirm conference registrations.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <Link href="/admin/abstractList" passHref>
              <Button variant="outline" className="h-10 text-xs sm:text-sm font-semibold rounded-xl bg-white shadow-sm gap-2">
                <FileText className="h-4 w-4" />
                Abstract List
              </Button>
            </Link>
            <Button
              onClick={handleExport}
              className="h-10 text-xs sm:text-sm font-semibold rounded-xl gap-2 shadow-sm"
            >
              <Download className="h-4 w-4" />
              Export to Excel
            </Button>
          </div>
        </div>

        {/* Statistics Cards */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4 mb-8">
          <Card className="border border-border/60 bg-white/70 backdrop-blur-sm shadow-sm hover:shadow-md transition-all duration-200">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <span className="text-xs font-bold text-muted-foreground uppercase tracking-wider">
                Total Registrations
              </span>
              <div className="h-8 w-8 rounded-lg bg-blue-500/10 flex items-center justify-center">
                <Users className="h-4.5 w-4.5 text-blue-600" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-extrabold tracking-tight text-slate-900">
                {totalRegistrations}
              </div>
              <p className="text-xs text-muted-foreground mt-1">
                Active participants registered
              </p>
            </CardContent>
          </Card>

          <Card className="border border-border/60 bg-white/70 backdrop-blur-sm shadow-sm hover:shadow-md transition-all duration-200">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <span className="text-xs font-bold text-muted-foreground uppercase tracking-wider">
                Confirmed Registrations
              </span>
              <div className="h-8 w-8 rounded-lg bg-emerald-500/10 flex items-center justify-center">
                <CheckCircle className="h-4.5 w-4.5 text-emerald-600" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-extrabold tracking-tight text-emerald-600">
                {confirmedRegistrations}
              </div>
              <p className="text-xs text-muted-foreground mt-1">
                {totalRegistrations > 0
                  ? `${Math.round((confirmedRegistrations / totalRegistrations) * 100)}% of total entries`
                  : "0% of total entries"}
              </p>
            </CardContent>
          </Card>

          <Card className="border border-border/60 bg-white/70 backdrop-blur-sm shadow-sm hover:shadow-md transition-all duration-200">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <span className="text-xs font-bold text-muted-foreground uppercase tracking-wider">
                Pending Approval
              </span>
              <div className="h-8 w-8 rounded-lg bg-amber-500/10 flex items-center justify-center">
                <Clock className="h-4.5 w-4.5 text-amber-600" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-extrabold tracking-tight text-amber-600">
                {pendingRegistrations}
              </div>
              <p className="text-xs text-muted-foreground mt-1">
                Awaiting administrative check
              </p>
            </CardContent>
          </Card>

          <Card className="border border-border/60 bg-white/70 backdrop-blur-sm shadow-sm hover:shadow-md transition-all duration-200">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <span className="text-xs font-bold text-muted-foreground uppercase tracking-wider">
                Payments Completed
              </span>
              <div className="h-8 w-8 rounded-lg bg-purple-500/10 flex items-center justify-center">
                <CreditCard className="h-4.5 w-4.5 text-purple-600" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-extrabold tracking-tight text-purple-600">
                {completedPayments}
              </div>
              <p className="text-xs text-muted-foreground mt-1">
                Verified payment logs
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Search, Info & Filtering controls */}
        <Card className="border border-border/60 bg-white/80 shadow-sm mb-6">
          <CardContent className="p-4 sm:p-5 flex flex-col sm:flex-row gap-4 items-center justify-between">
            <div className="relative w-full sm:max-w-md">
              <Search
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground/80"
                size={18}
              />
              <Input
                type="text"
                placeholder="Search by name, email, institution, phone..."
                value={searchTerm}
                onChange={handleSearch}
                className="w-full pl-9 h-10 border border-input rounded-xl focus-visible:ring-1 focus-visible:ring-primary shadow-sm bg-white"
              />
            </div>
            <div className="text-xs sm:text-sm font-medium text-muted-foreground whitespace-nowrap bg-slate-100/75 border px-3 py-1.5 rounded-lg flex items-center gap-1.5">
              <TrendingUp className="h-4 w-4 text-primary" />
              <span>Showing <strong>{filteredRegistrations.length}</strong> of <strong>{registrations.length}</strong> records</span>
            </div>
          </CardContent>
        </Card>

        {/* Registration Table Container */}
        <div className="shadow-lg hover:shadow-xl transition-all duration-300 rounded-xl overflow-hidden border border-border">
          <RegistrationTable
            registrations={filteredRegistrations}
            onDelete={handleDelete}
            onConfirmGroup={handleConfirmGroup}
            onConfirmIndividual={handleConfirmIndividual}
            onSyncStatus={handleSyncStatus}
          />
        </div>

      </div>
    </div>
  );
}
