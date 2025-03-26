import FormFooterButtons from './FormFooterButtons';
import TitleAndDescription from './TitleAndDescription';

const SelectPlanForm = () => {
  return (
    <div>
      <TitleAndDescription
        title="Select your plan"
        description="You have the option of monthly or yearly billing."
      />
      <FormFooterButtons />
    </div>
  );
};

export default SelectPlanForm;
