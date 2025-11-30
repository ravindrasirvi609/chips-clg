import {
  FiUser,
  FiMail,
  FiTag,
  FiCheckCircle,
  FiClock,
  FiFileText,
} from "react-icons/fi";

interface RecentRegistration {
  id: string;
  name: string;
  email: string;
  registrationType?: string;
  registrationStatus?: string;
  paymentStatus?: string;
  createdAt?: string;
  abstractSubmitted?: boolean;
  // For abstracts
  title?: string;
  status?: string;
  presentationType?: string;
}

interface RecentActivitiesProps {
  recentRegistrations: RecentRegistration[];
  title?: string;
  type?: "registrations" | "abstracts";
}

const getStatusIcon = (status: string) => {
  switch (status.toLowerCase()) {
    case "confirmed":
      return <FiCheckCircle className="h-4 w-4 text-green-500" />;
    case "pending":
      return <FiClock className="h-4 w-4 text-yellow-500" />;
    default:
      return <FiClock className="h-4 w-4 text-gray-500" />;
  }
};

const getStatusBadgeColor = (status: string) => {
  switch (status.toLowerCase()) {
    case "confirmed":
      return "bg-green-100 text-green-800";
    case "pending":
      return "bg-yellow-100 text-yellow-800";
    default:
      return "bg-gray-100 text-gray-800";
  }
};

export default function RecentActivities({
  recentRegistrations,
  title = "Recent Activities",
  type = "registrations",
}: RecentActivitiesProps) {
  const isAbstractsType = type === "abstracts";

  return (
    <div className="bg-white rounded-xl shadow-lg border border-gray-100 hover:shadow-xl transition-shadow duration-300">
      <div className="px-6 py-4 border-b border-gray-200 bg-gradient-to-r from-gray-50 to-gray-100 rounded-t-xl">
        <h3 className="text-lg font-semibold text-gray-800">{title}</h3>
        <p className="text-sm text-gray-600 mt-1">
          {isAbstractsType
            ? "Latest abstract submissions"
            : "Latest participant registrations"}
        </p>
      </div>

      <div className="p-6">
        {recentRegistrations.length === 0 ? (
          <div className="text-center py-8">
            {isAbstractsType ? (
              <FiFileText className="h-12 w-12 text-gray-400 mx-auto mb-3" />
            ) : (
              <FiUser className="h-12 w-12 text-gray-400 mx-auto mb-3" />
            )}
            <p className="text-gray-500">
              {isAbstractsType
                ? "No recent abstracts"
                : "No recent registrations"}
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {recentRegistrations.map((registration) => (
              <div
                key={registration.id}
                className="flex items-center justify-between p-4 border border-gray-100 rounded-xl hover:bg-gradient-to-r hover:from-gray-50 hover:to-blue-50 transition-all duration-200 hover:shadow-md"
              >
                <div className="flex items-center space-x-4">
                  <div className="flex-shrink-0">
                    <div
                      className={`h-10 w-10 rounded-full flex items-center justify-center ${
                        isAbstractsType ? "bg-green-100" : "bg-blue-100"
                      }`}
                    >
                      {isAbstractsType ? (
                        <FiFileText
                          className={`h-5 w-5 ${
                            isAbstractsType ? "text-green-600" : "text-blue-600"
                          }`}
                        />
                      ) : (
                        <FiUser className="h-5 w-5 text-blue-600" />
                      )}
                    </div>
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center space-x-2">
                      <p className="text-sm font-medium text-gray-900 truncate">
                        {isAbstractsType
                          ? registration.title || "Untitled Abstract"
                          : registration.name}
                      </p>
                      {!isAbstractsType &&
                        registration.registrationStatus &&
                        getStatusIcon(registration.registrationStatus)}
                      {isAbstractsType &&
                        registration.status &&
                        getStatusIcon(registration.status)}
                    </div>

                    <div className="flex items-center space-x-4 mt-1">
                      <div className="flex items-center space-x-1">
                        <FiMail className="h-3 w-3 text-gray-400" />
                        <p className="text-xs text-gray-500 truncate">
                          {registration.email}
                        </p>
                      </div>

                      {!isAbstractsType && registration.registrationType && (
                        <div className="flex items-center space-x-1">
                          <FiTag className="h-3 w-3 text-gray-400" />
                          <p className="text-xs text-gray-500">
                            {registration.registrationType}
                          </p>
                        </div>
                      )}

                      {isAbstractsType && registration.presentationType && (
                        <div className="flex items-center space-x-1">
                          <FiTag className="h-3 w-3 text-gray-400" />
                          <p className="text-xs text-gray-500">
                            {registration.presentationType}
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                <div className="flex-shrink-0">
                  <span
                    className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusBadgeColor(
                      isAbstractsType
                        ? registration.status || "pending"
                        : registration.registrationStatus || "pending"
                    )}`}
                  >
                    {isAbstractsType
                      ? registration.status || "Pending"
                      : registration.registrationStatus || "Pending"}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}

        {recentRegistrations.length > 0 && (
          <div className="mt-6 text-center border-t border-gray-100 pt-4">
            <button className="text-sm text-blue-600 hover:text-blue-800 font-medium transition-colors duration-200 hover:underline">
              {isAbstractsType
                ? "View All Abstracts →"
                : "View All Registrations →"}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
