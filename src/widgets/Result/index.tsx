import clsx from 'clsx';

import CodyPassed from '@/assets/images/result/passed.svg';
import CodyFailed from '@/assets/images/result/failed.svg';
import Button from '@/components/Button';
import { useSessionStore } from '@/stores/session';
import useItems from '@/hooks/useItems';
import { getRandom } from '@/utils/random';

const PASSING_SCORE = 3;

enum Status {
  Passed = 'passed',
  Failed = 'failed',
}

function Result() {
  const score = useSessionStore((state) => state.score);
  const updateScore = useSessionStore((state) => state.updateScore);
  const updateItems = useSessionStore((state) => state.updateItems);
  const itemsState = useSessionStore((state) => state.items);

  const { data: items, isLoading: isItemsLoading } = useItems();

  const status = score >= PASSING_SCORE ? Status.Passed : Status.Failed;

  const cody = status === Status.Passed ? CodyPassed : CodyFailed;

  const totalItems = itemsState?.length ?? 0;

  return (
    <div
      className={clsx(
        'flex flex-col min-h-[100vh] p-6 md:p-10 overflow-hidden',
        {
          'bg-green': status === Status.Passed,
          'bg-red': status === Status.Failed,
        }
      )}
    >
      <div className="flex-1 flex flex-col lg:flex-row gap-8 lg:gap-1 items-center rounded-[32px] bg-grid bg-cover bg-center bg-white h-full py-[64px] px-9 animate-[zoom-out_500ms_ease-in-out]">
        <div className="flex-1 flex justify-end">
          <div className="flex flex-col gap-2 lg:gap-8 self-end max-w-[572px]">
            <div>
              <p className="text-neutral-400 text-sm lg:text-2xl">Score</p>
              <h1
                className={clsx(
                  'font-heading font-extrabold text-[64px] lg:text-[112px]',
                  {
                    'text-green': status === Status.Passed,
                    'text-red': status === Status.Failed,
                  }
                )}
              >
                {score}/{totalItems}
              </h1>
            </div>
            <div className="flex flex-col gap-2">
              {status === Status.Passed ? (
                <>
                  <h2 className="font-heading text-neutral-700 text-2xl lg:text-[40px] leading-tight">
                    You have <span className="text-green">passed</span> the game
                    and <span className="text-green">won</span> your raffle
                    ticket!
                  </h2>
                  <p className="font-body text-neutral-400 text-base lg:text-2xl leading-normal">
                    Winners will be announced at the Raffle portion of the
                    event.
                  </p>
                </>
              ) : (
                <div className="flex flex-col gap-6">
                  <h2 className="font-heading text-neutral-700 text-[20px] lg:text-[32px]">
                    You fell short in this attempt.
                  </h2>
                  <h2 className="font-heading text-neutral-700 text-[20px] lg:text-[32px]">
                    Would you like to try again to get your free raffle ticket?
                  </h2>
                  <Button
                    className="max-w-[420px] w-full"
                    color="red"
                    size="lg"
                    isLoading={isItemsLoading}
                    onClick={() => {
                      updateScore(0);

                      if (items) {
                        const randomItems = getRandom(items, 6);
                        const itemsWithAnswers = randomItems.map((item) => ({
                          ...item,
                          answer: [],
                        }));
                        updateItems(itemsWithAnswers);
                      }
                    }}
                  >
                    Try again
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
        <div className="flex-1 flex items-center max-w-[320px] lg:max-w-none">
          <img src={cody} alt="Cody" />
        </div>
      </div>
      <div className="fixed z-10 h-[100vh] w-[100vw] -top-[100vh] left-0 bg-white animate-[fade-out_500ms_ease-in-out]" />
    </div>
  );
}

export default Result;
