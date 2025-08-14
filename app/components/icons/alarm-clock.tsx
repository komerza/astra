import React, {SVGProps} from 'react';

type IconProps = SVGProps<SVGSVGElement> & {
	secondaryfill?: string;
	strokewidth?: number;
	title?: string;
}

function AlarmClock({fill = 'currentColor', secondaryfill, title = 'badge 13', ...props}: IconProps) {
	secondaryfill = secondaryfill || fill;

	return (
		<svg height="18" width="18" {...props} viewBox="0 0 18 18" xmlns="http://www.w3.org/2000/svg">
	<title>{title}</title>
	<g fill={fill}>
		<path d="M9 15.25C12.4518 15.25 15.25 12.4518 15.25 9C15.25 5.54822 12.4518 2.75 9 2.75C5.54822 2.75 2.75 5.54822 2.75 9C2.75 12.4518 5.54822 15.25 9 15.25Z" fill={secondaryfill} fillOpacity="0.3" stroke="none"/>
		<path d="M14.5 1.5L16.5 3.5" fill="none" stroke={fill} strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5"/>
		<path d="M3.5 1.5L1.5 3.5" fill="none" stroke={fill} strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5"/>
		<path d="M9 15.25C12.4518 15.25 15.25 12.4518 15.25 9C15.25 5.54822 12.4518 2.75 9 2.75C5.54822 2.75 2.75 5.54822 2.75 9C2.75 12.4518 5.54822 15.25 9 15.25Z" fill="none" stroke={fill} strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5"/>
		<path d="M4.581 13.419L2.75 15.25" fill="none" stroke={fill} strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5"/>
		<path d="M13.419 13.419L15.25 15.25" fill="none" stroke={fill} strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5"/>
		<path d="M9 5.75V9L11.75 10.75" fill="none" stroke={fill} strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5"/>
	</g>
</svg>
	);
};

export default AlarmClock;
