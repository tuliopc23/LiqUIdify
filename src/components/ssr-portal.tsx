import type { ReactNode } from "react";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { isServer } from "@/utils/ssr-safe";

interface SSRPortalProps {
	children: ReactNode;
	to?: HTMLElement | string;
}

export const SSRPortal = ({ children, to = "body" }: SSRPortalProps) => {
	const [mounted, setMounted] = useState(false);
  const [container, setContainer] = useState<HTMLElement | null>(undefined);

	useEffect(() => {
		setMounted(true);

		const target =
			"string" === typeof to
				? ("undefined" !== typeof document
					? document.querySelector(to)
					: undefined)
				: to;

		setContainer(target as HTMLElement);
	}, [to]);

	if (isServer || !mounted || !container) {
		return;
	}

	return createPortal(children, container);
};
