import { Colors } from "../constants/Colors";

export const formatNumberWithCommas = (number: number): string => {
  return `${number?.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`;
};

export const getSignText = (number: number): string => {
  return number > 0 ? `+${String(number)}` : number.toString();
};

export const formatPaisaWithCommas = (number: number): string => {
  return `₹${number.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`;
};

export const formatPaisaWorklet = (number: number): string => {
  "worklet";
  return !number
    ? `---`
    : `${number?.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`;
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

export const hexToRGBA = (hex: string, opacity: number) => {
  hex = hex.replace("#", "");

  const r = parseInt(hex.substring(0, 2), 16);
  const g = parseInt(hex.substring(2, 4), 16);
  const b = parseInt(hex.substring(4, 6), 16);

  return `rgba(${r}, ${g}, ${b}, ${opacity})`;
};
