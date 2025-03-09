import { defineComponent, createApp } from 'vue'

const getDateNowLong = () => {
    return new Date().toLocaleDateString(
        navigator.language, {
            dateStyle: 'long'
        }
    );
}

const app = createApp(
    defineComponent({
        name: 'first component',
        setup () {
            return {
                dateNow: getDateNowLong(),
            };
        },
        template: `
            <div>
                Сегодня {{ dateNow }}
            </div>
        `,
    })
);

const vApp = app.mount('#app');
