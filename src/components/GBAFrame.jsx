import styles from './GBAFrame.module.css';

/**
 * GBAFrame - Pokemon menu-style frame wrapper
 * The iconic teal border with cream interior that wraps all content
 */
export function GBAFrame({ children, title }) {
  return (
    <div className={styles.frame}>
      {title && (
        <div className={styles.titleBar}>
          <span className={styles.title}>{title}</span>
        </div>
      )}
      <div className={styles.inner}>
        {children}
      </div>
    </div>
  );
}

export default GBAFrame;
