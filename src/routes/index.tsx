import React, { Component } from 'react'
import { Route, Switch } from 'react-router-dom'
import { getCookie } from '~/utils'
import { generate } from '@ant-design/colors'
// @ts-ignore
import client from 'webpack-theme-color-replacer/client'
import Theme from '@/Theme'
import routes from './router'
import '../less/normal.less'

interface State {
  hasError: boolean,
  showContainer: boolean
}

export default class extends Component<State> {
  state: State = { hasError: false, showContainer: !getCookie('theme') }

  // componentDidMount() {
  //   if ('serviceWorker' in navigator) {
  //     window.addEventListener('load', () => {
  //       navigator.serviceWorker.register('/service-worker.js').then(registration => {
  //         console.log('SW registered: ', registration)
  //       }).catch(registrationError => {
  //         console.log('SW registration failed: ', registrationError)
  //       })
  //     })
  //   }
  // }

  componentWillMount() {
    if (!this.state.showContainer) {
      const colors = JSON.parse(getCookie('theme')!)
      let newColors = colors.map((item: { color: any; }) => item.color)
      const primary_colors = generate(newColors[0])
      newColors = newColors.concat(primary_colors)
      const options = {
        newColors,
        changeUrl(cssUrl: any) {
          return `/${cssUrl}`
        },
      }
      client.changer.changeColor(options, Promise).then(() => {
        this.setState({
          showContainer: true
        })
      })
    }
  }

  routeWithSubRoutes = (route: any, index: number) => (
    <Route
      key={index}
      exact={route.exact || false}
      path={route.path}
      render={props => < route.component {...props} routes={route.routes} />}
    />
  )

  componentDidCatch(error: any, info: any) {
    this.setState({
      hasError: true
    })
    console.log(`报错信息:${error}`)
    console.log(`报错调用栈的组件: ${JSON.stringify(info)}`)
  }

  render() {
    if (this.state.hasError) {
      // 你可以自定义降级后的 UI 并渲染
      return <h1>Sorry, Something went wrong.</h1>
    }
    return (
      <>
        <Theme />
        {this.state.showContainer &&
          (<Switch>
            {routes.map((route, index) => this.routeWithSubRoutes(route, index))}
          </Switch>)
        }
      </>
    )
  }
}

