import type { Meta, StoryObj } from '@storybook/react';
import { GlassFocusTrap } from './';

const meta: Meta<typeof GlassFocusTrap> = {
    title: 'Components/GlassFocusTrap',
    component: GlassFocusTrap,
};
export default meta;

export const Basic: StoryObj<typeof GlassFocusTrap> = {
    render: () => (
        <GlassFocusTrap>
            <div tabIndex={0}>Focusable A</div>
            <div tabIndex={0}>Focusable B</div>
        </GlassFocusTrap>
    ),
};
