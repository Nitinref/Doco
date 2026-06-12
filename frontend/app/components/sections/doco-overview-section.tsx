import { Boxes, Globe, Server, ArrowRight, Network, Cpu } from "lucide-react"

const features = [
  {
    icon: Cpu,
    title: "Instant Deployments",
    description:
      "Deploy Docker Hub images instantly with dynamic container creation and zero manual setup.",
  },
  {
    icon: Boxes,
    title: "Container Inventory",
    description:
      "Track running, exited and sleeping containers through real-time Docker Engine state synchronization.",
  },
  {
    icon: Globe,
    title: "Automatic Routing",
    description:
      "Each deployment automatically receives reverse proxy based domain routing with clean URL mapping.",
  },
]

export function DocoOverviewSection() {
  return (
    <section className="bg-[#0b0b0b] py-24">

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

        <div className="grid gap-6 xl:grid-cols-[1fr_1fr]">


          {/* LEFT SECTION */}

          <div className="rounded-2xl border border-[#2d2d2d] bg-[#111111] p-8">

            <p className="font-mono text-xs uppercase tracking-[0.3em] text-[#6a9955]">
              Why Doco
            </p>

            <h2 className="mt-4 text-4xl font-semibold leading-tight text-white">
              Infrastructure automation built around Docker Engine.
            </h2>

            <p className="mt-4 text-sm leading-8 text-[#6b6b6b]">
              Doco abstracts container deployment complexity and provides instant infrastructure orchestration directly from browser.
            </p>


            <div className="mt-8 grid gap-4">

              {features.map((feature) => {
                const Icon = feature.icon

                return (
                  <article
                    key={feature.title}
                    className="rounded-xl border border-[#2d2d2d] bg-[#181818] p-5 transition-all duration-300 hover:border-[#1D63ED]/60"
                  >

                    <div className="flex items-center gap-4">

                      <div className="rounded-xl bg-[#1a2633] p-3 text-[#1D63ED]">
                        <Icon className="h-5 w-5" />
                      </div>

                      <h3 className="text-lg font-semibold text-white">
                        {feature.title}
                      </h3>

                    </div>

                    <p className="mt-4 text-sm leading-7 text-[#6b6b6b]">
                      {feature.description}
                    </p>

                  </article>
                )
              })}

            </div>

          </div>



          {/* RIGHT SECTION */}

          <div className="rounded-2xl border border-[#2d2d2d] bg-[#111111] p-8">

            <p className="font-mono text-xs uppercase tracking-[0.3em] text-[#6a9955]">
              Architecture
            </p>

            <h2 className="mt-4 text-4xl font-semibold leading-tight text-white">
              Built as a distributed deployment pipeline.
            </h2>


            <div className="mt-10 space-y-5">


              {/* STEP 1 */}

              <ArchitectureCard
                icon={<Server className="h-5 w-5" />}
                title="Management API"
                description="Express backend receives deployment requests and communicates with Docker daemon through docker.sock."
              />


              <ArrowConnector />


              {/* STEP 2 */}

              <ArchitectureCard
                icon={<Network className="h-5 w-5" />}
                title="Docker Network"
                description="Containers dynamically join shared network namespace with internal DNS resolution."
              />


              <ArrowConnector />


              {/* STEP 3 */}

              <ArchitectureCard
                icon={<Globe className="h-5 w-5" />}
                title="Reverse Proxy Routing"
                description="Incoming domain requests are automatically routed to correct container using hostname mapping."
              />

            </div>

          </div>

        </div>

      </div>

    </section>
  )
}


function ArchitectureCard({
  icon,
  title,
  description,
}: {
  icon: React.ReactNode
  title: string
  description: string
}) {
  return (
    <div className="rounded-xl border border-[#2d2d2d] bg-[#181818] p-5">

      <div className="flex items-center gap-3">

        <div className="rounded-lg bg-[#1a2633] p-2 text-[#1D63ED]">
          {icon}
        </div>

        <h3 className="font-semibold text-white">
          {title}
        </h3>

      </div>

      <p className="mt-3 text-sm leading-7 text-[#6b6b6b]">
        {description}
      </p>

    </div>
  )
}


function ArrowConnector() {
  return (
    <div className="flex justify-center">

      <ArrowRight className="h-5 w-5 text-[#555555]" />

    </div>
  )
}