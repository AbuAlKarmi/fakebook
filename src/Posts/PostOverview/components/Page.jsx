import { Button, Container, Paper, Typography } from "@material-ui/core";
import { generatePath, Link, useParams } from "react-router-dom";
import { usePost } from "../usePost";
import { useUser } from '../../../Users/useUser';
import { makeStyles } from "@material-ui/styles";
import { ROUTES as POSTS_ROUTES } from "../../constants";
import { ROUTES } from "../constants";

const useStyles = makeStyles({
    root:{
        margin: 16,
        padding: 8,
    },
    post:{
        width: '50%',
        padding: 24,
        marginTop: 16,
    },
    topSection:{
        display:'flex',
        justifyContent:'space-between'
    },
    buttons:{
        display:'flex',
        alignItems:'flex-start',
        gap: 8,
    },
    userProfile:{
        marginBottom: 24,
    },
    postTitle:{
        marginBottom: 8,
    },
})

function Page() {
    const { id } = useParams();
    const classes = useStyles();
    const { data: post, isLoading: isPostLoading, isError } = usePost(id);
    
    const { data: user, isLoading: isUserLoading, isError: isUserError} = useUser(post?.userId);

    if(isUserLoading || isPostLoading){
        return (<Typography>Loading...</Typography>)
    }

    return (
        <div className={classes.root}>
            <Typography 
                component={Link} 
                to={generatePath(POSTS_ROUTES.USER, {id: user.id})}
            >
            Go back
            </Typography>
            <Paper className={classes.post}>
                <div className={classes.topSection}>
                    <div className={classes.userProfile}>
                        <Typography>{user.name}</Typography>
                        <Typography color="textSecondary">{` ${user.username} - ${user.email}`}</Typography>
                    </div>
                    <div className={classes.buttons}>
                        <Button 
                            variant="outlined" 
                            color="primary"
                            component={Link}
                            to={generatePath(ROUTES.EDIT, {id: post.id})}
                        >
                        Edit
                        </Button>
                        <Button variant="outlined" color="secondary">Delete</Button>
                    </div>
                </div>

                <Typography variant="h6" className={classes.postTitle}>{`#${post.id} - ${post.title}`}</Typography>
                <Typography variant="body1">{post.body}</Typography>               
            </Paper>
        </div>

    )
}

export default Page;