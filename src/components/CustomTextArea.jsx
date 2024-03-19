// import React, { Component } from "react";
// import TextareaAutosize from "react-textarea-autosize";

// class CustomTextArea extends Component {
//   state = {
//     isOpen: false,
//   };

//   _toggle = () => {
//     this.setState({ isOpen: !this.state.isOpen }, () => {
//       if (this.state.isOpen) {
//         console.log(this.textAreaRef);
//         this.textAreaRef.focus();
//       }
//     });
//   };

//   render() {
//     return (
//       <>
//         <div>CustomTextArea</div>
//         <button onClick={this._toggle}>toggle text area</button>
//         {this.state?.isOpen ? (
//           <TextareaAutosize ref={(tag) => (this.textAreaRef = tag)} />
//         ) : null}
//       </>
//     );
//   }
// }

// export default CustomTextArea;

import React, { useEffect, useRef, useState } from "react";
import TextareaAutosize from "react-textarea-autosize";

// also for post comment section
const autoHeightStyleComment = {
  height: "47px !important",
  minRows: 47,
  maxRows: 110,
  color: "#333",
  fontSize: 14,
  padding: "12px 36px 12px 15px",
  width: "100%",
  borderRadius: 24,
  backgroundColor: "#f2f2f2",
  borderColor: "#f2f2f2",
  outline: 0,
};

const CustomTextArea = ({ value }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [comment, setComment] = useState("");

  const textAreaRef = useRef(null);

  const _toggle = () => {
    setIsOpen((prev) => !prev);
  };

  const _updateComment = (value, isEmoji = false) => {
    if (isEmoji) {
      setComment((prev) => prev + value);
    } else {
      setComment(value);
    }
  };

  const _clearComment = () => {
    setComment("");
  };

  const postComment = () => {
    console.log("post comment");
  };

  const _onEnterPressed = (event) => {
    const code = event.keyCode || event.which;

    if (code === 13 && !event.shiftKey && !event.ctrlKey) {
      if (event) event.preventDefault();

      if (comment?.trim()?.length) {
        const newComment = comment.replace(/\n/g, "<br/>");
        postComment(newComment.trim());
        _clearComment();
      }
    }
  };

  useEffect(() => {
    if (isOpen) {
      console.log(textAreaRef.current);
      textAreaRef.current.focus();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen]);

  return (
    <>
      <div>CustomTextArea {value}</div>
      <button onClick={() => _toggle()}>toggle text area</button>
      {isOpen ? (
        <TextareaAutosize
          ref={textAreaRef}
          placeholder={"Add comment..."}
          style={autoHeightStyleComment}
          onChange={(e) => _updateComment(e.target.value)}
          onKeyDown={(e) => _onEnterPressed(e)}
          value={comment}
        />
      ) : null}
    </>
  );
};

export default CustomTextArea;
