import React, { useState, useMemo } from "react";
import { FormProvider, useForm } from "react-hook-form";
import SchemaBuilder from "./components/LivePreview";
import generateJSON from "./utils/GenerateJson";

function App() {
  const [formFields, setFormFields] = useState([
    { id: Date.now(), name: "", type: "", required: false, children: [] },
  ]);

  const formMethods = useForm();

  const previewData = useMemo(() => generateJSON(formFields), [formFields]);

  const handleSubmit = () => {
    // TODO: maybe send to backend later
    console.log("schema state >>>", formFields);
    console.log("Final JSON:", previewData);
    alert("Submitted! Check the console.");
  };

  return (
    <FormProvider {...formMethods}>
      <div className="flex flex-col md:flex-row p-6 gap-8 min-h-screen bg-gray-100">
        <div className="md:w-1/2 w-full bg-white border rounded p-6 shadow-sm">
          <h2 className="text-xl font-semibold mb-3">Schema Input</h2>

          {/* builder component below */}
          <SchemaBuilder fields={formFields} onChange={setFormFields} />

          <button
            onClick={handleSubmit}
            // quick dirty style might replace later
            className="mt-5 px-5 py-2 bg-blue-700 text-white rounded-sm hover:bg-blue-600"
          >
            Submit
          </button>
        </div>

        <div className="md:w-1/2 w-full bg-gray-50 border rounded p-6 shadow-sm">
          <h2 className="text-xl font-semibold mb-3">Live Preview</h2>
          <pre className="bg-white p-4 text-sm border rounded overflow-x-auto">
            {JSON.stringify(previewData, null, 2)}
          </pre>
        </div>
      </div>
    </FormProvider>
  );
}

export default App;

