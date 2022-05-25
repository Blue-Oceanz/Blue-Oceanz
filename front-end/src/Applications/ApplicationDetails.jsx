import { useEffect, useState } from 'react';
import styles from './ApplicationDetails.module.css';
import  Comments  from '../Shared/components/Form/Comments';
import Api from 'Shared/utils/Api';

const ApplicationDetails = (props) => {
    // const [comments, setComments] = useState('')

    const getComments = async () => {
        console.log('called')
        const comments = await Api.comments.getAll(4);
        // setComments(comments);
        console.log(comments);
    }

    useEffect(getComments,[])


    return(
        <>
        <div className={styles.container}>
            <div className={styles.logo}>
                <img src={props.image}></img>
            </div>
            <div className={styles.details}>
                <h3>Company Name: {props.name}</h3>
                <h3>Title: {props.subText}</h3>
                <h3>Link: {props.url}</h3>
                <h3>Note: {props.note}</h3>
                {/* <form onSubmit={((e)=>postComment(e))}>
                    <input type='text' onChange={((e)=> makeComment(e.target.value))}></input>
                    <button type='submit'>post comment</button>
                </form> */}
                <Comments/>
            </div>
        </div>
        </>
    );
};

export default ApplicationDetails;