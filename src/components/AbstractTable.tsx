import React, { useState, useCallback } from "react";
import Link from "next/link";
import {
  Download,
  MoreVertical,
  Mail,
  Phone,
  Building2,
  Calendar,
  AlertCircle,
  CheckCircle2,
  Clock,
  Sparkles,
  FileText,
  User,
  ChevronRight,
  BookOpen,
} from "lucide-react";
import { Abstract } from "@/lib/excelExport";
import { designationOptions } from "@/app/data";
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
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";

interface Filters {
  Status: string;
  search: string;
  sortBy: keyof Abstract;
  sortOrder: "asc" | "desc";
}

interface AbstractTableProps {
  abstracts: Abstract[];
  loading: boolean;
  error: string | null;
  filters: Filters;
  handleStatusUpdate: (
    abstractId: string,
    newStatus: string,
    comment?: string,
    presentationType?: string
  ) => Promise<void>;
}

const AbstractTable: React.FC<AbstractTableProps> = ({
  abstracts,
  loading,
  error,
  handleStatusUpdate,
}) => {
  const filteredAbstracts = abstracts.filter(
    (abstract) => abstract.Status !== "Delete"
  );

  const [rejectDialog, setRejectDialog] = useState<{
    isOpen: boolean;
    abstractId: string | null;
  }>({
    isOpen: false,
    abstractId: null,
  });

  const [rejectComment, setRejectComment] = useState("");

  const [presentationTypeDialog, setPresentationTypeDialog] = useState<{
    isOpen: boolean;
    abstractId: string | null;
  }>({
    isOpen: false,
    abstractId: null,
  });

  const [statusDialog, setStatusDialog] = useState<{
    isOpen: boolean;
    abstractId: string | null;
  }>({
    isOpen: false,
    abstractId: null,
  });

  const handleDownload = useCallback((abstract: Abstract) => {
    window.open(abstract.abstractFileUrl, "_blank");
  }, []);

  const getDesignationLabel = useCallback((value: string) => {
    const designation = designationOptions.find(
      (option: { value: string; label: string }) => option.value === value
    );
    return designation ? designation.label : "Unknown Designation";
  }, []);

  const handleStatusUpdateClick = useCallback(
    (abstract: Abstract, newStatus: string) => {
      if (newStatus === "Revision") {
        setRejectDialog({ isOpen: true, abstractId: abstract._id });
        setRejectComment("");
      } else if (newStatus === "Accepted") {
        setPresentationTypeDialog({ isOpen: true, abstractId: abstract._id });
      } else {
        handleStatusUpdate(abstract._id, newStatus);
      }
      setStatusDialog({ isOpen: false, abstractId: null });
    },
    [handleStatusUpdate]
  );

  const handleRejectConfirm = useCallback(async () => {
    if (rejectDialog.abstractId) {
      await handleStatusUpdate(rejectDialog.abstractId, "Revision", rejectComment);
      setRejectDialog({ isOpen: false, abstractId: null });
      setRejectComment("");
    }
  }, [rejectDialog.abstractId, rejectComment, handleStatusUpdate]);

  const handlePresentationTypeSelect = useCallback((type: string) => {
    if (presentationTypeDialog.abstractId && type) {
      handleStatusUpdate(
        presentationTypeDialog.abstractId,
        "Accepted",
        undefined,
        type
      );
      setPresentationTypeDialog({ isOpen: false, abstractId: null });
    }
  }, [presentationTypeDialog.abstractId, handleStatusUpdate]);

  const getStatusBadge = (status: string, presentationType?: string) => {
    switch (status) {
      case "Accepted":
        return (
          <div className="flex flex-col gap-1 items-start">
            <Badge variant="success" className="gap-1 px-2 py-0.5">
              <CheckCircle2 className="h-3 w-3" />
              Accepted
            </Badge>
            {presentationType && (
              <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 px-1.5 py-0.5 rounded border border-emerald-200">
                {presentationType}
              </span>
            )}
          </div>
        );
      case "Revision":
        return (
          <Badge variant="destructive" className="gap-1 px-2 py-0.5">
            <AlertCircle className="h-3 w-3" />
            Revision
          </Badge>
        );
      case "InReview":
        return (
          <Badge variant="info" className="gap-1 px-2 py-0.5">
            <Clock className="h-3 w-3" />
            In Review
          </Badge>
        );
      case "Pending":
      default:
        return (
          <Badge variant="warning" className="gap-1 px-2 py-0.5">
            <Clock className="h-3 w-3" />
            Pending
          </Badge>
        );
    }
  };

  const getRegBadge = (completed: boolean) => {
    return completed ? (
      <Badge variant="success" className="px-2 py-0.5">Complete</Badge>
    ) : (
      <Badge variant="destructive" className="px-2 py-0.5">Incomplete</Badge>
    );
  };

  if (loading) {
    return (
      <div className="space-y-4 animate-pulse">
        <div className="h-12 bg-slate-200/60 rounded-xl w-full"></div>
        {[...Array(6)].map((_, index) => (
          <div key={index} className="h-20 bg-slate-200/40 rounded-xl w-full"></div>
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-12 bg-white border border-border rounded-2xl p-8 shadow-sm">
        <AlertCircle className="h-12 w-12 text-destructive mx-auto mb-4" />
        <h3 className="text-lg font-bold text-foreground">Oops! Something went wrong</h3>
        <p className="text-muted-foreground text-sm mt-1 mb-4">We couldn't fetch the scientific abstracts list.</p>
        <Button onClick={() => window.location.reload()} size="sm">
          Retry Connection
        </Button>
      </div>
    );
  }

  return (
    <div className="rounded-xl border border-border bg-white overflow-hidden shadow-sm">
      <Table>
        <TableHeader>
          <TableRow className="bg-slate-50/75 hover:bg-slate-50/75">
            <TableHead className="font-bold py-4">Abstract Details</TableHead>
            <TableHead className="font-bold py-4">Author Details</TableHead>
            <TableHead className="font-bold py-4">Institution/Designation</TableHead>
            <TableHead className="font-bold py-4">Modes & Article Type</TableHead>
            <TableHead className="font-bold py-4">Registration status</TableHead>
            <TableHead className="font-bold py-4">Review Status</TableHead>
            <TableHead className="font-bold py-4 text-right pr-6">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredAbstracts.length === 0 ? (
            <TableRow>
              <TableCell colSpan={7} className="h-24 text-center">
                <div className="flex flex-col items-center justify-center py-6 text-muted-foreground">
                  <AlertCircle size={36} className="mb-2 text-muted-foreground/60" />
                  <p className="font-medium text-base">No abstracts found</p>
                  <p className="text-xs">Adjust your status or search terms and try again.</p>
                </div>
              </TableCell>
            </TableRow>
          ) : (
            filteredAbstracts.map((abstract) => (
              <TableRow
                key={abstract._id}
                className="transition-colors border-b hover:bg-slate-50/50"
              >
                {/* Abstract Details */}
                <TableCell className="py-3.5">
                  <div className="flex flex-col">
                    <span className="font-semibold text-foreground text-sm leading-tight max-w-[240px] truncate" title={abstract.title}>
                      {abstract.title}
                    </span>
                    <span className="text-xs text-muted-foreground mt-1 flex items-center gap-1">
                      <BookOpen className="h-3 w-3 flex-shrink-0" />
                      {abstract.subject}
                    </span>
                    <div className="flex flex-wrap gap-1.5 mt-2">
                      {abstract.temporyAbstractCode && (
                        <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-slate-100 border border-slate-200 text-slate-700">
                          Temp: {abstract.temporyAbstractCode}
                        </span>
                      )}
                      {abstract.AbstractCode && (
                        <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-primary/10 border border-primary/20 text-primary font-semibold">
                          Code: {abstract.AbstractCode}
                        </span>
                      )}
                    </div>
                  </div>
                </TableCell>

                {/* Presenting Author Details */}
                <TableCell className="py-3.5">
                  <div className="flex flex-col">
                    <Link
                      href={`/abstractForm/${abstract._id}`}
                      className="font-semibold text-primary hover:text-primary/80 hover:underline text-sm flex items-center gap-1 transition-all"
                    >
                      <User className="h-3.5 w-3.5 flex-shrink-0 text-primary/70" />
                      {abstract.name}
                    </Link>
                    <div className="flex flex-col gap-1 mt-1 text-xs text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <Mail className="h-3 w-3 flex-shrink-0 text-muted-foreground/70" />
                        {abstract.email}
                      </span>
                      {abstract.whatsappNumber && (
                        <a
                          href={`https://wa.me/${abstract.whatsappNumber.replace(/\D/g, "")}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-1 text-emerald-600 hover:text-emerald-700 font-medium transition-colors"
                          title="Click to Chat on WhatsApp"
                        >
                          <Phone className="h-3 w-3 flex-shrink-0" />
                          {abstract.whatsappNumber}
                        </a>
                      )}
                    </div>
                  </div>
                </TableCell>

                {/* Institution & Designation */}
                <TableCell className="py-3.5 max-w-[200px] truncate">
                  <div className="flex flex-col gap-1">
                    <span className="text-sm text-foreground font-medium truncate flex items-center gap-1.5" title={abstract.affiliation}>
                      <Building2 className="h-3.5 w-3.5 text-muted-foreground flex-shrink-0" />
                      <span className="truncate">{abstract.affiliation || "N/A"}</span>
                    </span>
                    <span className="text-xs text-muted-foreground">
                      {getDesignationLabel(abstract.designation)}
                    </span>
                  </div>
                </TableCell>

                {/* Modes & Article Type */}
                <TableCell className="py-3.5">
                  <div className="flex flex-col gap-1">
                    <div className="flex items-center gap-1 text-xs font-semibold text-foreground">
                      <span>{abstract.presentationMode || "-"}</span>
                      <ChevronRight className="h-3 w-3 text-muted-foreground" />
                      <span className="text-muted-foreground font-normal">{abstract.registrationMode || "-"}</span>
                    </div>
                    <span className="text-xs text-primary font-medium">
                      {abstract.articleType}
                    </span>
                  </div>
                </TableCell>

                {/* Registration Linkage */}
                <TableCell className="py-3.5">
                  <div className="flex flex-col gap-1 items-start">
                    {getRegBadge(abstract.registrationCompleted)}
                    {abstract.registrationCode && (
                      <span className="text-[10px] font-mono font-semibold text-slate-700 bg-slate-100 border px-1.5 py-0.5 rounded">
                        {abstract.registrationCode}
                      </span>
                    )}
                    {abstract.registrationType && (
                      <span className="text-[10px] text-muted-foreground bg-secondary/40 px-1.5 py-0.5 rounded border border-border">
                        {abstract.registrationType}
                      </span>
                    )}
                  </div>
                </TableCell>

                {/* Review Status */}
                <TableCell className="py-3.5">
                  {getStatusBadge(abstract.Status, abstract.presentationType)}
                </TableCell>

                {/* Actions */}
                <TableCell className="py-3.5 text-right pr-6">
                  <div className="flex items-center justify-end gap-1.5">
                    {abstract.abstractFileUrl && (
                      <Button
                        onClick={() => handleDownload(abstract)}
                        variant="outline"
                        size="icon"
                        className="h-8 w-8 rounded-lg shadow-sm border-border bg-white"
                        title="Download Abstract Document"
                      >
                        <Download className="h-4 w-4" />
                      </Button>
                    )}
                    <Button
                      onClick={() =>
                        setStatusDialog({ isOpen: true, abstractId: abstract._id })
                      }
                      variant="outline"
                      size="icon"
                      className="h-8 w-8 rounded-lg shadow-sm border-border bg-white"
                      title="Update Abstract Status"
                    >
                      <MoreVertical className="h-4 w-4" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>

      {/* Dialog: Status Change */}
      <Dialog
        open={statusDialog.isOpen}
        onOpenChange={(open) => !open && setStatusDialog({ isOpen: false, abstractId: null })}
      >
        <DialogContent className="max-w-sm rounded-2xl bg-white p-6 shadow-xl border border-border">
          <DialogHeader>
            <DialogTitle className="text-lg font-bold text-primary flex items-center gap-1.5">
              <Sparkles className="h-5 w-5 text-primary" />
              Update Abstract Status
            </DialogTitle>
          </DialogHeader>
          <div className="grid gap-2 mt-4">
            {["Pending", "InReview", "Revision", "Accepted", "Delete"].map((status) => (
              <Button
                key={status}
                onClick={() => {
                  if (statusDialog.abstractId) {
                    const abstract = filteredAbstracts.find(
                      (a) => a._id === statusDialog.abstractId
                    );
                    if (abstract) {
                      handleStatusUpdateClick(abstract, status);
                    }
                  }
                }}
                variant={status === "Delete" ? "destructive" : status === "Accepted" ? "success" : "outline"}
                className="w-full text-sm font-semibold rounded-xl"
              >
                {status === "InReview" ? "In Review" : status}
              </Button>
            ))}
          </div>
          <DialogFooter className="mt-4">
            <Button
              onClick={() => setStatusDialog({ isOpen: false, abstractId: null })}
              variant="outline"
              className="w-full rounded-xl"
            >
              Close
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Dialog: Presentation Type */}
      <Dialog
        open={presentationTypeDialog.isOpen}
        onOpenChange={(open) => !open && setPresentationTypeDialog({ isOpen: false, abstractId: null })}
      >
        <DialogContent className="max-w-sm rounded-2xl bg-white p-6 shadow-xl border border-border">
          <DialogHeader>
            <DialogTitle className="text-lg font-bold text-primary flex items-center gap-1.5">
              <FileText className="h-5 w-5 text-primary" />
              Select Presentation Type
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4 mt-4">
            <p className="text-xs text-muted-foreground">Select how the author should present their accepted abstract:</p>
            <select
              className="w-full p-3 border border-input rounded-xl text-sm focus:outline-none focus:ring-1 focus:ring-primary bg-white text-foreground"
              onChange={(e) => {
                if (e.target.value) {
                  handlePresentationTypeSelect(e.target.value);
                }
              }}
              defaultValue=""
            >
              <option value="" disabled>Select presentation style</option>
              <option value="Oral">Oral Presentation</option>
              <option value="E-Poster">E-Poster Presentation</option>
            </select>
          </div>
          <DialogFooter className="mt-6 flex gap-2">
            <Button
              onClick={() => setPresentationTypeDialog({ isOpen: false, abstractId: null })}
              variant="outline"
              className="w-full rounded-xl"
            >
              Cancel
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Dialog: Rejection (Revision Comment) */}
      <Dialog
        open={rejectDialog.isOpen}
        onOpenChange={(open) => !open && setRejectDialog({ isOpen: false, abstractId: null })}
      >
        <DialogContent className="max-w-md rounded-2xl bg-white p-6 shadow-xl border border-border">
          <DialogHeader>
            <DialogTitle className="text-lg font-bold text-destructive flex items-center gap-1.5">
              <AlertCircle className="h-5 w-5 text-destructive" />
              Request Abstract Revision
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4 mt-4">
            <p className="text-xs text-muted-foreground">
              Provide feedback or specify required revisions. The author will see this note on their participant dashboard and can upload an updated abstract document.
            </p>
            <textarea
              className="w-full h-32 p-3 border border-input rounded-xl text-sm focus:outline-none focus:ring-1 focus:ring-primary resize-none placeholder:text-muted-foreground text-foreground"
              placeholder="Enter revision comments or reasons..."
              value={rejectComment}
              onChange={(e) => setRejectComment(e.target.value)}
            />
          </div>
          <DialogFooter className="mt-6 flex flex-col sm:flex-row gap-2">
            <Button
              onClick={() => setRejectDialog({ isOpen: false, abstractId: null })}
              variant="outline"
              className="flex-1 rounded-xl"
            >
              Cancel
            </Button>
            <Button
              onClick={handleRejectConfirm}
              variant="destructive"
              className="flex-1 rounded-xl"
              disabled={!rejectComment.trim()}
            >
              Submit Comments
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AbstractTable;
