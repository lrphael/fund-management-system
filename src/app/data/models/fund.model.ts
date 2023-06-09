export interface Fund {
  id?: number;
  name: string;
  interest: number;
  minimumValue: number;
  maximumValue: number;
  mandatoryPeriodMonths: number;
  description: string;
}
