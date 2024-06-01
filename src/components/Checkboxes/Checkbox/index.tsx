import { Dispatch, SetStateAction } from 'react';
import clsx from 'clsx';
import Icon from '@/components/Icon';

type CheckboxProps = {
  id: string;
  solution: string[] | null;
  selected: string[] | null;
  text: string;
  onClick: Dispatch<SetStateAction<string[]>>;
};

enum Status {
  Default = 'default',
  Selected = 'selected',
  Unselected = 'unselected',
  Correct = 'correct',
  Incorrect = 'incorrect',
}

function Checkbox({ solution, id, selected, text, onClick }: CheckboxProps) {
  const isSelected = selected?.includes(id);
  const isCorrect = solution?.includes(id);
  const isRevealed = solution !== null;

  const status = (() => {
    if (selected === null) return Status.Default;

    if (isRevealed) {
      return isCorrect ? Status.Correct : Status.Incorrect;
    }

    return isSelected ? Status.Selected : Status.Unselected;
  })();

  const icon = (() => {
    if (status === Status.Selected || status === Status.Correct)
      return 'check_box';
    if (status === Status.Incorrect) return 'disabled_by_default';

    return 'check_box_outline_blank';
  })();

  const color = (() => {
    if (status === Status.Correct) return 'text-green';
    if (status === Status.Incorrect) return 'text-red';
    if (status === Status.Selected) return 'text-indigo';

    return 'text-neutral-400';
  })();

  return (
    <button
      className={clsx(
        'grid grid-cols-[32px_1fr] md:grid-cols-[40px_1fr] gap-4 items-center justify-between text-left shadow-md rounded-2xl text-xl md:text-[28px] py-4 px-6 md:py-8 md:px-10 text-neutral-700 bg-neutral-0 transition-colors w-full',
        {
          'font-bold': isSelected,
          'shadow-none bg-neutral-100 opacity-50': isRevealed && !isSelected,
          'shadow-[0px_4px_24px_0px_rgba(56,202,121,0.50)]':
            status === Status.Correct && isSelected,
          'shadow-[0px_4px_24px_0px_rgba(238,100,80,0.50)]':
            status === Status.Incorrect && isSelected,
        }
      )}
      disabled={isRevealed}
      type="button"
      onClick={() => {
        if (isSelected) {
          onClick(selected?.filter((i) => i !== id) || []);
        } else {
          onClick([...(selected || []), id]);
        }
      }}
    >
      <Icon
        className={clsx(color, '!text-[32px]')}
        name={icon}
        style={{
          fontVariationSettings: "'FILL' 1, 'wght' 700, 'GRAD' 0, 'opsz' 48",
        }}
      />
      {text}
    </button>
  );
}

export default Checkbox;
