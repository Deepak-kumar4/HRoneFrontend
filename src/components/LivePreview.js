import React from "react";
import SchemaInput from "./SchemaInput";

export default function LivePreview({ fields, onChange, depth = 0, maxDepth = 5 }) {
  const handleFieldChange = (index, updatedField) => {
    const updatedFields = [...fields];
    updatedFields[index] = updatedField;
    onChange(updatedFields);
  };

  const handleAddField = () => {
    const newField = {
      id: Date.now(),
      name: "",
      type: "",
      required: false,
      children: [],
    };
    onChange([...fields, newField]);
  };

  const handleRemoveField = (index) => {
    onChange(fields.filter((_, i) => i !== index));
  };

  return (
    <div className="p-2">
      {fields.map((field, index) => (
        <div key={field.id || index}>
          <SchemaInput
            field={field}
            index={index}
            onChange={handleFieldChange}
            onRemove={handleRemoveField}
          />

          {field.type === "Nested" && depth < maxDepth && (
            <div className="ml-6 pl-4 border-l-4 border-blue-300">
              <LivePreview
                fields={field.children || []}
                onChange={(nestedFields) =>
                  handleFieldChange(index, {
                    ...field,
                    children: nestedFields,
                  })
                }
                depth={depth + 1}
                maxDepth={maxDepth}
              />
            </div>
          )}
        </div>
      ))}

      <div className="mt-4 flex justify-center">
        <button
          type="button"
          onClick={handleAddField}
          className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded transition duration-300"
        >
          + Add Item
        </button>
      </div>
    </div>
  );
}



