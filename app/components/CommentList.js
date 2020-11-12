import React from 'react'
import {getManyItems} from '../utils/api'
import Loading from './Loading'
import Post from './Post'
import toLocale from '../utils/date'
import queryString from 'query-string'
import {Link} from 'react-router-dom'
import {ThemeConsumer} from '../context/theme'

export default class CommentList extends React.Component {
  state = {
    post: null,
    comentarios: null,
    error: null
  }
  componentDidMount(){
    const {id} = queryString.parse(this.props.location.search)
    //El id pertenece al post del cual queremos obtener los comentarios.
    //Preguntar a la API por la informacion del post y posteriormente
    //Por los id en el atributo 'kids', que se refieren a los comentarios
    getManyItems([id])
      .then( (post) => {
        this.setState({
          post: post[0]
        })
        post = post[0]
        if( !('kids' in post) || post.kids.length == 0 ){
          this.setState({
            comentarios: 'ninguno'
          })
        } else {

          // Chained promises para obtener los comentarios de este post
          getManyItems(post.kids.slice(0,50), 'comment')
            .then( (lista) => {
              this.setState({
                comentarios: lista
              })
            })
            .catch( (err) => {
              console.log(err);
              this.setState({
                error: err
              })
            })
        }
      })
      .catch( (err) => {
        this.setState({
          error: err
        })
      })
  }
  render(){
    const {post, comentarios, error} = this.state
    const theme = 'light'
    if(error){
      return <p>{error}</p>
    }
    if(!post){
      return <Loading text='Loading post'/>
    } else if (!comentarios){
      return <Loading text='Loading comments'/>
    }
    return(
      <ThemeConsumer>
        { ({theme}) => (
          <React.Fragment>
            <Post
              id={post.id}
              title={post.title}
              author={post.by}
              time={post.time}
              kids={post.kids}
              url={post.url}
              title_size='big'
            />
            <div>
              {comentarios === 'ninguno' && <p> No comments exist for this post </p>}
              {comentarios !== 'ninguno' && <ul>
                {comentarios.map((com) => (
                  <li key={com.id}>
                    <div className={`comment-${theme}`}>
                      <p>by <Link
                      className={`post-link-${theme}`}
                      to={{
                        pathname: '/user',
                        search: `id=${com.by}`
                       }}>
                         {com.by}
                      </Link> on {toLocale(com.time)} </p>
                      <p dangerouslySetInnerHTML={{__html: com.text}}/>
                    </div>
                  </li>
                ))}
              </ul>}
            </div>
          </React.Fragment>
        )}
      </ThemeConsumer>
    )
  }
}
