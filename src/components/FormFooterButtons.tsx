import { cn } from '../lib/util';
import { useStepStore } from '../store/step-store';

const FormFooterButtons = () => {
  const { decreaseStep, step, setIsConfirmed } = useStepStore();

  return (
    <div className="fixed bottom-0 left-0 flex w-full items-center justify-between bg-white p-4 lg:relative lg:bg-none lg:p-0">
      {step !== 1 && (
        <button
          className="text-form-grey hover:text-form-denim text-regular cursor-pointer font-medium transition"
          onClick={() => decreaseStep()}
        >
          Go Back
        </button>
      )}

      {step === 4 ? (
        <button
          onClick={(e) => {
            e.preventDefault();
            setIsConfirmed(true);
          }}
          className="bg-form-purple cursor-pointer rounded-md px-4 py-3 text-sm font-medium text-white transition-opacity hover:opacity-65"
        >
          Confirm
        </button>
      ) : (
        <button
          type="submit"
          className={cn(
            'bg-form-denim hover:bg-form-hover text-regular cursor-pointer rounded-md px-4 py-3 font-medium text-white transition',
            step === 1 && 'ml-auto'
          )}
        >
          Next Step
        </button>
      )}
    </div>
  );
};

export default FormFooterButtons;
