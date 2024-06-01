import { phone } from 'phone';
import { useForm, SubmitHandler, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';

import Button from '@/components/Button';
import Icon from '@/components/Icon';
import Input from '@/components/Input';
import Logo from '@/assets/images/logo.svg';
import useItems from '@/hooks/useItems';
import { useSessionStore } from '@/stores/session';
import { getRandom } from '@/utils/random';
import { useState } from 'react';

const schema = z.object({
  firstName: z.string().min(1, 'Required'),
  lastName: z.string().min(1, 'Required'),
  email: z.string().email(),
  phone: z.string().refine((val) => phone(val, { country: 'PH' }).isValid, {
    message: 'Please input a valid phone number',
  }),
  position: z.string().min(1, 'Required'),
  university: z.string().min(1, 'Required'),
});

type Schema = z.infer<typeof schema>;

function Signup() {
  const [isTransitioning, setIsTransitioning] = useState(false);

  const updateUser = useSessionStore((state) => state.updateUser);
  const updateItems = useSessionStore((state) => state.updateItems);

  const { data: items, isLoading: isItemsLoading } = useItems();

  const {
    control,
    formState: { errors },
    handleSubmit,
  } = useForm<Schema>({
    mode: 'onBlur',
    resolver: zodResolver(schema),
  });

  const onSubmit: SubmitHandler<Schema> = async (data) => {
    setIsTransitioning(true);

    setTimeout(() => {
      updateUser(data);

      if (items) {
        const randomItems = getRandom(items, 6);
        updateItems(
          randomItems.map((item) => ({
            ...item,
            answer: [],
          }))
        );
      }
    }, 600);
  };

  return (
    <div className="bg-pattern-mobile md:bg-pattern-desktop bg-auto bg-top bg-repeat p-4 md:p-10 min-h-[100vh] overflow-hidden relative">
      <div className="w-[144px] md:w-[228px]">
        <img className="mb-6 w-full h-auto" src={Logo} alt="CodeChum logo" />
      </div>
      <div className="flex flex-col items-center gap-10">
        <div className="flex flex-col gap-2 md:text-center max-w-[732px]">
          <h1 className="font-heading leading-none font-extrabold text-[32px] md:text-[56px] text-blue-100">
            Hi Chum,
          </h1>
          <h2 className="font-heading font-bold text-[24px] md:text-[40px] text-neutral-0">
            Get a chance to win <span className="text-yellow-100">P2,000</span>{' '}
            GCash!
          </h2>
          <p className="font-body text-xs md:text-lg text-neutral-0">
            Fill-out the form below to proceed with the game. We promise to keep
            your information safe and never share it with anyone unauthorized.
          </p>
        </div>
        <div className="flex flex-col gap-6 max-w-[486px] w-full">
          <div className="p-6 bg-neutral-0 rounded-2xl w-full">
            <form
              className="flex flex-col gap-6"
              onSubmit={handleSubmit(onSubmit)}
            >
              <Controller
                control={control}
                rules={{
                  required: true,
                }}
                render={({ field: { onChange, onBlur, value } }) => (
                  <Input
                    label="First Name"
                    error={errors.firstName?.message}
                    onChange={onChange}
                    onBlur={onBlur}
                    value={value}
                  />
                )}
                name="firstName"
              />
              <Controller
                control={control}
                rules={{
                  required: true,
                }}
                render={({ field: { onChange, onBlur, value } }) => (
                  <Input
                    label="Last Name"
                    error={errors.lastName?.message}
                    onChange={onChange}
                    onBlur={onBlur}
                    value={value}
                  />
                )}
                name="lastName"
              />
              <Controller
                control={control}
                rules={{
                  required: true,
                }}
                render={({ field: { onChange, onBlur, value } }) => (
                  <Input
                    label="Email Address"
                    error={errors.email?.message}
                    onChange={onChange}
                    onBlur={onBlur}
                    value={value}
                  />
                )}
                name="email"
              />
              <Controller
                control={control}
                rules={{
                  required: true,
                }}
                render={({ field: { onChange, onBlur, value } }) => (
                  <Input
                    label="Phone Number"
                    error={errors.phone?.message}
                    onChange={onChange}
                    onBlur={onBlur}
                    value={value}
                  />
                )}
                name="phone"
              />
              <Controller
                control={control}
                rules={{
                  required: true,
                }}
                render={({ field: { onChange, onBlur, value } }) => (
                  <Input
                    label="University"
                    error={errors.university?.message}
                    onChange={onChange}
                    onBlur={onBlur}
                    value={value}
                  />
                )}
                name="university"
              />
              <Controller
                control={control}
                rules={{
                  required: true,
                }}
                render={({ field: { onChange, onBlur, value } }) => (
                  <Input
                    label="Position"
                    error={errors.position?.message}
                    onChange={onChange}
                    onBlur={onBlur}
                    value={value}
                  />
                )}
                name="position"
              />
              <div className="flex flex-row gap-3 p-2 bg-[#E5F7FE] rounded-lg mb-4">
                <Icon
                  className="!text-[20px] text-blue-300"
                  name="info"
                  style={{
                    fontVariationSettings:
                      "'FILL' 1, 'wght' 400, 'GRAD' 0, 'opsz' 48",
                  }}
                />
                <div className="flex flex-col gap-1">
                  <p className="font-body font-bold text-sm text-blue-300">
                    Take note!
                  </p>
                  <p className="font-body text-sm text-neutral-700">
                    Info must be correct to qualify for the{' '}
                    <strong>P2,000 raffle ticket.</strong>
                  </p>
                </div>
              </div>
              <Button
                color="green"
                size="base"
                type="submit"
                isLoading={isItemsLoading}
                rightIcon={
                  <Icon name="arrow_forward" className="!text-[16px]" />
                }
              >
                Start game
              </Button>
              <p className="text-neutral-400 text-center text-sm">
                Want to partner with us? Fill out this{' '}
                <a
                  className="font-bold text-green underline"
                  href="https://forms.gle/rVZYvnYD4mYnAH926"
                  target="_blank"
                  rel="noreferrer"
                >
                  form
                </a>
              </p>
            </form>
          </div>
          <p className="text-xs text-neutral-0 text-center">
            By continuing to use this app, you agree to our{' '}
            <a
              className="font-semibold underline"
              href="https://www.codechum.com/privacy-policy"
              target="_blank"
              rel="noreferrer"
            >
              Privacy Policy
            </a>
          </p>
        </div>
      </div>
      {isTransitioning && (
        <>
          <div className="fixed top-0 left-0 h-[100vh] w-[100vw] bg-white animate-[fade-in_500ms_ease-in-out]" />
          <div className="fixed -translate-x-[75vh] md:-translate-x-1/4 bg-white h-[200vh] w-[200vh] md:h-[200vw] md:w-[200vw] rounded-full -top-[50vh] animate-[enter_500ms_ease-in-out]" />
        </>
      )}
    </div>
  );
}

export default Signup;
