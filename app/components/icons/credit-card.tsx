import React, {SVGProps} from 'react';

type IconProps = SVGProps<SVGSVGElement> & {
	secondaryfill?: string;
	strokewidth?: number;
	title?: string;
}

function CreditCard({fill = 'currentColor', secondaryfill, title = 'badge 13', ...props}: IconProps) {
	secondaryfill = secondaryfill || fill;

	return (
		<svg height="18" width="18" {...props} viewBox="0 0 18 18" xmlns="http://www.w3.org/2000/svg">
	<title>{title}</title>
	<g fill={fill}>
		<path d="M14.25 14.25H3.75C2.64543 14.25 1.75 13.3546 1.75 12.25V7.25H16.25V12.25C16.25 13.3546 15.3546 14.25 14.25 14.25Z" fill={secondaryfill} fillOpacity="0.3" fillRule="evenodd" stroke="none"/>
		<path d="M1.75 7.25H16.25" fill="none" stroke={fill} strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5"/>
		<path d="M3.75 14.25L14.25 14.25C15.3546 14.25 16.25 13.3546 16.25 12.25V5.75C16.25 4.64543 15.3546 3.75 14.25 3.75L3.75 3.75C2.64543 3.75 1.75 4.64543 1.75 5.75L1.75 12.25C1.75 13.3546 2.64543 14.25 3.75 14.25Z" fill="none" stroke={fill} strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5"/>
		<path d="M4.25 11.25H7.25" fill="none" stroke={fill} strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5"/>
		<path d="M12.75 11.25H13.75" fill="none" stroke={fill} strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5"/>
	</g>
</svg>
	);
};

export default CreditCard;
