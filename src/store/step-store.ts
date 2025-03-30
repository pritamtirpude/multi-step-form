import { create } from 'zustand';

type StepState = {
  step: number;
  isActive: number;
  isSwitchToggled: boolean;
  isConfirmed: boolean;
  setIsConfirmed: (bool: boolean) => void;
  setIsSwitchToggled: (bool: boolean) => void;
  setIsActive: (index: number) => void;
  increaseStep: (step?: number) => void;
  decreaseStep: (step?: number) => void;
  formData: Record<string, string | number>;
  updateFormData: (data: Record<string, string | number>) => void;
};

export const useStepStore = create<StepState>()((set) => ({
  step: 1,
  isActive: 0,
  isSwitchToggled: false,
  isConfirmed: false,
  formData: {},
  increaseStep: (step = 1) =>
    set((state) => ({
      step: state.step === 4 ? state.step : state.step + step,
    })),
  decreaseStep: (step = 1) =>
    set((state) => ({ step: state.step <= step ? 1 : state.step - step })),
  updateFormData: (data) =>
    set((state) => ({ formData: { ...state.formData, ...data } })),
  setIsActive: (index = 0) =>
    set(() => ({
      isActive: index,
    })),
  setIsSwitchToggled: (bool: boolean) =>
    set(() => ({
      isSwitchToggled: bool,
    })),
  setIsConfirmed(bool: boolean) {
    set(() => ({
      isConfirmed: bool,
    }));
  },
}));
