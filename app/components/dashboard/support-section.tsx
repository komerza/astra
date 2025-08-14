"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"
import {
  MessageCircle,
  Plus,
  Search,
  Send,
  Clock,
  ArrowLeft,
  X,
} from "lucide-react";

// Type definitions for Komerza Support API
enum TicketStatus {
  /// The ticket has been opened and is awaiting a response from the seller
  Opened = 0,
  /// The ticket has been closed AND marked as resolved by the customer
  Resolved = 1,
  /// The ticket has been closed and NOT marked as resolved by the customer
  Closed = 2,
  /// The seller has responded to the ticket
  Responded = 3,
  /// The customer has responded to the ticket
  CustomerResponded = 4,
}

/**
 * A single entry within a support ticket conversation.
 */
interface TicketEntry {
  /**
   * Unique identifier for this ticket entry.
   */
  id: string;

  /**
   * ISO 8601 timestamp when the entry was created.
   */
  dateCreated: string;

  /**
   * The content of the ticket entry.
   */
  message: string;

  /**
   * Name of the author of this entry (could be user or staff).
   */
  name: string;
}

/**
 * Represents a customer support ticket.
 */
interface Ticket {
  /**
   * Unique identifier for the ticket.
   */
  id: string;

  /**
   * ISO 8601 timestamp when the ticket was created.
   */
  dateCreated: string;

  /**
   * The subject line of the ticket.
   */
  subject: string;

  /**
   * Current status of the ticket.
   */
  status: number;

  /**
   * Store ID associated with this ticket.
   */
  storeId: string;

  /**
   * Customer ID of the ticket creator.
   */
  customerId: string;

  /**
   * Email address of the ticket creator.
   */
  emailAddress: string;

  /**
   * Conversation entries in this ticket.
   */
  entries: TicketEntry[];
}

interface ApiResponse<T> {
  success: boolean;
  message?: string;
  data?: T;
}

