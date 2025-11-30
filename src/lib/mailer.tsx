import { render } from "@react-email/render";
import { Text } from "@react-email/components";
import EmailTemplate from "./EmailTemplate";
import AbstractModel from "@/Model/AbstractModel";
import RegistrationModel from "@/Model/RegistrationModel";

type EmailType = "SUBMITTED" | "UPDATE_STATUS" | "REGISTRATION_SUCCESS";

interface SendEmailParams {
  _id: string;
  emailType: EmailType;
}

export const sendEmail = async ({
  _id,
  emailType,
}: // eslint-disable-next-line @typescript-eslint/no-explicit-any
SendEmailParams): Promise<any> => {
  try {
    // Validate email type
    if (
      !["SUBMITTED", "UPDATE_STATUS", "REGISTRATION_SUCCESS"].includes(
        emailType
      )
    ) {
      throw new Error(
        "Invalid emailType. It should be either 'SUBMITTED', 'UPDATE_STATUS', or 'REGISTRATION_SUCCESS'."
      );
    }

    // Check Resend API key
    const apiKey = process.env.RESEND_API_KEY;
    if (!apiKey) {
      throw new Error(
        "Missing Resend API key. Set the RESEND_API_KEY environment variable."
      );
    }

    // Set base URL
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";

    let abstract;
    let registration;
    let submissionDetailsUrl: string;
    let EMAIL: string;

    // Fetch registration or abstract based on email type
    if (emailType === "REGISTRATION_SUCCESS") {
      registration = await RegistrationModel.findOne({ _id });
      if (!registration) {
        throw new Error(`No registration found for id ${_id}`);
      }
      submissionDetailsUrl = `${baseUrl}/abstractForm/${registration._id}`;
      EMAIL = registration.email;
    } else {
      abstract = await AbstractModel.findOne({ _id });
      if (!abstract) {
        throw new Error(`No abstract found for id ${_id}`);
      }
      submissionDetailsUrl = `${baseUrl}/abstractForm/${abstract._id}`;
      EMAIL = abstract.email;
    }

    // Prepare email content based on email type
    let content: React.ReactNode;
    let subject: string = "";
    let buttonText: string = "";
    let buttonUrl: string = "";

    if (emailType === "SUBMITTED") {
      content = (
        <>
          <Text>Thank you for your submission!</Text>
          <Text>
            Your abstract has been successfully submitted. Your temporary
            abstract code is: <strong>{abstract.temporyAbstractCode}</strong>
          </Text>
          <Text>
            If you need to make any changes or have any questions, please
            don&apos;t hesitate to contact us.
          </Text>
        </>
      );
      subject = `Abstract Submission Confirmation - ${abstract.temporyAbstractCode}`;
      buttonText = "View Submission Details";
      buttonUrl = submissionDetailsUrl;
    } else if (emailType === "UPDATE_STATUS") {
      let statusSpecificContent: React.ReactNode = null;
      let codeToShow = abstract.temporyAbstractCode;
      const statusForSubject =
        abstract.Status === "Revision" ? "Revision required" : abstract.Status;

      if (abstract.Status === "Accepted") {
        codeToShow = abstract.AbstractCode;
        statusSpecificContent = (
          <>
            <Text>Congratulations! Your abstract has been accepted.</Text>
            <Text>
              Your official abstract Presentation code is:{" "}
              <strong>{abstract.AbstractCode}</strong>
            </Text>
            <Text>
              Presentation Type :{" "}
              <strong>{abstract.presentationType} presentation</strong>
            </Text>
          </>
        );
      } else if (abstract.Status === "Revision" && abstract.rejectionComment) {
        statusSpecificContent = (
          <>
            <Text>
              We regret to inform you that your abstract does not fully comply
              with the International Conference guidelines. Kindly revise your
              abstract according to the provided guidelines and reviewer
              comments. Please resubmit the abstract by clicking View Submission
              Details.
            </Text>
            <Text>
              <strong>
                Reviewer Committee Comments: {abstract.rejectionComment}
              </strong>
            </Text>
          </>
        );
      }

      content = (
        <>
          <Text>
            There has been an update to your abstract submission (Code:{" "}
            <strong>{codeToShow}</strong>).
          </Text>
          <Text>
            Current Status:{" "}
            <strong>
              {abstract.Status === "Revision"
                ? "Revision required"
                : abstract.Status}
            </strong>
          </Text>
          {statusSpecificContent}
          <Text>
            If you have any questions about this update, please contact our
            support team.
          </Text>
        </>
      );
      subject = `Abstract ${statusForSubject} - ${codeToShow}`;
      buttonText = "View Submission Details";
      buttonUrl = submissionDetailsUrl;
    } else if (emailType === "REGISTRATION_SUCCESS") {
      content = (
        <>
          <Text>Dear {registration.name},</Text>
          <Text>
            We are pleased to inform you that your registration for the
            conference has been successfully completed.
          </Text>
          <Text>Your registration details:</Text>
          <ul>
            <li>
              Registration Code:{" "}
              <strong>{registration.registrationCode}</strong>
            </li>
            <li>
              Registration Type:{" "}
              <strong>{registration.registrationType}</strong>
            </li>
            <li>
              Payment Status: <strong>Completed</strong>
            </li>
          </ul>
          <Text>
            If you have any questions or need further assistance, please
            don&apos;t hesitate to contact us.
          </Text>
          <Text>We look forward to seeing you at the conference!</Text>
        </>
      );
      subject = `Registration Successful - ${registration.registrationCode}`;
      buttonText = "View Registration Details";
      buttonUrl = submissionDetailsUrl;
    }

    // IMPORTANT: Await the render to get a string
    const emailHtml = await render(
      <EmailTemplate
        content={content}
        subject={subject}
        qrCodeUrl={abstract?.qrCodeUrl || registration?.qrCodeUrl}
        buttonText={buttonText}
        buttonUrl={buttonUrl}
      />
    );

    // Validate email
    if (!EMAIL) {
      throw new Error("Email address is empty or undefined");
    }

    if (!validateEmail(EMAIL)) {
      throw new Error(`Invalid email address: ${EMAIL}`);
    }

    // Simple email validation function
    function validateEmail(email: string): boolean {
      const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return re.test(email);
    }

    // Send email via Resend API
    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        from: "admin@opf.org.in",
        to: EMAIL,
        subject: subject,
        html: emailHtml, // Now this is definitely a string
      }),
    });

    // Handle response errors
    if (!response.ok) {
      const errorBody = await response.text();
      console.error("Full Error Response:", {
        status: response.status,
        statusText: response.statusText,
        body: errorBody,
      });
      throw new Error(`Error sending email: ${response.status} - ${errorBody}`);
    }

    // Return parsed response
    return await response.json();
  } catch (error) {
    console.error("Error sending email:", error);
    throw new Error(
      `Failed to send email: ${
        error instanceof Error ? error.message : String(error)
      }`
    );
  }
};
