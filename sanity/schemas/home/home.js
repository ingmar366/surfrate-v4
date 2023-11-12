import image from '../components/image'

export default {
  type: 'document',
  name: 'home',
  title: 'Home Page',
  groups: [
    {
      name: 'menu',
      title: 'menu',
    },
  ],
  fields: [
    {
      title: 'Title',
      name: 'title',
      type: 'string',
    },
    {
      title: 'logo',
      name: 'logo',
      type: 'image',
      group: 'menu',
      fields: image,
    },
    {
      title: 'Arrow icon',
      name: 'logoMenuArrow',
      type: 'image',
      group: 'menu',
      fields: image,
    },
  ],
}
