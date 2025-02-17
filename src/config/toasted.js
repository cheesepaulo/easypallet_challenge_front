import Vue from 'vue'
import Toasted from 'vue-toasted'

Vue.use(Toasted, {
  iconPack: 'mdi',
  duration: 3000,
})

Vue.toasted.register(
  'defaultSuccess',
  payload => !payload.msg ? 'Operação realidada com sucesso!' : payload.msg,
  { type: 'success', icon: 'checkbox-marked-circle-outline' }
)

Vue.toasted.register(
  'defaultError',
  payload => !payload.msg ? 'Oops.. Erro inesperado.' : payload.msg,
  { type: 'error', icon: 'car-brake-alert' }
)