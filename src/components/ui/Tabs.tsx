import { clsx } from 'clsx';
import { useId } from 'react';
import styles from './Tabs.module.css';

interface TabItem {
  id: string;
  label: string;
  count?: number;
  icon?: React.ReactNode;
  disabled?: boolean;
}

interface TabsProps {
  tabs: TabItem[];
  activeTab: string;
  onChange: (tabId: string) => void;
  variant?: 'default' | 'pills' | 'underline';
  fullWidth?: boolean;
  ariaLabel?: string;
}

export const Tabs = ({
  tabs,
  activeTab,
  onChange,
  variant = 'default',
  fullWidth = false,
  ariaLabel = 'Tabs',
}: TabsProps) => {
  const id = useId();

  return (
    <div
      role="tablist"
      aria-label={ariaLabel}
      className={clsx(styles.tabs, styles[variant], fullWidth && styles.fullWidth)}
    >
      {tabs.map((tab) => (
        <button
          key={tab.id}
          role="tab"
          id={`${id}-tab-${tab.id}`}
          aria-selected={activeTab === tab.id}
          aria-controls={`${id}-panel-${tab.id}`}
          tabIndex={activeTab === tab.id ? 0 : -1}
          disabled={tab.disabled}
          className={clsx(
            styles.tab,
            activeTab === tab.id && styles.active,
            tab.disabled && styles.disabled
          )}
          onClick={() => !tab.disabled && onChange(tab.id)}
        >
          {tab.icon && <span className={styles.tabIcon} aria-hidden="true">{tab.icon}</span>}
          <span className={styles.tabLabel}>{tab.label}</span>
          {tab.count !== undefined && (
            <span className={styles.tabCount} aria-label={`${tab.count} items`}>
              {tab.count > 99 ? '99+' : tab.count}
            </span>
          )}
        </button>
      ))}
    </div>
  );
};

interface TabPanelsProps {
  tabs: TabItem[];
  activeTab: string;
  children: (tabId: string) => React.ReactNode;
  id?: string;
}

export const TabPanels = ({ tabs, activeTab, children, id: providedId }: TabPanelsProps) => {
  const generatedId = useId();
  const id = providedId || generatedId;

  return (
    <div className={styles.panels}>
      {tabs.map((tab) => (
        <div
          key={tab.id}
          role="tabpanel"
          id={`${id}-panel-${tab.id}`}
          aria-labelledby={`${id}-tab-${tab.id}`}
          hidden={activeTab !== tab.id}
          className={clsx(styles.panel, activeTab !== tab.id && styles.hidden)}
          tabIndex={activeTab === tab.id ? 0 : -1}
        >
          {activeTab === tab.id && children(tab.id)}
        </div>
      ))}
    </div>
  );
};