import { useStepStore } from '../store/step-store';

const FormFooterButtons = () => {
  const { increaseStep, decreaseStep, step } = useStepStore();

  console.log(step);

  return (
    <div className="mt-auto flex w-full items-center justify-between">
      <button
        className="text-form-grey hover:text-form-denim cursor-pointer text-[16px] font-medium transition"
        onClick={() => decreaseStep()}
      >
        Go Back
      </button>
      <button
        className="bg-form-denim hover:bg-form-hover cursor-pointer rounded-md px-6 py-4 text-[16px] font-medium text-white transition"
        onClick={() => increaseStep(1)}
      >
        Next Step
      </button>
    </div>
  );
};

export default FormFooterButtons;
