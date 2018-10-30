import React, { Component} from 'react';
import PropTypes from 'prop-types'

import CommentItem from '../comment-item/comment-item'
import './commentList.css'

class CommentList extends React.Component {

    //static 给组件类指定属性
    static  propTypes = {
        comments: PropTypes.array.isRequired,
        deleteComment: PropTypes.func.isRequired
    };

    render () {
        const {comments, deleteComment} = this.props;
        //计算出是否显示, 当评论的内容为空的时候，显示
        const display = comments.length ===0 ? 'block' : 'none';
        return (
            <div className="col-md-8">
                <h3 className="reply">评论回复：</h3>
                {/*注意style的书写方式*/}
                <h2 style={{ display }}>暂无评论，点击左侧添加评论！！！</h2>
                <ul className="list-group">
                    {
                        //li中的标签必须要加key，都这会报错, 这里的key是传递不过去的, 所以使用index 传递
                        comments.map((c, index) => <CommentItem comment={c} key={index}  deleteComment={deleteComment} index={index}/>)
                    }
                </ul>
            </div>
        )
    }
}
/*
CommentList.propTypes = {
    comments: PropTypes.array.isRequired
};
*/

export default CommentList;
