import { Dispatch, SetStateAction } from 'react';
import clsx from 'clsx';
import Check from '@/assets/images/game/check.svg';
import Close from '@/assets/images/game/close.svg';

type OptionProps = {
  id: string;
  index: number;
  solution: string | null;
  selected: string | null;
  text: string;
  onClick: Dispatch<SetStateAction<string[]>>;
};

const LETTERS = ['A', 'B', 'C', 'D'];
const CORRECT_EMOJIS = ['🤩', '🥳', '🤯', '😮', '👏', '🔥', '💯', '💖'];
const INCORRECT_EMOJIS = ['😿', '😔', '🥺', '🙅', '🧑‍💻'];

enum Status {
  Default = 'default',
  Selected = 'selected',
  Unselected = 'unselected',
  Correct = 'correct',
  Incorrect = 'incorrect',
}

function Option({ solution, id, index, selected, text, onClick }: OptionProps) {
  const isSelected = selected === id;
  const isCorrect = solution === id;
  const isRevealed = solution !== null;

  const status = (() => {
    if (selected === null) return Status.Default;

    if (isRevealed) {
      if (isCorrect) return Status.Correct;
      if (!isCorrect && isSelected) return Status.Incorrect;
    }

    return isSelected ? Status.Selected : Status.Unselected;
  })();

  const icon = isCorrect ? Check : Close;
  const items = isCorrect ? CORRECT_EMOJIS : INCORRECT_EMOJIS;
  const emoji = items[Math.floor(Math.random() * items.length)];

  return (
    <button
      className={clsx(
        'relative grid grid-cols-[32px_1fr_32px] md:grid-cols-[40px_1fr_40px] md:gap-6 items-center justify-between text-left shadow-md rounded-2xl text-[20px] md:text-[32px] py-4 px-6 md:py-8 md:px-10 transition-colors w-full',
        {
          'bg-neutral-0 text-neutral-700': status === Status.Default,
          'bg-indigo font-bold text-white': status === Status.Selected,
          'bg-neutral-100 opacity-50 shadow-none text-neutral-700':
            status === Status.Unselected,
          'bg-green font-bold text-white shadow-[0px_4px_24px_0px_rgba(56,202,121,0.50)]':
            status === Status.Correct,
          'bg-red font-bold text-white shadow-[0px_4px_24px_0px_rgba(238,100,80,0.50)]':
            status === Status.Incorrect,
        }
      )}
      disabled={isRevealed}
      type="button"
      onClick={() => {
        if (isSelected) {
          onClick([]);
        } else {
          onClick([id]);
        }
      }}
    >
      <span>{LETTERS[index]}.</span>
      <span>{text}</span>
      {isRevealed && isSelected && (
        <>
          <img className="w-full h-auto" src={icon} />
          <div
            className={clsx(
              'absolute -top-8 right-0 md:-top-10 md:-right-8 rounded-full bg-white flex justify-center items-center w-[54px] h-[54px] md:w-[76px] md:h-[76px] shadow-normal',
              {
                'md:-rotate-45': isCorrect,
                'md:rotate-45': !isCorrect,
              }
            )}
          >
            <span className="text-[42px] md:text-[62px]">{emoji}</span>
          </div>
        </>
      )}
    </button>
  );
}

export default Option;
