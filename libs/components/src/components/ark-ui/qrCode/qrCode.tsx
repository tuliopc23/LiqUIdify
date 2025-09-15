"use client";

import { QrCode as ArkQrCode } from "@ark-ui/react";
import type { ComponentProps } from "react";
import { forwardRef } from "react";
import { qrCode } from "../../../../../../styled-system/recipes/qr-code";

export interface QrCodeProps extends ComponentProps<typeof ArkQrCode.Root> {
	value: string;
}

export const QrCode = forwardRef<HTMLDivElement, QrCodeProps>(
	({ value, className, ...props }, ref) => {
		return (
			<ArkQrCode.Root
				ref={ref}
				className={[qrCode(), className].filter(Boolean).join(" ")}
				value={value}
				{...props}
			>
				<ArkQrCode.Frame>
					<ArkQrCode.Pattern />
				</ArkQrCode.Frame>
			</ArkQrCode.Root>
		);
	},
);

QrCode.displayName = "QrCode";
