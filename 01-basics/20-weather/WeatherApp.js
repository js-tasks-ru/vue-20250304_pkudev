import { defineComponent } from 'vue'
import { getWeatherData, WeatherConditionIcons } from './weather.service.ts'

const calcTemp = (temp) => {
    return (+temp - 273.15).toFixed(1);
};

const calcPressure = (pressure) => {
    return (+pressure * 0.75).toFixed(0);
}

const createDateFromTime = (time) => {
    if (!/^\d{2}:\d{2}$/.test(time)) {
        console.error('Неправильный формат времени: ', time);
        return null;
    }

    let [hours, minutes] = time.split(':').map(Number);
    let date = new Date();

    date.setHours(hours);
    date.setMinutes(minutes);

    return date;
}

const isNight = (dt, sunrise, sunset) => {
    dt = createDateFromTime(dt);
    sunrise = createDateFromTime(sunrise);
    sunset = createDateFromTime(sunset);

    return dt < sunrise || dt > sunset;
};

export default defineComponent({
    name: 'WeatherApp',
    setup() {
        return {
            weatherData: getWeatherData(),
            weatherIcons: WeatherConditionIcons,
            calcTemp,
            calcPressure,
            isNight
        }
    },
    template: `
        <div>
            <h1 class="title">Погода в Средиземье</h1>

            <ul class="weather-list unstyled-list">
                <li
                    v-for="item in weatherData"
                    class="weather-card"
                    :class="{
                        'weather-card--night': isNight(item.current.dt, item.current.sunrise, item.current.sunset)
                    }"
                >
                    <div v-if="item.alert" class="weather-alert">
                        <span class="weather-alert__icon">⚠️</span>
                        <span class="weather-alert__description">
                            {{ item.alert.sender_name }}: {{ item.alert.description }}
                        </span>
                    </div>
                    <div>
                        <h2 class="weather-card__name">
                            {{ item.geographic_name }}
                        </h2>
                        <div class="weather-card__time">
                            {{ item.current.dt }}
                        </div>
                    </div>
                    <div class="weather-conditions">
                        <div class="weather-conditions__icon" :title="item.current.weather.description">
                            {{ weatherIcons[item.current.weather.id] }}
                        </div>
                        <div class="weather-conditions__temp">
                            {{ calcTemp(item.current.temp) }} °C
                        </div>
                    </div>
                    <div class="weather-details">
                        <div class="weather-details__item">
                            <div class="weather-details__item-label">
                                Давление, мм рт. ст.
                            </div>
                            <div class="weather-details__item-value">
                                {{ calcPressure(item.current.pressure) }}
                            </div>
                        </div>
                        <div class="weather-details__item">
                            <div class="weather-details__item-label">
                                Влажность, %
                            </div>
                            <div class="weather-details__item-value">
                                {{ item.current.humidity }}
                            </div>
                        </div>
                        <div class="weather-details__item">
                            <div class="weather-details__item-label">
                                Облачность, %
                            </div>
                            <div class="weather-details__item-value">
                                {{ item.current.clouds }}
                            </div>
                        </div>
                        <div class="weather-details__item">
                            <div class="weather-details__item-label">
                                Ветер, м/с
                            </div>
                            <div class="weather-details__item-value">
                                {{ item.current.wind_speed }}
                            </div>
                        </div>
                    </div>
                </li>
            </ul>
        </div>
    `,
});
