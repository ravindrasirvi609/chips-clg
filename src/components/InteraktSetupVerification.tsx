"use client";
import React, { useState, useEffect } from "react";

const InteraktSetupVerification: React.FC = () => {
  const [apiKeyStatus, setApiKeyStatus] = useState<
    "checking" | "found" | "missing"
  >("checking");
  const [apiKeyPreview, setApiKeyPreview] = useState<string>("");

  useEffect(() => {
    // Check if API key is configured (client-side check)
    fetch("/api/check-interakt-config")
      .then((res) => res.json())
      .then((data) => {
        if (data.configured) {
          setApiKeyStatus("found");
          setApiKeyPreview(data.preview);
        } else {
          setApiKeyStatus("missing");
        }
      })
      .catch(() => setApiKeyStatus("missing"));
  }, []);

  return (
    <div className="p-4 border rounded-lg mb-6">
      <h3 className="font-medium text-gray-800 mb-3">
        🔧 Interakt API Configuration Status
      </h3>

      <div className="space-y-2">
        <div className="flex items-center space-x-3">
          <div
            className={`w-3 h-3 rounded-full ${
              apiKeyStatus === "found"
                ? "bg-green-500"
                : apiKeyStatus === "missing"
                ? "bg-red-500"
                : "bg-yellow-500 animate-pulse"
            }`}
          ></div>
          <span className="text-sm">
            API Key:{" "}
            {apiKeyStatus === "checking"
              ? "Checking..."
              : apiKeyStatus === "found"
              ? `Configured (${apiKeyPreview})`
              : "Not Configured"}
          </span>
        </div>

        {apiKeyStatus === "missing" && (
          <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded text-sm">
            <p className="font-medium text-red-800 mb-2">❌ API Key Missing</p>
            <ol className="text-red-700 space-y-1 ml-4">
              <li>
                1. Get your API key from{" "}
                <a
                  href="https://app.interakt.ai/settings/developer-setting"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline"
                >
                  Interakt Developer Settings
                </a>
              </li>
              <li>
                2. Add it to your <code>.env.local</code> file:{" "}
                <code>INTERAKT_API_KEY=your_key_here</code>
              </li>
              <li>3. Restart your development server</li>
              <li>4. Refresh this page</li>
            </ol>
          </div>
        )}

        {apiKeyStatus === "found" && (
          <div className="mt-4 p-3 bg-green-50 border border-green-200 rounded text-sm">
            <p className="font-medium text-green-800 mb-2">
              ✅ API Key Configured
            </p>
            <p className="text-green-700">
              Your Interakt API key is properly configured. You can now test
              WhatsApp messages.
            </p>
            <p className="text-green-600 text-xs mt-1">
              Next step: Create your WhatsApp message templates in the Interakt
              dashboard.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default InteraktSetupVerification;
