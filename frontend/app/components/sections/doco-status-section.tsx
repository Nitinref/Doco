import { Activity, Server, Container, Wifi } from "lucide-react"

type StatusSectionProps = {
  apiStatusText: string
  isBackendOnline: boolean
  runningCount: number
  totalCount: number
  restingCount: number
}

function MetricCard({
  icon,
  label,
  value,
  detail,
  accent = "blue",
}: {
  icon: React.ReactNode
  label: string
  value: string | number
  detail: string
  accent?: "green" | "blue" | "orange"
}) {
  const accentMap = {
    green: "text-[#4ec9b0] bg-[#173227]",
    blue: "text-[#9cdcfe] bg-[#1a2633]",
    orange: "text-[#ce9178] bg-[#33241a]",
  }

  return (
    <article className="group rounded-2xl border border-[#2d2d2d] bg-[#111111] p-6 transition-all duration-300 hover:border-[#1D63ED]/60">

      <div className="flex items-center gap-3">

        <div
          className={`flex h-10 w-10 items-center justify-center rounded-xl ${accentMap[accent]}`}
        >
          {icon}
        </div>

        <p className="font-mono text-xs uppercase tracking-[0.25em] text-[#6b6b6b]">
          {label}
        </p>

      </div>

      <p className="mt-6 text-4xl font-semibold text-white">
        {value}
      </p>

      <p className="mt-3 text-sm leading-7 text-[#6b6b6b]">
        {detail}
      </p>

    </article>
  )
}

function SignalRow({
  label,
  value,
  healthy = false,
}: {
  label: string
  value: string
  healthy?: boolean
}) {
  return (
    <div className="flex items-center justify-between border-t border-[#2d2d2d] py-4">

      <div className="flex items-center gap-3">

        <span
          className={`h-2 w-2 rounded-full ${
            healthy ? "bg-[#4ec9b0]" : "bg-[#1D63ED]"
          }`}
        />

        <span className="text-sm text-[#6b6b6b]">
          {label}
        </span>

      </div>

      <span
        className={`font-mono text-xs uppercase tracking-[0.2em] ${
          healthy ? "text-[#4ec9b0]" : "text-[#9cdcfe]"
        }`}
      >
        {value}
      </span>

    </div>
  )
}

export function DocoStatusSection({
  apiStatusText,
  isBackendOnline,
  runningCount,
  totalCount,
  restingCount,
}: StatusSectionProps) {
  return (
    <section className="bg-[#0b0b0b] py-24">

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

        {/* HEADER */}

        <div className="mb-12">

          <p className="font-mono text-xs uppercase tracking-[0.3em] text-[#6a9955]">
            System Pulse
          </p>

          <h2 className="mt-4 max-w-3xl text-4xl font-semibold leading-tight text-white md:text-5xl">
            Monitor Docker engine health in real time.
          </h2>

          <p className="mt-4 max-w-2xl text-sm leading-8 text-[#6b6b6b]">
            Live backend health checks and infrastructure telemetry pulled directly from Docker-backed APIs.
          </p>

        </div>


        {/* METRICS */}

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">

          <MetricCard
            icon={<Server className="h-5 w-5" />}
            label="Management API"
            value={isBackendOnline ? "ONLINE" : "OFFLINE"}
            detail={apiStatusText}
            accent={isBackendOnline ? "green" : "orange"}
          />

          <MetricCard
            icon={<Container className="h-5 w-5" />}
            label="Running"
            value={runningCount}
            detail="Containers actively running on host."
            accent="green"
          />

          <MetricCard
            icon={<Activity className="h-5 w-5" />}
            label="Total"
            value={totalCount}
            detail="All known containers in inventory."
            accent="blue"
          />

          <MetricCard
            icon={<Wifi className="h-5 w-5" />}
            label="Resting"
            value={restingCount}
            detail="Exited, created or sleeping workloads."
            accent="orange"
          />

        </div>


        {/* SIGNAL PANEL */}

        <div className="mt-10 overflow-hidden rounded-2xl border border-[#2d2d2d] bg-[#111111]">

          <div className="border-b border-[#2d2d2d] px-6 py-4">

            <p className="font-mono text-xs uppercase tracking-[0.25em] text-[#6a9955]">
              Infrastructure Signals
            </p>

          </div>

          <div className="px-6">

            <SignalRow
              label="Containers API"
              value={totalCount ? "CONNECTED" : "IDLE"}
              healthy={true}
            />

            <SignalRow
              label="Reverse Proxy Routing"
              value=".container.localhost"
            />

            <SignalRow
              label="Managed Inventory"
              value={`${totalCount} ACTIVE`}
            />

            <SignalRow
              label="Docker Engine"
              value={isBackendOnline ? "HEALTHY" : "OFFLINE"}
              healthy={isBackendOnline}
            />

          </div>

        </div>

      </div>

    </section>
  )
}