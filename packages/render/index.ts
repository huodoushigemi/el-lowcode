type Props = {
  render: any | (() => any)
}

export default function Render({ render }: Props) {
  return typeof render == 'function' ? render() : render
}