"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import Image from "next/image";

const presets = [
  {
    image: "nginx",
    tag: "latest",
    port: "80",
    color: "text-[#4ec9b0]",
    icon: "/nginx-icon.svg",
  },
  {
    image: "node",
    tag: "20-alpine",
    port: "3000",
    color: "text-[#9cdcfe]",
    icon: "/Node.js.svg",
  },
  {
    image: "python",
    tag: "3.12-slim",
    port: "8000",
    color: "text-[#c586c0]",
    icon: "/python.png",
  },
  {
    image: "redis",
    tag: "7",
    port: "6379",
    color: "text-[#f44747]",
    icon: "/Redis.png",
  },
  {
    image: "mysql",
    tag: "8",
    port: "3306",
    color: "text-[#dcdcaa]",
    icon: "/MySQL.svg",
  },
];

type DeploymentResult = {
  containerName: string;
  domain: string;
};

export default function DeployPage() {
  const [image, setImage] = useState("nginx");
  const [tag, setTag] = useState("latest");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [result, setResult] = useState<DeploymentResult | null>(null);

  const [message, setMessage] = useState({
    tone: "muted" as "muted" | "success" | "error",
    text: "Select an image and launch infrastructure instantly.",
  });

  const messageClassName = useMemo(() => {
    if (message.tone === "success")
      return "border-[#173227] bg-[#173227] text-[#4ec9b0]";
    if (message.tone === "error")
      return "border-[#331818] bg-[#331818] text-[#f44747]";
    return "border-[#1c1c1c] bg-[#0d0d0d] text-[#666]";
  }, [message.tone]);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!image.trim() || !tag.trim()) {
      setMessage({
        tone: "error",
        text: "Image and tag required before deployment.",
      });
      return;
    }

    setIsSubmitting(true);
    setMessage({
      tone: "muted",
      text: `Deploying ${image}:${tag} ...`,
    });

    try {
     const response = await fetch(
  `${process.env.NEXT_PUBLIC_API_URL}/api/container`,
  {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      image: image.trim(),
      tag: tag.trim(),
    }),
  }
);
      const payload = await response.json();

      if (!response.ok) {
        throw new Error(payload.message || "Deployment failed");
      }

      setResult(payload.data);

      setMessage({
        tone: "success",
        text: `${payload.data.containerName} deployed successfully.`,
      });
    } catch (error) {
      setMessage({
        tone: "error",
        text:
          error instanceof Error
            ? error.message
            : "Unexpected deployment failure",
      });
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <main className="relative min-h-screen bg-[#050505] px-4 py-8 text-white sm:px-6 lg:px-8">

      {/* background glow */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,#1D63ED15,transparent_35%)]" />

      <div className="relative mx-auto max-w-7xl">

        {/* HEADER */}

        <div className="mb-8 flex flex-wrap items-center justify-between border-b border-[#1c1c1c] pb-6">

          <div>
            <p className="font-mono text-xs uppercase tracking-[0.3em] text-[#6a9955]">
              Deploy Console
            </p>

            <h1 className="mt-3 text-4xl font-semibold text-white">
              Launch New Container
            </h1>
          </div>

          <Link
            href="/"
            className="rounded-xl border border-[#1c1c1c] bg-[#0d0d0d] px-5 py-3 font-mono text-sm transition hover:border-[#1D63ED]"
          >
            ← Dashboard
          </Link>

        </div>


        <div className="grid gap-6 lg:grid-cols-[1fr_1fr]">


          {/* LEFT PANEL */}

          <section className="rounded-2xl border border-[#1c1c1c] bg-[#0d0d0d] p-8">

            <p className="font-mono text-xs uppercase tracking-[0.25em] text-[#6a9955]">
              Deployment
            </p>

            <h2 className="mt-4 text-3xl font-semibold">
              Deploy from Docker Registry
            </h2>


            {/* terminal */}

            <div className="mt-6 overflow-hidden rounded-xl border border-[#1c1c1c] bg-black">

              <div className="flex gap-2 border-b border-[#1c1c1c] px-4 py-3">
                <div className="h-2 w-2 rounded-full bg-red-500" />
                <div className="h-2 w-2 rounded-full bg-yellow-500" />
                <div className="h-2 w-2 rounded-full bg-green-500" />
              </div>

              <div className="p-4 font-mono text-sm">

                <p className="text-[#6a9955]">
                  $ docker run {image}:{tag}
                </p>

                <p className="mt-2 text-[#555]">
                  Waiting for deployment...
                </p>

              </div>

            </div>


            {/* form */}

            <form onSubmit={handleSubmit} className="mt-6 grid gap-4">

              <input
                value={image}
                onChange={(e) => setImage(e.target.value)}
                placeholder="Image"
                className="h-12 rounded-xl border border-[#1c1c1c] bg-black px-4 outline-none focus:border-[#1D63ED]"
              />

              <input
                value={tag}
                onChange={(e) => setTag(e.target.value)}
                placeholder="Tag"
                className="h-12 rounded-xl border border-[#1c1c1c] bg-black px-4 outline-none focus:border-[#1D63ED]"
              />

              <button
                type="submit"
                disabled={isSubmitting}
                className="h-12 rounded-xl bg-[#1D63ED] font-mono transition hover:scale-[1.01] disabled:opacity-50"
              >
                {isSubmitting ? "Deploying..." : "> Launch Container"}
              </button>

            </form>


            <div
              className={`mt-4 rounded-xl border px-4 py-3 font-mono text-xs ${messageClassName}`}
            >
              {message.text}
            </div>


          {result && (
  <div className="mt-4 rounded-xl border border-[#173227] bg-[#173227] p-4">

    <p className="font-mono text-xs uppercase text-[#4ec9b0]">
      Deployment Output
    </p>

    <p className="mt-3 text-lg font-semibold text-white">
      {result.containerName}
    </p>

    <p className="mt-2 font-mono text-xs text-[#888]">
      {result.domain}
    </p>

    <a
      href={`http://${result.domain}`}
      target="_blank"
      rel="noopener noreferrer"
      className="
        mt-4
        inline-flex
        items-center
        rounded-lg
        bg-[#1D63ED]
        px-4
        py-2
        text-sm
        font-medium
        text-white
        transition
        hover:bg-[#174fc2]
      "
    >
      Open Deployment ↗
    </a>

  </div>
)}

          </section>


          {/* RIGHT PANEL */}

      {/* RIGHT PANEL */}

<section className="rounded-2xl border border-[#1c1c1c] bg-[#0a0a0a] p-8">

  {/* Docker Hero */}

  <div className="mb-8 flex flex-col items-center border-b border-[#1c1c1c] pb-8">

    <Image
      src="/docker-logo-ocean-blue.svg"
      alt="Docker"
      width={170}
      height={170}
      className="opacity-95"
    />

    <p className="mt-5 font-mono text-xs uppercase tracking-[0.3em] text-[#1D63ED]">
      Docker Hub Connected
    </p>

    <p className="mt-2 text-xs text-[#666]">
      Registry ready for deployments
    </p>

  </div>


  {/* Header */}

  <p className="font-mono text-xs uppercase tracking-[0.25em] text-[#6a9955]">
    Container Registry
  </p>

  <h2 className="mt-4 text-3xl font-semibold text-white">
    Available Images
  </h2>

  <p className="mt-3 text-sm text-[#555] leading-7">
    Choose a runtime environment and instantly deploy infrastructure.
  </p>


  {/* ICON GRID */}

  <div className="mt-8 grid grid-cols-2 gap-4">

    {presets.map((preset) => (
      <button
        key={preset.image}
        type="button"
        onClick={() => {
          setImage(preset.image);
          setTag(preset.tag);
        }}
        className="
          group
          rounded-2xl
          border
          border-[#1c1c1c]
          bg-black
          p-5
          transition-all
          duration-300
          hover:border-[#1D63ED]
          hover:shadow-[0_0_20px_rgba(29,99,237,0.15)]
          hover:-translate-y-1
        "
      >

        <div className="flex flex-col items-center">

          <Image
            src={preset.icon}
            alt={preset.image}
            width={50}
            height={50}
            className="transition duration-300 group-hover:scale-110"
          />

          <p className={`mt-4 font-mono text-sm ${preset.color}`}>
            {preset.image}
          </p>

          <p className="mt-1 text-xs text-[#666]">
            {preset.tag}
          </p>

          <div className="mt-3 rounded-md bg-[#111111] px-3 py-1">

            <span className="font-mono text-[10px] text-[#777]">
              PORT {preset.port}
            </span>

          </div>

        </div>

      </button>
    ))}

  </div>


  {/* Bottom infra status */}

  <div className="mt-8 rounded-xl border border-[#1c1c1c] bg-black p-4">

    <div className="flex items-center justify-between">

      <span className="font-mono text-xs uppercase tracking-wider text-[#555]">
        Registry Status
      </span>

      <span className="flex items-center gap-2">

        <span className="h-2 w-2 rounded-full bg-[#4ec9b0]" />

        <span className="font-mono text-xs text-[#4ec9b0]">
          ONLINE
        </span>

      </span>

    </div>

  </div>

</section>

        </div>
      </div>
    </main>
  );
}