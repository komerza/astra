import React, {SVGProps} from 'react';

type IconProps = SVGProps<SVGSVGElement> & {
	secondaryfill?: string;
	strokewidth?: number;
	title?: string;
}

function DesktopArrowDown({fill = 'currentColor', secondaryfill, title = 'badge 13', ...props}: IconProps) {
	secondaryfill = secondaryfill || fill;

	return (
		<svg height="18" width="18" {...props} viewBox="0 0 18 18" xmlns="http://www.w3.org/2000/svg">
	<title>{title}</title>
	<g fill={fill}>
		<path d="M12 3H14.25C15.355 3 16.25 3.895 16.25 5V11.25C16.25 12.355 15.355 13.25 14.25 13.25H3.75C2.645 13.25 1.75 12.355 1.75 11.25V5C1.75 3.895 2.645 3 3.75 3H6" fill={secondaryfill} fillOpacity="0.3" stroke="none"/>
		<path d="M11.75 7.5L9 10.25L6.25 7.5" fill="none" stroke={fill} strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5"/>
		<path d="M9 10.25V2.75" fill="none" stroke={fill} strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5"/>
		<path d="M12 2.75H14.25C15.355 2.75 16.25 3.645 16.25 4.75V11.25C16.25 12.355 15.355 13.25 14.25 13.25H3.75C2.645 13.25 1.75 12.355 1.75 11.25V4.75C1.75 3.645 2.645 2.75 3.75 2.75H6" fill="none" stroke={fill} strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5"/>
		<path d="M5.75 16.25C6.508 16.011 7.628 15.75 9 15.75C9.795 15.75 10.941 15.838 12.25 16.25" fill="none" stroke={fill} strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5"/>
		<path d="M9 13.25V15.75" fill="none" stroke={fill} strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5"/>
	</g>
</svg>
	);
};

export default DesktopArrowDown;
