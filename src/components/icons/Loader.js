import React from "react";

const Loader = ({ className }) => (
    <svg className={className} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 1" preserveAspectRatio="xMidYMid">
        <circle cx="84" cy="0" r="2.4745" fill="#2900d9">
            <animate
                attributeName="r"
                repeatCount="indefinite"
                dur="0.4629629629629629s"
                calcMode="spline"
                keyTimes="0;1"
                values="8;0"
                keySplines="0 0.5 0.5 1"
                begin="0s"
            ></animate>
            <animate
                attributeName="fill"
                repeatCount="indefinite"
                dur="1.8518518518518516s"
                calcMode="discrete"
                keyTimes="0;0.25;0.5;0.75;1"
                values="#2900d9;#ff5759;#b83a84;#701dae;#2900d9"
                begin="0s"
            ></animate>
        </circle>
        <circle cx="16" cy="0" r="5.52502" fill="#2900d9">
            <animate
                attributeName="r"
                repeatCount="indefinite"
                dur="1.8518518518518516s"
                calcMode="spline"
                keyTimes="0;0.25;0.5;0.75;1"
                values="0;0;8;8;8"
                keySplines="0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1"
                begin="0s"
            ></animate>
            <animate
                attributeName="cx"
                repeatCount="indefinite"
                dur="1.8518518518518516s"
                calcMode="spline"
                keyTimes="0;0.25;0.5;0.75;1"
                values="16;16;16;50;84"
                keySplines="0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1"
                begin="0s"
            ></animate>
        </circle>
        <circle cx="39.4813" cy="0" r="8" fill="#701dae">
            <animate
                attributeName="r"
                repeatCount="indefinite"
                dur="1.8518518518518516s"
                calcMode="spline"
                keyTimes="0;0.25;0.5;0.75;1"
                values="0;0;8;8;8"
                keySplines="0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1"
                begin="-0.4629629629629629s"
            ></animate>
            <animate
                attributeName="cx"
                repeatCount="indefinite"
                dur="1.8518518518518516s"
                calcMode="spline"
                keyTimes="0;0.25;0.5;0.75;1"
                values="16;16;16;50;84"
                keySplines="0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1"
                begin="-0.4629629629629629s"
            ></animate>
        </circle>
        <circle cx="73.4813" cy="0" r="8" fill="#b83a84">
            <animate
                attributeName="r"
                repeatCount="indefinite"
                dur="1.8518518518518516s"
                calcMode="spline"
                keyTimes="0;0.25;0.5;0.75;1"
                values="0;0;8;8;8"
                keySplines="0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1"
                begin="-0.9259259259259258s"
            ></animate>
            <animate
                attributeName="cx"
                repeatCount="indefinite"
                dur="1.8518518518518516s"
                calcMode="spline"
                keyTimes="0;0.25;0.5;0.75;1"
                values="16;16;16;50;84"
                keySplines="0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1"
                begin="-0.9259259259259258s"
            ></animate>
        </circle>
        <circle cx="16" cy="0" r="0" fill="#ff5759">
            <animate
                attributeName="r"
                repeatCount="indefinite"
                dur="1.8518518518518516s"
                calcMode="spline"
                keyTimes="0;0.25;0.5;0.75;1"
                values="0;0;8;8;8"
                keySplines="0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1"
                begin="-1.3888888888888888s"
            ></animate>
            <animate
                attributeName="cx"
                repeatCount="indefinite"
                dur="1.8518518518518516s"
                calcMode="spline"
                keyTimes="0;0.25;0.5;0.75;1"
                values="16;16;16;50;84"
                keySplines="0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1"
                begin="-1.3888888888888888s"
            ></animate>
        </circle>
    </svg>
);

export default Loader;
