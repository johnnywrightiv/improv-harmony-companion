import { Earth } from 'lucide-react';
import clsx from 'clsx';

interface AcmeLogoProps {
	isVisible?: boolean;
}

export default function AcmeLogo({ isVisible = true }: AcmeLogoProps) {
	return (
		<div
			className={
				'align-center flex flex-row items-start leading-none text-text '
			}
		>
			<Earth className="mr-2 h-12 w-12 rotate-[15deg]" />
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
