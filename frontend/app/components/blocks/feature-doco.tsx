import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { cn } from "@/lib/utils"
import { Activity, Globe, LucideIcon, Rocket } from "lucide-react"
import { ReactNode } from "react"

export function DocoFeatures() {
  return (
    <section className="bg-[#0b0b0b] py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

        <div className="mb-14">
          <p className="font-mono text-xs uppercase tracking-[0.3em] text-[#6a9955]">
            Features
          </p>

          <h2 className="mt-4 max-w-3xl text-4xl font-semibold leading-tight tracking-tight text-[#f5f5f5] md:text-5xl">
            Deploy containers with infrastructure-grade automation.
          </h2>
        </div>

        <div className="grid gap-5 lg:grid-cols-2">

          {/* DEPLOY CARD */}
          <FeatureCard>
            <CardHeader>
              <CardHeading
                icon={Rocket}
                title="Instant Deployments"
                description="Ship Docker Hub images in seconds with zero manual configuration."
              />
            </CardHeader>

            <div className="px-6 pb-6">
              <div className="overflow-hidden rounded-xl border border-[#2d2d2d] bg-black">

                <div className="flex gap-2 border-b border-[#2d2d2d] px-4 py-3">
                  <div className="h-2 w-2 rounded-full bg-red-500" />
                  <div className="h-2 w-2 rounded-full bg-yellow-500" />
                  <div className="h-2 w-2 rounded-full bg-green-500" />
                </div>

                <div className="space-y-2 p-5 font-mono text-sm">
                  <p className="text-[#6a9955]">
                    $ docker deploy nginx:latest
                  </p>

                  <p className="text-[#6b6b6b]">
                    Pulling image...
                  </p>

                  <p className="text-[#6b6b6b]">
                    Creating container...
                  </p>

                  <p className="text-[#4ec9b0]">
                    ✓ Container running
                  </p>

                  <p className="text-[#9cdcfe]">
                    domain: nginx.doco.run
                  </p>
                </div>
              </div>
            </div>
          </FeatureCard>


          {/* LIVE INVENTORY */}
          <FeatureCard>
            <CardHeader>
              <CardHeading
                icon={Activity}
                title="Live Inventory"
                description="Track running workloads and monitor active containers in real time."
              />
            </CardHeader>

            <CardContent>
              <div className="space-y-3">

                {[
                  {
                    name: "nginx-x7k2",
                    state: "running",
                    color: "text-[#4ec9b0]",
                    bg: "bg-[#173227]",
                  },
                  {
                    name: "redis-p9m1",
                    state: "running",
                    color: "text-[#4ec9b0]",
                    bg: "bg-[#173227]",
                  },
                  {
                    name: "mysql-q3n8",
                    state: "exited",
                    color: "text-[#ce9178]",
                    bg: "bg-[#33241a]",
                  },
                  {
                    name: "node-r5j4",
                    state: "created",
                    color: "text-[#dcdcaa]",
                    bg: "bg-[#332f1a]",
                  },
                ].map((container) => (
                  <div
                    key={container.name}
                    className="flex items-center justify-between rounded-xl border border-[#2d2d2d] bg-[#111111] px-4 py-3 transition-all duration-300 hover:border-[#1D63ED]"
                  >
                    <span className="font-mono text-sm text-[#d4d4d4]">
                      {container.name}
                    </span>

                    <span
                      className={cn(
                        "rounded-md px-2 py-1 text-xs uppercase tracking-widest",
                        container.color,
                        container.bg
                      )}
                    >
                      {container.state}
                    </span>
                  </div>
                ))}
              </div>
            </CardContent>
          </FeatureCard>


          {/* DOMAIN CARD */}
          <FeatureCard className="lg:col-span-2">

            <div className="p-10">

              <div className="mx-auto mb-10 max-w-2xl text-center">
                <Globe className="mx-auto mb-4 h-6 w-6 text-[#1D63ED]" />

                <h3 className="text-3xl font-semibold leading-tight text-white md:text-4xl">
                  Automatic domain routing through reverse proxy infrastructure.
                </h3>
              </div>

              <div className="grid gap-3 md:grid-cols-3">

                {[
                  "nginx.doco.run",
                  "redis.doco.run",
                  "mysql.doco.run",
                  "node.doco.run",
                  "python.doco.run",
                  "nextjs.doco.run",
                ].map((domain) => (
                  <div
                    key={domain}
                    className="flex items-center gap-3 rounded-xl border border-[#2d2d2d] bg-[#111111] px-4 py-4 font-mono text-sm text-[#9cdcfe] transition-all duration-300 hover:-translate-y-1 hover:border-[#1D63ED]"
                  >
                    <span className="h-2 w-2 rounded-full bg-[#4ec9b0]" />

                    {domain}
                  </div>
                ))}
              </div>
            </div>

          </FeatureCard>

        </div>
      </div>
    </section>
  )
}

interface FeatureCardProps {
  children: ReactNode
  className?: string
}

const FeatureCard = ({ children, className }: FeatureCardProps) => (
  <Card
    className={cn(
      "group relative overflow-hidden rounded-none border-[#2d2d2d] bg-[#121212] shadow-none transition-all duration-300 hover:border-[#1D63ED]/60",
      className
    )}
  >
    <div className="absolute inset-0 bg-gradient-to-br from-[#1D63ED]/5 via-transparent to-transparent" />
    <CardDecorator />
    {children}
  </Card>
)

const CardDecorator = () => (
  <>
    <span className="absolute -left-px -top-px block size-2 border-l-2 border-t-2 border-[#1D63ED]" />
    <span className="absolute -right-px -top-px block size-2 border-r-2 border-t-2 border-[#1D63ED]" />
    <span className="absolute -bottom-px -left-px block size-2 border-b-2 border-l-2 border-[#1D63ED]" />
    <span className="absolute -bottom-px -right-px block size-2 border-b-2 border-r-2 border-[#1D63ED]" />
  </>
)

interface CardHeadingProps {
  icon: LucideIcon
  title: string
  description: string
}

const CardHeading = ({
  icon: Icon,
  title,
  description,
}: CardHeadingProps) => (
  <div className="p-6">
    <span className="flex items-center gap-2 font-mono text-sm text-[#6b6b6b]">
      <Icon className="size-4 text-[#1D63ED]" />
      {title}
    </span>

    <p className="mt-8 text-2xl font-semibold leading-tight text-[#f5f5f5] md:text-3xl">
      {description}
    </p>
  </div>
)