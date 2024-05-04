import { Colors } from "../constants/Colors";

export const formatNumberWithCommas = (number: number): string => {
  return `${number.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`;
};

export const getSignText = (number: number): string => {
  return number > 0 ? `+${String(number)}` : number.toString();
};

export const formatPaisaWithCommas = (number: number): string => {
  return `₹${number.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`;
};

interface signPaisaProps {
  paisa: string;
  color: string;
}
export const getSignPaisa = (number: number): signPaisaProps => {
  let paisa: any = Math.abs(number);
  paisa = paisa
    .toFixed(2)
    .replace(/\B(?=(\d{3})+(?!\d))/g, ",")
    .toString();

  return {
    paisa: number > 0 ? `+ ₹${paisa}` : `- ₹${paisa}`,
    color: number > 0 ? Colors.profit : Colors.loss,
  };
};
