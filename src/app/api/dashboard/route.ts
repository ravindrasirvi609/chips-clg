import { NextRequest, NextResponse } from "next/server";
import { connect } from "@/dbConfig/dbConfig";
import RegistrationModel from "@/Model/RegistrationModel";
import AbstractModel from "@/Model/AbstractModel";

export async function POST(req: NextRequest) {
  try {
    // Connect to the database
    await connect();

    // Parse the request body
    const body = await req.json();
    const { startDate, endDate } = body;

    // Create date objects
    const start = new Date(startDate);
    const end = new Date(endDate);
    end.setHours(23, 59, 59, 999); // Include the entire end date

    // Fetch data from your database
    const registrations = await RegistrationModel.find({
      createdAt: { $gte: start, $lte: end },
    }).sort({ createdAt: -1 });

    const abstracts = await AbstractModel.find({
      createdAt: { $gte: start, $lte: end },
    }).sort({ createdAt: -1 });

    // Calculate statistics
    const totalRegistrations = registrations.length;
    const totalAbstracts = abstracts.length;
    const completedPayments = registrations.filter(
      (r) => r.paymentStatus === "Completed"
    ).length;
    const pendingPayments = registrations.filter(
      (r) => r.paymentStatus === "Pending"
    ).length;
    const failedPayments = registrations.filter(
      (r) => r.paymentStatus === "Failed"
    ).length;

    // Abstract status breakdown
    const abstractStatusCounts = {
      Pending: abstracts.filter((a) => a.Status === "Pending").length,
      InReview: abstracts.filter((a) => a.Status === "InReview").length,
      Revision: abstracts.filter((a) => a.Status === "Revision").length,
      Accepted: abstracts.filter((a) => a.Status === "Accepted").length,
      Rejected: abstracts.filter((a) => a.Status === "Rejected").length,
    };

    // Registration type breakdown
    const registrationTypes = registrations.reduce((acc, reg) => {
      const type = reg.registrationType || "Unknown";
      acc[type] = (acc[type] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    // Monthly registrations (for trend analysis)
    const monthlyRegistrations = registrations.reduce((acc, reg) => {
      const month = new Date(reg.createdAt).toLocaleString("default", {
        month: "short",
        year: "2-digit",
      });
      acc[month] = (acc[month] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    // Additional statistics
    const accommodationRequests = registrations.filter(
      (r) => r.needAccommodation
    ).length;
    const galaDinnerInclusions = registrations.filter(
      (r) => r.includeGalaDinner
    ).length;
    const genderDistribution = registrations.reduce((acc, reg) => {
      const gender = reg.gender || "Not specified";
      acc[gender] = (acc[gender] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    // Prepare data for charts
    const chartData = {
      paymentStatus: {
        completed: completedPayments,
        pending: pendingPayments,
        failed: failedPayments,
      },
      abstractStatus: abstractStatusCounts,
      registrationTypes,
      monthlyRegistrations,
      genderDistribution,
      accommodationRequests,
      galaDinnerInclusions,
    };

    // Recent registrations with more details
    const recentRegistrations = registrations.slice(0, 10).map((reg) => ({
      id: reg._id,
      name: reg.name,
      email: reg.email,
      registrationType: reg.registrationType,
      registrationStatus: reg.registrationStatus,
      paymentStatus: reg.paymentStatus,
      createdAt: reg.createdAt,
      abstractSubmitted: reg.abstractSubmitted,
    }));

    // Recent abstracts
    const recentAbstracts = abstracts.slice(0, 10).map((abs) => ({
      id: abs._id,
      title: abs.title,
      name: abs.name,
      email: abs.email,
      status: abs.Status,
      createdAt: abs.createdAt,
      presentationType: abs.presentationType,
    }));

    // Calculate revenue (if payment amounts are available)
    const totalRevenue = registrations
      .filter((r) => r.paymentStatus === "Completed" && r.paymentAmount)
      .reduce((sum, r) => sum + (r.paymentAmount || 0), 0);

    // Prepare the response data
    const responseData = {
      stats: {
        totalRegistrations,
        totalAbstracts,
        completedPayments,
        pendingPayments,
        failedPayments,
        accommodationRequests,
        galaDinnerInclusions,
        totalRevenue,
      },
      chartData,
      recentRegistrations,
      recentAbstracts,
      summary: {
        paymentCompletionRate:
          totalRegistrations > 0
            ? Math.round((completedPayments / totalRegistrations) * 100)
            : 0,
        abstractSubmissionRate:
          totalRegistrations > 0
            ? Math.round((totalAbstracts / totalRegistrations) * 100)
            : 0,
        averagePaymentAmount:
          completedPayments > 0
            ? Math.round(totalRevenue / completedPayments)
            : 0,
      },
    };

    // Return the response
    return NextResponse.json(responseData);
  } catch (error) {
    console.error("Dashboard API Error:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
