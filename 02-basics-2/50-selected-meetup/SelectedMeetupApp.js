import {defineComponent, ref, computed, onMounted, watch} from 'vue';
import { getMeetup } from './meetupsService.ts';

export default defineComponent({
    name: 'SelectedMeetupApp',

    setup() {
        const selectedMeetupId = ref(1);
        const meetup = ref();
        const minMeetupId = 1;
        const maxMeetupId = 5;

        const fetchMeetup = async (id) => {
            try {
                meetup.value = await getMeetup(id);
            } catch (error) {
                console.error("Failed fetch meetup: ", error);
            }
        };

        onMounted(async () => {
            await fetchMeetup(selectedMeetupId.value);
        });

        watch(selectedMeetupId, async (newId) => {
            await fetchMeetup(newId);
        });

        const prevMeetup = () => {
            if (selectedMeetupId.value > minMeetupId) {
                selectedMeetupId.value--;
            }
        };

        const nextMeetup = () => {
            if (selectedMeetupId.value < maxMeetupId) {
                selectedMeetupId.value++;
            }
        };

        const prevDisabled = computed(
            () => selectedMeetupId.value <= minMeetupId
        );

        const nextDisabled = computed(
            () => selectedMeetupId.value >= maxMeetupId
        );

        return {
            selectedMeetupId,
            meetup,
            prevMeetup,
            nextMeetup,
            prevDisabled,
            nextDisabled,
            minMeetupId,
            maxMeetupId,
        };
    },

    template: `
        <div class="meetup-selector">
            <div class="meetup-selector__control">
                <button
                    class="button button--secondary"
                    type="button"
                    @click="prevMeetup"
                    :disabled="prevDisabled"
                >
                    Предыдущий
                </button>

                <div class="radio-group" role="radiogroup">
                    <div
                        class="radio-group__button"
                        v-for="meetupId in maxMeetupId" :key="meetupId"
                    >
                        <input
                            :id="'meetup-id-' + meetupId"
                            class="radio-group__input"
                            type="radio"
                            name="meetupId"
                            :value="meetupId"
                            v-model.number="selectedMeetupId"
                        />
                        <label :for="'meetup-id-' + meetupId" class="radio-group__label">
                            {{ meetupId }}
                        </label>
                    </div>
                </div>

                <button
                    class="button button--secondary"
                    type="button"
                    @click="nextMeetup"
                    :disabled="nextDisabled"
                >
                    Следующий
                </button>
            </div>

            <div class="meetup-selector__cover">
                <div class="meetup-cover">
                    <h1 class="meetup-cover__title">
                        {{ meetup ? meetup.title : 'Loading...' }}
                    </h1>
                </div>
            </div>
        </div>
    `,
});
