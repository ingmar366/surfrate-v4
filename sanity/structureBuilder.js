import {BlockContentIcon, DocumentIcon} from '@sanity/icons'

export const structure = (S, context) =>
  S.list()
    .title('E-commerce')
    .items([
      S.listItem()
        .title('Additionals')
        .icon(BlockContentIcon)
        .child(
          S.list()
            .title('Additionals')
            .items([
              S.listItem()
                .title('Header')
                .child(S.document().schemaType('header'))
                .icon(DocumentIcon),
              S.listItem()
                .title('Footer')
                .child(S.document().schemaType('footer'))
                .icon(DocumentIcon),
            ]),
        ),
      S.divider(),
      S.listItem().title('Home').child(S.document().schemaType('home')).icon(DocumentIcon),
    ])
