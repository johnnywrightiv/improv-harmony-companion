import { Earth } from 'lucide-react';
import clsx from 'clsx';

interface AcmeLogoProps {
	isVisible?: boolean;
}

export default function AcmeLogo({ isVisible = true }: AcmeLogoProps) {
	return (
		<div className={'align-center items-start flex flex-row leading-none text-text '}>
			<Earth className="h-12 w-12 rotate-[15deg] mr-2" />
			<h1
				className={clsx('text-[42px]', {
					'md:hidden': !isVisible,
				})}
			>
				Acme
			</h1>
		</div>
	);
}
