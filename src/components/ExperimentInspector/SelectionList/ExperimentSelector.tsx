import SelectionList from "./SelectionList";

interface ExperimentSelectorProps {
  all: string[];
  selected: Set<string>;
  toggle: (experimentId: string) => void;
  select: (experimentIds: Set<string>) => void;
}

const ExperimentSelector: React.FC<ExperimentSelectorProps> = ({
  all,
  selected,
  toggle,
  select,
}) => {
  return (
    <SelectionList
      title="Experiments"
      all={all}
      selected={selected}
      toggle={toggle}
      select={select}
    />
  );
};

export default ExperimentSelector;
