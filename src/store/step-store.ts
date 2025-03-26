import { create } from 'zustand';

type StepState = {
  step: number;
  increaseStep: (step?: number) => void;
  decreaseStep: (step?: number) => void;
  formData: Record<string, string>;
  updateFormData: (data: Record<string, string>) => void;
};

export const useStepStore = create<StepState>()((set) => ({
  step: 1,
  formData: {},
  increaseStep: (step = 1) =>
    set((state) => ({
      step: state.step === 4 ? state.step : state.step + step,
    })),
  decreaseStep: (step = 1) =>
    set((state) => ({ step: state.step <= step ? 1 : state.step - step })),
  updateFormData: (data) =>
    set((state) => ({ formData: { ...state.formData, ...data } })),
}));
