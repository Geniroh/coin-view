import CoinOverview from "@/components/home/CoinOverview";
import { ErrorBoundary } from "@/components/ErrorBoundary";
import TrendingCoins from "@/components/home/TrendingCoins";
import {
  CoinOverviewFallback,
  TrendingCoinsFallback,
} from "@/components/home/fallback";
import { Suspense } from "react";

export default async function Home() {
  return (
    <main className="main-container">
      <section className="home-grid">
        <Suspense fallback={<CoinOverviewFallback />}>
          <ErrorBoundary fallback={<CoinOverviewFallback />}>
            <CoinOverview />
          </ErrorBoundary>
        </Suspense>

        <Suspense fallback={<TrendingCoinsFallback />}>
          <TrendingCoins />
        </Suspense>
      </section>
      <section className="w-full mt-7 space-y-4">
        <p>Categories</p>
      </section>
    </main>
  );
}
