// XML Parser - ingests CAMT XML and populates form data

export function parseXMLToFormData(xmlString, schema) {
  const parser = new DOMParser();
  const doc = parser.parseFromString(xmlString, "application/xml");

  // Check for XML parsing errors
  const parseError = doc.querySelector("parsererror");
  if (parseError) {
    throw new Error("Invalid XML file format");
  }

  // Find the BkToCstmrStmt element (inside Document)
  let rootDataNode = doc.querySelector("BkToCstmrStmt");
  if (!rootDataNode) {
    // Maybe namespace prefix is preventing querySelector, try finding by local name
    const elements = doc.getElementsByTagName("*");
    for (let i = 0; i < elements.length; i++) {
      if (elements[i].localName === "BkToCstmrStmt") {
        rootDataNode = elements[i];
        break;
      }
    }
  }

  if (!rootDataNode) {
    throw new Error("Could not find <BkToCstmrStmt> in the XML file");
  }

  const formData = {};

  // Recursively map XML elements to our flat dot-notation formData
  function processNode(xmlNode, schemaNodes, currentPath) {
    // Create a map of schema tags for fast lookup
    const schemaMap = {};
    for (const sNode of schemaNodes) {
      schemaMap[sNode.tag] = sNode;
    }

    // Iterate through XML children
    for (const child of xmlNode.children) {
      const tagName = child.localName || child.tagName;
      const schemaDef = schemaMap[tagName];

      if (schemaDef) {
        const fieldPath = currentPath ? `${currentPath}.${tagName}` : tagName;
        const isLeaf = !schemaDef.children || schemaDef.children.length === 0;

        if (isLeaf) {
          // It's a leaf data field. Support repeatable fields by combining with newline
          if (formData[fieldPath] !== undefined) {
            formData[fieldPath] += '\n' + child.textContent;
          } else {
            formData[fieldPath] = child.textContent;
          }

          // Check for currency attribute
          if (schemaDef.hasCcyAttr) {
            const ccy = child.getAttribute("Ccy");
            if (ccy) {
              formData[fieldPath + "_Ccy"] = ccy;
            }
          }
        } else {
          // It's a container element, recurse into children
          processNode(child, schemaDef.children, fieldPath);
        }
      }
      // If schemaDef is not found, we simply ignore the tag (whitelisting behavior)
    }
  }

  processNode(rootDataNode, schema, "");

  return formData;
}
