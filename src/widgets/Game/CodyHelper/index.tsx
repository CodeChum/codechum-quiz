import CodySuccess from '@/assets/images/game/success.svg';
import CodyFail from '@/assets/images/game/fail.svg';
import clsx from 'clsx';
import { ITEM_TYPES } from '@/types/item';

const STATUS = {
  correct: 'correct',
  incorrect: 'incorrect',
};

type Status = keyof typeof STATUS;

type CodyHelperProps = {
  status: Status;
  type: string;
};

function CodyHelper({ status, type }: CodyHelperProps) {
  const isCorrect = status === 'correct';
  const cody = isCorrect ? CodySuccess : CodyFail;

  const isMultipleAnswer = type === ITEM_TYPES.multiple_answer;

  return (
    <div
      className={clsx(
        'grid grid-cols-[78px_auto] md:grid-cols-[128px_auto] items-center py-3 px-4 md:p-none gap-3 md:gap-5 rounded-xl bg-white md:bg-transparent md:shadow-none',
        {
          'shadow-[0px_4px_24px_0px_rgba(56,202,121,0.50)]': isCorrect,
          'shadow-[0px_4px_24px_0px_rgba(238,100,80,0.50)]': !isCorrect,
        }
      )}
    >
      <img className="w-full h-auto" src={cody} alt="Cody" />
      <div className="md:tooltip md:py-3 md:px-5 md:bg-white rounded-xl max-w-[468px] w-full md:shadow-[0px_8px_8px_0px_rgba(131,147,155,0.10)]">
        {isCorrect ? (
          <p className="text-[16px] sm:text-[28px] text-neutral-700">
            Hoooray{isMultipleAnswer && ' all answers are'}{' '}
            <strong className="text-green">correct!</strong> Keep it up.
          </p>
        ) : (
          <p className="text-[16px] sm:text-[28px] text-neutral-700">
            Oops{isMultipleAnswer && ' some answers are'}{' '}
            <strong className="text-red">incorrect</strong>, dive deeper on the
            next attempt!
          </p>
        )}
      </div>
    </div>
  );
}

export default CodyHelper;
