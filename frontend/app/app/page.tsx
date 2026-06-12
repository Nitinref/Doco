import { DocoInventorySection } from "@/components/sections/doco-inventory-section";
import { DocoOverviewSection } from "@/components/sections/doco-overview-section";
import { DocoStatusSection } from "@/components/sections/doco-status-section";
import { CTASection } from "@/components/ui/hero-dithering-card";
import { DocoFeatures } from "@/components/blocks/feature-doco"
export const dynamic = "force-dynamic";

const backendBaseUrl = process.env.DOCO_API_URL ?? "http://localhost:8080";

type ContainerRecord = {
  id: string;
  name: string;
  image: string;
  state: string;
  status: string;
  created: number;
  ports: Array<{
    IP?: string;
    PrivatePort: number;
    PublicPort?: number;
    Type: string;
  }>;
};

type StatusResponse = {
  status: string;
};

async function getStatus(): Promise<StatusResponse | null> {
  try {
    const response = await fetch(`${backendBaseUrl}/api/status`, {
      cache: "no-store",
    });

    if (!response.ok) {
      return null;
    }

    return response.json();
  } catch {
    return null;
  }
}

async function getContainers(): Promise<ContainerRecord[]> {
  try {
    const response = await fetch(`${backendBaseUrl}/api/containers`, {
      cache: "no-store",
    });

    if (!response.ok) {
      return [];
    }

    return response.json();
  } catch {
    return [];
  }
}export default async function Home() {
  const [status, containers] = await Promise.all([getStatus(), getContainers()]);

  const runningCount = containers.filter(
    (container) => container.state === "running",
  ).length;
  const restingCount = containers.length - runningCount;

  return (
    <div className="min-h-screen bg-[#111111] text-[#d4d4d4]">


      {/* Hero — full bleed, no container */}
      <CTASection
      
        badge="Doco AI-inspired deploy surface"
        title="Your containers,"
        titleAccent="delivered perfectly."
        description="A Doco homepage built in reusable sections, powered by the backend API, and wrapped in the dithering hero style you wanted."
        primaryCtaLabel="Start deploying"
        secondaryCtaLabel="See live containers"
      />

       <DocoFeatures />

      {/* Rest of page — constrained */}
      <div className="relative mx-auto flex w-full max-w-7xl flex-col gap-8 px-4 py-6 sm:px-6 lg:px-8">
        <DocoStatusSection
          apiStatusText={status?.status ?? "The backend status endpoint did not respond."}
          isBackendOnline={Boolean(status)}
          runningCount={runningCount}
          totalCount={containers.length}
          restingCount={restingCount}
        />
        <DocoOverviewSection />
        <DocoInventorySection containers={containers} />
      </div>
    </div>
  );
}