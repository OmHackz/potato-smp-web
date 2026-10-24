import { clsx } from 'clsx';
import React from 'react';
import styles from './MCButton.module.css';

export type MCButtonVariant = 'primary' | 'secondary' | 'gold' | 'destructive' | 'ghost';
export type MCButtonSize = 'sm' | 'md' | 'lg' | 'xl';

interface MCButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: MCButtonVariant;
  size?: MCButtonSize;
  fullWidth?: boolean;
  loading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  asChild?: boolean;
}

export const MCButton = React.forwardRef<HTMLButtonElement, MCButtonProps>(
  ({
    variant = 'primary',
    size = 'md',
    fullWidth = false,
    loading = false,
    leftIcon,
    rightIcon,
    disabled,
    children,
    className,
    asChild = false,
    ...props
  }, ref) => {
    const isDisabled = disabled || loading;

    if (asChild && React.isValidElement(children)) {
      return React.cloneElement(
        children as React.ReactElement<any>,
        {
          ref,
          className: clsx(
            styles.button,
            styles[variant],
            styles[size],
            fullWidth && styles.fullWidth,
            isDisabled && styles.disabled,
            className,
          ),
          ...props,
        },
      );
    }

    return (
      <button
        ref={ref}
        className={clsx(
          styles.button,
          styles[variant],
          styles[size],
          fullWidth && styles.fullWidth,
          isDisabled && styles.disabled,
          className,
        )}
        disabled={isDisabled}
        aria-busy={loading}
        aria-disabled={isDisabled}
        {...props}
      >
        {loading && <span className={styles.spinner} aria-hidden="true" />}
        {!loading && leftIcon && <span className={styles.iconLeft} aria-hidden="true">{leftIcon}</span>}
        <span className={clsx(styles.label, loading && styles.labelHidden)}>{children}</span>
        {!loading && rightIcon && <span className={styles.iconRight} aria-hidden="true">{rightIcon}</span>}
      </button>
    );
  }
);

MCButton.displayName = 'MCButton';