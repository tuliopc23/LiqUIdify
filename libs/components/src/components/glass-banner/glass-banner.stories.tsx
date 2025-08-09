import type { Meta, StoryObj } from '@storybook/react';
import { GlassBanner } from './';

const meta: Meta<typeof GlassBanner> = {
    title: 'Components/GlassBanner',
    component: GlassBanner,
};
export default meta;

export const Basic: StoryObj<typeof GlassBanner> = {
    args: { children: 'Banner content' },
};
