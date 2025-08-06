import SelectionList from "./SelectionList";

interface MetricFilterProps {
  all: string[];
  selected: Set<string>;
  toggle: (metricName: string) => void;
  select: (metricNames: Set<string>) => void;
}

const MetricFilter: React.FC<MetricFilterProps> = ({
  all,
  selected,
  toggle,
  select,
}) => {
  return (
    <SelectionList
      title="Metrics"
      all={all}
      selected={selected}
      toggle={toggle}
      select={select}
    />
  );
};

export default MetricFilter;
