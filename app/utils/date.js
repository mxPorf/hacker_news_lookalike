export default function toLocale(unix_timestamp) {
  var date = new Date(unix_timestamp * 1000)
  return date.toLocaleDateString(undefined,{
    hour: 'numeric',
    minute: 'numeric'
  })
}
