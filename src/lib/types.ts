export type PlanType = {
  plan: 'arcade' | 'advanced' | 'pro';
  icon?: React.ReactNode;
  monthly: number;
  yearly: number;
};

export type AddOnType = {
  addOn: string;
  addOnDesc: string;
  monthly: number;
  yearly: number;
};
