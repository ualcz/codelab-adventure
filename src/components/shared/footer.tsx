import { Instagram, Github, Copyright, Mail } from 'lucide-react';


const socialLinks = [
  {
    icon: Github,
    href: "https://github.com/ualcz",
    label: "GitHub",
  },
  {
    icon: Instagram,
    href: "https://www.instagram.com/claubx_",
    label: "Instagram",
  },
  {
    icon: Mail,
    href: "mailto:claudeilsonsouzza@gmail.com",
    label: "Email",
  },
];

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-game-background/80 backdrop-blur-sm border-t border-game-surface/30 text-white/70 py-6 mt-auto">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <div className="flex items-center">
              <Copyright className="h-4 w-4 mr-2" />
              <span>{currentYear} CodeLab - Todos os direitos reservados</span>
            </div>
          </div>
          
          <div className="flex space-x-6">
          {socialLinks.map((link) => {
              const Icon = link.icon;
              return (
                <a
                  key={link.label}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-primary transition-colors"
                  aria-label={link.label}
                >
                  <Icon className="w-6 h-6" />
                </a>
              );
            })}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
