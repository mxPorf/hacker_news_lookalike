import React from 'react'
import PropTypes from 'prop-types'

const styles = {
  content: {
    fontSize: '35px',
    postion: 'absolute',
    left: '0',
    right: '0',
    marginTop: '20px',
    textAlign: 'center',
  }
}

export default class Loading extends React.Component {
  static propTypes = {
    text: PropTypes.string.isRequired,
    interval: PropTypes.number.isRequired
  }

  static defaultProps = {
    text: "Loading",
    interval: 300
  }

  state = {
    banner: this.props.text
  }

  componentDidMount(){
    const {text, interval} = this.props

    this.interval = window.setInterval( () => {
      this.state.banner === `${text}...`
        ? this.setState({banner: text})
        : this.setState(({banner}) => ({banner: banner + '.'}))
    }, interval)
  }

  componentWillUnmount(){
    window.clearInterval(this.interval)
  }

  render(){
    return(
      <p style={styles.content}>{this.state.banner}</p>
    )
  }
}
