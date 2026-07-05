'use client'
import * as React from "react";
import * as AccordionPrimitive from "@radix-ui/react-accordion";

import { cn } from "@/lib/utils";

const Accordion = AccordionPrimitive.Root;

const AccordionItem = React.forwardRef<
  React.ElementRef<typeof AccordionPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Item>
>(({ className, ...props }, ref) => (
  <AccordionPrimitive.Item ref={ref} className={cn("border-b", className)} {...props} />
));
AccordionItem.displayName = "AccordionItem";

const GLYPHS = '!<>-_\\/[]{}—=+*^?#@$%';

const AccordionTrigger = React.forwardRef<
  React.ElementRef<typeof AccordionPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Trigger>
>(({ className, children, onClick, ...props }, ref) => {
  // Question scramble on toggle (reference-video effect): when clicked, the
  // question decodes through random glyphs in brand green, resolving
  // RIGHT to LEFT back into the real text (~0.6s).
  const [display, setDisplay]       = React.useState<React.ReactNode>(children);
  const [scrambling, setScrambling] = React.useState(false);
  const intervalRef = React.useRef<ReturnType<typeof setInterval> | null>(null);

  React.useEffect(() => {
    setDisplay(children);
    return () => { if (intervalRef.current) clearInterval(intervalRef.current); };
  }, [children]);

  function scramble() {
    if (typeof children !== 'string') return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    if (intervalRef.current) clearInterval(intervalRef.current);

    const original = children;
    const totalFrames = 20; // ~0.6s at 30ms
    let frame = 0;
    setScrambling(true);

    intervalRef.current = setInterval(() => {
      frame++;
      const resolved = (frame / totalFrames) * original.length;
      setDisplay(
        original
          .split('')
          .map((c, i) => {
            if (c === ' ') return ' ';
            // resolve from the RIGHT: the tail settles first, glyphs fall away leftward
            return i >= original.length - resolved ? c : GLYPHS[Math.floor(Math.random() * GLYPHS.length)];
          })
          .join('')
      );
      if (frame >= totalFrames) {
        if (intervalRef.current) clearInterval(intervalRef.current);
        intervalRef.current = null;
        setDisplay(original);
        setScrambling(false);
      }
    }, 30);
  }

  return (
    <AccordionPrimitive.Header className="flex">
      <AccordionPrimitive.Trigger
        ref={ref}
        onClick={e => { scramble(); onClick?.(e); }}
        className={cn(
          // The +/- indicator: the vertical bar rotates away and fades when open,
          // turning the plus into a minus with the same power4 ease as the panel.
          "group flex flex-1 items-center justify-between py-4 font-medium transition-all",
          className,
        )}
        {...props}
      >
        <span className={scrambling ? 'text-brand-green transition-colors' : 'transition-colors'}>{display}</span>
        <span className="relative ml-4 h-3.5 w-3.5 shrink-0" aria-hidden="true">
          <span className="absolute left-0 top-1/2 h-[1.5px] w-full -translate-y-1/2 rounded-full bg-current" />
          <span className="absolute left-1/2 top-0 h-full w-[1.5px] -translate-x-1/2 rounded-full bg-current transition-[opacity,transform] duration-500 ease-[cubic-bezier(0.76,0,0.24,1)] group-data-[state=open]:rotate-90 group-data-[state=open]:opacity-0" />
        </span>
      </AccordionPrimitive.Trigger>
    </AccordionPrimitive.Header>
  );
});
AccordionTrigger.displayName = AccordionPrimitive.Trigger.displayName;

const AccordionContent = React.forwardRef<
  React.ElementRef<typeof AccordionPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Content>
>(({ className, children, ...props }, ref) => (
  <AccordionPrimitive.Content
    ref={ref}
    className="overflow-hidden text-sm transition-all data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down"
    {...props}
  >
    <div className={cn("pb-4 pt-0", className)}>{children}</div>
  </AccordionPrimitive.Content>
));

AccordionContent.displayName = AccordionPrimitive.Content.displayName;

export { Accordion, AccordionItem, AccordionTrigger, AccordionContent };
