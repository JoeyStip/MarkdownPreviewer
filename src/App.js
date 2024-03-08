import './App.css';
import { useState } from 'react';
import { marked } from 'marked';

function Editor({inputText, onChange}) {

  const [editorSize, setEditorSize] = useState(['input',"editor","Expand"])

  const handleClick =(e)=>{
    if (editorSize[0] === "input inputExpanded"){
      setEditorSize(["input","editor","Expand"]);
    } else {
      setEditorSize(["input inputExpanded", "editorExpanded","Minimize"]);
    }
  }

  return (
    <div className="App">
      <div className={editorSize[0]}>
        <header>
          <span>Editor</span>
          <button id="expandEditor" type="button" onClick={handleClick}>{editorSize[2]}</button>
        </header>
        <textarea 
          id={editorSize[1]}
          value={inputText}
          onChange={onChange}
        >defaultText</textarea>
      </div>
    </div>
  );
}

function Previewer({inputText}){
  
  function getMarkdownText(){
    marked.use({breaks:true, gfm: true});
    var rawMarkup = marked.parse(inputText);
    return {__html: rawMarkup};
  }
  
  return (
    <div id="previewContainer">
        <header>
          <span>Previewer</span>
        </header>
        <div id="display">
          <div id="preview" dangerouslySetInnerHTML={getMarkdownText()}></div>
        </div>
    </div> 
  );
}

export default function App() {
  
  const DefaultText = "# This is an H1 Header\n\n## This is an H2 SubHeader\n\n[This](www.tunnelsnakes.com) is a link\n\nCheck out `this code`\n\nBelow is a code block\n\n    function exampleFunc(){\n       let message = \"What's up?\"\n        console.log(message)\n    }\n\n- this is a list item\n- this is also a list item\n\n> \"check out this block quote\" - Ghandi 2024\n\n**look at this bolded text!**\n\n![CatSurprise](https://media.istockphoto.com/id/1361394182/photo/funny-british-shorthair-cat-portrait-looking-shocked-or-surprised.jpg?s=612x612&w=0&k=20&c=6yvVxdufrNvkmc50nCLCd8OFGhoJd6vPTNotl90L-vo=)"

  const [inputText, setinputText] = useState(DefaultText);

  function handleChange(e){
    setinputText(e.target.value);
  }

  return(
    <div className="background">
      <Editor inputText={inputText} onChange={handleChange} />
      <Previewer inputText={inputText} />
    </div>
  )
}