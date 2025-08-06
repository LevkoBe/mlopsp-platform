import styles from "./SelectionList.module.css";

interface SelectionListProps {
  title: string;
  all: string[];
  selected: Set<string>;
  toggle: (item: string) => void;
  select: (items: Set<string>) => void;
}

const SelectionList: React.FC<SelectionListProps> = ({
  title,
  all,
  selected,
  toggle,
  select,
}) => {
  return (
    <div className={styles.panel}>
      <div className={styles.header}>
        <h3>
          {title} ({selected.size} selected)
        </h3>
        <div className={styles.controls}>
          <button
            onClick={() => select(new Set(all))}
            className={`${styles.btn} ${styles.selectAll}`}
          >
            All
          </button>
          <button
            onClick={() => select(new Set())}
            className={`${styles.btn} ${styles.clearAll}`}
          >
            None
          </button>
        </div>
      </div>

      <div className={styles.list}>
        {all.map((item) => (
          <div
            key={item}
            className={`${styles.item} ${
              selected.has(item) ? styles.selected : ""
            }`}
            onClick={() => toggle(item)}
          >
            <span className={styles.name}>{item}</span>
            <span className={styles.indicator}>
              {selected.has(item) ? "✓" : "○"}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SelectionList;
