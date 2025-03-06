export const form_snippets = () => ({
    is: 'form',
    onSubmit: "{{e => {\n  e.preventDefault()\n  alert('submit √')\n}}}",
    children: [
      {
        is: 'label',
        style: { display: 'grid', 'grid-template-columns': '80px 1fr', 'column-gap': '8px' },
        children: [
          { is: 'span', style: { 'text-align': 'right' }, children: 'Name' },
          { is: 'input', placeholder: 'Name', style: { width: 'fit-content' } },
        ],
      },
      {
        is: 'label',
        style: { display: 'grid', 'grid-template-columns': '80px 1fr', 'column-gap': '8px' },
        children: [
          { is: 'span', style: { 'text-align': 'right' }, children: 'Select' },
          {
            is: 'select',
            style: { width: 'fit-content' },
            children: [
              { is: 'option', value: '1', children: 'One' },
              { is: 'option', value: '2', children: 'Two' },
              { is: 'option', value: '3', children: 'Three' },
            ],
          },
        ],
      },
      {
        is: 'label',
        style: { display: 'grid', 'grid-template-columns': '80px 1fr', 'column-gap': '8px' },
        children: [
          { is: 'span', style: { 'text-align': 'right' }, children: 'Email' },
          { is: 'input', type: 'email', placeholder: 'Eamil', style: { width: 'fit-content' } },
        ],
      },
      {
        is: 'label',
        style: { display: 'grid', 'grid-template-columns': '80px 1fr', 'column-gap': '8px' },
        children: [
          { is: 'span', style: { 'text-align': 'right' }, children: 'Age' },
          { is: 'input', type: 'range', style: { width: 'fit-content' } },
        ],
      },
      {
        is: 'label',
        style: { display: 'grid', 'grid-template-columns': '80px 1fr', 'column-gap': '8px' },
        children: [
          { is: 'span', style: { 'text-align': 'right' }, children: 'Yes' },
          { is: 'input', type: 'checkbox', style: { width: 'fit-content' } },
        ],
      },
      {
        is: 'label',
        style: { display: 'grid', 'grid-template-columns': '80px 1fr', 'column-gap': '8px' },
        children: [
          { is: 'span', style: { 'text-align': 'right' }, children: 'Born' },
          { is: 'input', type: 'date', style: { width: 'fit-content' } },
        ],
      },
      {
        is: 'label',
        style: {
          display: 'grid',
          'grid-template-columns': '80px 1fr',
          'column-gap': '8px',
        },
        children: [
          { is: 'span', style: { 'text-align': 'right' }, children: 'Password' },
          { is: 'input', type: 'password', placeholder: '***', style: { width: 'fit-content' } },
        ],
      },
      {
        is: 'div',
        style: { display: 'grid', 'grid-template-columns': '80px 1fr', 'column-gap': '8px' },
        children: [
          { is: 'span', style: { 'text-align': 'right' } },
          { is: 'button', type: 'submit', style: { width: 'fit-content' }, children: 'Submit' },
        ],
      },
    ],
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: '12px 0px',
      paddingTop: '20px',
      paddingBottom: '20px',
      paddingRight: '20px',
    },
  })
  