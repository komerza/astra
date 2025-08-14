"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"
import { MessageCircle, Plus, Search, Send, Clock } from "lucide-react"

export function SupportSection() {
  const [activeTab, setActiveTab] = useState("tickets")
  const [newTicketSubject, setNewTicketSubject] = useState("")
  const [newTicketMessage, setNewTicketMessage] = useState("")
  const [tickets, setTickets] = useState<any[]>([])

  useEffect(() => {
    async function load() {
      const res = await globalThis.komerza.getTickets()
      if (res.success && res.data) {
        setTickets(res.data)
      }
    }
    load()
  }, [])

  const handleCreateTicket = async () => {
    if (newTicketSubject && newTicketMessage) {
      const res = await globalThis.komerza.createTicket({ subject: newTicketSubject, message: newTicketMessage })
      if (res.success) {
        setNewTicketSubject("")
        setNewTicketMessage("")
        const all = await globalThis.komerza.getTickets()
        if (all.success && all.data) setTickets(all.data)
      }
    }
  }

  const getStatusStyles = (status: string) => {
    switch (status.toLowerCase()) {
      case "open":
        return { color: "text-green-500", bg: "bg-green-500/10" }
      case "waiting":
        return { color: "text-yellow-500", bg: "bg-yellow-500/10" }
      case "closed":
        return { color: "text-red-500", bg: "bg-red-500/10" }
      default:
        return { color: "text-gray-500", bg: "bg-gray-500/10" }
    }
  }

  return (
    <div className="space-y-6">
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
              placeholder="Search tickets..."
              className="pl-10 bg-theme-secondary border-theme text-theme-primary placeholder:text-theme-secondary"
            />
          </div>

          {/* Tickets List */}
          <div className="space-y-4">
            {tickets.map((ticket) => {
              const styles = getStatusStyles(ticket.status)
              const lastEntry = ticket.entries[ticket.entries.length - 1]
              return (
                <Card
                key={ticket.id}
                className="bg-theme-secondary border-theme hover:border-[#3B82F6]/30 transition-all duration-300"
              >
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="text-theme-primary font-medium">{ticket.subject}</h3>
                        <Badge className={`${styles.color} ${styles.bg} border-0`}>{ticket.status}</Badge>
                      </div>
                      <div className="flex items-center gap-4 text-sm text-theme-secondary">
                        <span>Ticket {ticket.id}</span>
                        <span>Created {new Date(ticket.createdAt).toLocaleDateString()}</span>
                        {lastEntry && <span>Last reply {new Date(lastEntry.createdAt).toLocaleDateString()}</span>}
                      </div>
                    </div>
                    <Button variant="outline" className="border-theme text-theme-primary hover:bg-theme-tertiary">
                      View Details
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )})}
          </div>

          {/* Empty State */}
          {tickets.length === 0 && (
            <Card className="bg-theme-secondary border-theme">
              <CardContent className="p-12 text-center">
                <MessageCircle className="w-12 h-12 text-theme-secondary mx-auto mb-4" />
                <h3 className="text-theme-primary text-lg font-medium mb-2">No support tickets</h3>
                <p className="text-theme-secondary mb-6">You haven't created any support tickets yet</p>
                <Button 
                  onClick={() => setActiveTab("create")}
                  className="bg-[#3B82F6] hover:bg-[#2563EB] text-white"
                >
                  Create Your First Ticket
                </Button>
              </CardContent>
            </Card>
          )}
        </div>
      )}

      {activeTab === "create" && (
        <Card className="bg-theme-secondary border-theme">
          <CardHeader>
            <CardTitle className="text-theme-primary">Create New Support Ticket</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <label className="block text-theme-primary text-sm font-medium mb-2">Subject</label>
              <Input
                value={newTicketSubject}
                onChange={(e) => setNewTicketSubject(e.target.value)}
                placeholder="Brief description of your issue"
                className="bg-theme-primary border-theme text-theme-primary placeholder:text-theme-secondary"
              />
            </div>
            <div>
              <label className="block text-theme-primary text-sm font-medium mb-2">Message</label>
              <Textarea
                value={newTicketMessage}
                onChange={(e) => setNewTicketMessage(e.target.value)}
                placeholder="Please describe your issue in detail..."
                className="bg-theme-primary border-theme text-theme-primary placeholder:text-theme-secondary min-h-32"
              />
            </div>
            <div className="flex justify-end">
              <Button
                onClick={handleCreateTicket}
                className="bg-[#3B82F6] hover:bg-[#2563EB] text-white"
              >
                <Send className="w-4 h-4 mr-2" />
                Create Ticket
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}