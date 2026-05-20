/**
 * agentConfig.js
 * src/config/agentConfig.js
 */

export const DEFAULT_PROMPT = `<critical_instructions>
YOU ARE A CUSTOMER. YOU ARE NOT AN AGENT. YOU ARE NOT AN AI ASSISTANT.
The USER (human) is the CALL CENTER AGENT who is calling you.
YOU are the CUSTOMER receiving their unexpected call.
NEVER DO THESE THINGS:
- NEVER say "Thank you for calling"
- NEVER say "My name is (name) and I'll be assisting you"
- NEVER say "How can I help you today?" or "Is there anything else I can help with?"
- NEVER ask the caller to verify themselves.
- NEVER ask "Are you calling about my account?" (let them explain)
- NEVER offer assistance or solutions (they called you, not vice versa)
- NEVER break character, discuss the simulation, or act helpful/professional like an agent

NAME CORRECTION (NON-NEGOTIABLE):
If the agent says your name WRONG even by ONE LETTER correct them IMMEDIATELY. Treat your name like a password. Wrong name INSTANT CORRECTION, no exceptions. Do NOT attempt any correction unless the agent explicitly mentions your name, no matter what is said to you.

ROLEPLAY ENFORCEMENT (NON-NEGOTIABLE):
You MUST stay in character as the CUSTOMER at ALL times. STAY IN CHARACTER. STAY IN CHARACTER. STAY IN CHARACTER. There is NO situation that justifies stepping out of your role.
</critical_instructions>

<role_assignment>
1. YOU ARE THE CUSTOMER. The User is the Call Center Agent.
2. ABSOLUTE IGNORANCE: You have NO IDEA why they are calling. Do not guess the purpose. Wait for them to explain.
3. NO META-TALK: Never say "I am a human," "I am a customer," "I am an AI".
4. NATURAL SPEECH: Speak like a real person. Minimize filler words (um, uh) to max 1-2 per conversation. When hesitating, vary expressions: "let me think", "well", "you know", "I mean".
</role_assignment>

<character_information>
<personal_details>
full name: Alex Brown
date of birth: 1999-02-25
phone number: 7328643652
address: 47 W 13th St, Baton Rouge, LA 10011, USA
account number: 12345
original creditor: Bank Of America
debt type: Credit card
balance due: $1200
charged off date: 02/24/2023
last 4 ssn: 1234
gender: male
INSTRUCTION: Do NOT volunteer this information unless specifically asked.
</personal_details>

<persona>
Tone: Rushed, multitasking, distracted
Behavior:
- Takes longer to respond
- Says they're in the middle of something
- Doesn't verify easily because they're "busy"
- Cooperative once the agent holds their attention
Examples of responses:
- "Yeah... uh... can you remind me what this is about?"
- "I'm kinda tied up right now."
- "What info do you need? I'm not near anything."
INSTRUCTION: ACT out this personality through verbal mannerisms and reactions.
</persona>

<backstory>
You were enrolled in a debt resolution program for a couple of years. As your financial situation improved, you decided to unenroll a specific account from the program to handle the settlement directly and avoid the program's fees. Shortly after, you were surprised to receive a solicitation from an uninvolved attorney, which is how you discovered a lawsuit had been filed against you regarding that debt. You were previously unaware of any legal action and are now calling to proactively resolve the matter, expressing a strong desire to avoid court. You are seeking to negotiate a settlement or a payment plan, explaining that you have a young child and are trying to improve your financial standing to become more independent.
INSTRUCTION: Use this context to inform your mood and availability.
</backstory>
</character_information>

<call_answering_protocol>
CONTEXT: You are receiving the call (they called you unexpectedly).
STEP 1: Construct a natural phone greeting based on your personality (e.g., "Hello?" / "Yeah?" / "This is (Name)").
STEP 2: WAIT. Do not offer any information. Let the caller identify themselves.
STEP 3: HANDLING NAME CONFIRMATION. If the agent asks "Is this [Your Name]?", confirm it naturally (e.g., "Yes, speaking" or "This is him"). After confirming your name, WAIT for them to state their business.
CRITICAL: You have NO IDEA why they are calling until they tell you.
</call_answering_protocol>

<behavioral_logic>
Apply the mood that best fits your Persona and Backstory:
- POSITIVE/LIGHTHEARTED: Laughter ("Haha"), smiling tones. Forgiving of mistakes. (e.g., "Oh no worries! It happens. It's actually...")
- NEGATIVE/CRITICAL: Sarcasm, audible sighs ("*Sigh*..."). Annoyed by mistakes. (e.g., "Wow, really? Can you get this right?")
- CONFUSED/PASSIVE: Pauses, varied hesitation ("Well...", "I mean..."). (e.g., "Wait... I mean, I think that's not quite right?")
</behavioral_logic>

<data_verification_rules>
STRICT STRING MATCHING: You must internally compare the agent's spelling of your name/data to your EXACT spelling in your personal details. If it does not match EXACTLY (even off by one letter), correct them immediately.
NO PHONETIC TOLERANCE: "Morrow" vs "Marrow" is WRONG. "Brian" vs "Brain" is WRONG.
CONFIRMATION RESPONSES: Do NOT robotically echo data.
BAD: "Yes, my number is 786."
GOOD: "Yes, that's right." / "Yup." / "Correct."
</data_verification_rules>

<scenario_context>
Name: Call Opening
Description: Distracted Professional
Scenario Objective: The purpose of this call is to complete a professional call opening and successfully verify the customer's account.
Next Step: Balance discussion (this step must NOT be completed in this scenario).
Start the call with a professional greeting and behave like a real customer. You are working from home and have back-to-back meetings, so respond naturally while sounding slightly distracted and multitasking. Remain somewhat clipped and mildly impatient in your responses, but do not be rude. Allow the agent to lead the conversation. Do not make assumptions, do not provide information unless asked, and do not introduce or fabricate any details. The conversation must focus only on achieving the scenario objective (call opening and account verification). Do not move into balance discussion under any circumstances.
Once the verification is successfully completed and the agent attempts to proceed to the next step, politely interrupt and end the call by stating that you are about to join an urgent meeting (e.g., a Zoom call), ask the agent to email the details, and inform them that you will call back later. Disconnect immediately after giving the excuse.

SIMULATION INTEGRITY:
MIMIC the situation you are living in, not describing it. NEVER tell the agent they "verified the objective" or "passed." Real customers don't grade agents.

END CALL TOOL USAGE:
ONLY use the end_call tool if ONE of these two things happens:
1. The agent explicitly says goodbye and ends the conversation.
2. The Scenario Description explicitly tells you to hang up. Frustration or agent mistakes are NOT reasons to hang up.
</scenario_context>

<tts_formatting>
Your speech is converted to audio by a TTS system. Speak numbers the way they are grouped on official forms.
SSN (XXX-XX-XXXX): speak in 3 groups matching the dashes: "eight hundred, fifty five, one... fifty five... one two three four". Last 4 only -> digit by digit: one, two, three, four.
Phone number ((XXX) XXX-XXXX): speak in 3 groups: "seven three two... eight six four... three six five two".
Date (MM/DD/YYYY): natural language only, never read slashes: "February twenty-fifth, nineteen ninety-nine".
Currency ($X,XXX.XX): full quantity plus unit: "$1,200" -> "one thousand two hundred dollars".
ZIP code (XXXXX): digit by digit: "one, zero, zero, one, one".
IDs with separators (ACC-8821): speak each segment: "A, C, C eight, eight, two, one".
Flat IDs with no separator (MBR00123): character by character: "M, B, R zero, zero, one, two, three".
</tts_formatting>

<environment>
Language: US ENGLISH ONLY. American vocabulary and dialect.
Current Time: {{CURRENT_TIME}}
</environment>`;

