import { motion } from "framer-motion";
import { ArrowUpRight, Mail, MapPin, Linkedin, Github } from "lucide-react";

export function Contact() {
  return (
    <section id="contact" className="relative py-32 overflow-hidden">
      <div className="absolute inset-x-0 top-0 h-[500px] bg-gradient-hero pointer-events-none" />
      <div className="absolute left-1/2 top-20 -translate-x-1/2 h-[400px] w-[700px] rounded-full bg-primary/20 blur-[140px]" />

      <div className="relative mx-auto max-w-5xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center"
        >
          <div className="inline-flex items-center gap-2 glass rounded-full px-4 py-1.5 text-xs uppercase tracking-[0.2em] text-muted-foreground mb-8">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
            Available for new projects
          </div>
          <h2 className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight">
            Have a project <span className="text-gradient">in mind?</span>
          </h2>
          <p className="mt-6 text-lg text-muted-foreground max-w-2xl mx-auto">
            Let's collaborate to turn your data into clear, measurable business growth.
            I reply within 24 hours.
          </p>
          <a
            href="mailto:zainhaider72@gmail.com"
            className="group inline-flex items-center gap-2 mt-10 rounded-full bg-gradient-primary px-7 py-3.5 text-sm font-medium text-primary-foreground shadow-glow hover:scale-[1.02] transition"
          >
            Contact Me
            <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </a>
        </motion.div>

        <div className="mt-20 grid md:grid-cols-2 gap-4">
          <div className="glass-strong rounded-2xl p-6 flex items-center gap-4">
            <div className="h-11 w-11 rounded-xl bg-gradient-primary grid place-items-center"><Mail className="h-5 w-5 text-primary-foreground" /></div>
            <div className="min-w-0">
              <div className="text-xs uppercase tracking-widest text-muted-foreground">Email</div>
              <a href="mailto:zainhaider72@gmail.com" className="font-medium hover:text-primary truncate block">zainhaider72@gmail.com</a>
            </div>
          </div>
          <div className="glass-strong rounded-2xl p-6 flex items-center gap-4">
            <div className="h-11 w-11 rounded-xl bg-gradient-primary grid place-items-center"><MapPin className="h-5 w-5 text-primary-foreground" /></div>
            <div>
              <div className="text-xs uppercase tracking-widest text-muted-foreground">Location</div>
              <div className="font-medium">Vienna, Austria</div>
            </div>
          </div>
        </div>

        <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
          {[
            { icon: Linkedin, label: "LinkedIn", href: "#" },
            { icon: Github, label: "GitHub", href: "#" },
            { icon: Award, label: "Kaggle", href: "#" },
          ].map((s) => (
            <a key={s.label} href={s.href} className="inline-flex items-center gap-2 rounded-full glass px-5 py-2.5 text-sm hover:bg-white/10 transition">
              <s.icon className="h-4 w-4" />
              {s.label}
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}

import { Award } from "lucide-react";
