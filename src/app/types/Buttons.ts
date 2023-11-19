
export interface ButtonProps {
  content: React.ReactNode;
  width?: string;
  height?: string;
}

export interface TwoTabBtnProps {
  tab1: string;
  tab2: string;
  isFirstTab: boolean;
  setIsFirstTab: React.Dispatch<React.SetStateAction<boolean>>;
}