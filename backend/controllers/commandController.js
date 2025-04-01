import OpenAI from 'openai';
import { exec } from 'child_process';

// Initialize OpenAI client
const openai = new OpenAI({
  apiKey: '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', // Replace with your OpenAI API key
});

export const executeCommand = async (req, res) => {
  const { query } = req.body; // Receive the natural language query/command

  try {
    // Send the query to GPT for interpretation
    const gptResponse = await openai.completions.create({
      model: 'text-davinci-003', // Choose the appropriate GPT model
      prompt: `
        The user can give various commands. These commands can be for OS-level actions like opening applications (e.g., "open Paint"), clicking buttons on a page (e.g., "click #submit-button"), typing text in inputs (e.g., "type #username john_doe"), or navigating to a URL (e.g., "navigate https://example.com").
        The user can also ask questions or make requests, like "What's the weather today?" or "Tell me a joke."

        Based on the following input query, please identify the type of request and provide the action to take (if any). Your output should be an action and relevant parameters if applicable.

        Query: "${query}"
        
        Actions: 
        - 'open' <app name>  (e.g., 'open Paint')
        - 'click' <selector>  (e.g., 'click #submit-button')
        - 'type' <selector> <value>  (e.g., 'type #username john_doe')
        - 'navigate' <url>  (e.g., 'navigate https://example.com')
        - 'query' <question>  (for any general queries like 'What is the weather today?')

        Please respond with only the action and relevant parameters, or 'no action' if no specific action is required.
      `,
      max_tokens: 100,
      temperature: 0.7, // Make the response more creative for queries
    });

    const responseText = gptResponse.choices[0].text.trim();

    // Example response could be "open Paint" or "query Weather today"
    const [action, ...params] = responseText.split(' ');

    if (action === 'open') {  
      const app = params.join(' ');
      let osCommand = '';

      if (process.platform === 'win32') {
        osCommand = `start ${app}`;
      } else if (process.platform === 'darwin') {
        osCommand = `open -a "${app}"`;
      } else if (process.platform === 'linux') {
        osCommand = `xdg-open ${app}`;
      } else {
        return res.status(400).json({ error: 'Unsupported platform' });
      }

      exec(osCommand, (error, stdout, stderr) => {
        if (error) {
          console.error(`exec error: ${error}`);
          return res.status(500).json({ error: 'Failed to open application' });
        }
        if (stderr) {
          console.error(`stderr: ${stderr}`);
          return res.status(500).json({ error: 'Failed to open application' });
        }
        return res.json({ success: true });
      });
    } else if (action === 'click') {
      const selector = params.join(' ');
      return res.json({ script: `document.querySelector('${selector}').click();` });
    } else if (action === 'type') {
      const selector = params[0];
      const value = params.slice(1).join(' ');
      return res.json({ script: `document.querySelector('${selector}').value = '${value}';` });
    } else if (action === 'navigate') {
      const url = params.join(' ');
      return res.json({ script: `window.location.href = '${url}';` });
    } else if (action === 'query') {
      // Handle queries like asking for the weather
      const question = params.join(' ');
      // You can call a weather API or process the query based on what it is
      // For example, using OpenAI again for weather-related queries:
      const weatherResponse = await openai.completions.create({
        model: 'text-davinci-003',
        prompt: `Answer the following question: "${question}"`,
        max_tokens: 50,
      });
      return res.json({ answer: weatherResponse.choices[0].text.trim() });
    } else {
      return res.status(400).json({ error: 'Invalid command' });
    }
  } catch (error) {
    console.error('Error processing query:', error);
    return res.status(500).json({ error: 'Failed to process query' });
  }
};
