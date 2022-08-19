import React,{useState} from "react";
import Paper from "@mui/material/Paper";
import "./CreateNote.css";
import TextField from "@mui/material/TextField";
import Fab from "@mui/material/Fab";
import AddIcon from "@mui/icons-material/Add";
import Axios from "axios";

export default function CreateNote(props) {
  const [title,setTitle]=useState("");
  const [content,setContent]=useState("");

  function onTitleChange(event){
    setTitle(event.target.value);
  }
  function onContentChange(event){
    setContent(event.target.value);
  }
  function onAddClick(){
    Axios.post("/addNote",{title:title,content:content}).then((res)=>{
      props.setNotes([...props.notes,{title:title,content:content}]);
    })
  }
  return (
    <div className="noteContainer">
      <Paper
        elevation={7}
        className="note"
      >
      <div className="fieldContainer">
      <TextField className="field" label="Title" variant="standard" onChange={onTitleChange}/>
      </div>
      <div className="fieldContainer">
      <TextField
          className="field"
          label="Note"
          variant="standard"
          multiline
          minRows="5"
          onChange={onContentChange}
        />
      </div>
        <Fab color="primary" onClick={onAddClick}>
          <AddIcon/>
        </Fab>
      </Paper>
    </div>
  );
}
