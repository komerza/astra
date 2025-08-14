import React, {SVGProps} from 'react';

type IconProps = SVGProps<SVGSVGElement> & {
	secondaryfill?: string;
	strokewidth?: number;
	title?: string;
}

function BasketShopping({fill = 'currentColor', secondaryfill, title = 'badge 13', ...props}: IconProps) {
	secondaryfill = secondaryfill || fill;

	return (
		<svg height="18" width="18" {...props} viewBox="0 0 18 18" xmlns="http://www.w3.org/2000/svg">
	<title>{title}</title>
	<g fill={fill}>
		<path d="M15 6.25L14.403 13.416C14.317 14.453 13.45 15.25 12.41 15.25H5.59C4.55 15.25 3.683 14.453 3.597 13.416L3 6.25" fill={secondaryfill} fillOpacity="0.3" stroke="none"/>
		<path d="M4.75 6.25L7.25 1.75" fill="none" stroke={fill} strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5"/>
		<path d="M13.25 6.25L10.75 1.75" fill="none" stroke={fill} strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5"/>
		<path d="M15 6.25L14.403 13.416C14.317 14.453 13.45 15.25 12.41 15.25H5.59C4.55 15.25 3.683 14.453 3.597 13.416L3 6.25" fill="none" stroke={fill} strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5"/>
		<path d="M1.75 6.25H16.25" fill="none" stroke={fill} strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5"/>
	</g>
</svg>
	);
};

export default BasketShopping;
