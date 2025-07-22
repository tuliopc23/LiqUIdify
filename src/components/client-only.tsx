import type { ReactNode } from "react";
import { useEffect, useState } from "react";

interface ClientOnlyProps {
	children: ReactNode;
	fallback?: ReactNode;
	loader?: boolean;
}

export const ClientOnly = ({
	children,
	fallback = undefined,
	loader = false,
}: ClientOnlyProps) => {
	const [hasMounted, setHasMounted] = useState(false);

	useEffect(() => {
		setHasMounted(true);
	}, []);

	if (!hasMounted) {
		if (loader) {
			return <div className="animate-pulse bg-gray-200 rounded h-8 w-full" />;
		}
		return <>{fallback}</>;
	}

	return <>{children}</>;
};
