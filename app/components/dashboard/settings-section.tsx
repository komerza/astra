"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { AlertTriangle, Download, Trash2 } from "lucide-react"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"

export function SettingsSection() {
  const [isExporting, setIsExporting] = useState(false)

  const handleExportData = async () => {
    setIsExporting(true)
    
    // Simulate data export
    setTimeout(() => {
      // Create a mock data export
      const userData = {
        profile: {
          email: "user@example.com",
          name: "John Doe",
          joinDate: "2024-01-15"
        },
        orders: [
          { id: "ORD-001", product: "Premium Design Template", date: "2024-01-15", amount: "€29.99" },
          { id: "ORD-002", product: "E-book Collection", date: "2024-01-20", amount: "€15.99" }
        ],
        downloads: [
          { product: "Premium Design Template", downloadDate: "2024-01-28", version: "v1.0" }
        ]
      }

      const dataStr = JSON.stringify(userData, null, 2)
      const dataBlob = new Blob([dataStr], { type: 'application/json' })
      const url = URL.createObjectURL(dataBlob)
      
      const link = document.createElement('a')
      link.href = url
      link.download = 'my-account-data.json'
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
      URL.revokeObjectURL(url)
      
      setIsExporting(false)
    }, 2000)
  }

  const handleDeleteAccount = () => {
    // This would typically make an API call to delete the account
    console.log("Account deletion requested")
  }

  return (
    <div className="space-y-6">
      {/* Data Export */}
      <Card className="bg-theme-secondary border-theme">
        <CardHeader>
          <CardTitle className="text-theme-primary flex items-center gap-2">
            <Download className="w-5 h-5" />
            Export Your Data
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <h4 className="text-theme-primary font-medium mb-2">Download Account Data</h4>
            <p className="text-theme-secondary text-sm mb-4">
              Export all your account information, order history, and personal data in JSON format. 
              This includes your profile information, purchase history, and download records.
            </p>
            <Button 
              onClick={handleExportData}
              disabled={isExporting}
              className="bg-[#3B82F6] hover:bg-[#2563EB] text-white"
            >
              <Download className="w-4 h-4 mr-2" />
              {isExporting ? "Preparing Export..." : "Export My Data"}
            </Button>
          </div>
          
          <div className="p-4 bg-blue-500/10 border border-blue-500/30 rounded-lg">
            <div className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-blue-500 flex-shrink-0 mt-0.5" />
              <div>
                <h5 className="text-blue-500 font-medium text-sm">GDPR Compliance</h5>
                <p className="text-theme-secondary text-xs mt-1">
                  You have the right to receive a copy of your personal data in a structured, commonly used format.
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Delete Account */}
      <Card className="bg-theme-secondary border-theme">
        <CardHeader>
          <CardTitle className="text-theme-primary flex items-center gap-2">
            <Trash2 className="w-5 h-5" />
            Delete Account
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <h4 className="text-theme-primary font-medium mb-2">Permanently Delete Account</h4>
            <p className="text-theme-secondary text-sm mb-4">
              Once you delete your account, there is no going back. This action will permanently delete 
              your account, order history, and all associated data.
            </p>
            
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button variant="outline" className="border-red-500 text-red-500 hover:bg-red-500/10">
                  <Trash2 className="w-4 h-4 mr-2" />
                  Delete Account
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent className="bg-theme-secondary border-theme">
                <AlertDialogHeader>
                  <AlertDialogTitle className="text-theme-primary">Are you absolutely sure?</AlertDialogTitle>
                  <AlertDialogDescription className="text-theme-secondary">
                    This action cannot be undone. This will permanently delete your account and remove all 
                    your data from our servers, including your order history, downloads, and personal information.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel className="border-theme text-theme-primary hover:bg-theme-tertiary">
                    Cancel
                  </AlertDialogCancel>
                  <AlertDialogAction 
                    onClick={handleDeleteAccount}
                    className="bg-red-500 hover:bg-red-600 text-white"
                  >
                    Yes, Delete Account
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </div>
          
          <div className="p-4 bg-red-500/10 border border-red-500/30 rounded-lg">
            <div className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
              <div>
                <h5 className="text-red-500 font-medium text-sm">Warning</h5>
                <p className="text-theme-secondary text-xs mt-1">
                  Account deletion is permanent and cannot be undone. All your data will be lost forever.
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}