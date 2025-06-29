import type { Meta, StoryObj } from '@storybook/react-vite';
import {
  NotificationCenter,
  type NotificationItem,
} from './glass-notification';
import { useState } from 'react';

const meta: Meta<typeof NotificationCenter> = {
  title: 'Glass/NotificationCenter',
  component: NotificationCenter,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'A glass-morphism notification center component for displaying system notifications, alerts, and user messages.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    onMarkAsRead: {
      action: 'marked as read',
      description: 'Callback fired when a notification is marked as read',
    },
    onMarkAllAsRead: {
      action: 'marked all as read',
      description: 'Callback fired when all notifications are marked as read',
    },
    onDismiss: {
      action: 'dismissed',
      description: 'Callback fired when a notification is dismissed',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

const sampleNotifications: NotificationItem[] = [
  {
    id: '1',
    title: 'Welcome to LiquidUI',
    message:
      'Your account has been successfully created. Start exploring our glass components!',
    type: 'success',
    timestamp: new Date(Date.now() - 5 * 60 * 1000), // 5 minutes ago
    read: false,
  },
  {
    id: '2',
    title: 'Security Update',
    message:
      "Your password was recently changed from a new device. If this wasn't you, please contact support.",
    type: 'warning',
    timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2 hours ago
    read: false,
  },
  {
    id: '3',
    title: 'System Maintenance',
    message:
      'Scheduled maintenance will occur on Sunday at 2:00 AM EST. Expected downtime: 30 minutes.',
    type: 'info',
    timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000), // 1 day ago
    read: true,
  },
  {
    id: '4',
    title: 'Payment Failed',
    message:
      'Your subscription payment could not be processed. Please update your payment method.',
    type: 'error',
    timestamp: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000), // 3 days ago
    read: false,
    action: {
      label: 'Update Payment',
      onClick: () => alert('Redirecting to payment settings...'),
    },
  },
  {
    id: '5',
    title: 'New Feature Available',
    message:
      'Check out our new glass tabs component with enhanced accessibility features.',
    type: 'system',
    timestamp: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000), // 1 week ago
    read: true,
  },
];

const unreadNotifications: NotificationItem[] = [
  {
    id: '1',
    title: 'File Upload Complete',
    message:
      'Your document "Project_Proposal.pdf" has been successfully uploaded.',
    type: 'success',
    timestamp: new Date(Date.now() - 2 * 60 * 1000), // 2 minutes ago
    read: false,
  },
  {
    id: '2',
    title: 'Storage Almost Full',
    message:
      'You are using 95% of your storage quota. Consider upgrading your plan.',
    type: 'warning',
    timestamp: new Date(Date.now() - 15 * 60 * 1000), // 15 minutes ago
    read: false,
  },
  {
    id: '3',
    title: 'Server Error',
    message:
      'Failed to sync your data. Please check your internet connection and try again.',
    type: 'error',
    timestamp: new Date(Date.now() - 30 * 60 * 1000), // 30 minutes ago
    read: false,
  },
];

export const Default: Story = {
  args: {
    notifications: sampleNotifications,
    onMarkAsRead: id => console.log('Marked as read:', id),
    onMarkAllAsRead: () => console.log('Marked all as read'),
    onDismiss: id => console.log('Dismissed:', id),
  },
};

export const UnreadOnly: Story = {
  args: {
    notifications: unreadNotifications,
    onMarkAsRead: id => console.log('Marked as read:', id),
    onMarkAllAsRead: () => console.log('Marked all as read'),
    onDismiss: id => console.log('Dismissed:', id),
  },
};

export const EmptyState: Story = {
  args: {
    notifications: [],
    onMarkAsRead: id => console.log('Marked as read:', id),
    onMarkAllAsRead: () => console.log('Marked all as read'),
    onDismiss: id => console.log('Dismissed:', id),
  },
};

