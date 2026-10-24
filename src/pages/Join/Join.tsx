import { useState } from 'react';
import { clsx } from 'clsx';
import { MCButton } from '../../components/ui/MCButton';
import { Panel } from '../../components/ui/Panel';
import { CopyIP } from '../../components/ui/CopyIP';
import { ServerStatusPill } from '../../components/ui/ServerStatusPill';
import { useServerStatus } from '../../hooks/useServerStatus';
import { formatNumber } from '../../lib/utils';
import styles from './Join.module.css';

const RULES = [
  { title: 'Respect Everyone', desc: 'No harassment, hate speech, or toxic behavior. Treat all players with kindness.' },
  { title: 'No Cheating', desc: 'No hacked clients, x-ray, autoclickers, or unfair advantages. Play fair.' },
  { title: 'No Griefing or Stealing', desc: 'Respect other players\' builds and items. Use claims to protect your stuff.' },
  { title: 'No Lag Machines', desc: 'Redstone contraptions that intentionally cause lag are prohibited.' },
  { title: 'English in Public Chat', desc: 'Keep public chat English so moderators can help everyone.' },
  { title: 'No Advertising', desc: 'Don\'t advertise other servers, Discords, or services without permission.' },
  { title: 'Appropriate Names/Skins', desc: 'Usernames and skins must be family-friendly and non-offensive.' },
  { title: 'Use Common Sense', desc: 'If it feels wrong, it probably is. Ask staff if you\'re unsure.' },
];

const FAQ = [
  {
    q: 'What versions are supported?',
    a: 'We support Java Edition 1.20.4 and Bedrock Edition 1.20+. Older versions may work but aren\'t officially supported.',
  },
  {
    q: 'Can I play on Bedrock?',
    a: 'Yes! Use the same IP (play.potatosmp.net) with port 19132. Bedrock players have full cross-play with Java.',
  },
  {
    q: 'How do I claim land?',
    a: 'Use a Golden Shovel to claim chunks, or type /claim for the claiming GUI. You get more claim blocks with playtime and ranks.',
  },
  {
    q: 'Is there a Discord?',
    a: 'Yes! Join at discord.gg/potatosmp for announcements, support, and community chat.',
  },
  {
    q: 'How do I make money?',
    a: 'Jobs (/jobs), selling items in player shops (/shop), voting (/vote), and completing quests all earn in-game currency.',
  },
  {
    q: 'What if I need help?',
    a: 'Ask in Discord, use /help in-game, or contact a staff member. We\'re here to help!',
  },
];

const STEPS = [
  {
    number: '01',
    title: 'Add Server',
    desc: 'Open Minecraft Multiplayer, click "Add Server", and enter the IP below.',
  },
  {
    number: '02',
    title: 'Copy IP',
    desc: 'Click the copy button next to the address, then paste it in Minecraft.',
  },
  {
    number: '03',
    title: 'Join & Play',
    desc: 'Double-click the server in your list and start your PotatoSMP adventure!',
  },
];

