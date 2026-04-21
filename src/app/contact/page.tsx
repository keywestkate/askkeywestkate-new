import type { Metadata } from "next";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { PageHero } from "@/components/PageHero";

export const metadata: Metadata = {
  title: "Contact Kate",
  description:
    "Contact Kate Baldwin — luxury real estate agent in Key West and the Florida Keys. Phone, email, or a short form.",
};

export default function Contact() {
  return (
    <main className="bg-paper text-ink-950">
      <Nav />

      <PageHero
        eyebrow="Get in touch"
        metaLeft={
          <>
            Kate Baldwin
            <br />
            Luxury Real Estate Agent
          </>
        }
        metaRight={
          <>
            Bluescape Real Estate
            <br />
            Key West · Florida Keys
          </>
        }
        title={
          <>
            Let&rsquo;s
            <br />
            talk.
          </>
        }
        subtitle="The best conversations start with the life you want to live. Call, email, or send a note — I respond quickly."
      />

      {/* CONTACT LAYOUT */}
      <section className="px-8 pb-28 md:px-12 md:pb-36">
        <div className="mx-auto grid max-w-[1600px] gap-16 md:grid-cols-12">
          <div className="md:col-span-5">
            <div className="space-y-10">
              <div>
                <div className="eyebrow">Phone</div>
                <a
                  href="tel:3052407828"
                  className="mt-4 block font-display text-[clamp(2.25rem,4vw,3.5rem)] leading-none tracking-tight text-ink-950 hover:text-gulf-700"
                >
                  305.240.7828
                </a>
              </div>
              <div>
                <div className="eyebrow">Email</div>
                <a
                  href="mailto:Kate@BluescapeRealEstate.com"
                  className="mt-4 block font-display text-[clamp(1.4rem,2.3vw,2rem)] leading-tight tracking-tight text-ink-950 hover:text-gulf-700"
                >
                  Kate@BluescapeRealEstate.com
                </a>
              </div>
              <div>
                <div className="eyebrow">Instagram</div>
                <a
                  href="https://instagram.com/askkeywestkate"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-4 block font-display text-[clamp(1.4rem,2.3vw,2rem)] leading-tight tracking-tight text-ink-950 hover:text-gulf-700"
                >
                  @askkeywestkate
                </a>
              </div>
              <div>
                <div className="eyebrow">Office</div>
                <p className="mt-4 text-base leading-relaxed text-ink-800">
                  Bluescape Real Estate
                  <br />
                  Key West, Florida
                </p>
              </div>
            </div>
          </div>

          <div className="md:col-span-7">
            <form className="flex flex-col gap-8">
              <div className="grid gap-8 md:grid-cols-2">
                <Field label="Name" name="name" type="text" />
                <Field label="Email" name="email" type="email" />
                <Field label="Phone" name="phone" type="tel" />
                <Field label="Interest" name="interest" type="text" placeholder="Buy, sell, build, or just exploring" />
              </div>
              <FieldArea label="Tell me about the life you&rsquo;re looking for" name="message" />
              <button
                type="submit"
                className="self-start bg-ink-950 px-8 py-4 text-[0.78rem] uppercase tracking-[0.22em] text-paper transition hover:bg-ink-800"
              >
                Send &rarr;
              </button>
              <p className="text-[0.72rem] uppercase tracking-[0.2em] text-ink-500">
                Form not yet wired — use phone or email for now
              </p>
            </form>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}

function Field({
  label,
  name,
  type,
  placeholder,
}: {
  label: string;
  name: string;
  type: string;
  placeholder?: string;
}) {
  return (
    <label className="flex flex-col gap-2">
      <span className="stat-label text-ink-500">{label}</span>
      <input
        name={name}
        type={type}
        placeholder={placeholder}
        className="border-b border-ink-300 bg-transparent py-3 text-base text-ink-950 outline-none placeholder:text-ink-300 focus:border-ink-950"
      />
    </label>
  );
}

function FieldArea({ label, name }: { label: string; name: string }) {
  return (
    <label className="flex flex-col gap-2">
      <span
        className="stat-label text-ink-500"
        dangerouslySetInnerHTML={{ __html: label }}
      />
      <textarea
        name={name}
        rows={5}
        className="border-b border-ink-300 bg-transparent py-3 text-base text-ink-950 outline-none focus:border-ink-950"
      />
    </label>
  );
}
