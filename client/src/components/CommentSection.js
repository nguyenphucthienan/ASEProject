import React, { Component } from 'react';
import { connect } from 'react-redux';

import CommentInput from './CommentInput';
import CommentList from './CommentList';

class CommentSection extends Component {
  render() {
    const { postId, comments } = this.props;

    return (
      <div className="card row">
        <div className="col s12">
          <div className="row">
            <div className="col s12">
              <p>
                <span className="card-content-title">Comments: </span>
                <span>{(comments && comments.length) || 0}</span>
              </p>
            </div>
          </div>
          <div className="row">
            <div className="col s12">
              <CommentList comments={comments} />
            </div>
          </div>
          <hr />
          <div className="row">
            <div className="col s12">
              <CommentInput postId={postId} />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

function mapStateToProps({ comments }) {
  return { comments };
}

export default connect(mapStateToProps)(CommentSection);
