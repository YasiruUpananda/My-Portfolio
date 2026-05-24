import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { usePortfolio } from "./hooks/usePortfolio";
import FullscreenSlide from "./components/FullscreenSlide";
import ScrollIndicator from "./components/ScrollIndicator";
import WarpBackground from "./components/WarpBackground";
import WelcomeScreen from "./components/WelcomeScreen";
import ProfileHeader from "./components/ProfileHeader";
import LevelStats from "./components/LevelStats";
import Reputation from "./components/Reputation";
import Skills from "./components/Skills";
import Projects from "./components/Projects";
import Traits from "./components/Traits";
import Achievements from "./components/Achievements";
import SpecialAbilities from "./components/SpecialAbilities";
import TechStack from "./components/TechStack";
import Contact from "./components/Contact";

function ErrorScreen({ message }) {
  return (
    <div className="h-[100dvh] flex items-center justify-center p-4 sm:p-8">
      <p className="font-mono text-red-400 text-center text-sm sm:text-lg px-4">
        ERROR: {message}
        <br />
        <span className="text-hud-muted text-sm sm:text-base mt-3 block">
          Ensure the server is running on port 3001
        </span>
      </p>
    </div>
  );
}

function MinimalLoader() {
  return (
    <div className="h-[100dvh] flex items-center justify-center">
      <div className="text-center">
        <p className="font-display text-hud-cyan text-sm sm:text-lg tracking-[0.2em] sm:tracking-[0.3em] animate-pulse px-4">
          INITIALIZING...
        </p>
        <div className="mt-4 sm:mt-6 h-1.5 w-48 sm:w-64 mx-auto bg-hud-bg border border-hud-cyan/30 overflow-hidden">
          <div className="h-full w-1/3 bg-hud-cyan animate-[slide_1.2s_ease-in-out_infinite]" />
        </div>
      </div>
    </div>
  );
}

export default function App() {
  const { data, loading, error } = usePortfolio();
  const [started, setStarted] = useState(false);

  if (error) return <ErrorScreen message={error.message} />;

  // Show minimal loader only while API hasn't responded yet
  if (loading) {
    return (
      <div className="relative h-[100dvh]">
        <WarpBackground />
        <MinimalLoader />
      </div>
    );
  }

  if (!data) return null;

  const stagger = 0.05;

  return (
    <div className="relative h-[100dvh]">
      <WarpBackground />

      <AnimatePresence mode="wait">
        {!started ? (
          <WelcomeScreen
            key="welcome"
            data={data}
            onStart={() => setStarted(true)}
          />
        ) : (
          <motion.div
            key="portfolio"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="relative h-[100dvh] scanlines"
          >
            <ScrollIndicator />

            <main className="snap-container h-[100dvh] overflow-y-auto overflow-x-hidden snap-y snap-mandatory">
              <FullscreenSlide id="profile">
                <div className="h-full flex flex-col min-h-0">
                  <p className="font-mono text-[9px] sm:text-xs text-hud-cyan/60 tracking-[0.2em] sm:tracking-[0.4em] text-center mb-2 sm:mb-3 shrink-0 px-1">
                    // CHARACTER SHEET v1.0
                  </p>
                  <div className="flex-1 min-h-0">
                    <ProfileHeader profile={data.profile} delay={0} />
                  </div>
                </div>
              </FullscreenSlide>

              <FullscreenSlide id="stats">
                <div className="h-full min-h-0 flex flex-col">
                  <LevelStats level={data.level} stats={data.stats} delay={stagger} />
                </div>
              </FullscreenSlide>

              <FullscreenSlide id="reputation">
                <div className="h-full min-h-0 flex flex-col">
                  <Reputation reputation={data.reputation} delay={stagger} />
                </div>
              </FullscreenSlide>

              <FullscreenSlide id="skills">
                <div className="h-full min-h-0 flex flex-col">
                  <Skills skills={data.skills} delay={stagger} />
                </div>
              </FullscreenSlide>

              <FullscreenSlide id="projects">
                <div className="h-full min-h-0 flex flex-col">
                  <Projects projects={data.projects} delay={stagger} />
                </div>
              </FullscreenSlide>

              <FullscreenSlide id="tech">
                <div className="h-full min-h-0 flex flex-col">
                  <TechStack techStack={data.techStack} delay={stagger} />
                </div>
              </FullscreenSlide>

              <FullscreenSlide id="traits">
                <div className="h-full min-h-0 flex flex-col">
                  <Traits traits={data.traits} delay={stagger} />
                </div>
              </FullscreenSlide>

              <FullscreenSlide id="achievements">
                <div className="h-full min-h-0 flex flex-col">
                  <Achievements achievements={data.achievements} delay={stagger} />
                </div>
              </FullscreenSlide>

              <FullscreenSlide id="abilities">
                <div className="h-full min-h-0 flex flex-col">
                  <div className="flex-1 min-h-0">
                    <SpecialAbilities abilities={data.abilities} delay={stagger} />
                  </div>
                </div>
              </FullscreenSlide>

              <FullscreenSlide id="contact" showHint={false}>
                <div className="h-full min-h-0 flex flex-col">
                  <div className="flex-1 min-h-0">
                    <Contact profile={data.profile} delay={stagger} />
                  </div>
                  <p className="font-mono text-[10px] sm:text-xs text-hud-muted tracking-widest text-center py-2 sm:py-3 shrink-0">
                    [ END OF TRANSMISSION ]
                  </p>
                </div>
              </FullscreenSlide>
            </main>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

