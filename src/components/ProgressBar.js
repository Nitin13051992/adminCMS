import React, { useEffect, useState } from 'react';
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

function CircularProgressBar(props) {
    const {totalPrstng, crtColor, rangData} = props
    const [percentage, setPercentage] = useState(0);
    let prcntVlue = rangData
    useEffect(() => {
        setTimeout(() => {
            if (percentage < prcntVlue) {
                setPercentage(percentage + 1);
            }
        }, 50);
    }, [percentage, prcntVlue]);
    return (
        <CircularProgressbar value={percentage} maxValue={totalPrstng} text={`${percentage}`} strokeWidth={13} styles={{
            root: {},
            path: {
                stroke: crtColor,
                transition: 'stroke-dashoffset 0.5s ease 0s',
                transform: 'rotate(3.51turn)',
                transformOrigin: 'center center',

            },
            trail: {
                stroke: 'rgb(214 214 214 / 26%)',
                transform: 'rotate(0.50turn)',
                transformOrigin: 'center center',
            },
            text: {
                fill: 'rgb(0 0 0 / 67%)',
                fontSize: '14px',
                fontWeight: "bold"
            },

        }} />
    );
}
export default CircularProgressBar;