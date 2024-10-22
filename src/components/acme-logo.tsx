import { Earth } from 'lucide-react';
import clsx from 'clsx';

interface AcmeLogoProps {
	displayText?: boolean;
}

export default function AcmeLogo({ displayText = true }: AcmeLogoProps) {
	return (
		<div className="align-center text-foreground flex flex-row items-start leading-none">
			<Earth className="mr-2 h-12 w-12 rotate-[15deg]" />
			<h1 className={clsx('text-[42px]', { 'lg:hidden': !displayText })}>
				Acme
			</h1>
		</div>
	);
}
