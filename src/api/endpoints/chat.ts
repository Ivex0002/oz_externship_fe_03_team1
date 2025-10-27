import { api } from '../api'
// const req = {
//   name: 'string',
//   introduction: 'string',
//   profile_img_url: 'string',
//   start_at: 'string',
//   end_at: 'string',
//   max_headcount: 2,
//   status: 'string',
//   lectures: [
//     {
//       uuid: 'string',
//       title: 'string',
//       instructor: 'string',
//       thumbnail_img_url: 'string',
//       categories: [{ id: 123, name: 'string' }],
//       difficulty: 'string',
//       original_price: 123,
//       discount_price: 123,
//       platform: 'string',
//       average_rating: 123,
//       url_link: 'string',
//       is_bookmarked: false,
//     },
//   ],
// }
const res = await api.v1.auth.logout.POST()
