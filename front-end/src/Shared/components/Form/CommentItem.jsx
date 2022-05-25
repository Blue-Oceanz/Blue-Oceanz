import React from 'react';
import styles from './Form.module.css';

export default function CommentItem({ comment }) {
// console.log(comment)

    return (
        <div className={styles.comment_item_container}>
            <div className={styles.comment_author}>
                <h4>{comment.author}</h4>
            </div>
            <div className={styles.comment_item_content}>
                <p>{comment.content}</p>
                <p className={styles.time_stamp}>{Date(comment.time_stamp)}</p>
            </div>
        </div>
    );
}
