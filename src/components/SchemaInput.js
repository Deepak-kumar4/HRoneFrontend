import React from "react";

export default function SchemaInput({ field, index, onChange, onRemove }) {
  // Handle changes to field type, and reset children if not Nested
  const handleTypeChange = (e) => {
    const selectedType = e.target.value;
    onChange(index, {
      ...field,
      type: selectedType,
      children: selectedType === "Nested" ? field.children || [] : undefined,
    });
  };

  // Toggle the "required" status of a field
  const handleToggleRequired = () => {
    onChange(index, { ...field, required: !field.required });
  };

  return (
    <div className="border p-4 mb-2 rounded bg-gray-50 shadow-sm">
      <div className="flex items-center gap-3 flex-wrap">
        {/* Field name input */}
        <input
          placeholder="Field Name"
          value={field.name}
          onChange={(e) => onChange(index, { ...field, name: e.target.value })}
          className="border p-2 rounded w-1/2"
        />

        {/* Field type selector */}
        <select
          value={field.type}
          onChange={handleTypeChange}
          className={`border p-2 rounded w-1/4 ${
            field.type === "" ? "text-gray-400" : "text-gray-700"
          }`}
        >
          <option value="" disabled>
            Field Type
          </option>
          <option value="String">String</option>
          <option value="Number">Number</option>
          <option value="Nested">Nested</option>
        </select>

        {/* Toggle for "required" */}
        <label className="flex items-center cursor-pointer" title="Toggle Required">
          <div className="relative">
            <input
              type="checkbox"
              className="sr-only"
              checked={field.required || false}
              onChange={handleToggleRequired}
            />
            <div className="block bg-gray-300 w-10 h-6 rounded-full"></div>
            <div
              className={`dot absolute left-1 top-1 w-4 h-4 rounded-full transition ${
                field.required ? "translate-x-full bg-blue-500" : "bg-white"
              }`}
            ></div>
          </div>
        </label>

        {/* Remove field button */}
        <button
          type="button"
          onClick={() => onRemove(index)}
          className="text-red-600 text-xl font-bold"
          title="Remove Field"
        >
          ×
        </button>
      </div>
    </div>
  );
}






