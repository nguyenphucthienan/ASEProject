import React, { Component } from 'react';
import { connect } from 'react-redux';
import { reduxForm, Field } from 'redux-form';
import { Link } from 'react-router-dom';
import axios from 'axios';
import config from '../../config';

import InputField from '../forms/InputField';
import TextAreaField from '../forms/TextAreaField';

class PostNew extends Component {
  componentDidMount() {
    document.title = `${config.appName} – New Post`;
  }

  async createPost(values) {
    try {
      const response = await axios.post('/api/posts', values);
      const { data: { _id: postId } } = response;
      this.props.history.push(`/posts/${postId}`);
    } catch (err) {
      console.log(err);
    }
  }

  renderBackButton() {
    return (
      <div className="fixed-action-btn">
        <Link
          to="/dashboard"
          className="waves-effect waves-light btn btn-floating btn-large indigo darken-2 pulse"
        >
          <i className="material-icons">arrow_back</i>
        </Link>
      </div>
    );
  }

  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="col s12 m8 offset-m2 l6 offset-l3">
            <h2 className="center-align">New Post</h2>
            <div>
              <form onSubmit={this.props.handleSubmit(values => this.createPost(values))}>
                <Field
                  type="text"
                  name="image"
                  label="Image"
                  component={InputField}
                />
                <Field
                  type="text"
                  name="title"
                  label="Title"
                  component={InputField}
                />
                <Field
                  type="text"
                  name="content"
                  label="Content"
                  component={TextAreaField}
                />
                <div className="row center-align">
                  <div className="col s12">
                    <button type="submit" className="btn waves-effect waves-light green accent-3 center-align">
                      <i className="material-icons left">done</i>Post
                    </button>
                  </div>
                </div>
              </form>
            </div>
            {this.renderBackButton()}
          </div>
        </div>
      </div>
    );
  }
}

function validate(values) {
  const errors = {};

  if (!values.image) {
    errors.image = 'Image cannot be blank';
  }

  if (!values.title) {
    errors.title = 'Title cannot be blank';
  }

  if (values.title && values.title.trim().length > 150) {
    errors.title = 'Title must be a string with a maximum length of 150 characters';
  }

  if (!values.content) {
    errors.content = 'Content cannot be blank';
  }

  if (values.content && values.content.trim().length < 10) {
    errors.content = 'Content must be at least 10 characters';
  }

  return errors;
}

function mapStateToProps({ posts: { page } }) {
  return { page };
}

export default connect(mapStateToProps)(reduxForm({
  form: 'postNew',
  validate
})(PostNew));