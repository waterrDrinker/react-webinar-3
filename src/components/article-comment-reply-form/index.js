import PropTypes from 'prop-types';
import { memo, useState } from 'react'
import './style.css'
import { Link } from 'react-router-dom';

const ArticleCommentReplyForm = ({ 
  isLoggedIn, 
  pathname, 
  link,  
  commentParentId, 
  onAddComment, 
  handleCommentForm,
  t
}) => {
  const [textValue, setTextValue] = useState('')

  const callbacks = {
    handleChangeText: (e) => setTextValue(e.target.value),
    onSubmit: (e) => {
      e.preventDefault()
      if(textValue === '') return; 
      const form = e.target
      const formData = new FormData(form);
      const data = {
        text: formData.get('commentContent'),
        parent: {
          _id: commentParentId,
          _type: "comment"
        }
      }
      onAddComment(data)
      setTextValue('')
      callbacks.closeReplyForm()
    },
    closeReplyForm: () => handleCommentForm(prev => prev = {
      form: 'comment', 
      commentIndex: null
    })
  }

  return (
    <div className='ArticleCommentReplyForm-wrapper'>
      {isLoggedIn ? (
        <form className='ArticleCommentReplyForm' onSubmit={callbacks.onSubmit}>
        <label htmlFor='commentTextArea' className='ArticleCommentReplyForm-title'>
          {t('article.commentaryReplyForm-title')}
        </label>
  
        <textarea id='commentTextArea' name='commentContent' value={textValue} 
        onChange={callbacks.handleChangeText} className='ArticleCommentReplyForm-textarea' />
  
        <div className='ArticleCommentReplyForm-controls'>
          <button type='submit' className='ArticleCommentReplyForm-submit-btn'>
            {t('article.commentaryForm-submit')}
          </button>
          <button 
            onClick={callbacks.closeReplyForm}  className='ArticleCommentReplyForm-cancel-btn'>
              {t('article.commentaryReplyForm-cancel')}
          </button>
        </div>
      </form>
      ) : (
        <div className="ArticleCommentReplyForm-subtitle">
          <Link className="ArticleComments-signin-link" to={link} state={{back: pathname}}>{t('article.commentaryReplyForm-ifnotlogedin').split(',')[0]}</Link>
          , {t('article.commentaryReplyForm-ifnotlogedin').split(',')[1]} {' '}
          <button onClick={callbacks.closeReplyForm} className='ArticleCommentReplyForm-subtitle-cancel-btn'>
            {t('article.commentaryReplyForm-cancel')
          }</button>
        </div>
      )}
    </div>
    
  )
}

ArticleCommentReplyForm.propTypes = {
  commentParentId:PropTypes.string,
  isLoggedIn: PropTypes.bool,
  link: PropTypes.string,
  pathname: PropTypes.string,
  onAddComment: PropTypes.func,
  handleCommentForm: PropTypes.func,
  t: PropTypes.func
}

ArticleCommentReplyForm.defaultProps = {
  t: (text) => text
}


export default memo(ArticleCommentReplyForm)