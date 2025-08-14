import React, {SVGProps} from 'react';

type IconProps = SVGProps<SVGSVGElement> & {
	secondaryfill?: string;
	strokewidth?: number;
	title?: string;
}

function StarSparkle({fill = 'currentColor', secondaryfill, title = 'badge 13', ...props}: IconProps) {
	secondaryfill = secondaryfill || fill;

	return (
		<svg height="18" width="18" {...props} viewBox="0 0 18 18" xmlns="http://www.w3.org/2000/svg">
	<title>{title}</title>
	<g fill={fill}>
		<path d="M11.24 6.289L9 1.75L6.76 6.289L1.75 7.017L5.375 10.551L4.519 15.54L9 13.185L9.12956 13.2531C9.33908 12.7029 9.78641 12.2604 10.3667 12.067L10.9181 11.8831L11.103 11.3285C11.4368 10.3345 12.3636 10 12.9995 10C13.0579 10 13.1187 10.0028 13.1813 10.0087L16.25 7.017L11.24 6.289Z" fill={secondaryfill} fillOpacity="0.3" fillRule="evenodd" stroke="none"/>
		<path d="M4.74301 2.492L3.79701 2.177L3.48101 1.23C3.37901 0.924004 2.87201 0.924004 2.77001 1.23L2.45401 2.177L1.50801 2.492C1.35501 2.543 1.25101 2.686 1.25101 2.848C1.25101 3.01 1.35501 3.153 1.50801 3.204L2.45401 3.519L2.77001 4.466C2.82101 4.619 2.96401 4.722 3.12501 4.722C3.28601 4.722 3.43001 4.618 3.48001 4.466L3.79601 3.519L4.74201 3.204C4.89501 3.153 4.99901 3.01 4.99901 2.848C4.99901 2.686 4.89601 2.543 4.74301 2.492Z" fill={fill} stroke="none"/>
		<path d="M13.469 9.728L16.25 7.017L11.24 6.29L9 1.75L6.76 6.29L1.75 7.017L5.375 10.551L4.519 15.54L8.864 13.256" fill="none" stroke={fill} strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5"/>
		<path d="M15.158 13.49L13.895 13.069L13.474 11.806C13.337 11.398 12.662 11.398 12.525 11.806L12.104 13.069L10.841 13.49C10.637 13.558 10.499 13.749 10.499 13.964C10.499 14.179 10.637 14.37 10.841 14.438L12.104 14.859L12.525 16.122C12.593 16.326 12.785 16.464 13 16.464C13.215 16.464 13.406 16.326 13.475 16.122L13.896 14.859L15.159 14.438C15.363 14.37 15.501 14.179 15.501 13.964C15.501 13.749 15.363 13.558 15.159 13.49H15.158Z" fill={fill} stroke="none"/>
		<path d="M14.25 4C14.6642 4 15 3.66421 15 3.25C15 2.83579 14.6642 2.5 14.25 2.5C13.8358 2.5 13.5 2.83579 13.5 3.25C13.5 3.66421 13.8358 4 14.25 4Z" fill={fill} stroke="none"/>
	</g>
</svg>
	);
};

export default StarSparkle;
