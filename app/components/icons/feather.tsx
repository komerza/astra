import React, {SVGProps} from 'react';

type IconProps = SVGProps<SVGSVGElement> & {
	secondaryfill?: string;
	strokewidth?: number;
	title?: string;
}

function Feather({fill = 'currentColor', secondaryfill, title = 'badge 13', ...props}: IconProps) {
	secondaryfill = secondaryfill || fill;

	return (
		<svg height="18" width="18" {...props} viewBox="0 0 18 18" xmlns="http://www.w3.org/2000/svg">
	<title>{title}</title>
	<g fill={fill}>
		<path d="M15.183 2.74329C8.17788 3.2182 4.68522 8.77876 3.81453 11.4997C4.49946 12.0114 6.58006 12.9064 9.42299 12.3924C12.2659 11.8784 12.9751 9.74808 12.9743 8.74715C15.1281 7.42278 14.0847 5.37604 15.183 2.74329Z" fill={secondaryfill} fillOpacity="0.3" stroke="none"/>
		<path d="M12.974 8.731C12.5 12.422 9.25 12.844 6 12.25" fill="none" stroke={fill} strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5"/>
		<path d="M2.75 15.25C2.75 15.25 4.062 3.729 15.25 2.75C14.69 3.726 14.677 5.355 14.304 6.989C13.78 9 11.969 9.25 9.75 9.25" fill="none" stroke={fill} strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5"/>
	</g>
</svg>
	);
};

export default Feather;
