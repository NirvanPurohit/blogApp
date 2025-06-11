import React from 'react';
import JoditEditor from 'jodit-react';
import { Controller } from 'react-hook-form';

export default function RTE({
  name,
  control,
  label,
  defaultValue = "",
  config = {},
  placeholder = "",
  readOnly = false,
  containerClassName = "",
  labelClassName = "",
  errorClassName = "",
  error = null,
}) {
  const defaultConfig = {
    toolbar: [
      ["bold", "italic", "underline", "strike"],
      ["forecolor", "backcolor"], // Color Picker Plugin
      ["|"],
      ["image", "video"],
      ["table", "code"],
      ["emoji"], // Emoji Plugin
      ["spellcheck"], // Spellchecker
      ["undo", "redo"],
    ],
    placeholder: placeholder,
    readonly: readOnly,
    ...config, // Merge custom config with default config
  };

  return (
    <div className={`w-full ${containerClassName}`}>
      {label && <label className={`inline-block mb-1 pl-1 ${labelClassName}`}>{label}</label>}

      <Controller
        name={name || "content"}
        control={control}
        render={({ field: { onChange } }) => (
          <JoditEditor
            value={defaultValue}
            onChange={onChange}
            config={defaultConfig}
          />
        )}
      />

      {error && <p className={`text-red-500 text-sm mt-1 ${errorClassName}`}>{error.message}</p>}
    </div>
  );
}