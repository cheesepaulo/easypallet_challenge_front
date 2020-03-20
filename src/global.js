import Vue from 'vue'

export function showError(e) {
  if (e && e.response && e.response.data) {
    e.response.data["errors"].forEach(function (error) {
      Vue.toasted.global.defaultError({ msg: error })
    });
  } else {
    Vue.toasted.defaultError()
  }
}

export default { showError }

