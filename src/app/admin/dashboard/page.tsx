"use client";

import { useState, useEffect, useMemo } from "react";
import DashboardStats from "@/components/DashboardStats";
import DashboardCharts from "@/components/DashboardCharts";
import RecentActivities from "@/components/RecentActivities";
import DashboardSummary from "@/components/DashboardSummary";
import { Loader } from "@/components/Loader";
import { toast } from "react-toastify";
import { useCallback } from "react";

interface DashboardData {
  stats: {
    totalRegistrations: number;
    totalAbstracts: number;
    completedPayments: number;
    pendingPayments: number;
    failedPayments: number;
    accommodationRequests: number;
    galaDinnerInclusions: number;
    totalRevenue: number;
  };
  chartData: {
    paymentStatus: {
      completed: number;
      pending: number;
      failed: number;
    };
    abstractStatus: {
      Pending: number;
      InReview: number;
      Revision: number;
      Accepted: number;
      Rejected: number;
    };
    registrationTypes: Record<string, number>;
    monthlyRegistrations: Record<string, number>;
    genderDistribution: Record<string, number>;
    accommodationRequests: number;
    galaDinnerInclusions: number;
  };
  recentRegistrations: Array<{
    id: string;
    name: string;
    email: string;
    registrationType: string;
    registrationStatus: string;
    paymentStatus: string;
    createdAt: string;
    abstractSubmitted: boolean;
  }>;
  recentAbstracts: Array<{
    id: string;
    title: string;
    name: string;
    email: string;
    status: string;
    createdAt: string;
    presentationType: string;
  }>;
  summary: {
    paymentCompletionRate: number;
    abstractSubmissionRate: number;
    averagePaymentAmount: number;
  };
}

export default function AdminDashboard() {
  const [dashboardData, setDashboardData] = useState<DashboardData | null>(
    null
  );
  const [loading, setLoading] = useState(true);

  // Fixed date range - June 2025 onwards (using useMemo to prevent re-renders)
  const dateRange = useMemo(
    () => ({
      startDate: "2025-06-01", // June 1, 2025
      endDate: new Date().toISOString().split("T")[0], // Today
    }),
    []
  );

  const fetchDashboardData = useCallback(async () => {
    try {
      setLoading(true);
      const response = await fetch("/api/dashboard", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(dateRange),
      });

      if (!response.ok) {
        throw new Error("Failed to fetch dashboard data");
      }

      const data = await response.json();
      setDashboardData(data);
    } catch (error) {
      console.error("Error fetching dashboard data:", error);
      toast.error("Failed to load dashboard data");
    } finally {
      setLoading(false);
    }
  }, [dateRange]);

  useEffect(() => {
    fetchDashboardData();
  }, [fetchDashboardData]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader />
      </div>
    );
  }

  if (!dashboardData) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            No Data Available
          </h2>
          <p className="text-gray-600">Unable to load dashboard data</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="py-6">
            <div className="md:flex md:items-center md:justify-between">
              <div className="flex-1 min-w-0">
                <h1 className="text-2xl font-bold leading-tight text-gray-900 flex items-center">
                  <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg mr-3 flex items-center justify-center">
                    <span className="text-white text-sm font-bold">P</span>
                  </div>
                  Dashboard
                </h1>
                <p className="mt-1 text-sm text-gray-600">
                  Real-time insights and analytics for conference management
                </p>
              </div>
              <div className="mt-4 md:mt-0">
                <div className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-blue-50 to-purple-50 border border-blue-200 rounded-xl shadow-sm">
                  <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                  <span className="text-sm font-medium text-blue-800">
                    Live Data • June 2025+
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="space-y-6">
          {/* Statistics Cards */}
          <DashboardStats stats={dashboardData.stats} />

          {/* Key Insights Summary */}
          <DashboardSummary
            summary={dashboardData.summary}
            stats={dashboardData.stats}
          />

          {/* Charts Section */}
          <DashboardCharts chartData={dashboardData.chartData} />

          {/* Recent Activities */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <RecentActivities
              recentRegistrations={dashboardData.recentRegistrations}
              title="Recent Registrations"
              type="registrations"
            />
            <RecentActivities
              recentRegistrations={dashboardData.recentAbstracts}
              title="Recent Abstracts"
              type="abstracts"
            />
          </div>
        </div>
      </main>
    </div>
  );
}
