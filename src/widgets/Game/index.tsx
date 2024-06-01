import { useState } from 'react';
import { useMutation } from '@tanstack/react-query';

import { supabase } from '@/lib/supabase';
import Button from '@/components/Button';
import Checkboxes from '@/components/Checkboxes';
import Icon from '@/components/Icon';
import Options from '@/components/Options';
import { ITEM_TYPES, ItemWithAnswer } from '@/types/item';
import useItemSolution from '@/hooks/useItemSolution';
import { isArraysEqual } from '@/utils/checking';
import CodyLoader from '@/assets/images/loader.svg';

import { useSessionStore } from '@/stores/session';

import CodyHelper from './CodyHelper';

function Game() {
  const user = useSessionStore((state) => state.user);
  const items = useSessionStore((state) => state.items);
  const score = useSessionStore((state) => state.score);
  const updateScore = useSessionStore((state) => state.updateScore);
  const updateItems = useSessionStore((state) => state.updateItems);

  const [selectedOptions, setSelectedOptions] = useState<string[]>([]);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const currentNumber = items
    ? items.findIndex((item) => item.answer.length === 0) + 1
    : 1;

  const totalItems = items ? items?.length : 0;
  const currentItem = items?.[currentNumber - 1];
  const isLastNumber = currentNumber === totalItems;

  const { data: solution, isFetching: isSolutionFetching } = useItemSolution({
    itemId: currentItem?.id,
    isEnabled: isSubmitted,
  });

  const { mutateAsync: uploadResults, isPending } = useMutation({
    mutationFn: async (body: {
      items: Array<ItemWithAnswer>;
      score: number;
    }) => {
      await supabase.from('responses').insert({
        first_name: user?.firstName,
        last_name: user?.lastName,
        email: user?.email,
        phone: user?.phone,
        university: user?.university,
        position: user?.position,
        score: body.score,
        answers: body.items,
      });
    },
  });

  if (!currentItem) {
    return;
  }

  const solutionIds = solution ? solution.map((sol) => sol.option_id) : [];
  const isCorrect = isSubmitted
    ? isArraysEqual(selectedOptions, solutionIds)
    : null;

  const onProceed = async () => {
    const updatedScore = isCorrect ? score + 1 : score;
    const updatedItems = items.map((item) =>
      item.id === currentItem.id
        ? {
            ...currentItem,
            answer: selectedOptions,
          }
        : item
    );

    if (isLastNumber) {
      try {
        await uploadResults({
          items: updatedItems,
          score: updatedScore,
        });

        setIsTransitioning(true);

        setTimeout(() => {
          setIsSubmitted(false);
          setSelectedOptions([]);
          updateScore(updatedScore);
          updateItems(updatedItems);
        }, 600);
        return;
      } catch {
        return;
      }
    }

    setIsSubmitted(false);
    setSelectedOptions([]);
    updateScore(updatedScore);
    updateItems(updatedItems);
  };

  return (
    <div className="flex flex-col h-[100vh] supports-[height:100dvh]:h-[100dvh] bg-neutral-50">
      <div className="bg-pattern-mobile md:bg-pattern-desktop bg-indigo bg-cover text-center py-4 px-10 md:p-8">
        <h1 className="font-heading text-neutral-0 text-2xl md:text-[32px]">
          {currentItem.question}
        </h1>
      </div>
      <div className="flex-1 flex flex-col justify-between py-10 md:pt-[80px] px-4 overflow-auto">
        <div className="max-w-[1200px] w-full mx-auto">
          {currentItem.type === ITEM_TYPES.multiple_choice ? (
            <Options
              data={currentItem.options}
              solution={solution ? solution[0].option_id : null}
              selected={selectedOptions[0] ?? null}
              onSelect={setSelectedOptions}
            />
          ) : (
            <Checkboxes
              data={currentItem.options}
              solution={solution ? solutionIds : null}
              selected={selectedOptions}
              onSelect={setSelectedOptions}
            />
          )}
        </div>
      </div>
      <div className="flex md:flex-row flex-col md:items-end md:justify-between gap-8 md:gap-4 py-6 px-4 max-w-[1200px] w-full mx-auto">
        {isSubmitted && solution ? (
          <CodyHelper
            type={currentItem.type}
            status={isCorrect ? 'correct' : 'incorrect'}
          />
        ) : (
          <div className="hidden md:block" />
        )}
        <div className="flex flex-row justify-between md:justify-none w-full md:w-auto items-center gap-10">
          <p className="font-body text-neutral-300 whitespace-nowrap">
            {currentNumber} of {totalItems}
          </p>
          {solution ? (
            <Button
              className="w-[180px]"
              color="blue"
              size="lg"
              variant="outline"
              isLoading={isPending}
              rightIcon={
                <Icon className="text-blue !text-[16px]" name="arrow_forward" />
              }
              onClick={onProceed}
            >
              {isLastNumber ? 'Finish' : 'Next'}
            </Button>
          ) : (
            <Button
              isLoading={isSolutionFetching}
              className="w-[180px]"
              isDisabled={selectedOptions.length === 0}
              color="indigo"
              size="lg"
              onClick={() => {
                setIsSubmitted(true);
              }}
            >
              Submit
            </Button>
          )}
        </div>
      </div>

      <div className="fixed top-[-100vh] left-0 flex flex-col gap-2 h-[100vh] supports-[height:100dvh]:h-[100dvh] w-[100vw] bg-white flex justify-center items-center animate-[disappear_4700ms_ease-in-out]">
        <div className="relative">
          <img
            className="animate-[fade-in_300ms_ease-in-out]"
            src={CodyLoader}
            alt="Cody loader"
          />
          <div className="absolute top-[71px] left-[46px] flex flex-row gap-[2px]">
            <div className="h-[24px] w-[10px] bg-blue animate-[cascade-one_900ms_ease-in-out] opacity-30" />
            <div className="h-[24px] w-[10px] bg-blue animate-[cascade-two_1700ms_ease-in-out] opacity-50" />
            <div className="h-[24px] w-[10px] bg-blue animate-[cascade-three_2400ms_ease-in-out] opacity-70" />
            <div className="h-[24px] w-[10px] bg-blue animate-[cascade-four_2800ms_ease-in-out] opacity-85" />
            <div className="h-[24px] w-[10px] bg-blue animate-[cascade-five_3000ms_ease-in-out]" />
          </div>
        </div>
        <div className="flex flex-row items-end animate-pulse-slow">
          <h1 className="font-heading font-extrabold text-blue text-[40px]">
            Ready
          </h1>
          <div className="loader mb-[14px]" />
        </div>
      </div>
      <div className="fixed top-0 left-0 h-[100vh] w-[100vw] opacity-0 bg-indigo translate-x-[100vw] animate-[slide_1200ms_ease-in-out_4s]" />

      {isTransitioning && (
        <>
          <div className="fixed top-0 left-0 h-[100vh] w-[100vw] bg-white animate-[fade-in_500ms_ease-in-out]" />
          <div className="fixed -translate-x-[75vh] md:-translate-x-1/4 bg-white h-[200vh] w-[200vh] md:h-[200vw] md:w-[200vw] rounded-full -top-[50vh] animate-[enter_500ms_ease-in-out]" />
        </>
      )}
    </div>
  );
}

export default Game;
