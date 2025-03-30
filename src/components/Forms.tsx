import { useStepStore } from '../store/step-store';
import FinishingUp from './FinishingUp';
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
    case 4:
      return <FinishingUp />;
    default:
      return;
  }
};

export default Forms;
