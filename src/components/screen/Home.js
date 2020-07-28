import React,{useEffect, useState} from 'react'
import {connect} from 'react-redux'
import {fetchPost, likes, unlikes, deletePost, comment, deletecomment} from '../../store/action/postAction'
import 'bootstrap/dist/css/bootstrap.min.css'
import {Spinner} from 'react-bootstrap'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'




import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import { red } from '@material-ui/core/colors';
import FavoriteIcon from '@material-ui/icons/Favorite';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import DeleteIcon from '@material-ui/icons/Delete';



const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 345,
   },
//   media: {
//     height: ,
//     paddingTop: '56.25%', // 16:9
//   },
  expand: {
    transform: 'rotate(0deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },
  avatar: {
    backgroundColor: red[500],
  },
   small: {
     width: theme.spacing(3),
     height: theme.spacing(3),
   },
}));


function Home(props) {

    dayjs.extend(relativeTime)

      const classes = useStyles();



    const [posts, setPosts] = useState([])
    const [userId, setUserId] = useState('')
    const [comment , setComment] = useState('')
    

    const {fetchPost} = props
    useEffect(()=>{
        fetchPost()               
    },[])

    const {post} = props.post
    useEffect(()=>{
        setPosts(post)
    }, [post])

useEffect(()=>{
    setUserId(props.user.user._id)
    console.log(props.user.user._id);
}, [props.user.user._id])

// const handleComment=(e,id)=>{
//     e.preventDefault()
//     props.comment(id, comment)
// }

    return (
        <div className='container mt-5'>
    

{
    posts.length > 0 ?
        posts.map(post=>{
            return(

         <div className='my-3'>
        <Card className={classes.root}>
      <CardHeader
        avatar={
          <Avatar alt="Cindy Baker" src={post.postedBy.profile}/>
          
        }
        
        action={
                    (post.postedBy._id === userId) ?
                    <DeleteIcon className='text-danger' onClick={()=>props.deletePost(post._id)} />:null
                }
        title={post.postedBy.name}
        subheader={dayjs(post.date).fromNow()}
      />
      {
                    (post.photo !== 'no photo')?
                    <img src={post.photo} className='card-image-top postimg'></img> : null                    
                }
      <CardContent>
        <Typography variant="body2" color="textSecondary" component="p">
          {post.title}<br></br>
          {post.body}
        </Typography>
      </CardContent>
      
      <CardActions style={{borderTop:'solid #dedede 1px',
                          borderBottom: 'solid #dedede 1px',
                          marginBottom:'5px',
                           padding:'10px 0'}} disableSpacing>
        

        {
                    (post.likes.includes(userId)) ?
                    <FavoriteIcon className='text-danger ml-2' onClick={()=>props.unlikes(post._id)} />:
                    <FavoriteBorderIcon className='ml-2' onClick={()=>props.likes(post._id)} />
                    
                }
                 
        <span className='mx-2'>{post.likes.length}</span>
      </CardActions>
      
      {post.comment.map(comment=>{
          return(
              <p key={comment._id} className='comment ml-2 mt-2'>
              <Avatar alt="Cindy Baker" src={comment.user.profile} className={classes.small} />
              <strong style={{margin: '0 5px'}}>{comment.user.name}</strong> {comment.commentBody}  
              {(comment.user._id === userId) ?
                            <span className='comment__delete'><i   onClick={()=>props.deletecomment(post._id, comment._id)} className='fa fa-trash'></i></span>
                            : null

              }
              </p>
          )
        
      })
      }
      <form onSubmit={(e)=>{
          e.preventDefault()
          props.comment(post._id, {commentBody:comment})
          setComment('')
          document.getElementById('comment').value = ''
      }}>
     
      <div className='comment'>
        <input autoComplete='off' placeholder='add a comment' className='form-control form-control-sm ml-2' id='comment' type='text' onChange={(e)=>setComment(e.target.value)}></input>
      
       <button className='btn ml-0' type='submit'> <i className='fa fa-send text-success'></i></button>
       </div>
      </form>
    </Card>
</div>
   )
   }): <><Spinner animation='border' /></>

}
</div>
    )
}
const mapStateToProps = state =>({
    post: state.post,
    user: state.auth
})
export default connect(mapStateToProps, {fetchPost, likes, unlikes, deletePost, comment, deletecomment})(Home)
