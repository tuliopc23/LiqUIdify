import type { Meta, StoryObj } from '@storybook/react';
import { GlassPortal } from './';

const meta: Meta<typeof GlassPortal> = {
    title: 'Components/GlassPortal',
    component: GlassPortal,
};
export default meta;

export const Basic: StoryObj<typeof GlassPortal> = {
    render: () => (
        <GlassPortal>
            <div>Portaled content</div>
        </GlassPortal>
    ),
};
