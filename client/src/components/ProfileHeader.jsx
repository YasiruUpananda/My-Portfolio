import {
  MapPin,
  Mail,
  Phone,
  CircleDot,
} from "lucide-react";
import HudCard from "./HudCard";

// Inline SVG social icons (lucide-react dropped brand icons)
const GitHubIcon = (props) => (
  <svg {...props} viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/>
  </svg>
);

const LinkedInIcon = (props) => (
  <svg {...props} viewBox="0 0 24 24" fill="currentColor">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
  </svg>
);

const TwitterIcon = (props) => (
  <svg {...props} viewBox="0 0 24 24" fill="currentColor">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
  </svg>
);

const EmailIcon = (props) => (
  <svg {...props} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <rect x="2" y="4" width="20" height="16" rx="2"/>
    <path d="M22 4L12 13L2 4"/>
  </svg>
);

const socialIcons = {
  github: GitHubIcon,
  linkedin: LinkedInIcon,
  twitter: TwitterIcon,
  email: EmailIcon,
};

export default function ProfileHeader({ profile, delay = 0 }) {
  return (
    <HudCard delay={delay} fill className="flex-1">
      <div className="flex-1 flex flex-col-reverse md:flex-row items-stretch gap-4 sm:gap-6 md:gap-10 min-h-0 h-full">
        {/* Details — top on mobile, left on desktop */}
        <div className="flex-1 min-w-0 flex flex-col justify-center text-left gap-3 sm:gap-4 md:gap-5">
          <div>
            <h1 className="font-display text-lg sm:text-2xl md:text-3xl lg:text-4xl text-hud-yellow tracking-wider leading-tight break-words">
              {profile.name}
            </h1>
            <p className="font-display text-xs sm:text-base md:text-lg lg:text-xl text-hud-cyan tracking-[0.12em] sm:tracking-[0.15em] mt-1 sm:mt-2">
              {profile.title}
            </p>
            <p className="font-mono text-[10px] sm:text-xs md:text-sm text-hud-muted mt-2 leading-relaxed">
              {profile.tagline}
            </p>
          </div>

          <ul className="space-y-1.5 sm:space-y-2 md:space-y-3 text-[11px] sm:text-sm md:text-base text-hud-muted">
            <li className="flex items-center gap-2 sm:gap-3">
              <MapPin className="w-4 h-4 sm:w-5 sm:h-5 text-hud-cyan shrink-0" />
              <span className="break-words">{profile.location}</span>
            </li>
            <li className="flex items-center gap-2 sm:gap-3">
              <Mail className="w-4 h-4 sm:w-5 sm:h-5 text-hud-cyan shrink-0" />
              <a
                href={`mailto:${profile.email}`}
                className="hover:text-hud-cyan transition-colors break-all"
              >
                {profile.email}
              </a>
            </li>
            <li className="flex items-center gap-2 sm:gap-3">
              <Phone className="w-4 h-4 sm:w-5 sm:h-5 text-hud-cyan shrink-0" />
              <span>{profile.phone}</span>
            </li>
            <li className="flex items-center gap-2 sm:gap-3">
              <CircleDot className="w-4 h-4 sm:w-5 sm:h-5 text-hud-yellow shrink-0" />
              <span className="text-hud-yellow">{profile.availability}</span>
            </li>
          </ul>

          <div className="flex flex-wrap gap-2 sm:gap-3 md:gap-4">
            {profile.socials.map((s) => {
              const Icon = socialIcons[s.id] || Mail;
              return (
                <a
                  key={s.id}
                  href={s.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.label}
                  className="touch-target w-11 h-11 sm:w-12 sm:h-12 hud-clip-sm border border-hud-cyan/50 flex items-center justify-center
                    text-hud-cyan hover:bg-hud-cyan/10 hover:shadow-glow active:scale-95 transition-all"
                >
                  <Icon className="w-4 h-4 sm:w-5 sm:h-5" />
                </a>
              );
            })}
          </div>
        </div>

        {/* Profile Video — bottom on mobile, right on desktop */}
        <div className="relative shrink-0 flex justify-center md:justify-end md:h-full">
          <div
            className="absolute -inset-2 bg-hud-cyan/30 blur-md hud-clip w-full h-full"
            aria-hidden
          />
          <video
            src="/profile.mp4"
            autoPlay
            loop
            muted
            playsInline
            className="relative w-full max-w-[180px] sm:max-w-[220px] aspect-[3/4] max-h-[32vh] sm:max-h-[36vh]
              md:max-w-none md:max-h-none md:h-full md:w-auto object-cover hud-clip border-2 border-hud-cyan"
          />
          <div className="absolute -bottom-1 -right-1 w-4 h-4 sm:w-5 sm:h-5 bg-hud-yellow hud-clip-sm" />
        </div>
      </div>
    </HudCard>
  );
}

