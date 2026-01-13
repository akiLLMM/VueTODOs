import { ref } from 'vue'

export function useTodos() {
    const todos = ref([
        {
            id: 'list-1',
            title: 'Daily Tasks',
            locked: false,
            record: [
                { id: 'task-1', text: 'Learn Vue', checked: false },
                { id: 'task-2', text: 'Build Todo App', checked: true }
            ]
        },
        {
            id: 'list-2',
            title: 'Work',
            locked: true,
            record: [
                { id: 'task-3', text: 'Finish report', checked: false }
            ]
        }
    ])

    function toggleRecord(listId, recordId) {
        const list = todos.value.find(l => l.id === listId)
        if (!list) return

        const record = list.record.find(r => r.id === recordId)
        if (record) {
            record.checked = !record.checked
        }
    }

    function addRecord(listId, text) {
        const list = todos.value.find(l => l.id === listId)
        if (!list) return

        list.record.push({
            id: Date.now().toString(),
            text,
            checked: false
        })
    }

    function updateRecordText(listId, recordId, text) {
        const list = todos.value.find(l => l.id === listId)
        if (!list) return

        const record = list.record.find(r => r.id === recordId)
        if (record) {
            record.text = text
        }
    }

    function removeRecord(listId, recordId) {
        const list = todos.value.find(l => l.id === listId)
        if (!list) return

        const index = list.record.findIndex(r => r.id === recordId)
        if (index !== -1) {
            list.record.splice(index, 1)
        }
    }

    return {
        todos,
        toggleRecord,
        addRecord,
        updateRecordText,
        removeRecord
    }
}

