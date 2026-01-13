<script setup>
/**
 * 这是“纯展示 + 发事件”的 TodoItem
 * 不直接修改状态
 */

const { record, locked } = defineProps({
  record: {
    type: Object,
    required: true
  },
  locked: {
    type: Boolean,
    default: false
  }
})

const emit = defineEmits([
  'toggle',
  'update-text',
  'remove'
])

function onToggle() {
  emit('toggle', record.id)
}

function onEnter(e) {
  emit('update-text', record.id, e.target.value)
}

function onRemove() {
  emit('remove', record.id)
}
</script>

<template>
  <li :class="{ checked: record.checked }">
    <!-- 勾选 -->
    <input
        type="checkbox"
        :checked="record.checked"
        :disabled="locked"
        @change="onToggle"
    />

    <!-- 文本 -->
    <input
        type="text"
        :value="record.text"
        :disabled="record.checked || locked"
        @keyup.enter="onEnter"
    />

    <!-- 删除 -->
    <button
        v-if="record.checked && !locked"
        @click="onRemove"
    >
      删除
    </button>
  </li>
</template>