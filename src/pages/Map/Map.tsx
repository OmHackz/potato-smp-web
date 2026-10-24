import { useState, useEffect, useRef } from 'react';
import React from 'react';
import { clsx } from 'clsx';
import { MCButton } from '../../components/ui/MCButton';
import { Panel } from '../../components/ui/Panel';
import { useToast } from '../../components/ui/Toast';
import styles from './Map.module.css';

const MAP_URL = import.meta.env.VITE_MAP_URL || '';
const MAP_EMBEDDABLE = import.meta.env.VITE_MAP_EMBEDDABLE !== 'false';
const MAP_NAME = import.meta.env.VITE_MAP_NAME || 'BlueMap';

export const Map = () => {
  const [iframeLoaded, setIframeLoaded] = useState(false);
  const [iframeError, setIframeError] = useState(false);
  const [fullscreen, setFullscreen] = useState(false);
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const { showToast } = useToast();

  const handleLoad = () => {
    setIframeLoaded(true);
    setIframeError(false);
  };

  const handleError = () => {
    setIframeError(true);
    setIframeLoaded(false);
  };

  const reloadIframe = () => {
    if (iframeRef.current) {
      setIframeLoaded(false);
      iframeRef.current.src = iframeRef.current.src;
    }
  };

  const openInNewTab = () => {
    if (MAP_URL) {
      window.open(MAP_URL, '_blank', 'noopener,noreferrer');
    }
  };

  const toggleFullscreen = () => {
    setFullscreen(!fullscreen);
  };

  const hasMap = MAP_URL && MAP_EMBEDDABLE;

  return (
    <div className={clsx(styles.page, fullscreen && styles.fullscreen)}>
      {/* Toolbar */}
      <Panel variant="default" className={styles.toolbar}>
        <div className={styles.toolbarLeft}>
          <h1 className={styles.title}>
            <MapIcon />
            {MAP_NAME} Map
          </h1>
          <span className={clsx(styles.status, iframeLoaded && styles.loaded, iframeError && styles.error)}>
            {iframeLoaded ? 'Loaded' : iframeError ? 'Failed to load' : 'Loading...'}
          </span>
        </div>
        <div className={styles.toolbarRight}>
          {hasMap && (
            <>
              <MCButton variant="secondary" size="sm" onClick={reloadIframe} disabled={!iframeLoaded}>
                <RefreshIcon />
                Reload
              </MCButton>
              <MCButton variant="secondary" size="sm" onClick={openInNewTab}>
                <ExternalIcon />
                Open in New Tab
              </MCButton>
              <MCButton variant="secondary" size="sm" onClick={toggleFullscreen}>
                {fullscreen ? <MinimizeIcon /> : <MaximizeIcon />}
                {fullscreen ? 'Exit Fullscreen' : 'Fullscreen'}
              </MCButton>
            </>
          )}
          {!hasMap && (
            <MCButton variant="primary" size="sm" onClick={openInNewTab} disabled={!MAP_URL}>
              <ExternalIcon />
              {MAP_URL ? 'View Map' : 'Map Not Configured'}
            </MCButton>
          )}
        </div>
      </Panel>

      {/* Map Container */}
      <div className={styles.mapContainer}>
        {hasMap ? (
          <iframe
            ref={iframeRef}
            src={MAP_URL}
            className={clsx(styles.iframe, !iframeLoaded && styles.loading, iframeError && styles.error)}
            onLoad={handleLoad}
            onError={handleError}
            title={`${MAP_NAME} map of PotatoSMP`}
            allowFullScreen
            sandbox="allow-scripts allow-same-origin allow-forms allow-popups allow-pointer-lock"
          />
        ) : (
          <div className={styles.fallback}>
            <MapIllustration />
            <h2>Interactive Map</h2>
            <p>
              {MAP_URL
                ? `The ${MAP_NAME} map couldn't be embedded. Click below to open it directly.`
                : 'No map URL configured. Set VITE_MAP_URL in your environment variables.'}
            </p>
            {MAP_URL && (
              <MCButton variant="primary" size="lg" onClick={openInNewTab}>
                <ExternalIcon />
                Open {MAP_NAME} Map
              </MCButton>
            )}
            <div className={styles.fallbackInfo}>
              <h3>Map Features</h3>
              <ul>
                <li>Real-time world rendering</li>
                <li>Player locations (if enabled)</li>
                <li>Claim/territory boundaries</li>
                <li>3D perspective view</li>
                <li>Day/night cycle</li>
                <li>Resource overlay</li>
              </ul>
            </div>
          </div>
        )}

        {!iframeLoaded && hasMap && (
          <div className={styles.loadingOverlay}>
            <LoadingSpinner />
            <p>Loading map tiles...</p>
          </div>
        )}
      </div>

      {/* Instructions */}
      {!fullscreen && (
        <Panel variant="outlined" className={styles.instructions}>
          <h3>Map Controls</h3>
          <div className={styles.controlsGrid}>
            <ControlItem keys={['Mouse Drag', 'Touch Drag']} action="Pan map" />
            <ControlItem keys={['Scroll', 'Pinch']} action="Zoom in/out" />
            <ControlItem keys={['Right Click', 'Two-finger Drag']} action="Rotate view" />
            <ControlItem keys={['Shift + Drag']} action="Tilt perspective" />
            <ControlItem keys={['Double Click']} action="Zoom to point" />
            <ControlItem keys={['R Key']} action="Reset view" />
          </div>
        </Panel>
      )}
    </div>
  );
};

