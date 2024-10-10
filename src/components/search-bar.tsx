'use client';

import { useDispatch, useSelector } from 'react-redux';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Search, X } from 'lucide-react';
import { RootState } from '@/store/store';
import { setSearchQuery, clearSearchQuery } from '@/store/search-slice';

export function SearchBar() {
	const dispatch = useDispatch();
	const searchQuery = useSelector((state: RootState) => state.search.query);

	const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
		dispatch(setSearchQuery(e.target.value));
	};

	const handleClearSearch = () => {
		dispatch(clearSearchQuery());
	};

	return (
		<div className="space-y-2">
			{/* <Label htmlFor="search">Search</Label> */}
			<div className="relative flex w-full max-w-sm items-center">
				<Input
					id="search"
					type="text"
					placeholder="Search..."
					className="pr-20"
					value={searchQuery}
					onChange={handleSearch}
				/>
				<Button
					type="button"
					variant="ghost"
					className="absolute right-0 h-full px-3"
					onClick={handleClearSearch}
				>
					{searchQuery ? (
						<X className="h-4 w-4" />
					) : (
						<Search className="h-4 w-4" />
					)}
				</Button>
			</div>
		</div>
	);
}
