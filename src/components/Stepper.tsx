import { cn } from '../lib/util';
import { useStepStore } from '../store/step-store';

const steps = [
  {
    step: 'step 1',
    title: 'your info',
  },
  {
    step: 'step 2',
    title: 'select plan',
  },
  {
    step: 'step 3',
    title: 'add-ons',
  },
  {
    step: 'step 4',
    title: 'summary',
  },
];

const Stepper = () => {
  const { step } = useStepStore();

  return (
    <div className="flex min-h-[172px] w-full justify-center gap-4 bg-[url('/assets/images/bg-sidebar-mobile.svg')] bg-cover bg-no-repeat lg:min-h-0 lg:max-w-[274px] lg:flex-col lg:justify-normal lg:gap-8 lg:bg-[url('/assets/images/bg-sidebar-desktop.svg')] lg:bg-auto lg:px-8 lg:py-10">
      {steps.map((item, index) => (
        <div className="flex items-center gap-4" key={item.title}>
          <div
            className={cn(
              'flex size-[33px] items-center justify-center rounded-full border-2 border-white transition',
              index + 1 === step && 'bg-form-skyblue border-none'
            )}
          >
            <span
              className={cn(
                'text-sm font-bold text-white',
                index + 1 === step && 'text-form-denim'
              )}
            >
              {index + 1}
            </span>
          </div>
          <div className="hidden flex-col lg:flex">
            <span className="text-form-light-blue text-xs uppercase">
              {item.step}
            </span>
            <span className="text-sm font-bold text-white uppercase">
              {item.title}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Stepper;
