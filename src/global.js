import Vue from 'vue'

export function showError(e) {
  const hasMultipleErrors = Object.prototype.hasOwnProperty.call(e.response.data, "errors");
  if (e && e.response && e.response.data && hasMultipleErrors) {
    e.response.data["errors"].forEach(function (error) {
      Vue.toasted.global.defaultError({ msg: error })
    })
  } else if (typeof e.response.data === 'string') {
    Vue.toasted.global.defaultError({ msg: e.response.data })
  }
  else {
    Vue.toasted.defaultError()
  }
}

export default { showError }

