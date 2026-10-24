import { clsx } from 'clsx';
import styles from './Panel.module.css';

interface PanelProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'elevated' | 'outlined' | 'inventory';
  padding?: 'none' | 'sm' | 'md' | 'lg';
  header?: React.ReactNode;
  footer?: React.ReactNode;
}

export const Panel = ({
  variant = 'default',
  padding = 'md',
  header,
  footer,
  children,
  className,
  ...props
}: PanelProps) => {
  return (
    <div
      className={clsx(
        styles.panel,
        styles[variant],
        styles[`p-${padding}`],
        className
      )}
      {...props}
    >
      {header && (
        <div className={styles.header}>
          {header}
        </div>
      )}
      <div className={styles.content}>{children}</div>
      {footer && (
        <div className={styles.footer}>{footer}</div>
      )}
    </div>
  );
};