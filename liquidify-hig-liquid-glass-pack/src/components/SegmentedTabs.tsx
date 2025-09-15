import * as Tabs from '@ark-ui/react/tabs'
import React from 'react'
import { tabs } from '../theme/recipes'
import { styled } from '../../styled-system/jsx'

const Root = styled(Tabs.Root, tabs.slot('root'))
const List = styled(Tabs.List, tabs.slot('list'))
const Trigger = styled(Tabs.Trigger, tabs.slot('trigger'))
const Content = styled(Tabs.Content, tabs.slot('content'))

export function SegmentedTabs() {
  return (
    <Root defaultValue="one">
      <List>
        <Trigger value="one">Overview</Trigger>
        <Trigger value="two">Components</Trigger>
        <Trigger value="three">Tokens</Trigger>
      </List>
      <Content value="one">Overview content</Content>
      <Content value="two">Components content</Content>
      <Content value="three">Tokens content</Content>
    </Root>
  )
}
