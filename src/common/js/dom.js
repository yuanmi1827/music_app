


export function getData(el, name, val) {
  const prefix = 'data-'
  if(val) {
    el.setAttribute(prefix+name,val)
  } else {
    return el.getAttribute(prefix+name)
  }
}

// 浏览器兼容
let elementStyle = document.createElement('div').style

let vander = (() => {
  let transformNames = {
    webkit: 'webkitTransform',
    Moz: 'MozTransform',
    O: 'OTransform',
    ms: 'msTransform',
    standard: 'transform'
  }

  for (let key in transformNames) {
    if (elementStyle[transformNames[key]] !== undefined) {
      return key
    }
  }

  return false
})()

export function prefixStyle(style) {
  if (vander === false || vander === 'standard') {
    return false
  }
  return vander + style.charAt(0).toUpperCase()+style.slice(1)
}