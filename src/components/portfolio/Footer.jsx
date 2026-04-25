import React from 'react';
import { Linkedin, Mail, FileDown } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="relative py-16 border-t border-border/30">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <p className="font-heading font-bold text-xl md:text-2xl text-foreground/80 mb-6">
          Built around <span className="text-gradient">data</span>, <span className="text-gradient">decisions</span>, and <span className="text-gradient">impact</span>.
        </p>
        
        <div className="flex justify-center gap-4 mb-8">
          <a
            href="https://www.linkedin.com/in/fatehin-siddique-chowdhury-4b504b116/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl glass text-sm font-medium text-foreground/80 hover:text-foreground hover:bg-muted/40 transition-all duration-300"
          >
            <Linkedin className="w-4 h-4" />
            LinkedIn
          </a>
          <a
            href="mailto:fatehin20@gmail.com"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl glass text-sm font-medium text-foreground/80 hover:text-foreground hover:bg-muted/40 transition-all duration-300"
          >
            <Mail className="w-4 h-4" />
            Email
          </a>
          <a
            href="#"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl glass text-sm font-medium text-foreground/80 hover:text-foreground hover:bg-muted/40 transition-all duration-300"
          >
            <FileDown className="w-4 h-4" />
            Resume
          </a>
        </div>

        <p className="text-xs text-muted-foreground">
          © {new Date().getFullYear()} Fatehin Siddique Chowdhury. All rights reserved.
        </p>
      </div>
    </footer>
  );
}