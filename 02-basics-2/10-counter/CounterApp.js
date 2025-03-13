import { defineComponent, ref } from 'vue';

export default defineComponent({
    name: 'CounterApp',

    setup() {
        const count = ref(0);

        return {
            count
        }
    },

    template: `
        <div class="counter">
            <button
                @click="count--"
                class="button button--secondary"
                type="button"
                aria-label="Decrement"
                :disabled="count <= 0"
            >
                ➖
            </button>

            <span class="count" data-testid="count">
                {{ count }}
            </span>

            <button
                @click="count++"
                class="button button--secondary"
                type="button"
                aria-label="Increment"
                :disabled="count >= 5"
            >
                ➕
            </button>
        </div>
    `,
});
