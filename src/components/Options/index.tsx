import { Dispatch, SetStateAction } from 'react';
import Option from './Option';

type OptionsProps = {
  data: Array<{
    id: string;
    text: string;
  }>;
  solution: string | null;
  selected: string | null;
  onSelect: Dispatch<SetStateAction<string[]>>;
};

function Options({ solution, data, selected, onSelect }: OptionsProps) {
  return (
    <div className="grid grid-rows-4 md:grid-rows-2 grid-flow-col gap-5 md:gap-12">
      {data.map((option, index) => (
        <Option
          key={option.text}
          index={index}
          solution={solution}
          selected={selected}
          onClick={onSelect}
          {...option}
        />
      ))}
    </div>
  );
}

export default Options;
