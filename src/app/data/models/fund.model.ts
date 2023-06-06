export interface Fund {
  id: number;
  title: string;
  interest: number;
  minimumValue: number;
  maximumValue: number;
  mandatoryPeriodMonths: number;
  description: string;
}
