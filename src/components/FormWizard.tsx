import FormFooterButtons from './FormFooterButtons';
import Forms from './Forms';
import Stepper from './Stepper';

const FormWizard = () => {
  return (
    <section className="flex w-full flex-col rounded-2xl shadow-md lg:min-h-[600px] lg:max-w-4xl lg:flex-row lg:bg-white lg:p-4">
      <Stepper />
      <div className="flex h-auto w-full flex-col items-start justify-center px-16 py-10">
        <Forms />
        <FormFooterButtons />
      </div>
    </section>
  );
};

export default FormWizard;
