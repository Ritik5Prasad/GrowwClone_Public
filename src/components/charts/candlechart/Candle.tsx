import React, { FC } from "react";
import Svg, { Path, G, Line } from "react-native-svg";
import { Colors } from "../../../constants/Colors";

interface CandleProps {
  data: {
    timestamp: string;
    open: number;
    high: number;
    low: number;
    close: number;
  };
  color: string;
  scaleY: any;
  candleWidth: number;
  candleX: number;
}

const Candle: FC<CandleProps> = ({ data, scaleY, candleWidth, candleX }) => {
  const { open, high, low, close } = data;
  const lineY1 = scaleY(high);
  const lineY2 = scaleY(low);

  const candleY = Math.min(scaleY(open), scaleY(close));
  const candleHeight = Math.abs(scaleY(close) - scaleY(open));
  const lineX = candleX + candleWidth / 2;
  return (
    <Svg>
      <Line
        x1={lineX}
        y1={lineY1}
        x2={lineX}
        y2={lineY2}
        stroke={open >= close ? Colors.loss : Colors.profit}
        strokeWidth={1.2}
      />
      <G>
        <Path
          d={`M${candleX},${candleY} 
              V${candleY + candleHeight} 
              H${candleX + candleWidth} 
              V${candleY} 
              H${candleX}`}
          fill={open >= close ? Colors.loss : Colors.profit}
        />
      </G>
    </Svg>
  );
};

export default Candle;
