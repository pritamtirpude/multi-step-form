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
  return (
    <div className="min-h-[172px] w-full bg-[url('/assets/images/bg-sidebar-mobile.svg')] bg-cover bg-no-repeat lg:flex lg:min-h-0 lg:max-w-[274px] lg:flex-col lg:gap-8 lg:bg-[url('/assets/images/bg-sidebar-desktop.svg')] lg:bg-auto lg:px-8 lg:py-10">
      {steps.map((item, index) => (
        <div className="flex items-center gap-4" key={item.title}>
          <div className="flex size-[33px] items-center justify-center rounded-full border-2 border-white">
            {index + 1}
          </div>
          <div className="flex flex-col">
            <span>{item.step}</span>
            <span>{item.title}</span>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Stepper;
