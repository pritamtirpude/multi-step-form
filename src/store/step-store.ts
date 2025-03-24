import { create } from 'zustand';

type StepState = {
  step: number;
  increaseStep: (step: number) => void;
  decreaseStep: (step?: number) => void;
};

export const useStepStore = create<StepState>()((set) => ({
  step: 1,
  increaseStep: (step) => set((state) => ({ step: state.step + step })),
  decreaseStep: (step = 1) =>
    set((state) => ({ step: state.step <= step ? 1 : state.step - step })),
}));
