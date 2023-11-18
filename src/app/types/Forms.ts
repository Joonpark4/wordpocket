export interface LabelProps {
  id: string;
  text: string;
  isPeer: boolean;
}
export interface InputProps {
  type: string;
  id: string;
  isPeer: boolean;
  placeholder?: string;
  required: boolean;
}