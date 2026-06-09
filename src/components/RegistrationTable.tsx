import Link from "next/link";
import React from "react";
import {
  Trash2,
  CheckCircle,
  AlertCircle,
  Clock,
  UserCheck,
  Building2,
  Mail,
  Phone,
  Calendar,
  RefreshCw,
} from "lucide-react";
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

interface Registration {
  _id: string;
  name: string;
  email: string;
  registrationType: string;
  paymentStatus: string;
  registrationStatus: string;
  createdAt: string;
  registrationCode: string;
  affiliation: string;
  whatsappNumber: string;
  includeGalaDinner: boolean;
}

interface RegistrationTableProps {
  registrations: Registration[];
  onDelete?: (id: string) => void;
  onConfirmGroup?: (id: string) => void;
  onConfirmIndividual?: (id: string) => void;
  onSyncStatus?: (id: string) => void;
}

const RegistrationTable: React.FC<RegistrationTableProps> = ({
  registrations,
  onDelete,
  onConfirmGroup,
  onConfirmIndividual,
  onSyncStatus,
}) => {
  const handleDelete = async (id: string, paymentStatus: string) => {
    if (paymentStatus === "Completed") {
      alert("Cannot delete registration with completed payment status");
      return;
    }

    if (onDelete) {
      onDelete(id);
    }
  };

  const handleConfirmGroup = async (id: string) => {
    if (onConfirmGroup) {
      onConfirmGroup(id);
    }
  };

  const handleConfirmIndividual = async (id: string) => {
    if (onConfirmIndividual) {
      onConfirmIndividual(id);
    }
  };

  const handleSyncStatus = async (id: string) => {
    if (onSyncStatus) {
      onSyncStatus(id);
    }
  };

  const getPaymentBadge = (status: string) => {
    switch (status) {
      case "Completed":
        return (
          <Badge variant="success" className="gap-1 px-2.5 py-1">
            <CheckCircle className="h-3 w-3" />
            Completed
          </Badge>
        );
      case "Pending":
        return (
          <Badge variant="warning" className="gap-1 px-2.5 py-1">
            <Clock className="h-3 w-3" />
            Pending
          </Badge>
        );
      case "Failed":
        return (
          <Badge variant="destructive" className="gap-1 px-2.5 py-1">
            <AlertCircle className="h-3 w-3" />
            Failed
          </Badge>
        );
      default:
        return <Badge variant="outline" className="px-2.5 py-1">{status}</Badge>;
    }
  };

  const getRegistrationBadge = (status: string) => {
    switch (status) {
      case "Confirmed":
        return (
          <Badge variant="success" className="gap-1 px-2.5 py-1">
            <UserCheck className="h-3 w-3" />
            Confirmed
          </Badge>
        );
      case "Pending":
        return (
          <Badge variant="warning" className="gap-1 px-2.5 py-1">
            <Clock className="h-3 w-3" />
            Pending
          </Badge>
        );
      default:
        return <Badge variant="outline" className="px-2.5 py-1">{status}</Badge>;
    }
  };

  return (
    <div className="rounded-xl border border-border bg-white overflow-hidden shadow-sm">
      <Table>
        <TableHeader>
          <TableRow className="bg-slate-50/75 hover:bg-slate-50/75">
            <TableHead className="font-bold py-4">Regn ID</TableHead>
            <TableHead className="font-bold py-4">Participant Details</TableHead>
            <TableHead className="font-bold py-4">Registration Type</TableHead>
            <TableHead className="font-bold py-4">Payment Status</TableHead>
            <TableHead className="font-bold py-4">Registration Status</TableHead>
            <TableHead className="font-bold py-4">Institution / Organization</TableHead>
            <TableHead className="font-bold py-4">Date</TableHead>
            <TableHead className="font-bold py-4 text-right pr-6">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {registrations.length === 0 ? (
            <TableRow>
              <TableCell colSpan={8} className="h-24 text-center">
                <div className="flex flex-col items-center justify-center py-6 text-muted-foreground">
                  <AlertCircle size={36} className="mb-2 text-muted-foreground/60" />
                  <p className="font-medium text-base">No registrations found</p>
                  <p className="text-xs">Adjust your search parameters and try again.</p>
                </div>
              </TableCell>
            </TableRow>
          ) : (
            registrations.map((registration) => (
              <TableRow
                key={registration._id}
                className={`transition-colors border-b hover:bg-slate-50/50 ${
                  registration.includeGalaDinner
                    ? "bg-pink-50/30 hover:bg-pink-50/50"
                    : ""
                }`}
              >
                {/* Registration Code */}
                <TableCell className="font-mono text-xs font-semibold py-3.5">
                  {registration.registrationCode || (
                    <span className="text-muted-foreground italic font-sans font-normal text-xs">Pending</span>
                  )}
                </TableCell>

                {/* Participant Info */}
                <TableCell className="py-3.5">
                  <div className="flex flex-col">
                    <Link
                      href={`/abstractForm/${registration._id}`}
                      className="font-semibold text-primary hover:text-primary/80 hover:underline text-sm transition-all flex items-center gap-1"
                    >
                      {registration.name}
                    </Link>
                    <div className="flex flex-col gap-1 mt-1 text-xs text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <Mail className="h-3 w-3 text-muted-foreground/75" />
                        {registration.email}
                      </span>
                      <span className="flex items-center gap-1">
                        <Phone className="h-3 w-3 text-muted-foreground/75" />
                        {registration.whatsappNumber}
                      </span>
                    </div>
                  </div>
                </TableCell>

                {/* Registration Type */}
                <TableCell className="py-3.5">
                  <Badge
                    variant={registration.registrationType === "Group" ? "secondary" : "outline"}
                    className="px-2.5 py-0.5"
                  >
                    {registration.registrationType}
                  </Badge>
                </TableCell>

                {/* Payment Status */}
                <TableCell className="py-3.5">
                  {getPaymentBadge(registration.paymentStatus)}
                </TableCell>

                {/* Registration Status */}
                <TableCell className="py-3.5">
                  {getRegistrationBadge(registration.registrationStatus)}
                </TableCell>

                {/* Affiliation / Institution */}
                <TableCell className="py-3.5 max-w-[200px] truncate">
                  <div className="flex items-center gap-1.5 text-sm" title={registration.affiliation}>
                    <Building2 className="h-3.5 w-3.5 text-muted-foreground/75 flex-shrink-0" />
                    <span className="truncate">{registration.affiliation || "N/A"}</span>
                  </div>
                </TableCell>

                {/* Registration Date */}
                <TableCell className="py-3.5 whitespace-nowrap text-muted-foreground text-xs">
                  <div className="flex items-center gap-1">
                    <Calendar className="h-3 w-3" />
                    {new Date(registration.createdAt).toLocaleDateString(undefined, {
                      year: "numeric",
                      month: "short",
                      day: "numeric",
                    })}
                  </div>
                </TableCell>

                {/* Actions */}
                <TableCell className="py-3.5 text-right pr-6">
                  <div className="flex items-center justify-end gap-2">
                    {registration.registrationType === "Group" &&
                      registration.registrationStatus === "Pending" && (
                        <Button
                          onClick={() => handleConfirmGroup(registration._id)}
                          variant="success"
                          size="sm"
                          className="h-8 text-xs font-semibold px-2.5 gap-1 rounded-lg"
                        >
                          <CheckCircle className="h-3 w-3" />
                          Confirm Group
                        </Button>
                      )}
                    {registration.registrationType !== "Group" &&
                      registration.registrationStatus === "Pending" && (
                        <>
                          <Button
                            onClick={() => handleSyncStatus(registration._id)}
                            variant="outline"
                            size="sm"
                            className="h-8 text-xs font-semibold px-2.5 gap-1 rounded-lg border-primary text-primary hover:bg-primary/10"
                          >
                            <RefreshCw className="h-3 w-3" />
                            Sync
                          </Button>
                          <Button
                            onClick={() => handleConfirmIndividual(registration._id)}
                            variant="default"
                            size="sm"
                            className="h-8 text-xs font-semibold px-2.5 gap-1 rounded-lg"
                          >
                            <UserCheck className="h-3 w-3" />
                            Confirm Ind.
                          </Button>
                        </>
                      )}
                    <Button
                      onClick={() =>
                        handleDelete(registration._id, registration.paymentStatus)
                      }
                      disabled={registration.paymentStatus === "Completed"}
                      variant="destructive"
                      size="sm"
                      className="h-8 text-xs font-semibold px-2.5 gap-1 rounded-lg"
                    >
                      <Trash2 className="h-3 w-3" />
                      Delete
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default RegistrationTable;
