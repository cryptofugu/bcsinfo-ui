import mergeProps from '@/utils/merge-props'

export default {
  name: 'icon',
  functional: true,
  props: {
    icon: {type: String, required: true},
    fixedWidth: {type: Boolean, default: false}
  },
  render(createElement, {data, props, children}) {
    return createElement(
      'span',
      mergeProps(
        data,
        {
          class: [
            'fa',
            props.icon.split(' ').map(s => 'fa-' + s),
            {'fa-fw': props.fixedWidth}
          ]
        }
      ),
      children
    )
  }
}
