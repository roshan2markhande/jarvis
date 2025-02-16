export const executeCommand = async (req, res) => {
    const { command, selector } = req.body;
  
    try {
      if (command === "click") {
        res.json({ script: `document.querySelector('${selector}').click();` });
      } else if (command === "type") {
        res.json({ script: `document.querySelector('${selector}').value = '${req.body.value}';` });
      } else if (command === "navigate") {
        res.json({ script: `window.location.href = '${req.body.url}';` });
      } else {
        res.status(400).json({ error: "Invalid command" });
      }
    } catch (error) {
      res.status(500).json({ error: "Command execution error" });
    }
  };
  