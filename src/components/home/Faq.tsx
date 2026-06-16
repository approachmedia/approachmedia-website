import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'

export const faqs = [
  { q: 'Do you handle the entire project?', a: 'Yes. From design and fabrication to installation and dismantling, everything is managed end-to-end by our team.' },
  { q: 'What is the typical cost of an exhibition stall?', a: 'Costs vary based on size, design, and location. We work with brands looking for high-impact, custom-built exhibition spaces.' },
  { q: 'Can you work within a defined budget?', a: 'Yes. We align design, materials, and execution to your budget while maintaining quality and brand intent.' },
  { q: 'How long does a project take?', a: 'Most projects are completed within a two-month timeline, depending on scale and complexity.' },
  { q: 'How do you ensure there are no on-site issues?', a: 'We build and test a full-scale mock-up in our warehouse, replicating the event setup to eliminate surprises.' },
  { q: 'Do you customize designs for different industries?', a: 'Absolutely. Each space is tailored to your industry, audience, and exhibition goals.' },
  { q: 'Do you execute projects internationally?', a: 'Yes. We work across global markets, adhering to international standards for quality, safety, and build.' },
  { q: 'How do we get started?', a: "Share your exhibition details with us and we'll guide you through the next steps, from concept to execution." },
]

export function Faq() {
  return (
    <section className="bg-surface/40 py-20 md:py-28" id="faq">
      <div className="container-narrow grid gap-10 md:grid-cols-12 md:gap-16">
        <div className="md:col-span-4">
          <p className="text-xs uppercase tracking-[0.22em] text-brand-green">FAQs</p>
          <h2 className="mt-3 font-display text-3xl font-semibold leading-tight text-foreground md:text-4xl">
            Answers before you ask.
          </h2>
          <p className="mt-4 text-sm text-muted-foreground">
            Still have questions? Our team will walk you through the process.
          </p>
        </div>
        <div className="md:col-span-8">
          <Accordion type="single" collapsible className="space-y-2">
            {faqs.map((f, i) => (
              <AccordionItem
                key={i}
                value={`item-${i}`}
                className="surface-card rounded-xl border border-border/10 px-5"
              >
                <AccordionTrigger className="py-5 text-left font-display text-base font-medium text-foreground hover:no-underline">
                  {f.q}
                </AccordionTrigger>
                <AccordionContent className="pb-5 text-sm leading-relaxed text-muted-foreground">
                  {f.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  )
}
