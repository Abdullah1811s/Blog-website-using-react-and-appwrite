import React from 'react'
import { Editor } from '@tinymce/tinymce-react'
import { Controller } from 'react-hook-form'

function RTE({
    name, control, label, defaultValue = ""
}) {
    return (
        <div className='w-full'>
            {label && <label className='inline-block mb-1 pl-1 font-bold text-gray-100'>{label}</label>}
            <Controller
                name={name}
                control={control}
                render={({ field: { onChange } }) => (
                    <Editor
                        apiKey='rrsqf9gzkpo9omj8c5davvqc4gjbkmqv87683u7hrrurx714'
                        initialValue={defaultValue}
                        init={{
                            height: 500,
                            menubar: true,
                            plugins: [
                                "image",
                                "advlist",
                                "autolink",
                                "lists",
                                "link",
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
                                "help",
                                "wordcount",
                            ],
                            toolbar:
                                "undo redo | blocks | image | bold italic forecolor | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | removeformat | help",
                            content_style: `
                                body {
                                    background-color: #1e1e1e;
                                    color: #cfcfcf;
                                    font-family: Helvetica, Arial, sans-serif;
                                    font-size: 14px;
                                }
                                .tox-tinymce-aux {
                                    background-color: #333;
                                    color: #cfcfcf;
                                }
                                .tox-toolbar {
                                    background-color: #2c2c2c;
                                    color: #cfcfcf;
                                }
                                .tox-toolbar__primary {
                                    background-color: #2c2c2c;
                                }
                                .tox-toolbar__overflow {
                                    background-color: #2c2c2c;
                                }
                                .tox-statusbar {
                                    background-color: #1e1e1e;
                                    color: #cfcfcf;
                                }
                                .tox-menubar {
                                    background-color: #2c2c2c;
                                    color: #cfcfcf;
                                }
                                .tox-menu {
                                    background-color: #1e1e1e;
                                    color: #cfcfcf;
                                }
                                .tox-menu__item {
                                    background-color: #333;
                                }
                                .tox-toolbar__group button {
                                    background-color: #2c2c2c;
                                    border: 1px solid #444;
                                    color: #cfcfcf;
                                }
                                .tox-toolbar__group button:hover {
                                    background-color: #444;
                                }
                            `,
                            skin: 'oxide-dark', 
                            content_css: 'dark',
                        }}
                        onEditorChange={onChange}
                    />
                )}
            />
        </div>
    )
}

export default RTE
