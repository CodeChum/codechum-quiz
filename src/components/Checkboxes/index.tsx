import { Dispatch, SetStateAction } from 'react';
import Checkbox from './Checkbox';

type CheckboxesProps = {
  data: Array<{
    id: string;
    text: string;
  }>;
  solution: string[] | null;
  selected: string[] | null;
  onSelect: Dispatch<SetStateAction<string[]>>;
};

function Checkboxes({ solution, data, selected, onSelect }: CheckboxesProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-8">
      {data.map((checkbox) => (
        <Checkbox
          key={checkbox.text}
          solution={solution}
          selected={selected}
          onClick={onSelect}
          {...checkbox}
        />
      ))}
    </div>
  );
}

export default Checkboxes;
