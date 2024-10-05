import { Earth } from 'lucide-react';

export default function AcmeLogo() {
	return (
		<div className={'align-items-center flex flex-row leading-none text-white'}>
			<Earth className="h-12 w-12 rotate-[15deg]" />
			<h1 className="text-[42px]">Acme</h1>
		</div>
	);
}
