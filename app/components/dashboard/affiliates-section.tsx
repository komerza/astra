"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Users, Link as LinkIcon, DollarSign, Percent, ArrowRight, Copy, Edit, CheckCircle } from "lucide-react"

export function AffiliatesSection() {
  // Simulate whether user is signed up for affiliates
  const [isAffiliate, setIsAffiliate] = useState(false)
  
  // Join affiliate form state
  const [joinForm, setJoinForm] = useState({
    link: ""
  })
  
  // Update link form state
  const [updateForm, setUpdateForm] = useState({
    link: ""
  })
  
  // Convert balance form state
  const [convertForm, setConvertForm] = useState({
    amount: ""
  })
  
  // Form visibility states
  const [showUpdateForm, setShowUpdateForm] = useState(false)
  const [showConvertForm, setShowConvertForm] = useState(false)
  
  // Mock affiliate data (when signed up)
  const affiliateData = {
    isEnabled: true,
    link: "https://store.example.com/ref/johndoe123",
    returnPercentage: 15,
    percentageOff: 10,
    balance: 127.50
  }

  const handleJoinAffiliate = () => {
    if (joinForm.link.trim()) {
      setIsAffiliate(true)
      setJoinForm({ link: "" })
    }
  }

  const handleUpdateLink = () => {
    if (updateForm.link.trim()) {
      setShowUpdateForm(false)
      setUpdateForm({ link: "" })
      // Handle update logic here
    }
  }

  const handleConvertBalance = () => {
    if (convertForm.amount && parseFloat(convertForm.amount) > 0) {
      setShowConvertForm(false)
      setConvertForm({ amount: "" })
      // Handle conversion logic here
    }
  }

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
    // Could add toast notification here
  }

  if (!isAffiliate) {
    // Join Affiliate Program Form
    return (
      <div className="space-y-6">
        {/* Header */}
        <div className="bg-gradient-to-r from-[#3B82F6]/20 to-[#1d4ed8]/20 border border-[#3B82F6]/30 rounded-2xl p-6">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-theme-primary mb-2">Join Our Affiliate Program</h2>
            <p className="text-theme-secondary">
              Earn commissions by promoting our digital products to your audience
            </p>
          </div>
        </div>

        {/* Benefits */}
        <div className="grid md:grid-cols-3 gap-6">
          <Card className="bg-theme-secondary border-theme">
            <CardContent className="p-6 text-center">
              <div className="w-12 h-12 bg-[#3B82F6]/20 rounded-lg flex items-center justify-center mx-auto mb-4">
                <DollarSign className="w-6 h-6 text-[#3B82F6]" />
              </div>
              <h3 className="text-theme-primary font-semibold mb-2">Earn Commission</h3>
              <p className="text-theme-secondary text-sm">Get up to 15% commission on every sale you refer</p>
            </CardContent>
          </Card>

          <Card className="bg-theme-secondary border-theme">
            <CardContent className="p-6 text-center">
              <div className="w-12 h-12 bg-green-500/20 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Percent className="w-6 h-6 text-green-500" />
              </div>
              <h3 className="text-theme-primary font-semibold mb-2">Discount for Customers</h3>
              <p className="text-theme-secondary text-sm">Your audience gets 10% off on their purchases</p>
            </CardContent>
          </Card>

          <Card className="bg-theme-secondary border-theme">
            <CardContent className="p-6 text-center">
              <div className="w-12 h-12 bg-purple-500/20 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Users className="w-6 h-6 text-purple-500" />
              </div>
              <h3 className="text-theme-primary font-semibold mb-2">Easy Tracking</h3>
              <p className="text-theme-secondary text-sm">Monitor your referrals and earnings in real-time</p>
            </CardContent>
          </Card>
        </div>

        {/* Join Form */}
        <Card className="bg-theme-secondary border-theme max-w-2xl mx-auto">
          <CardHeader>
            <CardTitle className="text-theme-primary">Create Your Affiliate Link</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <Label htmlFor="affiliate-link" className="text-theme-primary">
                Affiliate Link
              </Label>
              <Input
                id="affiliate-link"
                value={joinForm.link}
                onChange={(e) => setJoinForm({ link: e.target.value })}
                placeholder="Enter your custom affiliate link (e.g., mystore)"
                className="bg-theme-primary border-theme text-theme-primary placeholder:text-theme-secondary"
                maxLength={256}
              />
              <p className="text-theme-secondary text-xs mt-2">
                This will be your unique affiliate identifier. Maximum 256 characters.
              </p>
            </div>
            
            <Button
              onClick={handleJoinAffiliate}
              disabled={!joinForm.link.trim()}
              className="w-full bg-[#3B82F6] hover:bg-[#2563EB] text-white"
            >
              <Users className="w-4 h-4 mr-2" />
              Join Affiliate Program
            </Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  // Affiliate Dashboard (when signed up)
  return (
    <div className="space-y-6">
      {/* Affiliate Stats */}
      <div className="grid md:grid-cols-4 gap-6">
        <Card className="bg-theme-secondary border-theme">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-theme-secondary text-sm">Affiliate Balance</p>
                <p className="text-2xl font-bold text-theme-primary">€{affiliateData.balance.toFixed(2)}</p>
              </div>
              <div className="bg-[#3B82F6]/20 text-[#3B82F6] p-3 rounded-lg">
                <DollarSign className="w-6 h-6" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-theme-secondary border-theme">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-theme-secondary text-sm">Commission Rate</p>
                <p className="text-2xl font-bold text-theme-primary">{affiliateData.returnPercentage}%</p>
              </div>
              <div className="bg-green-500/20 text-green-500 p-3 rounded-lg">
                <Percent className="w-6 h-6" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-theme-secondary border-theme">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-theme-secondary text-sm">Customer Discount</p>
                <p className="text-2xl font-bold text-theme-primary">{affiliateData.percentageOff}%</p>
              </div>
              <div className="bg-purple-500/20 text-purple-500 p-3 rounded-lg">
                <Percent className="w-6 h-6" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-theme-secondary border-theme">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-theme-secondary text-sm">Status</p>
                <div className="flex items-center gap-2 mt-1">
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  <span className="text-theme-primary font-medium">Active</span>
                </div>
              </div>
              <div className="bg-green-500/20 text-green-500 p-3 rounded-lg">
                <CheckCircle className="w-6 h-6" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Affiliate Link Management */}
      <Card className="bg-theme-secondary border-theme">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-theme-primary flex items-center gap-2">
              <LinkIcon className="w-5 h-5" />
              Your Affiliate Link
            </CardTitle>
            <Button
              onClick={() => setShowUpdateForm(!showUpdateForm)}
              variant="outline"
              className="border-theme text-theme-primary hover:bg-theme-tertiary"
            >
              <Edit className="w-4 h-4 mr-2" />
              Update Link
            </Button>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="p-4 bg-theme-primary rounded-lg border border-theme">
            <div className="flex items-center justify-between">
              <div className="flex-1 min-w-0">
                <p className="text-theme-secondary text-sm mb-1">Current Affiliate Link</p>
                <p className="text-theme-primary font-mono text-sm break-all">{affiliateData.link}</p>
              </div>
              <Button
                onClick={() => copyToClipboard(affiliateData.link)}
                className="bg-transparent hover:bg-theme-secondary text-[#3B82F6] h-8 w-8 p-0 ml-3"
              >
                <Copy className="w-4 h-4" />
              </Button>
            </div>
          </div>

          {/* Update Link Form */}
          {showUpdateForm && (
            <div className="p-4 bg-theme-primary rounded-lg border border-theme space-y-4">
              <div>
                <Label htmlFor="update-link" className="text-theme-primary">
                  New Affiliate Link
                </Label>
                <Input
                  id="update-link"
                  value={updateForm.link}
                  onChange={(e) => setUpdateForm({ link: e.target.value })}
                  placeholder="Enter your new affiliate link"
                  className="bg-theme-secondary border-theme text-theme-primary placeholder:text-theme-secondary"
                  maxLength={256}
                />
                <p className="text-theme-secondary text-xs mt-2">
                  Maximum 256 characters. This will replace your current affiliate link.
                </p>
              </div>
              <div className="flex gap-3">
                <Button
                  onClick={handleUpdateLink}
                  disabled={!updateForm.link.trim()}
                  className="bg-[#3B82F6] hover:bg-[#2563EB] text-white"
                >
                  Update Link
                </Button>
                <Button
                  onClick={() => {
                    setShowUpdateForm(false)
                    setUpdateForm({ link: "" })
                  }}
                  variant="outline"
                  className="border-theme text-theme-primary hover:bg-theme-tertiary"
                >
                  Cancel
                </Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Balance Conversion */}
      <Card className="bg-theme-secondary border-theme">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-theme-primary flex items-center gap-2">
              <ArrowRight className="w-5 h-5" />
              Convert to Store Balance
            </CardTitle>
            <Button
              onClick={() => setShowConvertForm(!showConvertForm)}
              disabled={affiliateData.balance <= 0}
              className="bg-[#3B82F6] hover:bg-[#2563EB] text-white"
            >
              Convert Balance
            </Button>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="p-4 bg-theme-primary rounded-lg border border-theme">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-theme-secondary text-sm">Available Affiliate Balance</p>
                <p className="text-2xl font-bold text-[#3B82F6]">€{affiliateData.balance.toFixed(2)}</p>
              </div>
              <ArrowRight className="w-6 h-6 text-theme-secondary" />
              <div>
                <p className="text-theme-secondary text-sm">Store Balance</p>
                <p className="text-theme-primary font-medium">Convert to use for purchases</p>
              </div>
            </div>
          </div>

          {/* Convert Form */}
          {showConvertForm && (
            <div className="p-4 bg-theme-primary rounded-lg border border-theme space-y-4">
              <div>
                <Label htmlFor="convert-amount" className="text-theme-primary">
                  Amount to Convert
                </Label>
                <Input
                  id="convert-amount"
                  type="number"
                  step="0.01"
                  min="0.01"
                  max={affiliateData.balance}
                  value={convertForm.amount}
                  onChange={(e) => setConvertForm({ amount: e.target.value })}
                  placeholder="0.00"
                  className="bg-theme-secondary border-theme text-theme-primary placeholder:text-theme-secondary"
                />
                <p className="text-theme-secondary text-xs mt-2">
                  Amount must be greater than €0.01 and not exceed your current balance of €{affiliateData.balance.toFixed(2)}
                </p>
              </div>
              <div className="flex gap-3">
                <Button
                  onClick={handleConvertBalance}
                  disabled={!convertForm.amount || parseFloat(convertForm.amount) <= 0 || parseFloat(convertForm.amount) > affiliateData.balance}
                  className="bg-[#3B82F6] hover:bg-[#2563EB] text-white"
                >
                  <ArrowRight className="w-4 h-4 mr-2" />
                  Convert €{convertForm.amount || "0.00"}
                </Button>
                <Button
                  onClick={() => {
                    setShowConvertForm(false)
                    setConvertForm({ amount: "" })
                  }}
                  variant="outline"
                  className="border-theme text-theme-primary hover:bg-theme-tertiary"
                >
                  Cancel
                </Button>
              </div>
            </div>
          )}

          {affiliateData.balance <= 0 && (
            <div className="p-4 bg-yellow-500/10 border border-yellow-500/30 rounded-lg">
              <p className="text-yellow-500 text-sm">
                No affiliate balance available for conversion. Start promoting to earn commissions!
              </p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* How It Works */}
      <Card className="bg-theme-secondary border-theme">
        <CardHeader>
          <CardTitle className="text-theme-primary">How It Works</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="w-8 h-8 bg-[#3B82F6] text-white rounded-full flex items-center justify-center mx-auto mb-3 text-sm font-bold">
                1
              </div>
              <h4 className="text-theme-primary font-medium mb-2">Share Your Link</h4>
              <p className="text-theme-secondary text-sm">
                Share your unique affiliate link with your audience
              </p>
            </div>
            <div className="text-center">
              <div className="w-8 h-8 bg-[#3B82F6] text-white rounded-full flex items-center justify-center mx-auto mb-3 text-sm font-bold">
                2
              </div>
              <h4 className="text-theme-primary font-medium mb-2">Customer Purchases</h4>
              <p className="text-theme-secondary text-sm">
                When someone buys using your link, they get {affiliateData.percentageOff}% off
              </p>
            </div>
            <div className="text-center">
              <div className="w-8 h-8 bg-[#3B82F6] text-white rounded-full flex items-center justify-center mx-auto mb-3 text-sm font-bold">
                3
              </div>
              <h4 className="text-theme-primary font-medium mb-2">Earn Commission</h4>
              <p className="text-theme-secondary text-sm">
                You earn {affiliateData.returnPercentage}% commission on every successful sale
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}