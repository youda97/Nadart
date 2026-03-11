import type { FormEvent } from "react";
import { useNavigate } from "react-router-dom";

export default function InquirySection() {
  const navigate = useNavigate();

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const form = event.currentTarget;
    const formData = new FormData(form);

    try {
      const response = await fetch("/", {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: new URLSearchParams(
          Array.from(formData.entries()) as [string, string][],
        ).toString(),
      });

      if (!response.ok) {
        throw new Error("Form submission failed");
      }

      form.reset();
      navigate("/inquiry-success");
    } catch (error) {
      console.error(error);
      alert(
        "Something went wrong while sending your message. Please try again.",
      );
    }
  }

  return (
    <section className="relative overflow-hidden py-24">
      <div className="absolute inset-0 bg-[url('/textures/content-bg.webp')] bg-cover bg-center opacity-90" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(199,155,78,0.14),_transparent_30%),radial-gradient(circle_at_bottom_right,_rgba(168,121,55,0.12),_transparent_28%)]" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-10 border border-[#d8c4a1] bg-white/80 p-8 shadow-[0_18px_40px_rgba(0,0,0,0.12)] backdrop-blur-sm lg:grid-cols-[0.95fr_1.05fr] lg:p-12">
          <div>
            <div className="mb-6 flex items-center gap-4">
              <span className="h-[3px] w-10 bg-[#b99a64]" />
              <h2 className="text-xl font-bold tracking-tight text-stone-900 md:text-3xl">
                Inquiries
              </h2>
            </div>

            <p className="text-xl font-bold text-stone-900">Get in touch</p>
            <p className="mt-3 max-w-md text-base leading-8 text-stone-700">
              Have a question about a painting, availability, shipping, or a
              custom request? Send a message and we will get back to you.
            </p>
          </div>

          <form
            name="inquiry"
            method="POST"
            data-netlify="true"
            netlify-honeypot="bot-field"
            onSubmit={handleSubmit}
            className="space-y-5"
          >
            <input type="hidden" name="form-name" value="inquiry" />

            <p className="hidden">
              <label>
                Don’t fill this out if you're human: <input name="bot-field" />
              </label>
            </p>

            <div>
              <label
                htmlFor="name"
                className="mb-2 block text-sm font-medium text-stone-800"
              >
                Name
              </label>
              <input
                id="name"
                name="name"
                type="text"
                required
                className="w-full border border-[#d8c4a1] bg-white px-4 py-3 text-stone-900 outline-none transition placeholder:text-stone-400 focus:border-[#b99a64]"
                placeholder="Your name"
              />
            </div>

            <div>
              <label
                htmlFor="email"
                className="mb-2 block text-sm font-medium text-stone-800"
              >
                Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                className="w-full border border-[#d8c4a1] bg-white px-4 py-3 text-stone-900 outline-none transition placeholder:text-stone-400 focus:border-[#b99a64]"
                placeholder="you@example.com"
              />
            </div>

            <div>
              <label
                htmlFor="reason"
                className="mb-2 block text-sm font-medium text-stone-800"
              >
                Reason
              </label>
              <select
                id="reason"
                name="reason"
                defaultValue="General inquiry"
                className="w-full border border-[#d8c4a1] bg-white px-4 py-3 text-stone-900 outline-none transition focus:border-[#b99a64]"
              >
                <option>General inquiry</option>
                <option>Painting availability</option>
                <option>Custom request</option>
                <option>Shipping question</option>
              </select>
            </div>

            <div>
              <label
                htmlFor="message"
                className="mb-2 block text-sm font-medium text-stone-800"
              >
                Message
              </label>
              <textarea
                id="message"
                name="message"
                rows={6}
                required
                className="w-full resize-none border border-[#d8c4a1] bg-white px-4 py-3 text-stone-900 outline-none transition placeholder:text-stone-400 focus:border-[#b99a64]"
                placeholder="Tell us a little about your question..."
              />
            </div>

            <button
              type="submit"
              className="inline-flex items-center justify-center bg-stone-900 px-7 py-4 text-sm font-semibold uppercase tracking-[0.16em] text-white transition hover:bg-black"
            >
              Send inquiry
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
