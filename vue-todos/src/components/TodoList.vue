<script setup>
import { ref, computed } from 'vue'
import { useTodos } from '../composables/useTodos'
import TodoItem from '../components/TodoItem.vue'

/**
 * 假设这是当前页面对应的 listId
 * 真实项目中可以来自 route params
 */
const listId = 'list-1'

/**
 * 从 composable 中获取状态和操作
 */
const {
  todos,
  addRecord,
  toggleRecord,
  updateRecordText,
  removeRecord
} = useTodos()

/**
 * 当前 Todos List（根据 listId）
 */
const currentList = computed(() =>
    todos.value.find(l => l.id === listId)
)

/**
 * 输入框内容
 */
const newText = ref('')

/**
 * 新增 TodoItem
 */
function onAdd() {
  const text = String(newText.value).trim()
  if (!text) return
  addRecord(listId, newText.value)
  newText.value = ''
}
</script>

<template>
  <div v-if="currentList" class="todo-page">
    <!-- 标题 -->
    <h1>{{ currentList.title }}</h1>

    <!-- 新增 Todos -->
    <input
        type="text"
        v-model="newText"
        placeholder="请输入"
        :disabled="currentList.locked"
        @keyup.enter="onAdd"
    />

    <!-- Todos 列表 -->
    <ul>
      <TodoItem
          v-for="record in currentList.record"
          :key="record.id"
          :record="record"
          :locked="currentList.locked"
          @toggle="recordId => toggleRecord(listId, recordId)"
          @update-text="(recordId, text) =>
          updateRecordText(listId, recordId, text)"
          @remove="recordId => removeRecord(listId, recordId)"
      />
    </ul>
  </div>
</template>