export function SupportSection() {
  const [activeTab, setActiveTab] = useState("tickets");
  const [newTicketSubject, setNewTicketSubject] = useState("");
  const [newTicketMessage, setNewTicketMessage] = useState("");
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [selectedTicket, setSelectedTicket] = useState<Ticket | null>(null);
  const [newResponseMessage, setNewResponseMessage] = useState("");
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [submitting, setSubmitting] = useState(false);

  // Utility function to convert enum to display string
  const getStatusDisplayName = (status: TicketStatus): string => {
    switch (status) {
      case TicketStatus.Opened:
        return "Opened";
      case TicketStatus.Resolved:
        return "Resolved";
      case TicketStatus.Closed:
        return "Closed";
      case TicketStatus.Responded:
        return "Responded";
      case TicketStatus.CustomerResponded:
        return "Customer Responded";
      default:
        return "Unknown";
    }
  };

  // Utility function to check if ticket can accept responses
  const canAddResponse = (status: TicketStatus): boolean => {
    return status !== TicketStatus.Closed && status !== TicketStatus.Resolved;
  };

  // Fetch all tickets
  const fetchTickets = async () => {
    try {
      setLoading(true);
      const response: ApiResponse<Ticket[]> =
        await globalThis.komerza.getTickets();
      if (response.success && response.data) {
        setTickets(response.data);
      } else {
        console.error("Failed to fetch tickets:", response.message);
        setTickets([]);
      }
    } catch (error) {
      console.error("Error fetching tickets:", error);
      setTickets([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTickets();
  }, []);

  // Create new ticket
  const handleCreateTicket = async () => {
    if (!newTicketSubject.trim() || !newTicketMessage.trim()) {
      alert("Please fill in both subject and message");
      return;
    }

    try {
      setSubmitting(true);
      const response: ApiResponse<any> = await globalThis.komerza.createTicket(
        newTicketSubject.trim(),
        newTicketMessage.trim()
      );

      if (response.success) {
        setNewTicketSubject("");
        setNewTicketMessage("");
        setActiveTab("tickets");
        await fetchTickets(); // Refresh tickets list
      } else {
        alert(
          "Failed to create ticket: " + (response.message || "Unknown error")
        );
      }
    } catch (error) {
      console.error("Error creating ticket:", error);
      alert("Failed to create ticket. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  // Add response to ticket
  const handleAddResponse = async (ticketId: string) => {
    if (!newResponseMessage.trim()) {
      alert("Please enter a message");
      return;
    }

    try {
      setSubmitting(true);
      const response: ApiResponse<any> =
        await globalThis.komerza.addTicketResponse(
          ticketId,
          newResponseMessage.trim()
        );

      if (response.success) {
        setNewResponseMessage("");
        // Refresh the specific ticket details
        const ticketResponse: ApiResponse<Ticket> =
          await globalThis.komerza.getTicketById(ticketId);
        if (ticketResponse.success && ticketResponse.data) {
          setSelectedTicket(ticketResponse.data);
        }
        await fetchTickets(); // Also refresh the main tickets list
      } else {
        alert(
          "Failed to add response: " + (response.message || "Unknown error")
        );
      }
    } catch (error) {
      console.error("Error adding response:", error);
      alert("Failed to add response. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  // Close ticket
  const handleCloseTicket = async (ticketId: string) => {
    if (!confirm("Are you sure you want to close this ticket?")) {
      return;
    }

    try {
      const response: ApiResponse<any> = await globalThis.komerza.closeTicket(
        ticketId
      );

      if (response.success) {
        setSelectedTicket(null);
        await fetchTickets(); // Refresh tickets list
      } else {
        alert(
          "Failed to close ticket: " + (response.message || "Unknown error")
        );
      }
    } catch (error) {
      console.error("Error closing ticket:", error);
      alert("Failed to close ticket. Please try again.");
    }
  };

  // View ticket details
  const handleViewTicket = async (ticketId: string) => {
    try {
      const response: ApiResponse<Ticket> =
        await globalThis.komerza.getTicketById(ticketId);
      if (response.success && response.data) {
        setSelectedTicket(response.data);
      } else {
        alert(
          "Failed to load ticket details: " +
            (response.message || "Unknown error")
        );
      }
    } catch (error) {
      console.error("Error fetching ticket details:", error);
      alert("Failed to load ticket details. Please try again.");
    }
  };

  // Filter tickets based on search query
  const filteredTickets = tickets.filter((ticket) => {
    const searchLower = searchQuery.toLowerCase();
    const statusDisplayName = getStatusDisplayName(ticket.status).toLowerCase();
    return (
      ticket.subject.toLowerCase().includes(searchLower) ||
      ticket.id.toLowerCase().includes(searchLower) ||
      statusDisplayName.includes(searchLower)
    );
  });

  const getStatusStyles = (status: TicketStatus) => {
    switch (status) {
      case TicketStatus.Opened:
        return {
          color: "text-blue-600",
          bg: "bg-blue-500/10",
          border: "border-blue-500/20",
        };
      case TicketStatus.Responded:
        return {
          color: "text-green-600",
          bg: "bg-green-500/10",
          border: "border-green-500/20",
        };
      case TicketStatus.CustomerResponded:
        return {
          color: "text-yellow-600",
          bg: "bg-yellow-500/10",
          border: "border-yellow-500/20",
        };
      case TicketStatus.Resolved:
        return {
          color: "text-emerald-600",
          bg: "bg-emerald-500/10",
          border: "border-emerald-500/20",
        };
      case TicketStatus.Closed:
        return {
          color: "text-red-600",
          bg: "bg-red-500/10",
          border: "border-red-500/20",
        };
      default:
        return {
          color: "text-gray-600",
          bg: "bg-gray-500/10",
          border: "border-gray-500/20",
        };
    }
  };

  // If viewing a specific ticket
  if (selectedTicket) {
    return (
      <TicketDetailView
        ticket={selectedTicket}
        onBack={() => setSelectedTicket(null)}
        onAddResponse={handleAddResponse}
        onCloseTicket={handleCloseTicket}
        newResponseMessage={newResponseMessage}
        setNewResponseMessage={setNewResponseMessage}
        submitting={submitting}
      />
    );
  }

  return (
    <div className="space-y-6">
      {/* Header Section */}
      <div className="flex items-center justify-center mb-6">
        <div className="bg-[#3B82F6]/10 text-xs flex flex-row items-center gap-2 pl-3 sm:pl-4 pr-6 sm:pr-8 py-1 rounded-full shadow-sm border border-[#3B82F6]/50 relative">
          <span className="text-theme-primary">Support Center</span>
          <div className="absolute grid place-items-center top-1/2 -translate-y-1/2 right-[2px] text-white w-4 h-4 sm:w-5 sm:h-5 bg-[#3B82F6] rounded-full">
            <MessageCircle className="w-2.5 h-2.5 sm:w-3 sm:h-3" />
          </div>
        </div>
      </div>

      {/* Support Tabs */}
      <div className="flex space-x-1 bg-theme-secondary p-1 rounded-lg border border-theme">
        {[
          { id: "tickets", label: "My Tickets" },
          { id: "create", label: "Create Ticket" },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex-1 flex items-center justify-center gap-2 px-4 py-2 rounded-md text-sm font-medium transition-all duration-200 ${
              activeTab === tab.id
                ? "bg-[#3B82F6] text-white"
                : "text-theme-secondary hover:text-theme-primary hover:bg-theme-tertiary"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      {activeTab === "tickets" && (
        <div className="space-y-4">
          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-theme-secondary w-4 h-4" />
            <Input
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search tickets by subject, ID, or status..."
              className="pl-10 bg-theme-secondary border-theme text-theme-primary placeholder:text-theme-secondary"
              disabled={loading}
            />
          </div>

          {/* Results Info */}
          <div className="flex items-center justify-between">
            <p className="text-theme-secondary text-xs tracking-20-smaller">
              {loading
                ? "Loading tickets..."
                : `Showing ${filteredTickets.length} tickets`}
            </p>
          </div>

          {/* Loading State */}
          {loading && (
            <div className="text-center py-12">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500 mx-auto mb-4"></div>
              <p className="text-theme-secondary text-sm">
                Loading your tickets...
              </p>
            </div>
          )}

          {/* Tickets List */}
          {!loading && (
            <div className="space-y-4">
              {filteredTickets.map((ticket) => {
                const styles = getStatusStyles(ticket.status);
                const lastEntry = ticket.entries[ticket.entries.length - 1];
                return (
                  <Card
                    key={ticket.id}
                    className="bg-theme-secondary border-theme hover:border-[#3B82F6]/30 transition-all duration-300"
                  >
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <h3 className="text-theme-primary font-medium">
                              {ticket.subject}
                            </h3>
                            <Badge
                              className={`border ${styles.border} ${styles.color} ${styles.bg} text-xs`}
                            >
                              {getStatusDisplayName(ticket.status)}
                            </Badge>
                          </div>
                          <div className="flex items-center gap-4 text-sm text-theme-secondary">
                            <span>Ticket #{ticket.id.slice(0, 8)}</span>
                            <span>
                              Created{" "}
                              {new Date(
                                ticket.dateCreated
                              ).toLocaleDateString()}
                            </span>
                            {lastEntry && (
                              <span>
                                Last reply{" "}
                                {new Date(
                                  lastEntry.dateCreated
                                ).toLocaleDateString()}
                              </span>
                            )}
                            <span>
                              {ticket.entries.length} message
                              {ticket.entries.length !== 1 ? "s" : ""}
                            </span>
                          </div>
                        </div>
                        <Button
                          onClick={() => handleViewTicket(ticket.id)}
                          className="bg-[#3B82F6] hover:bg-[#2563EB] text-white h-8 text-sm tracking-20-smaller font-normal"
                        >
                          View Details
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          )}

          {/* Empty State */}
          {!loading && filteredTickets.length === 0 && tickets.length === 0 && (
            <Card className="bg-theme-secondary border-theme">
              <CardContent className="p-12 text-center">
                <MessageCircle className="w-12 h-12 text-theme-secondary/50 mx-auto mb-4" />
                <h3 className="text-theme-primary text-lg font-medium mb-2 heading-semibold">
                  No support tickets
                </h3>
                <p className="text-theme-secondary mb-6 text-sm">
                  You haven't created any support tickets yet
                </p>
                <Button
                  onClick={() => setActiveTab("create")}
                  className="bg-[#3B82F6] hover:bg-[#2563EB] text-white h-8 px-4 text-sm tracking-20-smaller font-normal"
                >
                  Create Your First Ticket
                </Button>
              </CardContent>
            </Card>
          )}

          {/* No search results */}
          {!loading &&
            filteredTickets.length === 0 &&
            tickets.length > 0 &&
            searchQuery && (
              <Card className="bg-theme-secondary border-theme">
                <CardContent className="p-8 text-center">
                  <Search className="w-12 h-12 text-theme-secondary/50 mx-auto mb-4" />
                  <h3 className="text-theme-primary text-lg font-medium mb-2 heading-semibold">
                    No tickets found
                  </h3>
                  <p className="text-theme-secondary mb-6 text-sm">
                    No tickets match your search for "{searchQuery}"
                  </p>
                  <Button
                    onClick={() => setSearchQuery("")}
                    variant="ghost"
                    className="text-theme-secondary hover:text-[#3B82F6] hover:bg-[#3B82F6]/10 h-8 text-xs tracking-20-smaller font-normal"
                  >
                    Clear search
                  </Button>
                </CardContent>
              </Card>
            )}
        </div>
      )}

      {activeTab === "create" && (
        <Card className="bg-theme-secondary border-theme">
          <CardHeader>
            <CardTitle className="text-theme-primary flex items-center gap-2 text-lg">
              <Plus className="w-5 h-5" />
              Create New Support Ticket
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <label className="block text-theme-primary text-sm font-medium mb-2">
                Subject
              </label>
              <Input
                value={newTicketSubject}
                onChange={(e) => setNewTicketSubject(e.target.value)}
                placeholder="Brief description of your issue"
                className="bg-theme-primary border-theme text-theme-primary placeholder:text-theme-secondary"
                disabled={submitting}
              />
            </div>
            <div>
              <label className="block text-theme-primary text-sm font-medium mb-2">
                Message
              </label>
              <Textarea
                value={newTicketMessage}
                onChange={(e) => setNewTicketMessage(e.target.value)}
                placeholder="Please describe your issue in detail..."
                className="bg-theme-primary border-theme text-theme-primary placeholder:text-theme-secondary min-h-32"
                disabled={submitting}
              />
            </div>
            <div className="flex justify-end gap-3">
              <Button
                onClick={() => {
                  setNewTicketSubject("");
                  setNewTicketMessage("");
                  setActiveTab("tickets");
                }}
                variant="ghost"
                className="text-theme-secondary hover:text-theme-primary hover:bg-theme-tertiary h-8 text-sm tracking-20-smaller font-normal"
                disabled={submitting}
              >
                Cancel
              </Button>
              <Button
                onClick={handleCreateTicket}
                disabled={
                  submitting ||
                  !newTicketSubject.trim() ||
                  !newTicketMessage.trim()
                }
                className="bg-[#3B82F6] hover:bg-[#2563EB] text-white h-8 text-sm tracking-20-smaller font-normal"
              >
                {submitting ? (
                  <>
                    <div className="animate-spin rounded-full h-3 w-3 border-b-2 border-white mr-2"></div>
                    Creating...
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4 mr-2" />
                    Create Ticket
                  </>
                )}
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}

// Ticket Detail View Component
function TicketDetailView({
  ticket,
  onBack,
  onAddResponse,
  onCloseTicket,
  newResponseMessage,
  setNewResponseMessage,
  submitting,
}: {
  ticket: Ticket;
  onBack: () => void;
  onAddResponse: (ticketId: string) => Promise<void>;
  onCloseTicket: (ticketId: string) => Promise<void>;
  newResponseMessage: string;
  setNewResponseMessage: (message: string) => void;
  submitting: boolean;
}) {
  // Utility function to convert enum to display string
  const getStatusDisplayName = (status: TicketStatus): string => {
    switch (status) {
      case TicketStatus.Opened:
        return "Opened";
      case TicketStatus.Resolved:
        return "Resolved";
      case TicketStatus.Closed:
        return "Closed";
      case TicketStatus.Responded:
        return "Responded";
      case TicketStatus.CustomerResponded:
        return "Customer Responded";
      default:
        return "Unknown";
    }
  };

  const getStatusStyles = (status: TicketStatus) => {
    switch (status) {
      case TicketStatus.Opened:
        return {
          color: "text-blue-600",
          bg: "bg-blue-500/10",
          border: "border-blue-500/20",
        };
      case TicketStatus.Responded:
        return {
          color: "text-green-600",
          bg: "bg-green-500/10",
          border: "border-green-500/20",
        };
      case TicketStatus.CustomerResponded:
        return {
          color: "text-yellow-600",
          bg: "bg-yellow-500/10",
          border: "border-yellow-500/20",
        };
      case TicketStatus.Resolved:
        return {
          color: "text-emerald-600",
          bg: "bg-emerald-500/10",
          border: "border-emerald-500/20",
        };
      case TicketStatus.Closed:
        return {
          color: "text-red-600",
          bg: "bg-red-500/10",
          border: "border-red-500/20",
        };
      default:
        return {
          color: "text-gray-600",
          bg: "bg-gray-500/10",
          border: "border-gray-500/20",
        };
    }
  };

  // Utility function to check if ticket can accept responses
  const canAddResponse = (status: TicketStatus): boolean => {
    return status !== TicketStatus.Closed && status !== TicketStatus.Resolved;
  };

  const statusStyles = getStatusStyles(ticket.status);
  const canAddResponseToTicket = canAddResponse(ticket.status);

  // Helper function to determine if an entry is from support
  // Since we don't have isFromSupport, we'll need to determine this based on the author name
  // You might need to adjust this logic based on how your system identifies support vs customer entries
  const isEntryFromSupport = (entry: TicketEntry): boolean => {
    // This is a placeholder - you'll need to implement the actual logic
    // For example, if support entries have specific names or patterns:
    // return entry.name === "Support" || entry.name.includes("Support");
    // Or if customer entries use the ticket creator's email:
    // return entry.name !== ticket.emailAddress;

    // For now, we'll assume entries not from the customer email are from support
    return entry.name !== ticket.emailAddress;
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Button
          onClick={onBack}
          variant="ghost"
          className="text-theme-secondary hover:text-[#3B82F6] hover:bg-[#3B82F6]/10 h-8 w-8 p-0"
        >
          <ArrowLeft className="w-4 h-4" />
        </Button>
        <div className="flex-1">
          <div className="flex items-center gap-3 mb-1">
            <h1 className="text-2xl heading-semibold text-theme-primary">
              {ticket.subject}
            </h1>
            <Badge
              className={`border ${statusStyles.border} ${statusStyles.color} ${statusStyles.bg}`}
            >
              {getStatusDisplayName(ticket.status)}
            </Badge>
          </div>
          <p className="text-theme-secondary text-sm">
            Ticket #{ticket.id} • Created{" "}
            {new Date(ticket.dateCreated).toLocaleDateString()}
          </p>
        </div>
        {canAddResponseToTicket && (
          <Button
            onClick={() => onCloseTicket(ticket.id)}
            variant="ghost"
            className="text-red-600 hover:text-red-700 hover:bg-red-500/10 h-8 text-sm tracking-20-smaller font-normal"
          >
            <X className="w-4 h-4 mr-2" />
            Close Ticket
          </Button>
        )}
      </div>

      {/* Messages */}
      <Card className="bg-theme-secondary border-theme">
        <CardHeader>
          <CardTitle className="text-theme-primary flex items-center gap-2 text-lg">
            <MessageCircle className="w-5 h-5" />
            Conversation ({ticket.entries.length} message
            {ticket.entries.length !== 1 ? "s" : ""})
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {ticket.entries.map((entry, index) => {
            const isFromSupport = isEntryFromSupport(entry);
            return (
              <div
                key={entry.id}
                className={`p-4 rounded-lg ${
                  isFromSupport
                    ? "bg-[#3B82F6]/10 border-[#3B82F6]/20 border ml-8"
                    : "bg-theme-primary border border-theme mr-8"
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <span
                    className={`text-sm font-medium ${
                      isFromSupport ? "text-[#3B82F6]" : "text-theme-primary"
                    }`}
                  >
                    {isFromSupport ? "Support Team" : entry.name}
                  </span>
                  <span className="text-theme-secondary text-xs tracking-20-smaller">
                    {new Date(entry.dateCreated).toLocaleDateString()} at{" "}
                    {new Date(entry.dateCreated).toLocaleTimeString()}
                  </span>
                </div>
                <p className="text-theme-primary text-sm whitespace-pre-wrap">
                  {entry.message}
                </p>
              </div>
            );
          })}
        </CardContent>
      </Card>

      {/* Add Response */}
      {canAddResponseToTicket && (
        <Card className="bg-theme-secondary border-theme">
          <CardHeader>
            <CardTitle className="text-theme-primary text-lg">
              Add Response
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Textarea
              value={newResponseMessage}
              onChange={(e) => setNewResponseMessage(e.target.value)}
              placeholder="Type your response here..."
              className="bg-theme-primary border-theme text-theme-primary placeholder:text-theme-secondary min-h-24"
              disabled={submitting}
            />
            <div className="flex justify-end">
              <Button
                onClick={() => onAddResponse(ticket.id)}
                disabled={submitting || !newResponseMessage.trim()}
                className="bg-[#3B82F6] hover:bg-[#2563EB] text-white h-8 text-sm tracking-20-smaller font-normal"
              >
                {submitting ? (
                  <>
                    <div className="animate-spin rounded-full h-3 w-3 border-b-2 border-white mr-2"></div>
                    Sending...
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4 mr-2" />
                    Send Response
                  </>
                )}
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Closed Ticket Notice */}
      {!canAddResponseToTicket && (
        <Card className="bg-theme-secondary border-theme">
          <CardContent className="p-6 text-center">
            <X className="w-12 h-12 text-theme-secondary/50 mx-auto mb-4" />
            <h3 className="text-theme-primary text-lg font-medium mb-2 heading-semibold">
              Ticket Closed
            </h3>
            <p className="text-theme-secondary text-sm">
              This ticket has been closed and no longer accepts new responses.
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}