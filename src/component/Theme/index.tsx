import React, { memo, useState, useEffect } from 'react'
import { Drawer, message, Button } from 'antd'
import { generate } from '@ant-design/colors'
// @ts-ignore
import client from 'webpack-theme-color-replacer/client'
// @ts-ignore
import { SketchPicker } from 'react-color'
import { deepClone, setCookie, getCookie } from '~/utils'
import './style.less'

const colorVars = [{
  name: '主题色',
  color: '#68c69c'
},
{
  name: '背景色',
  color: '#f8f8f8'
}, {
  name: '浅色文本',
  color: '#666666'
}, {
  name: '粗色文本',
  color: '#333333'
}, {
  name: '红色按钮',
  color: '#e54d4d'
}, {
  name: '蓝色按钮',
  color: '#4a8af6'
}]

type Color = {
  name: string,
  color: string
}[]

const Theme = () => {
  const [visible, setVisible] = useState(false)
  const [showSketch, setShowSketch] = useState(false)
  const [modifyVars, setModifyVars] = useState<Color>([])
  const [order, setOrder] = useState<any>(null)
  const [sketchColor, setSketchColor] = useState('')

  useEffect(() => {
    if (visible) {
      const color_vars = getCookie('theme') ? JSON.parse(getCookie('theme')!) : colorVars
      setModifyVars(color_vars)
    }
  }, [visible])

  const changeColor = (colors: Color) => {
    let newColors = colors.map((item: { color: string }) => item.color)
    const primary_colors = generate(newColors[0])
    newColors = newColors.concat(primary_colors)
    const options = {
      newColors,
      changeUrl(cssUrl: any) {
        return `/${cssUrl}`
      },
    }

    client.changer.changeColor(options, Promise).then(() => {
      const color_vars = JSON.stringify(colors)
      console.log(color_vars)
      setCookie('theme', color_vars, 360)
      setVisible(false)
      setOrder(null)
      message.info('主题变换成功！')
    })
  }

  const handleChange = (color: any) => {
    setSketchColor(color)
    const newVars = deepClone(modifyVars)
    newVars[order].color = color.hex
    setModifyVars(newVars)
  }

  const changeTheme = (reset: boolean | undefined) => {
    setShowSketch(false)
    const newColors = reset ? colorVars : modifyVars
    changeColor(newColors)
  }


  return (
    <>
      <Button className="setTheme" onClick={() => setVisible(true)}>
        换个风格
      </Button>
      <Drawer
        className="theme-drawer"
        width={300}
        title="更换网站风格配置"
        placement="right"
        closable={false}
        onClose={() => setVisible(false)}
        visible={visible}
      >
        {
          modifyVars.length > 0 && modifyVars.map((item, index) => (
            <div className="theme-list flex flex-align-center" key={index}>
              {item.name}
              <div
                className={order == index ? 'round flex-center selected' : 'round flex-center'}
                onClick={() => {
                  setShowSketch(true)
                  setOrder(index)
                  setSketchColor(modifyVars[index].color)
                }}
              >
                <div className="circle" style={{ background: item.color }} />
              </div>
            </div>
          ))
        }
        {showSketch && (
          <>
            <SketchPicker
              onChange={handleChange}
              color={sketchColor}
            />
            <Button onClick={() => changeTheme(false)}>
              变换主题
            </Button>
            <Button onClick={() => changeTheme(true)} style={{ marginLeft: 20 }}>
              重置主题
            </Button>
          </>
        )}
      </Drawer>
    </>
  )
}

export default memo(Theme)
