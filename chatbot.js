/* The Cozm — Chatbot Widget */
(function () {
  const BRAND = '#40AEBC';
  const DARK  = '#181C31';

  const responses = [
    {
      keywords: ['cozm travel', 'travel', 'a1', 'posted worker', 'pwn', 'social security'],
      reply: "Cozm Travel automates business travel compliance — A1 certifications, EU Posted Worker Notifications, business visas, income tax, and equal pay calculations. Filings take under <strong>60 seconds</strong> across 28 countries. Want to book a demo?"
    },
    {
      keywords: ['cozm unity', 'unity', 'digital workforce', 'digital specialist'],
      reply: "Cozm Unity is the world's first Digital Global Mobility Workforce. AI-powered Digital Specialists handle master data, analytics, vendor management, and compliance monitoring — giving your team back <strong>15–20 hours per week</strong>. Shall I arrange a walkthrough?"
    },
    {
      keywords: ['cozm nemo', 'nemo', 'talent', 'workforce planning'],
      reply: "Cozm Nemo is our upcoming Talent Mobility Technology platform — bringing mobility data into talent planning for smarter cross-border hire decisions. It's launching in 2025. Want to be notified when it goes live?"
    },
    {
      keywords: ['price', 'pricing', 'cost', 'how much', 'subscription', 'fee'],
      reply: "The Cozm uses transparent subscription pricing with no surprise case fees — unlike legacy providers who charge €150–400 per filing. Our clients typically reduce total mobility spend by <strong>40–60%</strong>. For a personalised quote, please <a href='mailto:support@thecozm.com' style='color:#40AEBC'>contact our team</a>."
    },
    {
      keywords: ['demo', 'book', 'trial', 'start', 'get started', 'sign up'],
      reply: "Ready to get started? You can book a demo by emailing <a href='mailto:support@thecozm.com' style='color:#40AEBC'>support@thecozm.com</a> or reaching Benjamin directly at <a href='mailto:benjamin@thecozm.com' style='color:#40AEBC'>benjamin@thecozm.com</a>. First filing within 5 days — guaranteed."
    },
    {
      keywords: ['countries', 'coverage', 'where', 'country'],
      reply: "Cozm Travel covers <strong>28 countries</strong> for A1 Articles 12 & 13, <strong>10 countries</strong> for Certificates of Coverage, and <strong>25+ countries</strong> for Posted Worker Notifications — the broadest automated coverage on the market."
    },
    {
      keywords: ['iso', 'certification', 'security', 'data', 'safe', 'secure'],
      reply: "The Cozm is <strong>ISO 7001 certified</strong>. We maintain full data integrity, audit trails for every action, and comply with all applicable data protection regulations. Your employees' data is secure at every step."
    },
    {
      keywords: ['partner', 'integration', 'hris', 'connect', 'api'],
      reply: "We offer <strong>25+ system integrations</strong> including HRIS, travel management, payroll, and expense platforms. Our native API-first architecture connects seamlessly with your existing tech stack — no rip-and-replace required."
    },
    {
      keywords: ['team', 'who', 'founder', 'benjamin', 'about'],
      reply: "The Cozm was founded by <strong>Benjamin Oghene</strong>, former Global Head of Technology & Innovation at PwC. Our globally distributed team spans five continents with over 100 years of combined experience in global mobility and technology."
    },
    {
      keywords: ['onboard', 'setup', 'implement', 'how long', 'quick'],
      reply: "Onboarding with The Cozm is <strong>90% faster</strong> than legacy providers. Most clients reach their first automated filing within <strong>5 days</strong> — compared to 6–8 weeks with traditional platforms."
    },
    {
      keywords: ['hi', 'hello', 'hey', 'good morning', 'good afternoon'],
      reply: "Hello! 👋 I'm the Cozm assistant. I can help you with questions about Cozm Travel, Cozm Unity, our pricing, country coverage, or booking a demo. What would you like to know?"
    }
  ];

  const defaultReply = "Thanks for your message! For detailed enquiries, please contact our team at <a href='mailto:support@thecozm.com' style='color:#40AEBC'>support@thecozm.com</a> or <a href='mailto:benjamin@thecozm.com' style='color:#40AEBC'>benjamin@thecozm.com</a>. We typically respond within a few hours.";

  function getResponse(text) {
    const lower = text.toLowerCase();
    for (const item of responses) {
      if (item.keywords.some(k => lower.includes(k))) return item.reply;
    }
    return defaultReply;
  }

  function buildWidget() {
    // Inject styles
    const style = document.createElement('style');
    style.textContent = `
      .cozm-chat-btn {
        position: fixed; bottom: 1.75rem; right: 1.75rem; z-index: 10000;
        width: 58px; height: 58px; border-radius: 50%;
        background: ${BRAND}; border: none; cursor: pointer;
        box-shadow: 0 4px 20px rgba(64,174,188,0.45);
        display: flex; align-items: center; justify-content: center;
        transition: transform 0.2s, box-shadow 0.2s;
      }
      .cozm-chat-btn:hover { transform: scale(1.08); box-shadow: 0 6px 28px rgba(64,174,188,0.6); }
      .cozm-chat-btn svg { width: 26px; height: 26px; fill: white; }
      .cozm-chat-btn .close-icon { display: none; }
      .cozm-chat-btn.open .chat-icon { display: none; }
      .cozm-chat-btn.open .close-icon { display: block; }
      .cozm-chat-window {
        position: fixed; bottom: 5.5rem; right: 1.75rem; z-index: 9999;
        width: 360px; max-height: 520px;
        background: white; border-radius: 20px;
        box-shadow: 0 20px 60px rgba(24,28,49,0.2);
        display: flex; flex-direction: column; overflow: hidden;
        transform: scale(0.9) translateY(20px); opacity: 0;
        pointer-events: none; transition: all 0.25s cubic-bezier(.34,1.56,.64,1);
      }
      .cozm-chat-window.open {
        transform: scale(1) translateY(0); opacity: 1; pointer-events: all;
      }
      .cozm-chat-header {
        background: ${DARK}; padding: 1rem 1.25rem;
        display: flex; align-items: center; gap: 0.75rem; flex-shrink: 0;
      }
      .cozm-chat-header-avatar {
        width: 36px; height: 36px; border-radius: 50%;
        background: ${BRAND}; display: flex; align-items: center; justify-content: center;
        font-size: 1.1rem;
      }
      .cozm-chat-header-text { flex: 1; }
      .cozm-chat-header-name { color: white; font-weight: 700; font-size: 0.9rem; font-family: 'Inter', sans-serif; }
      .cozm-chat-header-status { color: rgba(255,255,255,0.5); font-size: 0.75rem; font-family: 'Inter', sans-serif; display: flex; align-items: center; gap: 0.3rem; }
      .cozm-chat-header-status::before { content: ''; width: 7px; height: 7px; border-radius: 50%; background: #4ade80; display: inline-block; }
      .cozm-chat-messages {
        flex: 1; overflow-y: auto; padding: 1.25rem; display: flex; flex-direction: column; gap: 0.75rem;
        background: #f8fafe;
      }
      .cozm-msg { max-width: 85%; display: flex; flex-direction: column; }
      .cozm-msg.bot { align-self: flex-start; }
      .cozm-msg.user { align-self: flex-end; }
      .cozm-msg-bubble {
        padding: 0.65rem 1rem; border-radius: 16px; font-size: 0.875rem;
        line-height: 1.55; font-family: 'Inter', sans-serif;
      }
      .cozm-msg.bot .cozm-msg-bubble {
        background: white; color: #181C31; border: 1px solid #eee; border-radius: 4px 16px 16px 16px;
      }
      .cozm-msg.user .cozm-msg-bubble {
        background: ${BRAND}; color: white; border-radius: 16px 16px 4px 16px;
      }
      .cozm-chat-suggestions {
        display: flex; flex-wrap: wrap; gap: 0.4rem; padding: 0.5rem 1.25rem;
        background: white; border-top: 1px solid #eee;
      }
      .cozm-suggestion {
        font-size: 0.75rem; padding: 0.3rem 0.75rem; border-radius: 50px;
        border: 1px solid ${BRAND}; color: ${BRAND}; background: transparent;
        cursor: pointer; font-family: 'Inter', sans-serif; transition: all 0.15s;
      }
      .cozm-suggestion:hover { background: ${BRAND}; color: white; }
      .cozm-chat-input-area {
        display: flex; gap: 0.5rem; padding: 0.85rem 1rem;
        background: white; border-top: 1px solid #eee; flex-shrink: 0;
      }
      .cozm-chat-input {
        flex: 1; border: 1px solid #eee; border-radius: 50px; padding: 0.55rem 1rem;
        font-family: 'Inter', sans-serif; font-size: 0.875rem; outline: none;
        transition: border-color 0.2s;
      }
      .cozm-chat-input:focus { border-color: ${BRAND}; }
      .cozm-chat-send {
        width: 36px; height: 36px; border-radius: 50%; background: ${BRAND};
        border: none; cursor: pointer; display: flex; align-items: center; justify-content: center;
        flex-shrink: 0; transition: transform 0.15s;
      }
      .cozm-chat-send:hover { transform: scale(1.1); }
      .cozm-chat-send svg { width: 16px; height: 16px; fill: white; }
      .cozm-typing { display: flex; gap: 4px; align-items: center; padding: 0.5rem 0; }
      .cozm-typing span {
        width: 7px; height: 7px; border-radius: 50%; background: ${BRAND};
        animation: typingBounce 1s infinite;
      }
      .cozm-typing span:nth-child(2) { animation-delay: 0.15s; }
      .cozm-typing span:nth-child(3) { animation-delay: 0.3s; }
      @keyframes typingBounce {
        0%, 60%, 100% { transform: translateY(0); opacity: 0.4; }
        30% { transform: translateY(-5px); opacity: 1; }
      }
      @media (max-width: 480px) {
        .cozm-chat-window { width: calc(100vw - 2rem); right: 1rem; }
      }
    `;
    document.head.appendChild(style);

    // Button
    const btn = document.createElement('button');
    btn.className = 'cozm-chat-btn';
    btn.setAttribute('aria-label', 'Open chat');
    btn.innerHTML = `
      <svg class="chat-icon" viewBox="0 0 24 24"><path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2z"/></svg>
      <svg class="close-icon" viewBox="0 0 24 24"><path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/></svg>
    `;

    // Window
    const win = document.createElement('div');
    win.className = 'cozm-chat-window';
    win.innerHTML = `
      <div class="cozm-chat-header">
        <div class="cozm-chat-header-avatar">🤖</div>
        <div class="cozm-chat-header-text">
          <div class="cozm-chat-header-name">Cozm Assistant</div>
          <div class="cozm-chat-header-status">Online — reply in seconds</div>
        </div>
      </div>
      <div class="cozm-chat-messages" id="cozmMessages">
        <div class="cozm-msg bot">
          <div class="cozm-msg-bubble">Hi! 👋 I'm the Cozm assistant. Ask me anything about our products, pricing, or global mobility compliance.</div>
        </div>
      </div>
      <div class="cozm-chat-suggestions" id="cozmSuggestions">
        <button class="cozm-suggestion">Cozm Travel</button>
        <button class="cozm-suggestion">Cozm Unity</button>
        <button class="cozm-suggestion">Book a demo</button>
        <button class="cozm-suggestion">Country coverage</button>
      </div>
      <div class="cozm-chat-input-area">
        <input class="cozm-chat-input" id="cozmInput" type="text" placeholder="Ask a question…">
        <button class="cozm-chat-send" id="cozmSend">
          <svg viewBox="0 0 24 24"><path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"/></svg>
        </button>
      </div>
    `;

    document.body.appendChild(btn);
    document.body.appendChild(win);

    const messages = win.querySelector('#cozmMessages');
    const input = win.querySelector('#cozmInput');
    const sendBtn = win.querySelector('#cozmSend');
    const suggestions = win.querySelector('#cozmSuggestions');

    function addMessage(text, from) {
      const msg = document.createElement('div');
      msg.className = 'cozm-msg ' + from;
      const bubble = document.createElement('div');
      bubble.className = 'cozm-msg-bubble';
      bubble.innerHTML = text;
      msg.appendChild(bubble);
      messages.appendChild(msg);
      messages.scrollTop = messages.scrollHeight;
    }

    function showTyping() {
      const typing = document.createElement('div');
      typing.className = 'cozm-msg bot';
      typing.id = 'cozmTyping';
      typing.innerHTML = '<div class="cozm-typing"><span></span><span></span><span></span></div>';
      messages.appendChild(typing);
      messages.scrollTop = messages.scrollHeight;
    }

    function removeTyping() {
      const t = document.getElementById('cozmTyping');
      if (t) t.remove();
    }

    function send(text) {
      if (!text.trim()) return;
      addMessage(text, 'user');
      input.value = '';
      suggestions.style.display = 'none';
      showTyping();
      setTimeout(() => {
        removeTyping();
        addMessage(getResponse(text), 'bot');
      }, 700 + Math.random() * 400);
    }

    sendBtn.addEventListener('click', () => send(input.value));
    input.addEventListener('keypress', e => { if (e.key === 'Enter') send(input.value); });

    suggestions.querySelectorAll('.cozm-suggestion').forEach(s => {
      s.addEventListener('click', () => send(s.textContent));
    });

    btn.addEventListener('click', () => {
      btn.classList.toggle('open');
      win.classList.toggle('open');
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', buildWidget);
  } else {
    buildWidget();
  }
})();
