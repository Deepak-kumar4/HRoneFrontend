// util to convert field structure into plain JSON schema (for preview/output)
const generateJSON = (fields) => {
  const result = {};

  fields.forEach((field) => {
    const fieldKey = field.name || "";

    // fallback for empty field name — can skip this key if needed
    if (!fieldKey) return;

    // handle nested fields recursively
    if (field.type === "Nested") {
      result[fieldKey] = generateJSON(field.children || []);
    } 
    // handle empty type
    else if (!field.type) {
      result[fieldKey] = ""; // default to empty if type isn't set
    } 
    // basic types
    else {
      result[fieldKey] = field.type === "String" ? "STRING" : "number";
    }
  });

  return result;
};

export default generateJSON;


