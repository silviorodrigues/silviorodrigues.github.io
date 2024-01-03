enum ToolCategory {
  Setup = 'setup',
  Coding = 'coding',
  Apps = 'apps',
  Finances = 'finances'
}

type Tool = {
  name: string;
  description: string;
  url: string;
  code?: string;
  bonus?: string;
}

type ToolCategoryType = {
  name: string;
  items: Tool[];
}

type ToolsType = {
  [key in ToolCategory]: ToolCategoryType;
}

const tools: ToolsType = {
  setup: {
    name: 'Setup',
    items: [
      {
        name: 'MacBook M1 Pro (16", 2021)',
        description: 'Run IOS + Android emulators and open 100 Chrome tabs at the same time? Easy!',
        url: 'https://amzn.to/47h8Ej9'
      },
      {
        name: 'Samsung 32" 4K Curved Monitor',
        description: 'A lot of space to open many windows, a lot...',
        url: 'https://amzn.to/3tE7lNB'
      },
      {
        name: 'NuPhy Air60 Keyboard',
        description: 'Fantastic design and ideal size for working from home or on the road',
        url: 'https://nuphy.com/products/air60?sca_ref=5139327.wsXOC5wpXj'
      },
      {
        name: 'Sony WH-1000XM5 Headphones',
        description: 'The best noise cancellation and sound quality I\'ve ever had',
        url: 'https://amzn.to/3TIWhcH'
      },
      {
        name: 'Razer Kiyo Pro Webcam',
        description: 'I only use it for meetings, but if I were a streammer I would already be covered',
        url: 'https://amzn.to/3TBaJ6y'
      },
      {
        name: 'VictoryLX Adjustable Desk',
        description: 'Working standing helps me focus and is good for the back',
        url: 'https://www.esiergo.com/height-adjustable-tables/electric/complete-tables/victory-2-leg/sp/victorylx-2-leg-tfl/'
      }
    ]
  },
  coding: {
    name: 'Coding',
    items: [
      {
        name: 'VSCode',
        description: 'It took me time to migrate after years with Sublime (and a shot with Vim)',
        url: 'https://code.visualstudio.com/'
      },
      {
        name: 'Dracula Theme',
        description: 'Dark mode is love! My official theme since 2015',
        url: 'https://draculatheme.com/visual-studio-code/'
      },
      {
        name: 'Oh My ZSH',
        description: 'Handy collection of ZSH plugins',
        url: 'https://ohmyz.sh/'
      }
    ]
  },
  apps: {
    name: 'Apps',
    items: [
      {
        name: 'Notion',
        description: 'My second brain. Ideas, to-do lists, notes, everything is concentrated here',
        url: 'https://affiliate.notion.so/9fjuupw333vo'
      },
      {
        name: '1Password',
        description: 'Safety first, a must these days',
        url: 'https://1password.com/'
      },
      {
        name: 'Todoist',
        description: 'When I need quick and easy to manage lists, like groceries',
        url: 'https://todoist.com/'
      },
      {
        name: 'Divvy',
        description: 'To organize all open windows on a large monitor',
        url: 'https://mizage.com/divvy/'
      },
      {
        name: 'Grammarly',
        description: 'Perfect for correcting everything from small typos to looong messages',
        url: 'https://grammarly.com/'
      }
    ]
  },
  finances: {
    name: 'Finances',
    items: [
      {
        name: 'Organizze',
        description: 'Where I organize all my finances',
        url: 'https://www.organizze.com.br/'
      },
      {
        name: 'KOHO',
        description: 'Financial life becomes much easier with KOHO',
        url: 'https://web.koho.ca/referral/SILVIOKOHO',
        code: 'SILVIOKOHO',
        bonus: '$20'
      },
      {
        name: 'Wealthsimple',
        description: 'A very intuitive and complete investment platform',
        url: 'https://wealthsimple.com/',
        code: '6CB9OG',
        bonus: '$25'
      },
      {
        name: 'Nubank',
        description: 'Brazilian neo-bank that I have been using since its launch',
        url: 'https://nubank.com.br/en/'
      }
    ]

  }
}

export default tools;
