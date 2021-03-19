import { date_length } from './js/app'
import { init } from './js/app'
import { get_user_input } from './js/app'
import { get_lat_long_coordinates } from './js/app'
import { get_location_weather } from './js/app'
import { get_location_image } from './js/app'

import './styles/style.scss'

window.addEventListener('DOMContentLoaded', init);

export {
  date_length,
  init,
  get_user_input,
  get_lat_long_coordinates,
  get_location_weather,
  get_location_image
}
