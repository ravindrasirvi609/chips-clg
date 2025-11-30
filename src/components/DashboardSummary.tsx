import { FiTrendingUp, FiTrendingDown, FiTarget } from "react-icons/fi";

interface SummaryData {
  paymentCompletionRate: number;
  abstractSubmissionRate: number;
  averagePaymentAmount: number;
}

interface DashboardSummaryProps {
  summary: SummaryData;
  stats: {
    totalRegistrations: number;
    totalAbstracts: number;
    completedPayments: number;
    totalRevenue: number;
  };
}

const InsightCard = ({
  title,
  value,
  trend,
  icon: Icon,
  color,
  description,
}: {
  title: string;
  value: string | number;
  trend?: "up" | "down" | "neutral";
  icon: React.ElementType;
  color: string;
  description: string;
}) => {
  const getTrendIcon = () => {
    switch (trend) {
      case "up":
        return <FiTrendingUp className="h-4 w-4 text-green-500" />;
      case "down":
        return <FiTrendingDown className="h-4 w-4 text-red-500" />;
      default:
        return <FiTarget className="h-4 w-4 text-blue-500" />;
    }
  };

  return (
    <div
      className="bg-white rounded-xl shadow-lg p-6 border border-gray-100 hover:shadow-xl transition-shadow duration-300"
      style={{ borderColor: color }}
    >
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div
            className="p-2 rounded-lg"
            style={{ backgroundColor: `${color}20` }}
          >
            <Icon className="h-5 w-5" style={{ color }} />
          </div>
          <h4 className="text-sm font-medium text-gray-600 uppercase tracking-wide">
            {title}
          </h4>
        </div>
        {trend && getTrendIcon()}
      </div>

      <div className="mb-2">
        <p className="text-2xl font-bold text-gray-900">{value}</p>
      </div>

      <p className="text-sm text-gray-600">{description}</p>
    </div>
  );
};

export default function DashboardSummary({
  summary,
  stats,
}: DashboardSummaryProps) {
  // Calculate insights
  const getPaymentTrend = () => {
    if (summary.paymentCompletionRate >= 80) return "up";
    if (summary.paymentCompletionRate <= 50) return "down";
    return "neutral";
  };

  const getAbstractTrend = () => {
    if (summary.abstractSubmissionRate >= 70) return "up";
    if (summary.abstractSubmissionRate <= 30) return "down";
    return "neutral";
  };

  const insights = [
    {
      title: "Payment Success Rate",
      value: `${summary.paymentCompletionRate}%`,
      trend: getPaymentTrend() as "up" | "down" | "neutral",
      icon: FiTarget,
      color: "#10B981",
      description: `${stats.completedPayments} out of ${stats.totalRegistrations} payments completed`,
    },
    {
      title: "Abstract Submission Rate",
      value: `${summary.abstractSubmissionRate}%`,
      trend: getAbstractTrend() as "up" | "down" | "neutral",
      icon: FiTarget,
      color: "#3B82F6",
      description: `${stats.totalAbstracts} abstracts from ${stats.totalRegistrations} registrations`,
    },
  ];

  return (
    <div className="bg-gradient-to-br from-gray-50 to-blue-50 rounded-xl p-6 border border-gray-200">
      <div className="mb-6">
        <h3 className="text-xl font-bold text-gray-900 mb-2 flex items-center">
          <span className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg mr-3 flex items-center justify-center">
            <span className="text-white text-sm">💡</span>
          </span>
          Key Insights
        </h3>
        <p className="text-gray-600">Performance summary and trends</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {insights.map((insight, index) => (
          <InsightCard
            key={index}
            title={insight.title}
            value={insight.value}
            trend={insight.trend}
            icon={insight.icon}
            color={insight.color}
            description={insight.description}
          />
        ))}
      </div>

      {/* Quick recommendations */}
      <div className="mt-6 p-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl border border-blue-200">
        <h4 className="text-sm font-semibold text-blue-900 mb-2 flex items-center">
          <span className="mr-2">🎯</span>
          Smart Recommendations
        </h4>
        <ul className="text-sm text-blue-800 space-y-1">
          {summary.paymentCompletionRate < 70 && (
            <li>
              • Consider following up with participants who have pending
              payments
            </li>
          )}
          {summary.abstractSubmissionRate < 50 && (
            <li>
              • Send reminders to registered participants about abstract
              submission deadlines
            </li>
          )}
          {stats.totalRevenue > 0 && (
            <li>
              • Revenue collection is progressing well - consider promotional
              campaigns to boost registrations
            </li>
          )}
        </ul>
      </div>
    </div>
  );
}