export const Join = () => {
  const { data: status, isLoading: loading } = useServerStatus();
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [javaTab, setJavaTab] = useState<'java' | 'bedrock'>('java');

  const serverIP = 'play.potatosmp.net';
  const bedrockPort = 19132;

  return (
    <div className={styles.page}>
      {/* Hero */}
      <section className={styles.hero} aria-labelledby="join-title">
        <div className={styles.heroContent}>
          <h1 id="join-title" className={styles.heroTitle}>Join PotatoSMP</h1>
          <p className={styles.heroSubtitle}>
            Connect in seconds and start playing with our friendly community.
            Java & Bedrock cross-play supported.
          </p>
        </div>
      </section>

      {/* Server Address Card */}
      <section className={styles.addressSection} aria-labelledby="address-title">
        <div className={styles.addressCard}>
          <div className={styles.addressHeader}>
            <h2 id="address-title" className={styles.addressTitle}>Server Address</h2>
            <div className={styles.editionTabs} role="tablist" aria-label="Edition">
              <button
                role="tab"
                aria-selected={javaTab === 'java'}
                aria-controls="java-panel"
                id="java-tab"
                className={clsx(styles.editionTab, javaTab === 'java' && styles.active)}
                onClick={() => setJavaTab('java')}
              >
                <JavaIcon /> Java Edition
              </button>
              <button
                role="tab"
                aria-selected={javaTab === 'bedrock'}
                aria-controls="bedrock-panel"
                id="bedrock-tab"
                className={clsx(styles.editionTab, javaTab === 'bedrock' && styles.active)}
                onClick={() => setJavaTab('bedrock')}
              >
                <BedrockIcon /> Bedrock Edition
              </button>
            </div>
          </div>

          <div role="tabpanel" id="java-panel" aria-labelledby="java-tab" hidden={javaTab !== 'java'}>
            <CopyIP
              address={serverIP}
              label="Java Server IP"
              variant="card"
              size="lg"
            />
            <div className={styles.addressDetails}>
              <div className={styles.detail}>
                <span className={styles.detailLabel}>Version</span>
                <span className={styles.detailValue}>{status?.version || '1.20.4'}</span>
              </div>
              <div className={styles.detail}>
                <span className={styles.detailLabel}>Port</span>
                <span className={styles.detailValue}>25565 (default)</span>
              </div>
              <div className={styles.detail}>
                <span className={styles.detailLabel}>Players</span>
                <span className={styles.detailValue}>
                  {status?.players?.online ?? '?'} / {status?.players?.max ?? '100'}
                </span>
              </div>
            </div>
          </div>

          <div role="tabpanel" id="bedrock-panel" aria-labelledby="bedrock-tab" hidden={javaTab !== 'bedrock'}>
            <CopyIP
              address={serverIP}
              label="Bedrock Server IP"
              variant="card"
              size="lg"
            />
            <div className={styles.addressDetails}>
              <div className={styles.detail}>
                <span className={styles.detailLabel}>Port</span>
                <span className={styles.detailValue}>{bedrockPort}</span>
              </div>
              <div className={styles.detail}>
                <span className={styles.detailLabel}>Players</span>
                <span className={styles.detailValue}>
                  {status?.players?.online ?? '?'} / {status?.players?.max ?? '100'}
                </span>
              </div>
              <p className={styles.bedrockNote}>
                <BedrockIcon /> Same world, same players — full cross-play with Java!
              </p>
            </div>
          </div>

          <ServerStatusPill
            status={status ?? null}
            loading={loading}
            compact={false}
            showAddress={false}
          />
        </div>
      </section>

      {/* How to Join */}
      <section className={styles.stepsSection} aria-labelledby="steps-title">
        <h2 id="steps-title" className={styles.sectionTitle}>How to Join in 3 Steps</h2>
        <div className={styles.stepsGrid}>
          {STEPS.map((step) => (
            <div key={step.number} className={styles.stepCard}>
              <div className={styles.stepNumber}>{step.number}</div>
              <h3 className={styles.stepTitle}>{step.title}</h3>
              <p className={styles.stepDesc}>{step.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Rules */}
      <section className={styles.rulesSection} aria-labelledby="rules-title">
        <h2 id="rules-title" className={styles.sectionTitle}>Server Rules</h2>
        <p className={styles.sectionSubtitle}>Please read and follow these rules to keep PotatoSMP fun for everyone</p>
        <div className={styles.rulesGrid}>
          {RULES.map((rule, i) => (
            <Panel key={rule.title} variant="outlined" className={styles.ruleCard}>
              <div className={styles.ruleNumber}>{i + 1}</div>
              <h3 className={styles.ruleTitle}>{rule.title}</h3>
              <p className={styles.ruleDesc}>{rule.desc}</p>
            </Panel>
          ))}
        </div>
      </section>

      {/* FAQ */}
      <section className={styles.faqSection} aria-labelledby="faq-title">
        <h2 id="faq-title" className={styles.sectionTitle}>Frequently Asked</h2>
        <div className={styles.faqList}>
          {FAQ.map((item, i) => (
            <details key={item.q} className={clsx(styles.faqItem, openFaq === i && styles.open)}>
              <summary
                className={styles.faqQuestion}
                onClick={() => setOpenFaq(openFaq === i ? null : i)}
                aria-expanded={openFaq === i}
              >
                <span>{item.q}</span>
                <ChevronIcon open={openFaq === i} />
              </summary>
              <div className={styles.faqAnswer}>
                <p>{item.a}</p>
              </div>
            </details>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className={styles.ctaSection}>
        <Panel variant="elevated" className={styles.ctaPanel}>
          <h2 className={styles.ctaTitle}>Still Have Questions?</h2>
          <p className={styles.ctaText}>
            Join our Discord for real-time help, announcements, and to meet the community!
          </p>
          <MCButton variant="primary" size="lg" asChild>
            <a href="https://discord.gg/potatosmp" target="_blank" rel="noopener noreferrer">
              Join Discord
              <ExternalIcon className={styles.externalIcon} />
            </a>
          </MCButton>
        </Panel>
      </section>
    </div>
  );
};

// SVG Icons
const JavaIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={styles.tabIcon}>
    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-1-13h2v6h-2zm0 8h2v2h-2z" />
  </svg>
);

const BedrockIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={styles.tabIcon}>
    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-1-13h2v6h-2zm0 8h2v2h-2z" />
  </svg>
);

const ChevronIcon = ({ open }: { open: boolean }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={clsx(styles.chevron, open && styles.open)}>
    <path d="M6 9l6 6 6-6" />
  </svg>
);

const ExternalIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" className={className}>
    <path d="M5 11h11v-11M16 4l-7 7" />
  </svg>
);