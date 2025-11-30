import {
  FiUsers,
  FiFileText,
  FiDollarSign,
  FiClock,
  FiHome,
  FiCoffee,
} from "react-icons/fi";

interface StatsData {
  totalRegistrations: number;
  totalAbstracts: number;
  completedPayments: number;
  pendingPayments: number;
  failedPayments: number;
  accommodationRequests: number;
  galaDinnerInclusions: number;
  totalRevenue: number;
}

interface DashboardStatsProps {
  stats: StatsData;
}

const StatCard = ({
  title,
  value,
  icon: Icon,
  bgColor,
  textColor,
  description,
}: {
  title: string;
  value: number;
  icon: React.ElementType;
  bgColor: string;
  textColor: string;
  description?: string;
}) => (
  <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border border-gray-100">
    <div className="flex items-center justify-between">
      <div className="flex-1">
        <p className="text-sm font-medium text-gray-600 uppercase tracking-wide mb-2">
          {title}
        </p>
        <p className={`text-3xl font-bold ${textColor} mb-1`}>
          {value.toLocaleString()}
        </p>
        {description && <p className="text-sm text-gray-500">{description}</p>}
      </div>
      <div className={`${bgColor} p-4 rounded-xl shadow-lg`}>
        <Icon className={`h-8 w-8 ${textColor}`} />
      </div>
    </div>
  </div>
);

export default function DashboardStats({ stats }: DashboardStatsProps) {
  const paymentCompletionRate =
    stats.totalRegistrations > 0
      ? Math.round((stats.completedPayments / stats.totalRegistrations) * 100)
      : 0;

  const abstractSubmissionRate =
    stats.totalRegistrations > 0
      ? Math.round((stats.totalAbstracts / stats.totalRegistrations) * 100)
      : 0;

  return (
    <div className="space-y-8">
      {/* Primary Stats */}
      <div>
        <h2 className="text-lg font-semibold text-gray-900 mb-4">
          Overview Statistics
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatCard
            title="Total Registrations"
            value={stats.totalRegistrations}
            icon={FiUsers}
            bgColor="bg-gradient-to-br from-blue-500 to-blue-600"
            textColor="text-blue-600"
            description="All registered participants"
          />

          <StatCard
            title="Total Abstracts"
            value={stats.totalAbstracts}
            icon={FiFileText}
            bgColor="bg-gradient-to-br from-green-500 to-green-600"
            textColor="text-green-600"
            description={`${abstractSubmissionRate}% submission rate`}
          />

          <StatCard
            title="Completed Payments"
            value={stats.completedPayments}
            icon={FiDollarSign}
            bgColor="bg-gradient-to-br from-emerald-500 to-emerald-600"
            textColor="text-emerald-600"
            description={`${paymentCompletionRate}% completion rate`}
          />

          <StatCard
            title="Pending Payments"
            value={stats.pendingPayments}
            icon={FiClock}
            bgColor="bg-gradient-to-br from-amber-500 to-amber-600"
            textColor="text-amber-600"
            description="Awaiting payment"
          />
        </div>
      </div>

      {/* Secondary Stats */}
      <div>
        <h2 className="text-lg font-semibold text-gray-900 mb-4">
          Additional Metrics
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatCard
            title="Failed Payments"
            value={stats.failedPayments}
            icon={FiClock}
            bgColor="bg-gradient-to-br from-red-500 to-red-600"
            textColor="text-red-600"
            description="Payment failures"
          />

          <StatCard
            title="Accommodation Requests"
            value={stats.accommodationRequests}
            icon={FiHome}
            bgColor="bg-gradient-to-br from-purple-500 to-purple-600"
            textColor="text-purple-600"
            description="Need accommodation"
          />

          <StatCard
            title="Gala Dinner Inclusions"
            value={stats.galaDinnerInclusions}
            icon={FiCoffee}
            bgColor="bg-gradient-to-br from-orange-500 to-orange-600"
            textColor="text-orange-600"
            description="Dinner included"
          />
        </div>
      </div>
    </div>
  );
}
