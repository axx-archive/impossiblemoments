export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const ANTHROPIC_API_KEY = process.env.ANTHROPIC_API_KEY;
  if (!ANTHROPIC_API_KEY) {
    return res.status(500).json({ error: 'API key not configured' });
  }

  try {
    const { text, fileBase64, fileType, fileName } = req.body;

    const systemPrompt = `You are a document formatter for One Night Entertainment. Convert the provided content into clean markdown using ONLY these markers:

# for main headings
## for subheadings
### for minor headings
Regular text for body paragraphs
**bold** for emphasis or callouts
> for styled quotes (each line of the quote starts with >)
- for bullet points
--- for section dividers
Blank lines between sections for spacing

Rules:
- Preserve ALL original content — do not summarize or omit anything
- Structure the hierarchy logically based on the document's layout
- Output ONLY the raw markdown — no code fences, no explanations, no preamble
- Start directly with the first heading or content`;

    const messages = [];

    if (fileBase64 && fileType) {
      // Document/image upload
      const content = [];

      if (fileType === 'application/pdf') {
        content.push({
          type: 'document',
          source: {
            type: 'base64',
            media_type: 'application/pdf',
            data: fileBase64
          }
        });
      } else if (fileType.startsWith('image/')) {
        content.push({
          type: 'image',
          source: {
            type: 'base64',
            media_type: fileType,
            data: fileBase64
          }
        });
      } else {
        // Try as text
        const decoded = Buffer.from(fileBase64, 'base64').toString('utf-8');
        content.push({
          type: 'text',
          text: 'Convert this document to markdown:\n\n' + decoded
        });
      }

      content.push({
        type: 'text',
        text: 'Convert this document to the markdown format specified in your instructions.'
      });

      messages.push({ role: 'user', content });
    } else if (text) {
      messages.push({
        role: 'user',
        content: 'Convert this document to the markdown format specified in your instructions:\n\n' + text
      });
    } else {
      return res.status(400).json({ error: 'No content provided' });
    }

    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': ANTHROPIC_API_KEY,
        'anthropic-version': '2023-06-01'
      },
      body: JSON.stringify({
        model: 'claude-sonnet-4-20250514',
        max_tokens: 8192,
        system: systemPrompt,
        messages
      })
    });

    if (!response.ok) {
      const errText = await response.text();
      console.error('Anthropic API error:', errText);
      return res.status(502).json({ error: 'AI conversion failed' });
    }

    const data = await response.json();
    const markdown = data.content[0].text;

    return res.status(200).json({ markdown });
  } catch (err) {
    console.error('Convert error:', err);
    return res.status(500).json({ error: err.message || 'Internal error' });
  }
}
