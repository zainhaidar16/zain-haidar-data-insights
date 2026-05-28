import { motion } from "framer-motion";
import { Mail, Linkedin, Github, MapPin, MessageSquare, Globe } from "lucide-react";
import { Button } from "@/components/ui/button";

const contactItems = [
  {
    icon: Mail,
    label: "Email",
    value: "zainhaider72@gmail.com",
    href: "mailto:zainhaider72@gmail.com",
    desc: "Best for project enquiries and collaboration",
  },
  {
    icon: Linkedin,
    label: "LinkedIn",
    value: "linkedin.com/in/zain-haidar",
    href: "https://www.linkedin.com/in/zain-haidar/",
    desc: "Connect professionally",
  },
  {
    icon: Github,
    label: "GitHub",
    value: "github.com/zainhaidar16",
    href: "https://github.com/zainhaidar16",
    desc: "View code and open-source work",
  },
  {
    icon: Globe,
    label: "Kaggle",
    value: "kaggle.com/zainhaidar",
    href: "https://www.kaggle.com/zainhaidar",
    desc: "Datasets and competition notebooks",
  },
  {
    icon: Globe,
    label: "Hugging Face",
    value: "huggingface.co/zainhaidar",
    href: "https://huggingface.co/zainhaidar",
    desc: "Models and ML experiments",
  },
];

export function Contact() {
  return (
    <section id="contact" className="py-24 bg-[#0F172A] relative overflow-hidden">
      {/* Subtle grid pattern */}
      <div className="absolute inset-0 opacity-5" style={{ backgroundImage: "radial-gradient(#ffffff 1px, transparent 1px)", backgroundSize: "32px 32px" }} />

      <div className="section-container relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-start">

          {/* Left — Heading & message */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.55 }}
          >
            <p className="text-xs font-semibold uppercase tracking-widest text-blue-400 mb-4">Get In Touch</p>
            <h2 className="text-3xl sm:text-4xl font-bold text-white leading-tight mb-5">
              Let's build something useful with your data.
            </h2>
            <p className="text-[15px] text-slate-400 leading-relaxed mb-8">
              Whether you need a Power BI dashboard, a data analysis project, or an end-to-end reporting system — I'm available for freelance projects and open to new roles.
            </p>

            <div className="flex items-center gap-2 text-slate-400 text-sm mb-2">
              <MapPin className="h-4 w-4 text-blue-400 shrink-0" />
              Based in Vienna, Austria — available for remote work worldwide
            </div>
            <div className="flex items-center gap-2 text-slate-400 text-sm">
              <MessageSquare className="h-4 w-4 text-blue-400 shrink-0" />
              Usually responds within 24 hours
            </div>

            <div className="mt-10">
              <Button asChild variant="primary">
                <a href="mailto:zainhaider72@gmail.com">
                  <Mail className="h-4.5 w-4.5" />
                  Send Me an Email
                </a>
              </Button>
            </div>
          </motion.div>

          {/* Right — Contact links */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.55, delay: 0.1 }}
            className="space-y-4"
          >
            {contactItems.map((item, i) => {
              const Icon = item.icon;
              return (
                <motion.a
                  key={item.label}
                  href={item.href}
                  target={item.href.startsWith("http") ? "_blank" : undefined}
                  rel={item.href.startsWith("http") ? "noopener noreferrer" : undefined}
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.07 }}
                  className="flex items-center gap-4 p-5 rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 hover:border-blue-500/30 transition-all duration-200 group"
                >
                  <div className="h-11 w-11 rounded-xl bg-blue-600/20 border border-blue-500/20 flex items-center justify-center shrink-0 group-hover:bg-blue-600 group-hover:border-blue-600 transition-all duration-200">
                    <Icon className="h-5 w-5 text-blue-400 group-hover:text-white transition-colors" />
                  </div>
                  <div className="min-w-0">
                    <div className="text-xs font-semibold text-slate-500 uppercase tracking-wide mb-0.5">{item.label}</div>
                    <div className="text-sm font-semibold text-white truncate">{item.value}</div>
                    <div className="text-xs text-slate-500 mt-0.5">{item.desc}</div>
                  </div>
                </motion.a>
              );
            })}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
