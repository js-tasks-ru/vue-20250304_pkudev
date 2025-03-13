import {defineComponent, ref, computed} from 'vue'

export default defineComponent({
    name: 'CalculatorApp',

    setup() {
        const firstOperand = ref(0);
        const secondOperand = ref(0);
        const operator = ref('sum');

        const operations = {
            'sum': (a, b) => a + b,
            'subtract': (a, b) => a - b,
            'multiply': (a, b) => a * b,
            'divide': (a, b) => (b === 0 ? 'Division by zero is forbidden' : a / b),
        };

        const result = computed(() => {
            const operation = operations[operator.value] || (() => 0);
            return operation(firstOperand.value, secondOperand.value);
        });

        return {
            firstOperand,
            secondOperand,
            operator,
            result
        };
    },

    template: `
        <div class="calculator">
            <input v-model="firstOperand" type="number" aria-label="First operand" />

            <div class="calculator__operators">
                <label><input v-model="operator" type="radio" name="operator" value="sum"/>➕</label>
                <label><input v-model="operator" type="radio" name="operator" value="subtract"/>➖</label>
                <label><input v-model="operator" type="radio" name="operator" value="multiply"/>✖</label>
                <label><input v-model="operator" type="radio" name="operator" value="divide"/>➗</label>
            </div>

            <input v-model="secondOperand" type="number" aria-label="Second operand" />

            <div>=</div>

            <output>
                {{ result }}
            </output>
        </div>
    `,
})
