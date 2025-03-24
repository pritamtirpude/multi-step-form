import { useStepStore } from '../store/step-store';
import PersonalInfoForm from './PersonalInfoForm';
import PickAddOnForm from './PickAddOnForm';
import SelectPlanForm from './SelectPlanForm';

const Forms = () => {
  const { step } = useStepStore();

  switch (step) {
    case 1:
      return <PersonalInfoForm />;
    case 2:
      return <SelectPlanForm />;
    case 3:
      return <PickAddOnForm />;
    default:
      return;
  }
};

export default Forms;
