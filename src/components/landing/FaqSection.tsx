"use client"

import { HelpCircle } from "lucide-react"

export function FaqSection() {
  return (
    <section className="relative py-12 sm:py-20">
      <div className="container mx-auto px-4 sm:px-6">
        {/* FAQ Badge */}
        <div className="flex items-center justify-center mb-6 sm:mb-8">
          <div className="bg-[#3B82F6]/10 text-xs flex flex-row items-center gap-2 pl-3 sm:pl-4 pr-6 sm:pr-8 py-1 rounded-full shadow-sm border border-[#3B82F6]/50 relative transform scale-100 sm:scale-107">
            <span className="text-theme-primary">FAQ</span>
            <div className="absolute grid place-items-center top-1/2 -translate-y-1/2 right-[2px] text-white w-4 h-4 sm:w-5 sm:h-5 bg-[#3B82F6] rounded-full">
              <HelpCircle className="w-2.5 h-2.5 sm:w-3 sm:h-3" />
            </div>
          </div>
        </div>

        {/* Title */}
        <div className="text-center mb-4">
          <h2 className="text-2xl sm:text-3xl heading-semibold text-theme-primary">
            Frequently Asked Questions
          </h2>
          <p className="text-xs text-theme-secondary mt-2">
            Get answers to common questions
          </p>
        </div>

        {/* Divider */}
        <div className="w-full h-px bg-gradient-to-r from-transparent via-[#3B82F6]/75 to-transparent mb-12 sm:mb-16"></div>

        {/* FAQ Grid */}
        <div className="grid max-w-4xl grid-cols-1 gap-8 sm:gap-12 mx-auto lg:grid-cols-2">
          <div className="space-y-8 sm:space-y-12">
            <div>
              <h3 className="text-base sm:text-lg leading-6 text-white mb-3 sm:mb-4">
                What hardware do you support?
              </h3>
              <p className="text-sm text-theme-secondary">
                This varies depending on the software you are using. Please
                refer to the product page for more information.
              </p>
            </div>
            <div>
              <h3 className="text-base sm:text-lg leading-6 text-white mb-3 sm:mb-4">
                What payment methods do you support?
              </h3>
              <p className="text-sm text-theme-secondary">
                We accept cryptocurrency and all major credit cards. Card
                payments are processed securely through Stripe.
              </p>
            </div>
          </div>
          <div className="space-y-8 sm:space-y-12">
            <div>
              <h3 className="text-base sm:text-lg leading-6 text-white mb-3 sm:mb-4">
                What operating systems do you support?
              </h3>
              <p className="text-sm text-theme-secondary">
                This varies depending on the software you are using. Please
                refer to the product page for more information.
              </p>
            </div>
            <div>
              <h3 className="text-base sm:text-lg leading-6 text-white mb-3 sm:mb-4">
                My question isn't listed here, what do I do?
              </h3>
              <p className="text-sm text-theme-secondary">
                If you require further support, you can contact us in the
                "Support" section.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

