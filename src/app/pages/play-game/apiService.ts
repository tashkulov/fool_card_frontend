// // apiService.ts
// import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
//
// const BASE_URL = 'https://foolcard2.shop/v1';
// const HEADERS = {
//     'Content-Type': 'application/json',
//     Authorization: 'dbafcfc84bfb6664a46cf72e8285bb5b19ac621e0555ae72',
// };
//
// export const api = createApi({
//     reducerPath: 'api',
//     baseQuery: fetchBaseQuery({
//         baseUrl: BASE_URL,
//         prepareHeaders: (headers) => {
//             headers.set('Content-Type', HEADERS['Content-Type']);
//             headers.set('Authorization', HEADERS['Authorization']);
//             return headers;
//         },
//     }),
//     endpoints: (builder) => ({
//         joinInGame: builder.query({
//             query: () => '/join',
//         }),
//         fetchGameData: builder.query({
//             query: (gameId) => `/games/${gameId}/get_current_table`,
//         }),
//         fetchGameList: builder.query({
//             query: () => '/games',
//         }),
//         placeCardOnTable: builder.mutation({
//             query: ({ gameId, card }) => ({
//                 url: `/games/${gameId}/place_card_on_table`,
//                 method: 'POST',
//                 params: { card },
//             }),
//         }),
//         beatCard: builder.mutation({
//             query: ({ gameId, cardToBeat, cardToBeatBy }) => ({
//                 url: `/games/${gameId}/beat_card`,
//                 method: 'POST',
//                 params: { card_to_beat: cardToBeat, card_to_beat_by: cardToBeatBy },
//             }),
//         }),
//         endTurn: builder.mutation({
//             query: (gameId) => ({
//                 url: `/games/${gameId}/end_turn`,
//                 method: 'POST',
//             }),
//         }),
//         markPlayerReady: builder.mutation({
//             query: (gameId) => ({
//                 url: `/games/${gameId}/ready`,
//                 method: 'POST',
//             }),
//         }),
//     }),
// });
//
// export const {
//     useJoinInGameQuery,
//     useFetchGameDataQuery,
//     useFetchGameListQuery,
//     usePlaceCardOnTableMutation,
//     useBeatCardMutation,
//     useEndTurnMutation,
//     useMarkPlayerReadyMutation,
// } = api;
//
//
