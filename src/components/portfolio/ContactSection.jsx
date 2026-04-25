import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useScrollReveal } from './useScrollReveal';
import { Mail, Coffee, Mic, Brain, Linkedin, Send, Briefcase, FileDown } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";
import { base44 } from '@/api/base44Client';

const contactCards = [
  {
    icon: Briefcase,
    label: 'Hire Me for Data Science Leadership',
    description: 'Senior / Principal / Manager roles',
    gradient: 'from-cyan-500/20 to-blue-600/10',
    border: 'hover:border-cyan-500/40',
    href: '#contact-form',
  },
  {
    icon: Brain,
    label: 'Invite for AI / BI Strategy',
    description: 'Strategy & advisory conversations',
    gradient: 'from-violet-500/20 to-purple-600/10',
    border: 'hover:border-violet-500/40',
    href: '#contact-form',
  },
  {
    icon: Coffee,
    label: 'Book a Coffee Chat',
    description: 'Casual conversation, no agenda',
    gradient: 'from-orange-500/20 to-amber-600/10',
    border: 'hover:border-orange-500/40',
    href: '#contact-form',
  },
  {
    icon: Mic,
    label: 'Invite Me to Speak',
    description: 'Events, panels, conferences',
    gradient: 'from-emerald-500/20 to-teal-600/10',
    border: 'hover:border-emerald-500/40',
    href: '#contact-form',
  },
  {
    icon: Linkedin,
    label: 'Connect on LinkedIn',
    description: 'Professional network',
    gradient: 'from-blue-400/20 to-blue-600/10',
    border: 'hover:border-blue-400/40',
    href: 'https://www.linkedin.com/in/fatehin-siddique-chowdhury-4b504b116/',
    external: true,
  },
];

function handleResumeDownload() {
  base44.analytics.track({ eventName: 'resume_download_click', properties: { source: 'contact' } });
  window.open('#', '_blank');
}

export default function ContactSection() {
  const [ref, isVisible] = useScrollReveal(0.08);
  const [form, setForm] = useState({ name: '', email: '', company: '', purpose: '', message: '' });
  const [sending, setSending] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSending(true);
    await new Promise(r => setTimeout(r, 1500));
    toast.success("Message sent! I'll get back to you soon.");
    setForm({ name: '', email: '', company: '', purpose: '', message: '' });
    setSending(false);
  };

  return (
    <section id="contact" className="relative py-28 md:py-36">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-cyan-500/2 to-violet-500/3" />
      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <span className="text-xs font-semibold tracking-[0.2em] uppercase text-primary mb-4 block">Get in Touch</span>
          <h2 className="font-heading font-bold text-3xl md:text-5xl tracking-tight mb-4">
            Let's build intelligent systems
            <br className="hidden md:block" />
            <span className="text-gradient"> that move business faster.</span>
          </h2>
          <p className="text-muted-foreground text-base max-w-2xl mx-auto">
            I'm open to global opportunities, AI/data leadership roles, consulting conversations, and high-impact collaborations.
          </p>
        </motion.div>

        {/* Premium CTA Cards */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-14"
        >
          {contactCards.map((card, i) => (
            <motion.a
              key={i}
              href={card.href}
              target={card.external ? '_blank' : undefined}
              rel={card.external ? 'noopener noreferrer' : undefined}
              initial={{ opacity: 0, y: 20 }}
              animate={isVisible ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.25 + i * 0.08 }}
              className={`group relative glass rounded-xl p-5 border border-border/40 ${card.border} hover:shadow-xl transition-all duration-400 hover:-translate-y-0.5 overflow-hidden`}
            >
              <div className={`absolute inset-0 bg-gradient-to-br ${card.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-400`} />
              <div className="relative z-10 flex items-start gap-4">
                <div className="w-10 h-10 rounded-lg bg-muted/50 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
                  <card.icon className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-foreground leading-tight">{card.label}</p>
                  <p className="text-xs text-muted-foreground mt-0.5">{card.description}</p>
                </div>
              </div>
            </motion.a>
          ))}

          {/* Resume Download Card */}
          <motion.button
            onClick={handleResumeDownload}
            initial={{ opacity: 0, y: 20 }}
            animate={isVisible ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.65 }}
            className="group relative glass rounded-xl p-5 border border-border/40 hover:border-amber-400/40 hover:shadow-xl transition-all duration-400 hover:-translate-y-0.5 overflow-hidden text-left"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-amber-400/20 to-orange-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-400" />
            <div className="relative z-10 flex items-start gap-4">
              <div className="w-10 h-10 rounded-lg bg-muted/50 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
                <FileDown className="w-5 h-5 text-amber-400" />
              </div>
              <div>
                <p className="text-sm font-semibold text-foreground leading-tight">Download Resume</p>
                <p className="text-xs text-muted-foreground mt-0.5">PDF · Updated 2025</p>
              </div>
            </div>
          </motion.button>
        </motion.div>

        {/* Contact Form */}
        <motion.div
          id="contact-form"
          initial={{ opacity: 0, y: 40 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="max-w-2xl mx-auto"
        >
          <form onSubmit={handleSubmit} className="glass rounded-2xl p-8 md:p-10 space-y-5 border border-border/40">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div>
                <label className="text-xs font-medium text-muted-foreground mb-1.5 block">Name</label>
                <Input
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  placeholder="Your name"
                  required
                  className="bg-muted/30 border-border/50 focus:border-cyan-500/50"
                />
              </div>
              <div>
                <label className="text-xs font-medium text-muted-foreground mb-1.5 block">Email</label>
                <Input
                  type="email"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  placeholder="you@company.com"
                  required
                  className="bg-muted/30 border-border/50 focus:border-cyan-500/50"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div>
                <label className="text-xs font-medium text-muted-foreground mb-1.5 block">Company</label>
                <Input
                  value={form.company}
                  onChange={(e) => setForm({ ...form, company: e.target.value })}
                  placeholder="Your company"
                  className="bg-muted/30 border-border/50 focus:border-cyan-500/50"
                />
              </div>
              <div>
                <label className="text-xs font-medium text-muted-foreground mb-1.5 block">Purpose</label>
                <Select value={form.purpose} onValueChange={(v) => setForm({ ...form, purpose: v })}>
                  <SelectTrigger className="bg-muted/30 border-border/50">
                    <SelectValue placeholder="Select purpose" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="hiring">Hiring</SelectItem>
                    <SelectItem value="coffee">Coffee Chat</SelectItem>
                    <SelectItem value="consulting">Consulting</SelectItem>
                    <SelectItem value="speaking">Speaking</SelectItem>
                    <SelectItem value="collaboration">Collaboration</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div>
              <label className="text-xs font-medium text-muted-foreground mb-1.5 block">Message</label>
              <Textarea
                value={form.message}
                onChange={(e) => setForm({ ...form, message: e.target.value })}
                placeholder="Tell me about your opportunity or idea..."
                rows={4}
                required
                className="bg-muted/30 border-border/50 focus:border-cyan-500/50 resize-none"
              />
            </div>

            <Button
              type="submit"
              disabled={sending}
              className="w-full bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-semibold py-6 text-sm rounded-xl hover:shadow-lg hover:shadow-cyan-500/25 transition-all duration-300 hover:-translate-y-0.5"
            >
              {sending ? (
                <span className="flex items-center gap-2">
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Sending...
                </span>
              ) : (
                <span className="flex items-center gap-2">
                  <Send className="w-4 h-4" />
                  Send Message
                </span>
              )}
            </Button>
          </form>
        </motion.div>
      </div>
    </section>
  );
}