export const WithActions: Story = {
  args: {
    notifications: [
      {
        id: '1',
        title: 'Team Invitation',
        message: 'John Doe has invited you to join the "Web Development" team.',
        type: 'info',
        timestamp: new Date(Date.now() - 10 * 60 * 1000),
        read: false,
        action: {
          label: 'Accept',
          onClick: () => alert('Invitation accepted!'),
        },
      },
      {
        id: '2',
        title: 'Subscription Expires Soon',
        message:
          'Your premium subscription will expire in 3 days. Renew now to continue enjoying premium features.',
        type: 'warning',
        timestamp: new Date(Date.now() - 60 * 60 * 1000),
        read: false,
        action: {
          label: 'Renew',
          onClick: () => alert('Redirecting to billing...'),
        },
      },
      {
        id: '3',
        title: 'Backup Complete',
        message: 'Your daily backup has been completed successfully.',
        type: 'success',
        timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
        read: true,
        action: {
          label: 'View Details',
          onClick: () => alert('Opening backup details...'),
        },
      },
    ],
    onMarkAsRead: id => console.log('Marked as read:', id),
    onMarkAllAsRead: () => console.log('Marked all as read'),
    onDismiss: id => console.log('Dismissed:', id),
  },
};

export const Interactive: Story = {
  render: () => {
    const [notifications, setNotifications] =
      useState<NotificationItem[]>(sampleNotifications);

    const handleMarkAsRead = (id: string) => {
      setNotifications(prev =>
        prev.map(notif => (notif.id === id ? { ...notif, read: true } : notif))
      );
    };

    const handleMarkAllAsRead = () => {
      setNotifications(prev => prev.map(notif => ({ ...notif, read: true })));
    };

    const handleDismiss = (id: string) => {
      setNotifications(prev => prev.filter(notif => notif.id !== id));
    };

    return (
      <NotificationCenter
        notifications={notifications}
        onMarkAsRead={handleMarkAsRead}
        onMarkAllAsRead={handleMarkAllAsRead}
        onDismiss={handleDismiss}
      />
    );
  },
};

export const TypeVariations: Story = {
  args: {
    notifications: [
      {
        id: '1',
        title: 'Success Notification',
        message: 'Operation completed successfully.',
        type: 'success',
        timestamp: new Date(),
        read: false,
      },
      {
        id: '2',
        title: 'Error Notification',
        message: 'Something went wrong. Please try again.',
        type: 'error',
        timestamp: new Date(),
        read: false,
      },
      {
        id: '3',
        title: 'Warning Notification',
        message: 'Please review your settings.',
        type: 'warning',
        timestamp: new Date(),
        read: false,
      },
      {
        id: '4',
        title: 'Info Notification',
        message: 'Here is some important information.',
        type: 'info',
        timestamp: new Date(),
        read: false,
      },
      {
        id: '5',
        title: 'System Notification',
        message: 'System update available.',
        type: 'system',
        timestamp: new Date(),
        read: false,
      },
    ],
    onMarkAsRead: id => console.log('Marked as read:', id),
    onMarkAllAsRead: () => console.log('Marked all as read'),
    onDismiss: id => console.log('Dismissed:', id),
  },
};

export const LongMessages: Story = {
  args: {
    notifications: [
      {
        id: '1',
        title: 'Very Long Notification Title That Might Wrap to Multiple Lines',
        message:
          'This is a very long notification message that contains a lot of text to test how the component handles lengthy content. It should wrap properly and maintain good readability while preserving the glass morphism effects and overall design integrity.',
        type: 'info',
        timestamp: new Date(Date.now() - 5 * 60 * 1000),
        read: false,
      },
      {
        id: '2',
        title: 'Regular Notification',
        message: 'This is a normal length message for comparison.',
        type: 'success',
        timestamp: new Date(Date.now() - 10 * 60 * 1000),
        read: false,
      },
    ],
    onMarkAsRead: id => console.log('Marked as read:', id),
    onMarkAllAsRead: () => console.log('Marked all as read'),
    onDismiss: id => console.log('Dismissed:', id),
  },
};

export const CustomStyling: Story = {
  args: {
    notifications: sampleNotifications.slice(0, 3),
    className: 'max-w-md custom-notification-center',
    onMarkAsRead: id => console.log('Marked as read:', id),
    onMarkAllAsRead: () => console.log('Marked all as read'),
    onDismiss: id => console.log('Dismissed:', id),
  },
  parameters: {
    docs: {
      description: {
        story:
          'Notification center with custom styling applied through className prop.',
      },
    },
  },
};
