import React from 'react'
import queryString from 'query-string'
import {getUserProfile, getManyItems} from '../utils/api'
import Loading from './Loading'
import toLocale from '../utils/date'
import Post from './Post'

export default class User extends React.Component {
  state = {
    profile: null,
    postList: null,
    error: null
  }


  componentDidMount(){
    const {id} = queryString.parse(this.props.location.search)
    //Usamos encadenamiento de promesas porque la segunda promesa
    //depende de datos recibidos en la primer promesa
    getUserProfile(id)
      .then( (user) => {
        this.setState({
          profile: user
        })
        getManyItems(this.state.profile.submitted.slice(0,50))
          .then(  (posts) => {
            this.setState({
              postList: posts
            })
          })
          .catch( (err) => {
            console.log('error: ', err);
            this.setState({
              error: err
            })
          })

      })
      .catch((err) => {
        console.log('error: ', err);
        this.setState({
          error: err
        })
      })

  }

  render() {
    const {profile, postList, error} = this.state

    if ( (profile === null && error === null) ){
      return <Loading text='Loading user'/>
    } else if ( (profile !== null && postList === null && error === null) ){
      return <Loading text='Loading posts'/>
    }

    if (error){
      return <p>{error}</p>
    }

    return(
      <React.Fragment>
        <div>
          <h2>{profile.id}</h2>
          <p>joined {toLocale(profile.created)} has {profile.karma} karma</p>
          {profile.about && <p dangerouslySetInnerHTML={{__html: profile.about}} />}
        </div>
        <div>
          <ul>
            {postList.map((article) => (
              <li key={article.id}>
                <Post
                  id={article.id}
                  title={article.title}
                  author={article.by}
                  time={article.time}
                  kids={article.kids}
                  url={article.url}
                />
              </li>
            ))}
          </ul>
        </div>
      </React.Fragment>
    )
  }
}
