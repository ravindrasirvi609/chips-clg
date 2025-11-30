"use client";

import { useState } from "react";

interface ChartData {
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
  };
  registrationTypes: Record<string, number>;
  monthlyRegistrations: Record<string, number>;
}

interface DashboardChartsProps {
  chartData: ChartData;
}

const DonutChart = ({
  data,
  colors,
  title,
}: {
  data: Record<string, number>;
  colors: string[];
  title: string;
}) => {
  const total = Object.values(data).reduce((sum, value) => sum + value, 0);

  if (total === 0) {
    return (
      <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">{title}</h3>
        <div className="flex items-center justify-center h-48">
          <p className="text-gray-500">No data available</p>
        </div>
      </div>
    );
  }

  let currentAngle = 0;
  const radius = 70;
  const centerX = 100;
  const centerY = 100;

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100 hover:shadow-xl transition-shadow duration-300">
      <h3 className="text-lg font-semibold text-gray-800 mb-4">{title}</h3>
      <div className="flex items-center justify-between">
        <div className="relative">
          <svg width="200" height="200" className="transform -rotate-90">
            {Object.entries(data).map(([key, value], index) => {
              const percentage = (value / total) * 100;
              const angle = (percentage / 100) * 360;

              const startAngle = currentAngle;
              const endAngle = currentAngle + angle;
              currentAngle += angle;

              const startAngleRad = (startAngle * Math.PI) / 180;
              const endAngleRad = (endAngle * Math.PI) / 180;

              const largeArcFlag = angle > 180 ? 1 : 0;

              const x1 = centerX + radius * Math.cos(startAngleRad);
              const y1 = centerY + radius * Math.sin(startAngleRad);
              const x2 = centerX + radius * Math.cos(endAngleRad);
              const y2 = centerY + radius * Math.sin(endAngleRad);

              const pathData = [
                `M ${centerX} ${centerY}`,
                `L ${x1} ${y1}`,
                `A ${radius} ${radius} 0 ${largeArcFlag} 1 ${x2} ${y2}`,
                "Z",
              ].join(" ");

              return (
                <path
                  key={key}
                  d={pathData}
                  fill={colors[index % colors.length]}
                  className="hover:opacity-80 transition-opacity duration-200"
                />
              );
            })}
          </svg>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center">
              <p className="text-2xl font-bold text-gray-800">{total}</p>
              <p className="text-sm text-gray-600">Total</p>
            </div>
          </div>
        </div>

        <div className="space-y-2">
          {Object.entries(data).map(([key, value], index) => (
            <div key={key} className="flex items-center space-x-2">
              <div
                className="w-3 h-3 rounded-full"
                style={{ backgroundColor: colors[index % colors.length] }}
              />
              <span className="text-sm text-gray-700 capitalize">
                {key}: {value} ({Math.round((value / total) * 100)}%)
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const BarChart = ({
  data,
  title,
  color = "#3B82F6",
}: {
  data: Record<string, number>;
  title: string;
  color?: string;
}) => {
  const maxValue = Math.max(...Object.values(data));

  if (maxValue === 0) {
    return (
      <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">{title}</h3>
        <div className="flex items-center justify-center h-48">
          <p className="text-gray-500">No data available</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100 hover:shadow-xl transition-shadow duration-300">
      <h3 className="text-lg font-semibold text-gray-800 mb-4">{title}</h3>
      <div className="space-y-3">
        {Object.entries(data).map(([key, value]) => (
          <div key={key} className="flex items-center space-x-3">
            <div className="w-20 text-sm text-gray-600 capitalize">{key}</div>
            <div className="flex-1 relative">
              <div className="bg-gray-200 rounded-full h-6">
                <div
                  className="h-6 rounded-full transition-all duration-500 ease-out flex items-center justify-end pr-2"
                  style={{
                    width: `${(value / maxValue) * 100}%`,
                    backgroundColor: color,
                  }}
                >
                  <span className="text-xs text-white font-medium">
                    {value}
                  </span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default function DashboardCharts({ chartData }: DashboardChartsProps) {
  const [activeTab, setActiveTab] = useState<"overview" | "detailed">(
    "overview"
  );

  const paymentColors = ["#10B981", "#F59E0B", "#EF4444"];
  const abstractColors = ["#F59E0B", "#3B82F6", "#8B5CF6", "#10B981"];

  return (
    <div className="space-y-6">
      {/* Tab Navigation */}
      <div className="bg-white rounded-xl shadow-lg p-2 border border-gray-100">
        <div className="flex space-x-1">
          <button
            onClick={() => setActiveTab("overview")}
            className={`flex-1 px-6 py-3 rounded-lg text-sm font-medium transition-all duration-200 ${
              activeTab === "overview"
                ? "bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-lg"
                : "text-gray-600 hover:text-gray-800 hover:bg-gray-50"
            }`}
          >
            📊 Overview Charts
          </button>
          <button
            onClick={() => setActiveTab("detailed")}
            className={`flex-1 px-6 py-3 rounded-lg text-sm font-medium transition-all duration-200 ${
              activeTab === "detailed"
                ? "bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-lg"
                : "text-gray-600 hover:text-gray-800 hover:bg-gray-50"
            }`}
          >
            📈 Detailed Analytics
          </button>
        </div>
      </div>

      {activeTab === "overview" && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <DonutChart
            data={chartData.paymentStatus}
            colors={paymentColors}
            title="Payment Status Distribution"
          />

          <DonutChart
            data={chartData.abstractStatus}
            colors={abstractColors}
            title="Abstract Status Distribution"
          />
        </div>
      )}

      {activeTab === "detailed" && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <BarChart
            data={chartData.registrationTypes}
            title="Registration Types"
            color="#8B5CF6"
          />

          <BarChart
            data={chartData.monthlyRegistrations}
            title="Monthly Registrations"
            color="#10B981"
          />
        </div>
      )}
    </div>
  );
}
