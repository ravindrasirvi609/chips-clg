import { indianStates } from "@/app/data";
import { useFirebaseStorage } from "@/app/hooks/useFirebaseStorage";
import { RegistrationFormData } from "@/lib/interface";
import axios from "axios";
import Image from "next/image";
import React, { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";

interface RegistrationFormProps {
  formData: RegistrationFormData;
  onInputChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => void;
  onImageUpload: (file: File) => Promise<void>;
  errors: { [key: string]: string };
  includeGalaDinner: boolean;
  handleGalaDinnerChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  selectedPlanName?: string;
  onBatchUpdate?: (updates: Partial<RegistrationFormData>) => void;
}

// Move FormField component outside of the main component to prevent re-creation
const FormField = ({
  label,
  name,
  type = "text",
  value,
  onChange,
  required = false,
  error,
  maxLength,
  note,
  children,
}: {
  label: string;
  name: string;
  type?: string;
  value: string;
  onChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => void;
  required?: boolean;
  error?: string;
  maxLength?: number;
  note?: string;
  children?: React.ReactNode;
}) => (
  <div className="mb-5">
    <label className="block text-gray-700 font-medium mb-2">{label}</label>
    {children || (
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        required={required}
        maxLength={maxLength}
        className={`w-full px-4 py-3 rounded-xl ${error
            ? "bg-red-50 border border-red-300"
            : "bg-white border border-gray-300"
          } text-gray-900 placeholder-gray-400 focus:border-primary focus:ring-1 focus:ring-primary focus:outline-none shadow-sm`}
      />
    )}
    {error && (
      <p className="text-red-400 text-sm mt-1 flex items-center">
        <span className="mr-1">⚠</span> {error}
      </p>
    )}
    {note && <p className="text-gray-500 text-sm mt-1">{note}</p>}
  </div>
);

const RegistrationForm: React.FC<RegistrationFormProps> = React.memo(
  ({
    formData,
    onInputChange,
    onImageUpload,
    errors,
    selectedPlanName,
    onBatchUpdate,
  }) => {
    const {
      uploadProgress,
      isUploading,
      error: uploadError,
    } = useFirebaseStorage();
    const [imageFile, setImageFile] = useState<File | null>(null);
    const [abstractError, setAbstractError] = useState("");
    const [isAbstractFetching, setIsAbstractFetching] = useState(false);
    const [abstractSubmitted, setAbstractSubmitted] = useState(false);
    const [abstractCode, setAbstractCode] = useState("");

    const handleAbstractSubmission = useCallback(async () => {
      setIsAbstractFetching(true);
      setAbstractError("");
      try {
        const response = await axios.get(`/api/abstract/${abstractCode}`);
        if (response.data) {
          if (onBatchUpdate) {
            // Use batch update if available
            onBatchUpdate({
              email: response.data.email,
              whatsappNumber: response.data.whatsappNumber,
              name: response.data.name,
              affiliation: response.data.affiliation,
              designation: response.data.designation,
              address: response.data.address,
              city: response.data.city,
              state: response.data.state,
              pincode: response.data.pincode,
              abstractId: response.data._id,
              abstractSubmitted: true,
            });
          } else {
            // Fallback to individual updates
            const batchedUpdates = [
              { name: "email", value: response.data.email },
              { name: "whatsappNumber", value: response.data.whatsappNumber },
              { name: "name", value: response.data.name },
              { name: "affiliation", value: response.data.affiliation },
              { name: "designation", value: response.data.designation },
              { name: "address", value: response.data.address },
              { name: "city", value: response.data.city },
              { name: "state", value: response.data.state },
              { name: "pincode", value: response.data.pincode },
              { name: "abstractId", value: response.data._id },
              { name: "abstractSubmitted", value: true },
            ];

            // Apply all updates
            batchedUpdates.forEach(({ name, value }) => {
              onInputChange({
                target: { name, value },
              } as React.ChangeEvent<HTMLInputElement>);
            });
          }
        }
      } catch (error) {
        console.error("Error fetching abstract details:", error);
        setAbstractError(
          "Failed to fetch abstract details. Please check your abstract code."
        );
      } finally {
        setIsAbstractFetching(false);
      }
    }, [abstractCode, onInputChange, onBatchUpdate]);

    const onDrop = useCallback(
      (acceptedFiles: File[]) => {
        if (acceptedFiles[0]) {
          setImageFile(acceptedFiles[0]);
          onImageUpload(acceptedFiles[0]);
        }
      },
      [onImageUpload]
    );

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
      onDrop,
      accept: {
        "image/*": [".jpeg", ".jpg", ".png"],
      },
      maxFiles: 1,
      multiple: false,
    });

    return (
      <div className="space-y-6">
        {/* Image Uploader */}
        <div className="mb-6">
          <label className="block text-gray-700 font-medium mb-2">
            Profile Picture
          </label>
          <div
            {...getRootProps()}
            className={`border-2 border-dashed rounded-xl p-6 text-center cursor-pointer transition-colors ${isDragActive
                ? "border-primary bg-primary/10"
                : "border-gray-300 hover:border-primary/50"
              }`}
          >
            <input {...getInputProps()} />
            {imageFile ? (
              <div className="flex flex-col items-center">
                <div className="w-32 h-32 rounded-full overflow-hidden border-2 border-primary mb-4">
                  <Image
                    src={URL.createObjectURL(imageFile)}
                    alt="Profile preview"
                    className="w-full h-full object-cover"
                    width={128}
                    height={128}
                  />
                </div>
                <p className="text-sm text-gray-600">{imageFile.name}</p>
              </div>
            ) : (
              <div>
                <p className="text-gray-600">
                  Drag & drop an image here, or click to select one
                </p>
                <p className="text-sm text-gray-500 mt-2">
                  (JPEG, JPG, or PNG, max 5MB)
                </p>
              </div>
            )}
          </div>
          {uploadError && (
            <p className="text-red-400 text-sm mt-2 flex items-center">
              <span className="mr-1">⚠</span> {uploadError}
            </p>
          )}
          {errors.imageUrl && (
            <p className="text-red-400 text-sm mt-1 flex items-center">
              <span className="mr-1">⚠</span> {errors.imageUrl}
            </p>
          )}
          {isUploading && (
            <div className="mt-2">
              <div className="bg-gray-200 rounded-full h-2.5">
                <div
                  className="bg-primary h-2.5 rounded-full"
                  style={{ width: `${uploadProgress}%` }}
                ></div>
              </div>
              <p className="text-sm text-gray-600 mt-1">
                Uploading: {uploadProgress}%
              </p>
            </div>
          )}
        </div>

        {/* Abstract Submission */}
        <div className="mb-6">
          <label className="flex items-center mb-2 text-gray-700">
            <input
              type="checkbox"
              checked={abstractSubmitted}
              onChange={(e) => setAbstractSubmitted(e.target.checked)}
              className="mr-2 rounded border-gray-300 text-primary focus:ring-primary"
            />
            I have submitted an abstract
          </label>
          {abstractSubmitted && (
            <div className="mt-3 space-y-3">
              <input
                type="text"
                value={abstractCode}
                onChange={(e) => setAbstractCode(e.target.value)}
                placeholder="Enter your abstract code"
                className="w-full px-4 py-3 rounded-xl bg-white border border-gray-300 text-gray-900 placeholder-gray-400 focus:border-primary focus:ring-1 focus:ring-primary focus:outline-none shadow-sm"
              />

              <button
                type="button"
                onClick={handleAbstractSubmission}
                disabled={isAbstractFetching}
                className={`px-5 py-2.5 rounded-full ${isAbstractFetching
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-primary text-white font-semibold hover:shadow-lg"
                  } transition-all duration-300`}
              >
                {isAbstractFetching ? "Fetching..." : "Fetch Abstract Details"}
              </button>
              {abstractError && (
                <p className="text-red-400 text-sm mt-1 flex items-center">
                  <span className="mr-1">⚠</span> {abstractError}
                </p>
              )}
            </div>
          )}
        </div>

        {/* Personal Information */}
        <div className="mb-5">
          <label className="block text-gray-700 font-medium mb-2">
            Salutation
          </label>
          <select
            name="Salutations"
            value={formData.Salutations}
            onChange={onInputChange}
            required
            className="w-full px-4 py-3 rounded-xl bg-white border border-gray-300 text-gray-900 placeholder-gray-400 focus:border-primary focus:ring-1 focus:ring-primary focus:outline-none shadow-sm"
          >
            <option value="Mr.">
              Mr.
            </option>
            <option value="Ms.">
              Ms.
            </option>
            <option value="Mrs.">
              Mrs.
            </option>
            <option value="Dr.">
              Dr.
            </option>
            <option value="Prof.">
              Prof.
            </option>
          </select>
        </div>

        <FormField
          label="Full Name"
          name="name"
          value={formData.name}
          onChange={onInputChange}
          required
          error={errors.name}
          note="Spelling should be correct. The same name will be printed on the certificate and cannot be changed after submission."
        />

        <FormField
          label="Email"
          name="email"
          type="email"
          value={formData.email}
          onChange={onInputChange}
          required
          error={errors.email}
        />

        <FormField
          label="WhatsApp Number"
          name="whatsappNumber"
          type="tel"
          value={formData.whatsappNumber}
          onChange={onInputChange}
          required
          error={errors.whatsappNumber}
          maxLength={10}
        />

        <div className="mb-5">
          <label className="block text-gray-700 font-medium mb-2">Gender</label>
          <select
            name="gender"
            value={formData.gender}
            onChange={onInputChange}
            required
            className="w-full px-4 py-3 rounded-xl bg-white border border-gray-300 text-gray-900 placeholder-gray-400 focus:border-primary focus:ring-1 focus:ring-primary focus:outline-none shadow-sm"
          >
            <option value="Male">
              Male
            </option>
            <option value="Female">
              Female
            </option>
            <option value="Other">
              Other
            </option>
          </select>
          {errors.gender && (
            <p className="text-red-400 text-sm mt-1 flex items-center">
              <span className="mr-1">⚠</span> {errors.gender}
            </p>
          )}
        </div>

        <FormField
          label="Date of Birth"
          name="dob"
          type="date"
          value={formData.dob}
          onChange={onInputChange}
          required
          error={errors.dob}
          note="Kindly enter correct Date of Birth to receive E-Certificate of conference on your Digilocker account linked with your Aadhar."
        />

        {/* <div className="mb-6">
        <label className="flex items-center mb-2 text-white">
          <input
            type="checkbox"
            name="includeGalaDinner"
            checked={includeGalaDinner}
            onChange={handleGalaDinnerChange}
            value={includeGalaDinner ? "true" : "false"}
            className="mr-2 rounded border-white/20 text-[#00CCFF] focus:ring-[#00CCFF]"
          />
          Include Networking Cum Gala Dinner (Additional ₹1000)
        </label>
      </div> */}

        <FormField
          label="Aadhar Number"
          name="AadharNumber"
          value={formData.AadharNumber}
          onChange={onInputChange}
          error={errors.AadharNumber}
          maxLength={12}
          note="Kindly enter correct Aadhar Number to receive E-Certificate of conference on your Digilocker account linked with your Aadhar."
        />

        <FormField
          label="Affiliation/Organization/Institution"
          name="affiliation"
          value={formData.affiliation}
          onChange={onInputChange}
          required
          error={errors.affiliation}
        />

        <FormField
          label="Designation"
          name="designation"
          value={formData.designation}
          onChange={onInputChange}
          required
          error={errors.designation}
        />

        {/* Address Information */}
        <FormField
          label="Address"
          name="address"
          value={formData.address}
          onChange={onInputChange}
          required
          error={errors.address}
        />

        <FormField
          label="City"
          name="city"
          value={formData.city}
          onChange={onInputChange}
          required
          error={errors.city}
        />

        <div className="mb-5">
          <label className="block text-gray-700 font-medium mb-2">State</label>
          <select
            name="state"
            value={formData.state}
            onChange={onInputChange}
            required
            className="w-full px-4 py-3 rounded-xl bg-white border border-gray-300 text-gray-900 placeholder-gray-400 focus:border-primary focus:ring-1 focus:ring-primary focus:outline-none shadow-sm"
          >
            <option value="" disabled>
              Select your state
            </option>
            {indianStates.map((state) => (
              <option key={state} value={state}>
                {state}
              </option>
            ))}
          </select>
          {errors.state && (
            <p className="text-red-400 text-sm mt-1 flex items-center">
              <span className="mr-1">⚠</span> {errors.state}
            </p>
          )}
        </div>

        <FormField
          label="Pincode"
          name="pincode"
          value={formData.pincode}
          onChange={onInputChange}
          required
          error={errors.pincode}
          maxLength={6}
        />

        <FormField
          label="Country"
          name="country"
          value={formData.country}
          onChange={onInputChange}
          required
          error={errors.country}
        />

        <div className="mb-5">
          <label className="flex items-center text-gray-700">
            <input
              type="checkbox"
              name="needAccommodation"
              checked={formData.needAccommodation}
              onChange={onInputChange}
              className="mr-2 rounded border-gray-300 text-primary focus:ring-primary"
            />
            Need Accommodation
          </label>
        </div>
      </div>
    );
  }
);

RegistrationForm.displayName = "RegistrationForm";

export default RegistrationForm;
