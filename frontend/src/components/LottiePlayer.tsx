import React from "react";
import Lottie from "lottie-react";

type LottiePlayerProps = {
animationData: Record<string, unknown>;
loop?: boolean;
style?: React.CSSProperties;
};

export const LottiePlayer: React.FC<LottiePlayerProps> = ({
animationData,
loop = true,
style,
}) => {
return <Lottie animationData={animationData} loop={loop} style={style} />;
};
