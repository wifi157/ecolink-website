import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Quote } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const testimonials = [
  {
    quote: "Recymru helped us fund three solar projects across South Wales. The verification process gives us confidence that our investment is making real impact.",
    author: "Sarah Williams",
    role: "Sustainability Lead",
    company: "Cardiff Manufacturing Group",
    avatar: "SW",
  },
  {
    quote: "Milestone funding protects our budget, and the tracking dashboard keeps everyone aligned. It's exactly what we needed for our CSR programme.",
    author: "James Evans",
    role: "CSR Director",
    company: "Swansea Tech Ltd",
    avatar: "JE",
  },
  {
    quote: "We finally have a single platform to manage our reforestation projects, track progress, and report to our funders. Recymru has transformed how we work.",
    author: "Emma Jones",
    role: "Project Director",
    company: "Pembrokeshire Nature Trust",
    avatar: "EJ",
  },
];

export function Testimonials() {
  const sectionRef = useRef<HTMLElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      cardsRef.current.forEach((card, index) => {
        if (card) {
          gsap.fromTo(
            card,
            { y: 24, opacity: 0 },
            {
              y: 0,
              opacity: 1,
              duration: 0.6,
              ease: 'power2.out',
              scrollTrigger: {
                trigger: card,
                start: 'top 85%',
                toggleActions: 'play none none reverse',
              },
              delay: index * 0.15,
            }
          );
        }
      });
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative w-full py-24 lg:py-32 bg-[#0A1F15]"
    >
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4 font-heading">
            What the ecosystem says
          </h2>
          <p className="text-[#A8C4B0]">
            Hear from organisations across Wales using Recymru to fund verified impact.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {testimonials.map((testimonial, index) => (
            <div
              key={testimonial.author}
              ref={(el) => { cardsRef.current[index] = el; }}
              className="glass-card p-6 hover:-translate-y-1.5 transition-transform duration-300"
            >
              <Quote className="w-8 h-8 text-[#2D8A4E]/30 mb-4" />
              
              <p className="text-[#A8C4B0] leading-relaxed mb-6">
                "{testimonial.quote}"
              </p>
              
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-[#2D8A4E]/20 flex items-center justify-center">
                  <span className="text-sm font-medium text-[#2D8A4E]">
                    {testimonial.avatar}
                  </span>
                </div>
                <div>
                  <p className="text-sm font-medium text-white">
                    {testimonial.author}
                  </p>
                  <p className="text-xs text-[#A8C4B0]">
                    {testimonial.role}, {testimonial.company}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
