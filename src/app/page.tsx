"use client";

import { useState, useEffect } from "react";
import {
  ChevronLeft,
  ChevronRight,
  Check,
  Truck,
  Clock,
  Shield,
  Star,
  Zap,
  Award,
  CheckCircle,
} from "lucide-react";
import Image from "next/image";

interface Skip {
  id: number;
  size: number;
  price_before_vat: number;
  vat: number;
  hire_period_days: number;
  allowed_on_road: boolean;
  allows_heavy_waste: boolean;
}

const SkipSelectionPage = () => {
  const [skips, setSkips] = useState<Skip[]>([]);
  const [selectedSkip, setSelectedSkip] = useState<Skip | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchSkips = async () => {
      try {
        const response = await fetch(
          "https://app.wewantwaste.co.uk/api/skips/by-location?postcode=NR32&area=Lowestoft"
        );
        if (!response.ok) {
          throw new Error("Failed to fetch skip data");
        }
        const data = await response.json();
        setSkips(data);
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "An unknown error occurred"
        );
      } finally {
        setLoading(false);
      }
    };

    fetchSkips();
  }, []);

  const calculateFinalPrice = (priceBeforeVat: number, vat: number): number => {
    return Math.round(priceBeforeVat * (1 + vat / 100));
  };

  const getSkipImage = (size: number): string => {
    const skipImages = [
      "https://images.unsplash.com/photo-1503596476-1c12a8ba09a9?w=400&h=300&fit=crop&crop=center&auto=format&q=80",
      "https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?w=400&h=300&fit=crop&crop=center&auto=format&q=80",
      "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=300&fit=crop&crop=center&auto=format&q=80",
      "https://images.unsplash.com/photo-1611284446314-60a58ac0deb9?w=400&h=300&fit=crop&crop=center&auto=format&q=80",
      "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=400&h=300&fit=crop&crop=center&auto=format&q=80",
    ];
    return skipImages[size % skipImages.length];
  };

  type HandleSkipSelect = (skip: Skip) => void;

  const handleSkipSelect: HandleSkipSelect = (skip) => {
    setSelectedSkip(skip);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 flex items-center justify-center relative overflow-hidden">
        <div className='absolute inset-0 bg-[url(&apos;data:image/svg+xml,%3Csvg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fill-rule="evenodd"%3E%3Cg fill="%23ffffff" fill-opacity="0.05"%3E%3Ccircle cx="30" cy="30" r="2"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E&apos;)]'></div>
        <div className="text-center relative z-10">
          <div className="relative mb-8">
            <div className="animate-spin rounded-full h-20 w-20 border-4 border-yellow-400 border-t-transparent mx-auto"></div>
            <div className="absolute inset-0 rounded-full bg-yellow-400/20 blur-xl animate-pulse"></div>
          </div>
          <p className="text-white text-xl font-medium">
            Loading your skip options...
          </p>
          <p className="text-blue-300 text-sm mt-2">
            Finding the perfect waste solution for you
          </p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-red-900 to-pink-900 flex items-center justify-center">
        <div className="text-center bg-white/10 backdrop-blur-lg rounded-3xl p-8 border border-white/20">
          <div className="text-red-400 text-3xl mb-4">⚠️</div>
          <h2 className="text-white text-xl font-bold mb-2">
            Unable to Load Skip Data
          </h2>
          <p className="text-red-200">{error}</p>
          <button className="mt-4 px-6 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg transition-colors">
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 relative overflow-hidden">
      <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width=\'60\' height=\'60\' viewBox=\'0 0 60 60\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'none\' fill-rule=\'evenodd\'%3E%3Cg fill=\'%23ffffff\' fill-opacity=\'0.05\'%3E%3Ccircle cx=\'30\' cy=\'30\' r=\'2\'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')]"></div>
      <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-transparent to-black/20"></div>

      <div className="relative z-10 bg-white/10 backdrop-blur-xl border-b border-white/20 shadow-2xl">
        <div className="w-full px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-18 py-2">
            <div className="flex items-center space-x-4">
              <button className="flex items-center text-white hover:text-yellow-400 transition-all duration-300 group">
                <ChevronLeft className="h-5 w-5 mr-1 group-hover:-translate-x-1 transition-transform" />
                <span className="font-medium">Back</span>
              </button>
              <div className="h-6 w-px bg-white/30"></div>
              <div className="flex items-center space-x-3 text-sm">
                <span className="flex items-center text-green-400">
                  <CheckCircle className="h-4 w-4 mr-2" />
                  <span className="font-medium">Postcode</span>
                </span>
                <ChevronRight className="h-4 w-4 text-white/60" />
                <span className="flex items-center text-green-400">
                  <CheckCircle className="h-4 w-4 mr-2" />
                  <span className="font-medium">Waste Type</span>
                </span>
                <ChevronRight className="h-4 w-4 text-white/60" />
                <span className="flex items-center font-bold text-yellow-400">
                  <div className="w-3 h-3 bg-yellow-400 rounded-full mr-2 animate-pulse"></div>
                  Select Skip
                </span>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-sm text-white/80 font-medium">
                Step 3 of 6
              </span>
              <div className="w-20 h-3 bg-white/20 rounded-full backdrop-blur-sm">
                <div className="w-1/2 h-3 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full relative">
                  <div className="absolute inset-0 bg-white/30 rounded-full animate-pulse"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="relative z-10 w-full px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-16">
          <div className="relative inline-block mb-6">
            <h1 className="text-5xl md:text-7xl font-black text-transparent bg-clip-text bg-gradient-to-r from-white via-yellow-200 to-yellow-400 mb-4 leading-tight">
              Choose Your Perfect Skip
            </h1>
            <div className="absolute -inset-1 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-lg blur-xl opacity-20 animate-pulse"></div>
          </div>
          <p className="text-xl text-blue-100 mb-10 max-w-3xl mx-auto font-light leading-relaxed">
            Select the skip size that best suits your project needs. All prices
            include VAT and delivery to your location in Lowestoft.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-6 text-sm">
            <div className="flex items-center bg-white/10 backdrop-blur-sm rounded-full px-4 py-2 border border-white/20 hover:bg-white/20 transition-all duration-300">
              <Truck className="h-5 w-5 mr-3 text-yellow-400" />
              <span className="text-white font-medium">Free Delivery</span>
            </div>
            <div className="flex items-center bg-white/10 backdrop-blur-sm rounded-full px-4 py-2 border border-white/20 hover:bg-white/20 transition-all duration-300">
              <Clock className="h-5 w-5 mr-3 text-green-400" />
              <span className="text-white font-medium">14-Day Hire</span>
            </div>
            <div className="flex items-center bg-white/10 backdrop-blur-sm rounded-full px-4 py-2 border border-white/20 hover:bg-white/20 transition-all duration-300">
              <Shield className="h-5 w-5 mr-3 text-purple-400" />
              <span className="text-white font-medium">Fully Insured</span>
            </div>
            <div className="flex items-center bg-white/10 backdrop-blur-sm rounded-full px-4 py-2 border border-white/20 hover:bg-white/20 transition-all duration-300">
              <Award className="h-5 w-5 mr-3 text-blue-400" />
              <span className="text-white font-medium">Licensed Operator</span>
            </div>
          </div>
        </div>

        <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-8 mb-16">
          {skips.map((skip) => {
            const finalPrice = calculateFinalPrice(
              skip.price_before_vat,
              skip.vat
            );
            const isSelected = selectedSkip?.id === skip.id;
            const isPopular = skip.size === 8;

            return (
              <div
                key={skip.id}
                className={`group relative bg-white/10 backdrop-blur-xl rounded-3xl shadow-2xl hover:shadow-yellow-500/20 transition-all duration-500 cursor-pointer transform hover:-translate-y-2 hover:scale-105 flex flex-col h-full border border-white/20 ${
                  isSelected
                    ? "ring-4 ring-yellow-400 ring-opacity-60 shadow-yellow-400/30 bg-white/20 scale-105"
                    : "hover:bg-white/15"
                }`}
                onClick={() => handleSkipSelect(skip)}
              >
                {isPopular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 z-20">
                    <div className="bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 text-white px-6 py-2 rounded-full text-sm font-bold flex items-center shadow-lg animate-bounce">
                      <Star className="h-4 w-4 mr-2 animate-spin" />
                      Most Popular
                      <Zap className="h-4 w-4 ml-2" />
                    </div>
                  </div>
                )}

                <div className="relative h-52 rounded-t-3xl overflow-hidden">
                  <Image
                    width={400}
                    height={300}
                    src={getSkipImage(skip.size)}
                    alt={`${skip.size} Yard Skip`}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                  <div className="absolute inset-0 bg-gradient-to-br from-yellow-400/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <div className="absolute top-4 right-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 py-2 rounded-full font-bold text-sm shadow-lg backdrop-blur-sm border border-white/20">
                    {skip.size} Yards
                  </div>

                  {isSelected && (
                    <div className="absolute top-4 left-4 bg-green-500 text-white rounded-full p-2 shadow-lg animate-pulse">
                      <Check className="h-5 w-5" />
                    </div>
                  )}
                </div>

                <div className="p-6 flex flex-col flex-grow">
                  {/* Header */}
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-2xl font-bold text-white group-hover:text-yellow-300 transition-colors">
                      {skip.size} Yard Skip
                    </h3>
                    {isSelected && (
                      <div className="bg-gradient-to-r from-green-400 to-emerald-500 text-white rounded-full p-2 shadow-lg animate-bounce">
                        <Check className="h-5 w-5" />
                      </div>
                    )}
                  </div>

                  <div className="space-y-4 mb-8 min-h-24">
                    <div className="flex items-center text-sm text-blue-200 bg-white/5 rounded-lg p-2 backdrop-blur-sm">
                      <Clock className="h-5 w-5 mr-3 text-blue-400 flex-shrink-0" />
                      <span className="font-medium">
                        {skip.hire_period_days} day hire period
                      </span>
                    </div>

                    {skip.allowed_on_road && (
                      <div className="flex items-center text-sm text-green-200 bg-white/5 rounded-lg p-2 backdrop-blur-sm">
                        <Truck className="h-5 w-5 mr-3 text-green-400 flex-shrink-0" />
                        <span className="font-medium">
                          Road placement allowed
                        </span>
                      </div>
                    )}

                    {skip.allows_heavy_waste && (
                      <div className="flex items-center text-sm text-purple-200 bg-white/5 rounded-lg p-2 backdrop-blur-sm">
                        <Shield className="h-5 w-5 mr-3 text-purple-400 flex-shrink-0" />
                        <span className="font-medium">
                          Heavy waste permitted
                        </span>
                      </div>
                    )}
                  </div>

                  <div className="flex items-end justify-between mt-auto">
                    <div className="flex flex-col">
                      <div className="text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-orange-500">
                        £{finalPrice}
                      </div>
                      <div className="text-xs text-blue-200 leading-tight font-medium">
                        inc. VAT & delivery
                      </div>
                    </div>

                    <button
                      className={`px-6 py-3 rounded-xl font-bold text-sm transition-all duration-300 flex-shrink-0 shadow-lg transform hover:scale-105 ${
                        isSelected
                          ? "bg-gradient-to-r from-green-500 to-emerald-600 text-white shadow-green-500/30"
                          : "bg-gradient-to-r from-yellow-400 to-orange-500 hover:from-yellow-300 hover:to-orange-400 text-black shadow-yellow-500/30"
                      }`}
                    >
                      {isSelected ? "✓ Selected" : "Select Skip"}
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {selectedSkip && (
          <div className="fixed bottom-0 left-0 right-0 bg-white/10 backdrop-blur-2xl border-t border-white/20 shadow-2xl z-50">
            <div className="w-full px-4 sm:px-6 lg:px-8 py-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-6">
                  <div className="flex items-center space-x-4">
                    <div className="w-16 h-16 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-2xl flex items-center justify-center flex-shrink-0 shadow-lg">
                      <Truck className="h-8 w-8 text-black" />
                    </div>
                    <div>
                      <div className="font-bold text-white text-lg">
                        {selectedSkip.size} Yard Skip Selected
                      </div>
                      <div className="text-sm text-yellow-300 font-medium">
                        £
                        {calculateFinalPrice(
                          selectedSkip.price_before_vat,
                          selectedSkip.vat
                        )}{" "}
                        inc. VAT
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex items-center space-x-4">
                  <button className="px-6 py-3 text-white hover:text-yellow-400 font-semibold transition-all duration-300 hover:bg-white/10 rounded-lg">
                    Back
                  </button>
                  <button className="px-8 py-4 bg-gradient-to-r from-yellow-400 to-orange-500 hover:from-yellow-300 hover:to-orange-400 text-black font-bold rounded-xl transition-all duration-300 flex items-center shadow-lg transform hover:scale-105 hover:shadow-yellow-500/30">
                    Continue to Booking
                    <ChevronRight className="h-5 w-5 ml-2" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SkipSelectionPage;