const LoadingSpinner = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={styles.spinner}>
    <circle cx="12" cy="12" r="10" strokeOpacity="0.25" />
    <path d="M12 2a10 10 0 0 1 10 10" strokeLinecap="round" />
  </svg>
);

const MapIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" width="24" height="24">
    <path d="M18 2a2 2 0 0 1 2 2v16a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h12z" />
    <path d="M12 8v8M8 12h8" />
  </svg>
);

const RefreshIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" width="16" height="16">
    <path d="M23 4v6h-6" />
    <path d="M1 20v-6h6" />
    <path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15" />
  </svg>
);

const ExternalIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" width="16" height="16">
    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
    <path d="M15 3h6v6" />
    <path d="M10 14L21 3" />
  </svg>
);

const MaximizeIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" width="16" height="16">
    <path d="M8 3H5a2 2 0 0 0-2 2v3M21 8V5a2 2 0 0 0-2-2h-3M3 16v3a2 2 0 0 0 2 2h3M16 21h3a2 2 0 0 0 2-2v-3" />
  </svg>
);

const MinimizeIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" width="16" height="16">
    <path d="M4 14h16M4 10h16M10 4v16M14 4v16" />
  </svg>
);

const MapIllustration = () => (
  <svg viewBox="0 0 200 200" fill="none" className={styles.illustration} aria-hidden="true">
    <defs>
      <pattern id="grid" width="20" height="20" patternUnits="userSpaceOnUse">
        <path d="M20 0 L0 0 L0 20" fill="none" stroke="var(--color-border)" strokeWidth="0.5" opacity="0.3" />
      </pattern>
    </defs>
    <rect width="200" height="200" fill="url(#grid)" />
    {/* Terrain */}
    <path d="M20 180 Q60 120 100 140 T180 160 L180 200 L20 200 Z" fill="rgba(90,166,66,0.15)" stroke="var(--color-primary)" strokeWidth="2" opacity="0.5" />
    <path d="M30 160 Q70 100 110 120 T190 140 L190 200 L30 200 Z" fill="rgba(90,166,66,0.1)" stroke="var(--color-primary)" strokeWidth="1.5" opacity="0.3" />
    {/* Water */}
    <ellipse cx="160" cy="60" rx="50" ry="30" fill="rgba(85,255,255,0.15)" stroke="var(--color-cyan)" strokeWidth="1.5" opacity="0.5" />
    {/* Structures */}
    <g fill="var(--color-text-dim)" opacity="0.6">
      <rect x="80" y="140" width="12" height="12" rx="1" />
      <rect x="95" y="135" width="8" height="8" rx="1" />
      <rect x="110" y="145" width="10" height="10" rx="1" />
      <polygon points="140,150 145,135 150,150" />
    </g>
    {/* Compass */}
    <g transform="translate(170, 30)" stroke="var(--color-text-muted)" strokeWidth="1.5">
      <circle cx="0" cy="0" r="18" fill="none" />
      <path d="M0 -14 L0 -10 M0 10 L0 14 M-14 0 L-10 0 M10 0 L14 0" />
      <text x="0" y="-16" text-anchor="middle" font-family="var(--font-body)" font-size="8" fill="var(--color-text-muted)">N</text>
      <text x="0" y="22" text-anchor="middle" font-family="var(--font-body)" font-size="8" fill="var(--color-text-muted)">S</text>
      <text x="-18" y="4" text-anchor="end" font-family="var(--font-body)" font-size="8" fill="var(--color-text-muted)">W</text>
      <text x="20" y="4" text-anchor="start" font-family="var(--font-body)" font-size="8" fill="var(--color-text-muted)">E</text>
    </g>
  </svg>
);

const ControlItem = ({ keys, action }: { keys: string[]; action: string }) => (
  <div className={styles.controlItem}>
    <div className={styles.keys}>
      {keys.map((k, i) => (
        <React.Fragment key={k}>
          <kbd>{k}</kbd>
          {i < keys.length - 1 && <span className={styles.keySeparator}>or</span>}
        </React.Fragment>
      ))}
    </div>
    <span className={styles.action}>{action}</span>
  </div>
);