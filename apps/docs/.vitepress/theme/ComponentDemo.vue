<template>
  <div ref="container" class="component-demo-container"></div>
</template>

<script setup lang="ts">
import { onMounted, ref, defineProps } from 'vue'
import { createRoot } from 'react-dom/client'
import React from 'react'

const props = defineProps<{
  component: any
  props?: Record<string, any>
}>()

const container = ref<HTMLDivElement>()

onMounted(() => {
  if (container.value) {
    const root = createRoot(container.value)
    const Component = props.component
    root.render(React.createElement(Component, props.props))
  }
})
</script>

<style scoped>
.component-demo-container {
  margin: 1rem 0;
}
</style>