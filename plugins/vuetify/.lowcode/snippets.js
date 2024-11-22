const cards = [
  {
    id: 'v-card.0',
    cover: () => import('./imgs/card0.png?url').then((e) => e.default),
    category: 'card',
    keywords: ['卡片'],
    schema: () => ({
      is: 'v-card',
      children: [
        {
          is: 'v-card-item',
          children: [
            { is: 'v-card-title', children: [{ is: 'span', children: 'Card Title' }] },
            { is: 'v-card-subtitle', children: [{ is: 'span', children: 'Card subtitle secondary text' }] },
          ],
        },
        { is: 'v-card-text', children: [{ is: 'span', children: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.' }] },
        { is: 'v-card-actions', children: [{ is: 'v-btn', color: 'primary', children: [{ is: 'span', children: 'More' }] }] },
      ],
    }),
  },
  {
    id: 'v-card.1',
    cover: () => import('./imgs/card1.png?url').then((e) => e.default),
    category: 'card',
    keywords: ['卡片'],
    schema: () => ({
      is: 'v-card',
      children: [
        { is: 'img', src: 'https://cdn.vuetifyjs.com/images/cards/sunshine.jpg', style: { height: '180px', width: '100%' } },
        { is: 'v-card-title', children: [{ is: 'span', children: 'Top western road trips' }] },
        { is: 'v-card-subtitle', children: [{ is: 'span', children: '1,000 miles of wonder' }] },
        { is: 'v-card-actions', children: [{ is: 'v-btn', color: 'warning', children: [{ is: 'span', children: 'More' }] }] },
      ],
      variant: 'tonal',
    }),
  },
  {
    id: 'v-card.2',
    cover: () => import('./imgs/card2.png?url').then((e) => e.default),
    category: 'card',
    keywords: ['卡片'],
    schema: () => ({
      is: 'v-card',
      children: [
        {
          is: 'div',
          children: [
            { is: 'img', src: 'https://cdn.vuetifyjs.com/images/cards/docks.jpg', style: { objectFit: 'cover', position: 'absolute', width: '100%', height: '100%' } },
            { is: 'v-card-title', children: [{ is: 'span', children: 'Top 10 Australian beaches' }], style: { position: 'absolute', bottom: '0', width: '100%' } },
          ],
          style: { position: 'relative', height: '200px' },
        },
        { is: 'v-card-subtitle', children: [{ is: 'span', children: 'Number 10' }], style: { paddingTop: '16px' } },
        {
          is: 'v-card-text',
          children: [
            { is: 'span', children: 'Whitehaven Beach' },
            { is: 'span', children: 'Whitsunday Island, Whitsunday Islands' },
          ],
          style: { display: 'flex', flexDirection: 'column' },
        },
        {
          is: 'v-card-actions',
          children: [
            { is: 'v-btn', color: 'orange', children: [{ is: 'span', children: 'Share' }] },
            { is: 'v-btn', color: 'orange', children: [{ is: 'span', children: 'Expolre' }] },
          ],
        },
      ],
      elevation: 16,
    }),
  },
  {
    id: 'v-card.3',
    cover: () => import('./imgs/card3.png?url').then((e) => e.default),
    category: 'card',
    keywords: ['卡片'],
    schema: () => ({
      is: 'v-card',
      children: [
        {
          is: 'div',
          children: [
            { is: 'v-card-title', children: [{ is: 'span', children: 'Supermodel' }] },
            { is: 'v-card-subtitle', children: [{ is: 'span', children: 'Foster the People' }] },
            {
              is: 'v-card-actions',
              children: [{ is: 'v-btn', children: [{ is: 'span', children: 'Start Radio' }], variant: 'outlined', size: 'small', style: { marginLeft: '8px' } }],
            },
          ],
          style: { flex: '1', width: '0px' },
        },
        { is: 'img', src: 'https://cdn.vuetifyjs.com/images/cards/foster.jpg', style: { height: '125px', marginTop: '12px', marginLeft: '12px', marginRight: '12px', marginBottom: '12px' } },
      ],
      style: { display: 'flex' },
      color: '#1F7087',
    }),
  },
]

const layouts = [
  {
    id: 'v-layout.0',
    cover: () => import('./imgs/layout0.png?url').then((e) => e.default),
    category: 'layout',
    keywords: ['布局'],
    schema: () => ({
      is: 'v-layout',
      style: { height: '100%' },
      children: [
        {
          is: 'v-app-bar',
          elevation: 8,
          children: {
            title: { children: [{ is: 'span', children: 'Application bar' }] },
          },
        },
        { is: 'v-navigation-drawer', permanent: true, children: [] },
        { is: 'v-main', children: [] },
      ],
    }),
  },
]

const forms = []

const lists = []

const dialogs = []

export const snippets = [...cards, ...layouts, ...forms, ...lists, ...dialogs]
