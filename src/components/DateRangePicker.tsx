"use client";

import { useState } from "react";
import { FiCalendar, FiChevronDown } from "react-icons/fi";

interface DateRangePickerProps {
  startDate: string;
  endDate: string;
  onChange: (dateRange: { startDate: string; endDate: string }) => void;
}

export default function DateRangePicker({
  startDate,
  endDate,
  onChange,
}: DateRangePickerProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [tempStartDate, setTempStartDate] = useState(startDate);
  const [tempEndDate, setTempEndDate] = useState(endDate);

  const handleApply = () => {
    onChange({ startDate: tempStartDate, endDate: tempEndDate });
    setIsOpen(false);
  };

  const handlePresetClick = (preset: string) => {
    const today = new Date();
    let newStartDate: string;
    const newEndDate = today.toISOString().split("T")[0];

    switch (preset) {
      case "today":
        newStartDate = today.toISOString().split("T")[0];
        break;
      case "week":
        const weekAgo = new Date(today);
        weekAgo.setDate(today.getDate() - 7);
        newStartDate = weekAgo.toISOString().split("T")[0];
        break;
      case "month":
        const monthAgo = new Date(today);
        monthAgo.setMonth(today.getMonth() - 1);
        newStartDate = monthAgo.toISOString().split("T")[0];
        break;
      case "quarter":
        const quarterAgo = new Date(today);
        quarterAgo.setMonth(today.getMonth() - 3);
        newStartDate = quarterAgo.toISOString().split("T")[0];
        break;
      case "year":
        const yearStart = new Date(today.getFullYear(), 0, 1);
        newStartDate = yearStart.toISOString().split("T")[0];
        break;
      default:
        return;
    }

    setTempStartDate(newStartDate);
    setTempEndDate(newEndDate);
    onChange({ startDate: newStartDate, endDate: newEndDate });
    setIsOpen(false);
  };

  const formatDateRange = () => {
    const start = new Date(startDate);
    const end = new Date(endDate);
    return `${start.toLocaleDateString()} - ${end.toLocaleDateString()}`;
  };

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-2 px-4 py-2 bg-white border border-gray-300 rounded-lg shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
      >
        <FiCalendar className="h-4 w-4 text-gray-500" />
        <span className="text-sm text-gray-700">{formatDateRange()}</span>
        <FiChevronDown
          className={`h-4 w-4 text-gray-500 transition-transform duration-200 ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-80 bg-white border border-gray-200 rounded-lg shadow-lg z-50">
          <div className="p-4">
            <h4 className="text-sm font-medium text-gray-900 mb-3">
              Select Date Range
            </h4>

            {/* Quick Presets */}
            <div className="grid grid-cols-2 gap-2 mb-4">
              <button
                onClick={() => handlePresetClick("today")}
                className="px-3 py-2 text-sm text-gray-700 bg-gray-100 rounded hover:bg-gray-200 transition-colors duration-200"
              >
                Today
              </button>
              <button
                onClick={() => handlePresetClick("week")}
                className="px-3 py-2 text-sm text-gray-700 bg-gray-100 rounded hover:bg-gray-200 transition-colors duration-200"
              >
                Last 7 days
              </button>
              <button
                onClick={() => handlePresetClick("month")}
                className="px-3 py-2 text-sm text-gray-700 bg-gray-100 rounded hover:bg-gray-200 transition-colors duration-200"
              >
                Last month
              </button>
              <button
                onClick={() => handlePresetClick("quarter")}
                className="px-3 py-2 text-sm text-gray-700 bg-gray-100 rounded hover:bg-gray-200 transition-colors duration-200"
              >
                Last 3 months
              </button>
              <button
                onClick={() => handlePresetClick("year")}
                className="px-3 py-2 text-sm text-gray-700 bg-gray-100 rounded hover:bg-gray-200 transition-colors duration-200 col-span-2"
              >
                This year
              </button>
            </div>

            {/* Custom Date Inputs */}
            <div className="space-y-3">
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">
                  Start Date
                </label>
                <input
                  type="date"
                  value={tempStartDate}
                  onChange={(e) => setTempStartDate(e.target.value)}
                  className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">
                  End Date
                </label>
                <input
                  type="date"
                  value={tempEndDate}
                  onChange={(e) => setTempEndDate(e.target.value)}
                  className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex justify-end space-x-2 mt-4">
              <button
                onClick={() => setIsOpen(false)}
                className="px-3 py-2 text-sm text-gray-700 bg-gray-100 rounded hover:bg-gray-200 transition-colors duration-200"
              >
                Cancel
              </button>
              <button
                onClick={handleApply}
                className="px-3 py-2 text-sm text-white bg-blue-600 rounded hover:bg-blue-700 transition-colors duration-200"
              >
                Apply
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
