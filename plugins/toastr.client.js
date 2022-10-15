import Vue from 'vue'

import * as CxltToastr from 'cxlt-vue2-toastr'
import 'cxlt-vue2-toastr/dist/css/cxlt-vue2-toastr.css'

let toastrConfigs = {
  position: 'top right',
  showDuration: 1000,
  timeOut: 4000,
}
Vue.use(CxltToastr, toastrConfigs)
