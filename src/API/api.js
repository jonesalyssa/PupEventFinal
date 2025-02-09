import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const COHORT_CODE = "2409-FTB-ET-WEB-PT";
const API_URL = `https://fsa-puppy-bowl.herokuapp.com/api/${COHORT_CODE}`;

const api = createApi({
  reducerPath: "puppyApi",
  baseQuery: fetchBaseQuery({ baseUrl: API_URL }),
  tagTypes: ["Player"],
  endpoints: (builder) => ({
    getPlayers: builder.query({
      query: () => "/players",
      providesTags: (result) => {
        // Log result to understand its structure
        console.log("Fetched Players Result:", result);

        // Ensure the result is in the expected format (an array of players)
        if (Array.isArray(result)) {
          return result.map(({ id }) => ({ type: "Player", id }));
        }

        // If the result contains a 'players' array, we map that
        if (result && result.players && Array.isArray(result.players)) {
          return result.players.map(({ id }) => ({ type: "Player", id }));
        }

        // Fallback to empty tag if no players are found
        return [];
      },
    }),
    getPlayerDetails: builder.query({
      query: (id) => `/players/${id}`,
      providesTags: (result, error, id) => [{ type: "Player", id }],
    }),
    addPlayer: builder.mutation({
      query: (newPlayer) => ({
        url: "/players",
        method: "POST",
        body: newPlayer,
      }),
      invalidatesTags: ["Player"],
    }),
    removePlayer: builder.mutation({
      query: (id) => ({
        url: `/players/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: (result, error, id) => [{ type: "Player", id }],
    }),
  }),
});

export const {
  useGetPlayersQuery,
  useGetPlayerDetailsQuery,
  useAddPlayerMutation,
  useRemovePlayerMutation,
} = api;

export default api;
