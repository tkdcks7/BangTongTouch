import React, { FC } from "react";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";

interface CKEditorProps {
  data: string;
  onChange: (data: string) => void;
}

const TextEditor: FC<CKEditorProps> = ({ data, onChange }) => {
  return (
    <div className="editor-container">
      <CKEditor
        editor={ClassicEditor}
        data={data}
        config={{
          toolbar: [
            "heading",
            "|",
            "undo",
            "redo",
            "|",
            "bold",
            "italic",
            "|",
            "link",
            "bulletedList",
            "numberedList",
            "blockQuote",
            "|",
            "imageUpload",
            "insertTable",
          ],
          extraPlugins: [MyCustomUploadAdapterPlugin],
        }}
        onFocus={() => {
          const logo = document.body.querySelectorAll(".ck-body-wrapper");
          if (logo.length > 0) {
            logo[0].remove();
          }
        }}
        onChange={(_event, editor) => {
          const logo = document.body.querySelectorAll(".ck-body-wrapper");
          if (logo.length > 0) {
            logo[0].remove();
          }
          const data = editor.getData();
          onChange(data);
        }}
      />
      <style>
        {`
        .ck-content ul,
        .ck-content ol {
          padding-left: 20px; /* 말머리 기호의 왼쪽 여백을 조정 */
        }
        .ck-content{
        height:450px;
        }
      `}
      </style>
    </div>
  );
};

function MyCustomUploadAdapterPlugin(editor: any) {
  editor.plugins.get("FileRepository").createUploadAdapter = (loader: any) => {
    return MyUploadAdapter(loader);
  };
}

const MyUploadAdapter = (loader: any) => {
  return {
    upload: () => {
      return new Promise((resolve, reject) => {
        const data = new FormData();
        loader.file.then((file: any) => {
          data.append("file", file);
          fetch(`${process.env.REACT_APP_BACKEND_URL}/upload`, {
            method: "POST",
            body: data,
          })
            .then((response) => response.json())
            .then((data) => {
              resolve({
                default: data.url,
              });
            })
            .catch((error) => {
              reject(error);
            });
        });
      });
    },
  };
};

export default TextEditor;
