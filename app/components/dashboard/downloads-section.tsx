"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Download, Package, FileText, CheckCircle, Clock, Folder, HardDrive, Monitor } from "lucide-react"

export function DownloadsSection() {
  const [activeTab, setActiveTab] = useState("available")

  const availableDownloads = [
    {
      id: "crusader-v241",
      name: "Crusader v2.4.1",
      game: "Rainbow Six Siege",
      size: "45.2 MB",
      version: "v2.4.1",
      releaseDate: "2024-01-28",
      changelog: "Fixed compatibility issues, improved performance",
      isLatest: true,
      requirements: "Windows 10/11, 8GB RAM",
    },
    {
      id: "onyx-full-v310",
      name: "Onyx Full v3.1.0",
      game: "Rainbow Six Siege",
      size: "32.8 MB",
      version: "v3.1.0",
      releaseDate: "2024-01-25",
      changelog: "New unlock features, bug fixes",
      isLatest: true,
      requirements: "Windows 10/11, 4GB RAM",
    },
    {
      id: "apex-lite-v152",
      name: "Apex Lite v1.5.2",
      game: "Apex Legends",
      size: "28.5 MB",
      version: "v1.5.2",
      releaseDate: "2024-01-20",
      changelog: "Updated for latest game patch",
      isLatest: false,
      requirements: "Windows 10/11, 6GB RAM",
    },
  ]

  const downloadHistory = [
    {
      id: "1",
      name: "Crusader v2.4.1",
      downloadDate: "2024-01-28 14:30",
      size: "45.2 MB",
      status: "Completed",
      statusColor: "text-green-500",
    },
    {
      id: "2",
      name: "Onyx Full v3.0.9",
      downloadDate: "2024-01-25 09:15",
      size: "32.1 MB",
      status: "Completed",
      statusColor: "text-green-500",
    },
    {
      id: "3",
      name: "Apex Lite v1.5.1",
      downloadDate: "2024-01-22 16:45",
      size: "27.8 MB",
      status: "Completed",
      statusColor: "text-green-500",
    },
    {
      id: "4",
      name: "Crusader v2.4.0",
      downloadDate: "2024-01-20 11:20",
      size: "44.9 MB",
      status: "Completed",
      statusColor: "text-green-500",
    },
  ]

  const systemInfo = {
    os: "Windows 11 Pro",
    architecture: "x64",
    ram: "16 GB",
    storage: "512 GB SSD",
    compatibility: "All products compatible",
  }

  return (
    <div className="space-y-6">
      {/* Downloads Header */}
      <div className="bg-gradient-to-r from-[#3B82F6]/20 to-[#1d4ed8]/20 border border-[#3B82F6]/30 rounded-2xl p-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Downloads</h2>
            <p className="text-gray-700 dark:text-[#cccccc]">Download and manage your software</p>
          </div>
          <div className="hidden md:block">
            <Button className="bg-[#3B82F6] hover:bg-[#2563EB] text-white h-8 px-4 py-2 text-sm tracking-20-smaller font-normal">
              <Download className="w-4 h-4 mr-2" />
              Download All Updates
            </Button>
          </div>
        </div>
      </div>

      {/* Download Tabs */}
      <div className="flex space-x-1 bg-white/5 p-1 rounded-lg">
        {[
          { id: "available", label: "Available Downloads", icon: Download },
          { id: "history", label: "Download History", icon: Clock },
          { id: "system", label: "System Info", icon: Monitor },
        ].map((tab) => {
          const Icon = tab.icon
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex-1 flex items-center justify-center gap-2 px-4 py-2 rounded-md text-sm font-medium transition-all duration-200 ${
                activeTab === tab.id
                  ? "bg-[#3B82F6] text-white"
                  : "text-gray-700 dark:text-[#cccccc] hover:text-gray-900 dark:hover:text-white hover:bg-white/10"
              }`}
            >
              <Icon className="w-4 h-4" />
              {tab.label}
            </button>
          )
        })}
      </div>

      {/* Tab Content */}
      {activeTab === "available" && (
        <div className="space-y-4">
          {availableDownloads.map((download) => (
            <Card
              key={download.id}
              className="bg-white/5 border-white/10 hover:bg-white/10 transition-all duration-300"
            >
              <CardContent className="p-6">
                <div className="flex flex-col lg:flex-row lg:items-center gap-6">
                  {/* Download Info */}
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-12 h-12 bg-[#3B82F6]/20 rounded-lg flex items-center justify-center">
                        <Package className="w-6 h-6 text-[#3B82F6]" />
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{download.name}</h3>
                          {download.isLatest && (
                            <Badge className="bg-green-500/20 text-green-500 border-0 text-xs">Latest</Badge>
                          )}
                        </div>
                        <p className="text-gray-600 dark:text-[#808080] text-sm">{download.game}</p>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm mb-4">
                      <div>
                        <p className="text-gray-600 dark:text-[#808080]">Version</p>
                        <p className="text-gray-900 dark:text-white font-medium">{download.version}</p>
                      </div>
                      <div>
                        <p className="text-gray-600 dark:text-[#808080]">Size</p>
                        <p className="text-gray-900 dark:text-white font-medium">{download.size}</p>
                      </div>
                      <div>
                        <p className="text-gray-600 dark:text-[#808080]">Released</p>
                        <p className="text-gray-900 dark:text-white font-medium">{download.releaseDate}</p>
                      </div>
                      <div>
                        <p className="text-gray-600 dark:text-[#808080]">Requirements</p>
                        <p className="text-gray-900 dark:text-white font-medium">{download.requirements}</p>
                      </div>
                    </div>

                    {/* Changelog */}
                    <div className="p-3 bg-white/5 rounded-lg border border-white/10">
                      <p className="text-gray-600 dark:text-[#808080] text-xs mb-1">What's New</p>
                      <p className="text-gray-900 dark:text-white text-sm">{download.changelog}</p>
                    </div>
                  </div>

                  {/* Download Actions */}
                  <div className="flex flex-col gap-3 min-w-48">
                    <Button className="bg-[#3B82F6] hover:bg-[#2563EB] text-white h-8 px-4 py-2 text-sm tracking-20-smaller font-normal">
                      <Download className="w-4 h-4 mr-2" />
                      Download Now
                    </Button>
                    <Button className="bg-transparent border border-white/20 text-gray-900 dark:text-white hover:bg-white/10 h-8 px-4 py-2 text-sm tracking-20-smaller font-normal">
                      <FileText className="w-4 h-4 mr-2" />
                      View Changelog
                    </Button>
                    <div className="text-center">
                      <p className="text-gray-600 dark:text-[#808080] text-xs">Compatible with your system</p>
                      <div className="flex items-center justify-center gap-1 mt-1">
                        <CheckCircle className="w-3 h-3 text-green-500" />
                        <span className="text-green-500 text-xs">Verified</span>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {activeTab === "history" && (
        <Card className="bg-white/5 border-white/10">
          <CardHeader>
            <CardTitle className="text-gray-900 dark:text-white flex items-center gap-2">
              <Clock className="w-5 h-5" />
              Download History
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {downloadHistory.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center justify-between p-4 bg-white/5 rounded-lg border border-white/10"
                >
                  <div className="flex items-center space-x-4">
                    <div className="w-10 h-10 bg-[#3B82F6]/20 rounded-lg flex items-center justify-center">
                      <Download className="w-5 h-5 text-[#3B82F6]" />
                    </div>
                    <div>
                      <h4 className="text-gray-900 dark:text-white font-medium">{item.name}</h4>
                      <p className="text-gray-600 dark:text-[#808080] text-sm">
                        {item.downloadDate} • {item.size}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Badge className={`${item.statusColor} bg-transparent border`}>{item.status}</Badge>
                    <Button className="bg-transparent hover:bg-white/10 text-[#3B82F6] h-8 w-8 p-0">
                      <Download className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {activeTab === "system" && (
        <div className="grid md:grid-cols-2 gap-6">
          {/* System Information */}
          <Card className="bg-white/5 border-white/10">
            <CardHeader>
              <CardTitle className="text-gray-900 dark:text-white flex items-center gap-2">
                <Monitor className="w-5 h-5" />
                System Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-gray-600 dark:text-[#808080] text-sm">Operating System</p>
                  <p className="text-gray-900 dark:text-white font-medium">{systemInfo.os}</p>
                </div>
                <div>
                  <p className="text-gray-600 dark:text-[#808080] text-sm">Architecture</p>
                  <p className="text-gray-900 dark:text-white font-medium">{systemInfo.architecture}</p>
                </div>
                <div>
                  <p className="text-gray-600 dark:text-[#808080] text-sm">RAM</p>
                  <p className="text-gray-900 dark:text-white font-medium">{systemInfo.ram}</p>
                </div>
                <div>
                  <p className="text-gray-600 dark:text-[#808080] text-sm">Storage</p>
                  <p className="text-gray-900 dark:text-white font-medium">{systemInfo.storage}</p>
                </div>
              </div>
              <div className="p-3 bg-green-500/10 border border-green-500/30 rounded-lg">
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  <span className="text-green-500 text-sm">{systemInfo.compatibility}</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Storage Usage */}
          <Card className="bg-white/5 border-white/10">
            <CardHeader>
              <CardTitle className="text-gray-900 dark:text-white flex items-center gap-2">
                <HardDrive className="w-5 h-5" />
                Storage Usage
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-gray-600 dark:text-[#808080]">Downloads Folder</span>
                  <span className="text-gray-900 dark:text-white">156 MB / 512 GB</span>
                </div>
                <Progress value={0.03} className="h-2" />
              </div>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600 dark:text-[#808080]">Crusader</span>
                  <span className="text-gray-900 dark:text-white">45.2 MB</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600 dark:text-[#808080]">Onyx Full</span>
                  <span className="text-gray-900 dark:text-white">32.8 MB</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600 dark:text-[#808080]">Apex Lite</span>
                  <span className="text-gray-900 dark:text-white">28.5 MB</span>
                </div>
              </div>
              <Button className="w-full bg-transparent border border-white/20 text-gray-900 dark:text-white hover:bg-white/10 h-8 px-4 py-2 text-sm tracking-20-smaller font-normal">
                <Folder className="w-4 h-4 mr-2" />
                Open Downloads Folder
              </Button>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  )
}
