// import { useContext } from '@nuxtjs/composition-api'

// const { store } = useContext()
export default function ({ route, redirect, store }) {
  if (route.path != '/' && route.path != '/register' && route.path != '/test') {
    if (!store.state.isAuth) {
      console.log(route.path)
      return redirect('/')
    }
  }
}
