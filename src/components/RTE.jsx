import React from 'react'
import { Controller } from 'react-hook-form'
import { Editor } from '@tinymce/tinymce-react'

function RTE({label , control , name, defaultvalue }) {
  return (
    <div className='w-full'>
    {label && <label className='inline-block mb-1 pl-1' >{label}</label>}
    <Controller 
    name= {name || "Content"}
    control={control}
    render={({field: {onChange, value}})=>{
      <Editor
      value={value}
      onEditorChange={onChange}
      
      initialValue={defaultvalue}
      init={{
          initialValue: defaultvalue,
          height: 500,
          menubar: true,
          plugins: [
              "image",
              "advlist",
              "autolink",
              "lists",
              "link",
              "image",
              "charmap",
              "preview",
              "anchor",
              "searchreplace",
              "visualblocks",
              "code",
              "fullscreen",
              "insertdatetime",
              "media",
              "table",
              "code",
              "help",
              "wordcount",
              "anchor",
          ],
          toolbar:
          "undo redo | blocks | image | bold italic forecolor | alignleft aligncenter bold italic forecolor | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent |removeformat | help",
          content_style: "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }"
      }}
     
      />
    }}
    />

  
      
    </div>
  )
}

export default RTE
