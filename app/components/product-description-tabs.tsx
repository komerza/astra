"use client"

import { useState } from "react"
import { Star, Shield, CheckCircle, User } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"

interface Review {
  id: number
  author: string
  rating: number
  date: string
  title: string
  content: string
  verified: boolean
}

interface ReviewsData {
  averageRating: number
  totalReviews: number
  ratingBreakdown: {
    5: number
    4: number
    3: number
    2: number
    1: number
  }
  recentReviews: Review[]
}

interface Product {
  id: string
  name: string
  longDescription: string
  features: string[]
  reviewsData: ReviewsData
}

interface ProductDescriptionTabsProps {
  product: Product
}

export function ProductDescriptionTabs({ product }: ProductDescriptionTabsProps) {
  const [activeTab, setActiveTab] = useState("description")

  const tabs = [
    { id: "description", label: "Description" },
    { id: "features", label: "Features" },
    { id: "reviews", label: "Reviews" },
  ]

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    })
  }

  const getRatingPercentage = (rating: number) => {
    return (
      (product.reviewsData.ratingBreakdown[rating as keyof typeof product.reviewsData.ratingBreakdown] /
        product.reviewsData.totalReviews) *
      100
    )
  }

  return (
    <div className="space-y-6">
      {/* Tab Navigation */}
      <div className="flex space-x-1 bg-theme-secondary p-1 rounded-lg border border-theme">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex-1 px-4 py-2 rounded-md text-sm font-medium transition-all duration-200 ${
              activeTab === tab.id
                ? "bg-[#3B82F6] text-white"
                : "text-theme-secondary hover:text-theme-primary hover:bg-theme-tertiary"
            }`}
          >
            {tab.label}
            {tab.id === "reviews" && (
              <span className="ml-2 text-xs opacity-75">({product.reviewsData.totalReviews})</span>
            )}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div className="rounded-2xl sm:rounded-3xl border border-theme bg-theme-secondary p-6 sm:p-8 shadow-theme">
        {activeTab === "description" && (
          <div>
            <h3 className="text-xl sm:text-2xl heading-semibold text-theme-primary mb-4">About {product.name}</h3>
            <p className="text-theme-secondary text-sm sm:text-base leading-relaxed">{product.longDescription}</p>
          </div>
        )}

        {activeTab === "features" && (
          <div>
            <h3 className="text-xl sm:text-2xl heading-semibold text-theme-primary mb-6">Key Features</h3>
            <div className="grid gap-4">
              {product.features.map((feature, index) => (
                <div key={index} className="flex items-center gap-3">
                  <div className="w-6 h-6 bg-[#3B82F6]/20 rounded-full flex items-center justify-center flex-shrink-0">
                    <CheckCircle className="w-4 h-4 text-[#3B82F6]" />
                  </div>
                  <span className="text-theme-secondary text-sm sm:text-base">{feature}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === "reviews" && (
          <div className="space-y-8">
            {/* Reviews Header */}
            <div>
              <h3 className="text-xl sm:text-2xl heading-semibold text-theme-primary mb-6">Customer Reviews</h3>

              {/* Rating Summary */}
              <div className="grid md:grid-cols-2 gap-8 mb-8">
                {/* Overall Rating */}
                <div className="text-center md:text-left">
                  <div className="flex items-center justify-center md:justify-start gap-2 mb-2">
                    <span className="text-4xl font-bold text-theme-primary">{product.reviewsData.averageRating}</span>
                    <div className="flex items-center">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`w-5 h-5 ${
                            i < Math.floor(product.reviewsData.averageRating)
                              ? "text-[#3B82F6] fill-[#3B82F6]"
                              : "text-gray-600"
                          }`}
                        />
                      ))}
                    </div>
                  </div>
                  <p className="text-theme-secondary text-sm">Based on {product.reviewsData.totalReviews} reviews</p>
                </div>

                {/* Rating Breakdown */}
                <div className="space-y-2">
                  {[5, 4, 3, 2, 1].map((rating) => (
                    <div key={rating} className="flex items-center gap-3">
                      <span className="text-sm text-theme-secondary w-8">{rating} ★</span>
                      <Progress value={getRatingPercentage(rating)} className="flex-1 h-2" />
                      <span className="text-sm text-theme-secondary w-12 text-right">
                        {
                          product.reviewsData.ratingBreakdown[
                            rating as keyof typeof product.reviewsData.ratingBreakdown
                          ]
                        }
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Individual Reviews */}
            <div className="space-y-6">
              <h4 className="text-lg heading-semibold text-theme-primary">Recent Reviews</h4>

              {product.reviewsData.recentReviews.map((review) => (
                <div key={review.id} className="border border-theme rounded-lg p-6 bg-theme-tertiary">
                  {/* Review Header */}
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-[#3B82F6]/20 rounded-full flex items-center justify-center">
                        <User className="w-5 h-5 text-[#3B82F6]" />
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="text-theme-primary font-medium">{review.author}</span>
                          {review.verified && (
                            <div className="flex items-center gap-1 bg-green-500/20 px-2 py-0.5 rounded-full">
                              <Shield className="w-3 h-3 text-green-500" />
                              <span className="text-green-500 text-xs">Verified</span>
                            </div>
                          )}
                        </div>
                        <div className="flex items-center gap-2 mt-1">
                          <div className="flex items-center">
                            {[...Array(5)].map((_, i) => (
                              <Star
                                key={i}
                                className={`w-4 h-4 ${
                                  i < review.rating ? "text-[#3B82F6] fill-[#3B82F6]" : "text-gray-600"
                                }`}
                              />
                            ))}
                          </div>
                          <span className="text-theme-secondary text-xs">{formatDate(review.date)}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Review Content */}
                  <div>
                    <h5 className="text-theme-primary font-medium mb-2">{review.title}</h5>
                    <p className="text-theme-secondary text-sm leading-relaxed">{review.content}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Write Review Button */}
            <div className="text-center pt-6 border-t border-theme">
              <Button className="bg-[#3B82F6] hover:bg-[#2563EB] text-white h-10 px-6 py-2 rounded-md text-sm tracking-20-smaller transition-all duration-300 font-normal">
                Write a Review
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
