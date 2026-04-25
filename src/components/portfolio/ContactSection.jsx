import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useScrollReveal } from './useScrollReveal';
import { Mail, Coffee, Mic, Brain, Linkedin, Send } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";

const contactCards = [
  { icon: Mail, label: 'Hire Me', description: 'Full-time / leadership roles', href: '#contact-form' },
  { icon: Coffee, label: 'Get Coffee', description: 'Casual conversation', href: '#contact-form' },
  { icon: Mic, label: 'Invite Me to Speak', description: 'Events & conferences', href: '#contact-form' },
  { icon: Brain, label: 'Discuss AI / BI / Data', description: 'Strategy conversations', href: '#contact-form' },
  { icon: Linkedin, label: 'Connect on LinkedIn', description: 'Professional network', href: 'https://www.linkedin.com/in/fatehin-siddique-chowdhury-4b504b116/' },
];

export default function ContactSection() {
  const [ref, isVisible] = useScrollReveal(0.1);
  const [form, setForm] = useState({ name: '', email: '', company: '', purpose: '', message: '' });
  const [sending, setSending] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSending(true);
    // Simulate send
    await new Promise(r => setTimeout(r, 1500));
    toast.success("Message sent! I'll get back to you soon.");
    setForm({ name: '', email: '', company: '', purpose: '', message: '' });
    setSending(false);
  };

  return (
    <section id="contact" className="relative py-28 md:py-36">
      <div className="absolute inset-0 bg-gradient-hero opacity-60" />
      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-6"
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

        {/* Contact Cards */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="flex flex-wrap justify-center gap-3 mb-16"
        >
          {contactCards.map((card, i) => (
            <a
              key={i}
              href={card.href}
              target={card.href.startsWith('http') ? '_blank' : undefined}
              rel={card.href.startsWith('http') ? 'noopener noreferrer' : undefined}
              className="group flex items-center gap-3 px-5 py-3.5 rounded-xl glass hover:bg-muted/40 transition-all duration-300 hover:-translate-y-0.5"
            >
              <card.icon className="w-5 h-5 text-primary group-hover:scale-110 transition-transform" />
              <div className="text-left">
                <p className="text-sm font-semibold text-foreground">{card.label}</p>
                <p className="text-xs text-muted-foreground">{card.description}</p>
              </div>
            </a>
          ))}
        </motion.div>

        {/* Contact Form */}
        <motion.div
          id="contact-form"
          initial={{ opacity: 0, y: 40 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="max-w-2xl mx-auto"
        >
          <form onSubmit={handleSubmit} className="glass rounded-2xl p-8 md:p-10 space-y-5">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div>
                <label className="text-xs font-medium text-muted-foreground mb-1.5 block">Name</label>
                <Input
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  placeholder="Your name"
                  required
                  className="bg-muted/30 border-border/50 focus:border-primary/50"
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
                  className="bg-muted/30 border-border/50 focus:border-primary/50"
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
                  className="bg-muted/30 border-border/50 focus:border-primary/50"
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
                className="bg-muted/30 border-border/50 focus:border-primary/50 resize-none"
              />
            </div>

            <Button
              type="submit"
              disabled={sending}
              className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-semibold py-6 text-sm rounded-xl hover:shadow-lg hover:shadow-primary/25 transition-all duration-300"
            >
              {sending ? (
                <span className="flex items-center gap-2">
                  <div className="w-4 h-4 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
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