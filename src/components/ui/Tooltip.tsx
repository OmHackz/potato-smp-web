import { useState, useRef, useEffect, useCallback, useId } from 'react';
import { createPortal } from 'react-dom';
import React from 'react';
import { clsx } from 'clsx';
import styles from './Tooltip.module.css';

interface TooltipProps {
  content: React.ReactNode;
  children: React.ReactElement;
  position?: 'top' | 'bottom' | 'left' | 'right';
  delay?: number;
  offset?: number;
}

export const Tooltip = ({
  content,
  children,
  position = 'top',
  delay = 200,
  offset = 8,
}: TooltipProps) => {
  const [visible, setVisible] = useState(false);
  const [tooltipRect, setTooltipRect] = useState<DOMRect | null>(null);
  const [triggerRect, setTriggerRect] = useState<DOMRect | null>(null);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | number>(0);
  const tooltipRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLElement>(null);
  const id = useId();

  const show = useCallback(() => {
    timeoutRef.current = setTimeout(() => setVisible(true), delay);
  }, [delay]);

  const hide = useCallback(() => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setVisible(false);
  }, []);

  useEffect(() => {
    if (visible && tooltipRef.current && triggerRef.current) {
      setTooltipRect(tooltipRef.current.getBoundingClientRect());
      setTriggerRect(triggerRef.current.getBoundingClientRect());
    }
  }, [visible]);

  const getStyles = useCallback(() => {
    if (!tooltipRect || !triggerRect) return {};

    const triggerCenterX = triggerRect.left + triggerRect.width / 2;
    const triggerCenterY = triggerRect.top + triggerRect.height / 2;
    const tooltipWidth = tooltipRect.width;
    const tooltipHeight = tooltipRect.height;

    let top = 0, left = 0, transform = 'translate(-50%, -50%)';

    switch (position) {
      case 'top':
        top = triggerRect.top - offset - tooltipHeight / 2;
        left = triggerCenterX;
        transform = 'translateX(-50%) translateY(-100%)';
        break;
      case 'bottom':
        top = triggerRect.bottom + offset + tooltipHeight / 2;
        left = triggerCenterX;
        break;
      case 'left':
        top = triggerCenterY;
        left = triggerRect.left - offset - tooltipWidth / 2;
        transform = 'translateY(-50%) translateX(-100%)';
        break;
      case 'right':
        top = triggerCenterY;
        left = triggerRect.right + offset + tooltipWidth / 2;
        transform = 'translateY(-50%)';
        break;
    }

    return { top: `${top}px`, left: `${left}px`, transform };
  }, [position, offset, tooltipRect, triggerRect]);

  const tooltipElement = (
    <div
      ref={tooltipRef}
      id={id}
      role="tooltip"
      className={clsx(styles.tooltip, styles[position], visible && styles.visible)}
      style={getStyles()}
      aria-hidden={!visible}
    >
      <div className={styles.arrow} />
      <div className={styles.content}>{content}</div>
    </div>
  );

  const childProps = {
    ref: triggerRef,
    onMouseEnter: show,
    onMouseLeave: hide,
    onFocus: show,
    onBlur: hide,
    'aria-describedby': visible ? id : undefined,
  };

  const triggerElement = React.isValidElement(children)
    ? React.cloneElement(children as React.ReactElement, childProps)
    : children;

  return (
    <>
      {triggerElement}
      {createPortal(tooltipElement, document.body)}
    </>
  );
};