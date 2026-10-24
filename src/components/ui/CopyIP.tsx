import { useState, useCallback } from 'react';
import { clsx } from 'clsx';
import { useToast } from './Toast';
import styles from './CopyIP.module.css';

interface CopyIPProps {
  address: string;
  label?: string;
  size?: 'sm' | 'md' | 'lg';
  variant?: 'button' | 'card';
  showToast?: boolean;
  onCopy?: () => void;
}

export const CopyIP = ({
  address,
  label = 'Server Address',
  size = 'md',
  variant = 'button',
  showToast: showToastProp = true,
  onCopy,
}: CopyIPProps) => {
  const [copied, setCopied] = useState(false);
  const { showToast } = useToast();

  const handleCopy = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(address);
      setCopied(true);
      if (showToastProp) {
        showToast({
          type: 'success',
          title: 'Copied!',
          message: `${address} copied to clipboard`,
          duration: 3000,
        });
      }
      onCopy?.();
      setTimeout(() => setCopied(false), 2000);
    } catch {
      if (showToastProp) {
        showToast({
          type: 'error',
          title: 'Failed to copy',
          message: 'Please copy manually',
          duration: 3000,
        });
      }
    }
  }, [address, showToastProp, onCopy, showToast]);

  if (variant === 'card') {
    return (
      <div className={clsx(styles.card, styles[size])}>
        <div className={styles.cardHeader}>
          <span className={styles.cardLabel}>{label}</span>
          <span className={clsx(styles.cardStatus, copied && styles.copied)}>
            {copied ? 'Copied!' : 'Click to copy'}
          </span>
        </div>
        <div
          className={styles.cardAddress}
          onClick={handleCopy}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => e.key === 'Enter' && handleCopy()}
          aria-label={copied ? 'Copied to clipboard' : `Copy ${address}`}
        >
          <span className={styles.addressText}>{address}</span>
          <span className={clsx(styles.copyIconWrapper, copied && styles.copied)}>
            {copied ? <CheckIcon /> : <CopyIcon />}
          </span>
        </div>
      </div>
    );
  }

  return (
    <button
      className={clsx(styles.button, styles[size], copied && styles.copied)}
      onClick={handleCopy}
      aria-label={copied ? 'Copied to clipboard' : `Copy ${address}`}
      disabled={copied}
    >
      {copied ? <CheckIcon /> : <CopyIcon />}
      <span>{copied ? 'Copied!' : label}</span>
    </button>
  );
};

const CopyIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={styles.icon}>
    <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
    <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
  </svg>
);

const CheckIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className={styles.icon}>
    <path d="M20 6L9 17l-5-5" />
  </svg>
);