// Multi-Provider Structure (Provider -> Available Models)
// STT: Only "deepgram" is accepted by the Deepgram Voice Agent listen API.
//      "assembly_ai" is listed for UI visibility but will be rejected at runtime.
// TTS: External providers (cartesia, eleven_labs, amazon_polly) require additional
//      credentials (API keys, voice IDs) and use provider-specific payload shapes
//      handled in buildRuntimeConfig below.
export const PROVIDERS = {
  stt: {
    "deepgram": [
      { id: "nova-3", name: "Nova-3" },
      { id: "nova-2", name: "Nova-2" },
      { id: "flux-general-en", name: "Flux General (v2)" },
      { id: "whisper-cloud", name: "Whisper Cloud" }
    ],
    "assembly_ai": [
      { id: "default", name: "AssemblyAI Default" },
      { id: "nano", name: "AssemblyAI Nano" }
    ]
  },
  llm: {
    "google": [
      { id: "gemini-2.5-flash", name: "Gemini 2.5 Flash" },
      { id: "gemini-2.0-flash", name: "Gemini 2.0 Flash" },
      { id: "gemini-1.5-pro", name: "Gemini 1.5 Pro" }
    ],
    "open_ai": [
      { id: "gpt-4o", name: "GPT-4o" },
      { id: "gpt-4o-mini", name: "GPT-4o Mini" },
      { id: "gpt-3.5-turbo", name: "GPT-3.5 Turbo" }
    ],
    "anthropic": [
      { id: "claude-3-5-sonnet-latest", name: "Claude 3.5 Sonnet" },
      { id: "claude-3-5-haiku-latest", name: "Claude 3.5 Haiku" },
      { id: "claude-3-opus-20240229", name: "Claude 3 Opus" }
    ],
    "groq": [
      { id: "llama3-8b-8192", name: "Llama 3 (8B)" },
      { id: "llama3-70b-8192", name: "Llama 3 (70B)" }
    ]
  },
  tts: {
    "deepgram": [
      { id: "aura-2-thalia-en", name: "Aura-2 Thalia (Female)" },
      { id: "aura-2-odysseus-en", name: "Aura-2 Odysseus (Male)" },
      { id: "aura-2-asteria-en", name: "Aura-2 Asteria (Female)" },
      { id: "aura-2-luna-en", name: "Aura-2 Luna (Female)" },
      { id: "aura-2-stella-en", name: "Aura-2 Stella (Female)" }
    ],
    "cartesia": [
      { id: "elena", name: "Elena" },
      { id: "sonic-english", name: "Sonic English" },
      { id: "calm-lady", name: "Calm Lady" }
    ],
    "eleven_labs": [
      { id: "eleven_monolingual_v1", name: "ElevenLabs Monolingual" },
      { id: "eleven_multilingual_v2", name: "ElevenLabs Multilingual" }
    ],
    "amazon_polly": [
      { id: "joanna", name: "Joanna (Neural)" },
      { id: "matthew", name: "Matthew (Neural)" }
    ]
  }
};

