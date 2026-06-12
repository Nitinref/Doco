import Link from "next/link"
import { Boxes, Cpu, Network } from "lucide-react"

type ContainerRecord = {
  id: string
  name: string
  image: string
  state: string
  status: string
  created: number
  ports: Array<{
    IP?: string
    PrivatePort: number
    PublicPort?: number
    Type: string
  }>
}

function formatCreated(created: number) {
  const milliseconds = String(created).length > 10 ? created : created * 1000
  return new Date(milliseconds).toLocaleString()
}

function formatPorts(ports: ContainerRecord["ports"]) {
  if (!ports.length) return "internal network"

  return ports
    .map((port) => {
      const host = port.PublicPort
        ? `${port.PublicPort}`
        : "internal"

      return `${host} → ${port.PrivatePort}/${port.Type}`
    })
    .join("  •  ")
}

export function DocoInventorySection({
  containers,
}: {
  containers: ContainerRecord[]
}) {
  return (
    <section
      id="inventory"
      className="bg-[#0b0b0b] py-24"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

        {/* HEADER */}

        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">

          <div>
            <p className="font-mono text-xs uppercase tracking-[0.3em] text-[#6a9955]">
              Live Infrastructure
            </p>

            <h2 className="mt-4 max-w-3xl text-4xl font-semibold leading-tight tracking-tight text-white md:text-5xl">
              Real-time container inventory powered by Docker Engine.
            </h2>

            <p className="mt-4 max-w-2xl text-sm leading-8 text-[#6b6b6b]">
              Containers fetched directly from backend Docker API. Monitor running workloads, inspect ports and deployment states instantly.
            </p>
          </div>


          <Link
            href="/deploy"
            className="inline-flex h-12 items-center justify-center rounded-xl border border-[#2d2d2d] bg-[#111111] px-6 font-mono text-sm text-white transition-all duration-300 hover:border-[#1D63ED]"
          >
            Deploy Container
          </Link>

        </div>


        {/* STATS BAR */}

        <div className="mt-10 grid gap-4 md:grid-cols-3">

          <StatsCard
            icon={<Boxes className="h-4 w-4" />}
            label="Containers"
            value={containers.length.toString()}
          />

          <StatsCard
            icon={<Cpu className="h-4 w-4" />}
            label="Running"
            value={
              containers.filter((c) => c.state === "running").length.toString()
            }
          />

          <StatsCard
            icon={<Network className="h-4 w-4" />}
            label="Networks"
            value="1 Active"
          />

        </div>


        {/* CONTAINERS */}

        <div className="mt-8 grid gap-4">

          {containers.length ? (
            containers.map((container) => (
              <article
                key={container.id}
                className="group rounded-2xl border border-[#2d2d2d] bg-[#111111] p-6 transition-all duration-300 hover:border-[#1D63ED]/60"
              >

                <div className="grid gap-6 lg:grid-cols-3">

                  {/* LEFT */}

                  <div>

                    <div className="flex items-center gap-3">

                      <div className="h-2 w-2 rounded-full bg-[#4ec9b0]" />

                      <p className="text-xl font-semibold text-white">
                        {container.name}
                      </p>

                    </div>

                    <p className="mt-3 font-mono text-sm text-[#9cdcfe]">
                      {container.image}
                    </p>

                    <p className="mt-4 text-sm text-[#6b6b6b]">
                      Created {formatCreated(container.created)}
                    </p>

                  </div>


                  {/* CENTER */}

                  <div>

                    <span
                      className={`inline-flex rounded-md px-3 py-1.5 font-mono text-xs uppercase tracking-[0.2em] ${
                        container.state === "running"
                          ? "bg-[#173227] text-[#4ec9b0]"
                          : container.state === "exited"
                            ? "bg-[#33241a] text-[#ce9178]"
                            : "bg-[#2a2a2a] text-[#dcdcaa]"
                      }`}
                    >
                      {container.state}
                    </span>

                    <p className="mt-4 text-sm leading-7 text-[#6b6b6b]">
                      {container.status || "No status available"}
                    </p>

                  </div>


                  {/* RIGHT */}

                  <div>

                    <p className="font-mono text-xs uppercase tracking-[0.3em] text-[#6a9955]">
                      Network Ports
                    </p>

                    <div className="mt-4 rounded-xl border border-[#2d2d2d] bg-black p-4">

                      <p className="font-mono text-sm text-[#9cdcfe]">
                        {formatPorts(container.ports)}
                      </p>

                    </div>

                  </div>

                </div>


                {/* FOOTER */}

                <div className="mt-5 border-t border-[#2d2d2d] pt-4">

                  <p className="font-mono text-xs text-[#555555]">
                    Container ID: {container.id.slice(0, 18)}...
                  </p>

                </div>

              </article>
            ))
          ) : (
            <div className="rounded-2xl border border-dashed border-[#2d2d2d] bg-[#111111] p-12 text-center">

              <p className="text-[#6b6b6b]">
                No active containers found.
              </p>

            </div>
          )}

        </div>
      </div>
    </section>
  )
}


function StatsCard({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode
  label: string
  value: string
}) {
  return (
    <div className="rounded-xl border border-[#2d2d2d] bg-[#111111] p-5">

      <div className="flex items-center gap-2 text-[#6b6b6b]">
        {icon}
        <span className="font-mono text-xs uppercase tracking-wider">
          {label}
        </span>
      </div>

      <p className="mt-4 text-3xl font-semibold text-white">
        {value}
      </p>

    </div>
  )
}