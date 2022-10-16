import Vue from 'vue'
import toastr from 'toastr'
toastr.options = {
  closeButton: true,
  debug: false,
  newestOnTop: false,
  progressBar: true,
  positionClass: 'toast-top-left',
  preventDuplicates: false,
  onclick: null,
  showDuration: '2000',
  hideDuration: '1000',
  extendedTimeOut: '500',
  showEasing: 'swing',
  hideEasing: 'linear',
  showMethod: 'show',
  hideMethod: 'fadeOut',
}
Vue.use(toastr)