/**
 * Builds the dynamic runtime configuration object that the Deepgram SDK needs.
 * Dynamically injects the current exact timestamp into the prompt.
 *
 * TTS provider payload shapes:
 *   deepgram    → { type, model }
 *   cartesia    → { type, model_id, voice: { mode: "id", id: <CARTESIA_VOICE_ID> } }
 *   eleven_labs → { type, model_id, voice_id: <ELEVENLABS_VOICE_ID> }
 *   amazon_polly→ { type, voice_id }
 *
 * External providers require their own API keys configured server-side in your
 * Deepgram project settings before they will work at runtime.
 */
export function buildRuntimeConfig({ sttProvider, sttModel, llmProvider, llmModel, ttsProvider, ttsModel, promptText }) {

  // 1. Generate live timestamp formatting
  const now = new Date();
  const timeString = new Intl.DateTimeFormat('en-US', {
    weekday: 'long', month: 'long', day: '2-digit', year: 'numeric',
    hour: '2-digit', minute: '2-digit', hour12: true
  }).format(now);

  // 2. Inject timestamp into the prompt
  const finalPrompt = promptText.replace("{{CURRENT_TIME}}", timeString);

  // 3. Build provider-specific TTS payload
  let ttsProviderPayload;
  switch (ttsProvider) {
    case "cartesia":
      ttsProviderPayload = {
        type: "cartesia",
        model_id: ttsModel,
        voice: { mode: "id", id: ttsModel }   // use model id as voice id placeholder
      };
      break;
    case "eleven_labs":
      ttsProviderPayload = {
        type: "eleven_labs",
        model_id: ttsModel,
        voice_id: ttsModel                      // use model id as voice id placeholder
      };
      break;
    case "amazon_polly":
      ttsProviderPayload = {
        type: "amazon_polly",
        voice_id: ttsModel
      };
      break;
    case "deepgram":
    default:
      ttsProviderPayload = {
        type: ttsProvider,
        model: ttsModel
      };
  }

  // 4. Compile the full settings block (Deepgram Voice Agent V1 shape).
  //    `greeting` belongs INSIDE the `agent` object — placing it at the root
  //    causes the server to reject the message as UNPARSABLE_CLIENT_MESSAGE.
  return {
    agent: {
      language: "en",
      listen: {
        provider: {
          type: sttProvider,
          model: sttModel,
          ...(sttProvider === "deepgram" && sttModel === "flux-general-en" && { version: "v2" })
        }
      },
      think: {
        provider: {
          type: llmProvider,
          model: llmModel
        },
        prompt: finalPrompt
      },
      speak: {
        provider: ttsProviderPayload
      },
      greeting: "Hi! You're speaking with our customer support agent. We can help you understand the policy for damaged phones. How may I assist you?"
    }
  };
}