"use client";

import React, { useState, useEffect, useMemo } from "react";
import Link from "next/link";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Abstract, exportAbstractsToExcel } from "@/lib/excelExport";
import AbstractTable from "./AbstractTable";
import {
  Search,
  Download,
  Users,
  CheckCircle,
  Clock,
  AlertCircle,
  ChevronRight,
  TrendingUp,
  FileText,
  SlidersHorizontal,
} from "lucide-react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface Filters {
  Status: string;
  search: string;
  sortBy: keyof Abstract;
  sortOrder: "asc" | "desc";
}

export function AbstractList() {
  const [abstracts, setAbstracts] = useState<Abstract[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [filters, setFilters] = useState<Filters>({
    Status: "all",
    search: "",
    sortBy: "createdAt",
    sortOrder: "desc",
  });

  const fetchAbstracts = async () => {
    try {
      setLoading(true);
      const response = await fetch(`/api/abstractList`);
      if (response.status === 404) {
        setAbstracts([]);
        setError(null);
        return;
      }
      const data = await response.json();

      if (response.ok) {
        setAbstracts(data.abstracts);
      } else {
        throw new Error(data.message);
      }
    } catch (err) {
      console.error(err);
      setError("An error occurred while fetching abstracts.");
      toast.error("Failed to load abstracts. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAbstracts();
  }, []);

  const handleStatusUpdate = async (
    abstractId: string,
    newStatus: string,
    comment?: string,
    presentationType?: string
  ) => {
    try {
      const response = await fetch(`/api/updateStatus?id=${abstractId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          status: newStatus,
          _id: abstractId,
          comment,
          presentationType,
        }),
      });

      if (response.ok) {
        setAbstracts((prevAbstracts) =>
          prevAbstracts.map((a) =>
            a._id === abstractId
              ? {
                  ...a,
                  Status: newStatus,
                  presentationType: presentationType || a.presentationType,
                }
              : a
          )
        );
        toast.success(`Status updated to ${newStatus}`);
      } else {
        const data = await response.json();
        throw new Error(data.message);
      }
    } catch (err) {
      console.error(err);
      toast.error("Failed to update status. Please try again.");
    }
  };

  const handleExportToExcel = () => {
    if (abstracts.length === 0) {
      toast.error("No abstracts to export.");
      return;
    }
    const fileName = `Abstracts_Export_${
      new Date().toISOString().split("T")[0]
    }`;
    exportAbstractsToExcel(abstracts, fileName);
    toast.success("Abstracts exported successfully!");
  };

  const filteredAndSortedAbstracts = useMemo(() => {
    let result = [...abstracts];

    // Apply Status filter
    if (filters.Status !== "all") {
      result = result.filter((abstract) => abstract.Status === filters.Status);
    }

    // Apply search filter
    if (filters.search) {
      const searchLower = filters.search.toLowerCase();
      result = result.filter(
        (abstract) =>
          abstract.title.toLowerCase().includes(searchLower) ||
          abstract.name.toLowerCase().includes(searchLower) ||
          abstract.email.toLowerCase().includes(searchLower) ||
          (abstract.whatsappNumber &&
            abstract.whatsappNumber.toLowerCase().includes(searchLower))
      );
    }

    // Apply sorting
    result.sort((a, b) => {
      if (a[filters.sortBy] < b[filters.sortBy])
        return filters.sortOrder === "asc" ? -1 : 1;
      if (a[filters.sortBy] > b[filters.sortBy])
        return filters.sortOrder === "asc" ? 1 : -1;
      return 0;
    });

    return result;
  }, [abstracts, filters]);

  // Calculate statistics
  const totalAbstracts = abstracts.filter((a) => a.Status !== "Delete").length;
  const acceptedAbstracts = abstracts.filter((a) => a.Status === "Accepted").length;
  const pendingAbstracts = abstracts.filter((a) => a.Status === "Pending").length;
  const revisionAbstracts = abstracts.filter((a) => a.Status === "Revision").length;

  return (
    <div className="min-h-screen bg-slate-50/50 pb-12">
      <ToastContainer position="top-right" autoClose={3000} />
      
      <div className="mx-auto w-full max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        
        {/* Breadcrumb Navigation */}
        <div className="mb-6 flex items-center gap-1.5 text-xs font-semibold text-muted-foreground uppercase tracking-wide">
          <Link href="/admin/dashboard" className="hover:text-primary transition-colors">Admin</Link>
          <ChevronRight className="h-3.5 w-3.5 text-muted-foreground/60" />
          <span className="text-foreground">Abstract Management</span>
        </div>

        {/* Header Section */}
        <div className="mb-8 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl">
              Abstract List
            </h1>
            <p className="text-muted-foreground mt-1.5 text-sm sm:text-base">
              Manage, review, and evaluate scientific abstracts submitted for the conference.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <Link href="/admin/registrationList" passHref>
              <Button variant="outline" className="h-10 text-xs sm:text-sm font-semibold rounded-xl bg-white shadow-sm gap-2">
                <Users className="h-4 w-4" />
                Registration List
              </Button>
            </Link>
            <Button
              onClick={handleExportToExcel}
              className="h-10 text-xs sm:text-sm font-semibold rounded-xl gap-2 shadow-sm bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600 border-0 text-white"
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
                Total Abstracts
              </span>
              <div className="h-8 w-8 rounded-lg bg-blue-500/10 flex items-center justify-center">
                <FileText className="h-4.5 w-4.5 text-blue-600" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-extrabold tracking-tight text-slate-900">
                {totalAbstracts}
              </div>
              <p className="text-xs text-muted-foreground mt-1">
                Submitted scientific entries
              </p>
            </CardContent>
          </Card>

          <Card className="border border-border/60 bg-white/70 backdrop-blur-sm shadow-sm hover:shadow-md transition-all duration-200">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <span className="text-xs font-bold text-muted-foreground uppercase tracking-wider">
                Accepted
              </span>
              <div className="h-8 w-8 rounded-lg bg-emerald-500/10 flex items-center justify-center">
                <CheckCircle className="h-4.5 w-4.5 text-emerald-600" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-extrabold tracking-tight text-emerald-600">
                {acceptedAbstracts}
              </div>
              <p className="text-xs text-muted-foreground mt-1">
                {totalAbstracts > 0
                  ? `${Math.round((acceptedAbstracts / totalAbstracts) * 100)}% approval rate`
                  : "0% approval rate"}
              </p>
            </CardContent>
          </Card>

          <Card className="border border-border/60 bg-white/70 backdrop-blur-sm shadow-sm hover:shadow-md transition-all duration-200">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <span className="text-xs font-bold text-muted-foreground uppercase tracking-wider">
                Pending Review
              </span>
              <div className="h-8 w-8 rounded-lg bg-amber-500/10 flex items-center justify-center">
                <Clock className="h-4.5 w-4.5 text-amber-600" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-extrabold tracking-tight text-amber-600">
                {pendingAbstracts}
              </div>
              <p className="text-xs text-muted-foreground mt-1">
                Awaiting referee assignment
              </p>
            </CardContent>
          </Card>

          <Card className="border border-border/60 bg-white/70 backdrop-blur-sm shadow-sm hover:shadow-md transition-all duration-200">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <span className="text-xs font-bold text-muted-foreground uppercase tracking-wider">
                Revision Required
              </span>
              <div className="h-8 w-8 rounded-lg bg-rose-500/10 flex items-center justify-center">
                <AlertCircle className="h-4.5 w-4.5 text-rose-600" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-extrabold tracking-tight text-rose-600">
                {revisionAbstracts}
              </div>
              <p className="text-xs text-muted-foreground mt-1">
                Sent back for corrections
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Search, Info & Filtering controls */}
        <Card className="border border-border/60 bg-white/80 shadow-sm mb-6">
          <CardContent className="p-4 sm:p-5 flex flex-col md:flex-row gap-4 items-center justify-between">
            <div className="relative w-full md:max-w-md">
              <Search
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground/80"
                size={18}
              />
              <Input
                type="text"
                placeholder="Search by title, presenter name, email..."
                value={filters.search}
                onChange={(e) =>
                  setFilters((prev) => ({ ...prev, search: e.target.value }))
                }
                className="w-full pl-9 h-10 border border-input rounded-xl focus-visible:ring-1 focus-visible:ring-primary shadow-sm bg-white"
              />
            </div>
            
            {/* Filter and Sort Options */}
            <div className="flex flex-wrap items-center gap-3 w-full md:w-auto">
              {/* Status Filter */}
              <div className="flex items-center gap-1.5 w-full sm:w-auto">
                <SlidersHorizontal className="h-4 w-4 text-muted-foreground/80 hidden sm:inline" />
                <select
                  value={filters.Status}
                  onChange={(e) =>
                    setFilters((prev) => ({ ...prev, Status: e.target.value }))
                  }
                  className="w-full sm:w-40 h-10 border border-input rounded-xl px-3 py-1.5 text-xs font-semibold focus:outline-none focus:ring-1 focus:ring-primary bg-white shadow-sm"
                >
                  <option value="all">All Statuses</option>
                  <option value="Pending">Pending</option>
                  <option value="InReview">In Review</option>
                  <option value="Revision">Revision</option>
                  <option value="Accepted">Accepted</option>
                </select>
              </div>

              {/* Sort By Field */}
              <select
                value={filters.sortBy}
                onChange={(e) =>
                  setFilters((prev) => ({ ...prev, sortBy: e.target.value as keyof Abstract }))
                }
                className="w-full sm:w-40 h-10 border border-input rounded-xl px-3 py-1.5 text-xs font-semibold focus:outline-none focus:ring-1 focus:ring-primary bg-white shadow-sm"
              >
                <option value="createdAt">Sort by Creation Date</option>
                <option value="title">Sort by Title</option>
                <option value="name">Sort by Name</option>
                <option value="email">Sort by Email</option>
                <option value="whatsappNumber">Sort by WhatsApp</option>
                <option value="Status">Sort by Review Status</option>
              </select>

              {/* Sort Order Direction */}
              <select
                value={filters.sortOrder}
                onChange={(e) =>
                  setFilters((prev) => ({ ...prev, sortOrder: e.target.value as "asc" | "desc" }))
                }
                className="w-full sm:w-32 h-10 border border-input rounded-xl px-3 py-1.5 text-xs font-semibold focus:outline-none focus:ring-1 focus:ring-primary bg-white shadow-sm"
              >
                <option value="desc">Descending</option>
                <option value="asc">Ascending</option>
              </select>

              <div className="text-xs sm:text-sm font-medium text-muted-foreground whitespace-nowrap bg-slate-100/75 border px-3 py-1.5 rounded-lg flex items-center gap-1.5 ml-auto sm:ml-0">
                <TrendingUp className="h-4 w-4 text-primary" />
                <span>Showing <strong>{filteredAndSortedAbstracts.length}</strong> of <strong>{abstracts.filter(a => a.Status !== "Delete").length}</strong></span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Abstract Table Container */}
        <div className="shadow-lg hover:shadow-xl transition-all duration-300 rounded-xl overflow-hidden border border-border">
          <AbstractTable
            abstracts={filteredAndSortedAbstracts}
            loading={loading}
            error={error}
            filters={filters}
            handleStatusUpdate={handleStatusUpdate}
          />
        </div>

      </div>
    </div>
  );
}

export default AbstractList;
