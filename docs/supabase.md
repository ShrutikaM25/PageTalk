## Generating Supabase Database Types

```
npx supabase gen types typescript --project-id jnqkswabjjcrpkmvdama > src/lib/database.types.ts
```

## Supabase Auth
https://supabase.com/docs/guides/auth/auth-helpers/nextjs?language=ts#server-side

## Auth Responses

### Login

```json
{
  data: {
    user: {
      id: 'c7d60f39-c42c-4f1e-b425-fe74e7052837',
      aud: 'authenticated',
      role: 'authenticated',
      email: 'shantanuwable2003@gmail.com',
      email_confirmed_at: '2024-01-02T17:31:07.681788Z',
      phone: '',
      confirmed_at: '2024-01-02T17:31:07.681788Z',
      last_sign_in_at: '2024-01-03T06:08:55.368512903Z',
      app_metadata: [Object],
      user_metadata: {},
      identities: [Array],
      created_at: '2024-01-02T17:31:07.676665Z',
      updated_at: '2024-01-03T06:08:55.370295Z'
    },
    session: {
      access_token: 'eyJhbGciOiJIUzI1NiIsImtpZCI6InZaWlEzUnFYdWMrTVgwUHoiLCJ0eXAiOiJKV1QifQ.eyJhdWQiOiJhdXRoZW50aWNhdGVkIiwiZXhwIjoxNzA0MjY1NzM1LCJpYXQiOjE3MDQyNjIxMzUsImlzcyI6Imh0dHBzOi8vam5xa3N3YWJqamNycGttdmRhbWEuc3VwYWJhc2UuY28vYXV0aC92MSIsInN1YiI6ImM3ZDYwZjM5LWM0MmMtNGYxZS1iNDI1LWZlNzRlNzA1MjgzNyIsImVtYWlsIjoic2hhbnRhbnV3YWJsZTIwMDNAZ21haWwuY29tIiwicGhvbmUiOiIiLCJhcHBfbWV0YWRhdGEiOnsicHJvdmlkZXIiOiJlbWFpbCIsInByb3ZpZGVycyI6WyJlbWFpbCJdfSwidXNlcl9tZXRhZGF0YSI6e30sInJvbGUiOiJhdXRoZW50aWNhdGVkIiwiYWFsIjoiYWFsMSIsImFtciI6W3sibWV0aG9kIjoicGFzc3dvcmQiLCJ0aW1lc3RhbXAiOjE3MDQyNjIxMzV9XSwic2Vzc2lvbl9pZCI6IjA1YTYzNzBkLWUxODEtNDE2Ny1hNzFiLTJmZmU0YjkxMWRlOCJ9.P_BlAE-o1GCvA1NnjyFIgtsAQArjC8xUJui9kAQMfjA',
      token_type: 'bearer',
      expires_in: 3600,
      expires_at: 1704265735,
      refresh_token: 'wLvOAeqa2ebmX0eGqw06jA',
      user: [Object]
    }
  },
  error: null
}
```

## SELECT PDF Response
```json
[
    {
        "id": 1,
        "title": "dce5de79-0c9b-4b31-85dc-0e7c01ea6b5b/DMS Softwares",
        "downloadURL": "https://jnqkswabjjcrpkmvdama.supabase.co/storage/v1/object/sign/pdf/dce5de79-0c9b-4b31-85dc-0e7c01ea6b5b/DMS%20Softwares.pdf?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJwZGYvZGNlNWRlNzktMGM5Yi00YjMxLTg1ZGMtMGU3YzAxZWE2YjViL0RNUyBTb2Z0d2FyZXMucGRmIiwiaWF0IjoxNzA0NjIxNzc1LCJleHAiOjE3MDk4MDU3NzV9.chH65ztgYJsiAigRTt1LgTXJAl4KOtpH5DmojtOsMyM",
        "tokenized_text": null,
        "metadata": null,
        "upload_timestamp": null,
        "user_id": "dce5de79-0c9b-4b31-85dc-0e7c01ea6b5b"
    },
    {
        "id": 2,
        "title": "dce5de79-0c9b-4b31-85dc-0e7c01ea6b5b/Manufacturing AS-IS",
        "downloadURL": "https://jnqkswabjjcrpkmvdama.supabase.co/storage/v1/object/sign/pdf/dce5de79-0c9b-4b31-85dc-0e7c01ea6b5b/Manufacturing%20AS-IS.pdf?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJwZGYvZGNlNWRlNzktMGM5Yi00YjMxLTg1ZGMtMGU3YzAxZWE2YjViL01hbnVmYWN0dXJpbmcgQVMtSVMucGRmIiwiaWF0IjoxNzA0NjIxNzkzLCJleHAiOjE3MDk4MDU3OTN9.cp868onQvfYuX2GGCm0epwPc6fqq8aukMW12RwDRiFU",
        "tokenized_text": null,
        "metadata": null,
        "upload_timestamp": null,
        "user_id": "dce5de79-0c9b-4b31-85dc-0e7c01ea6b5b"
    }
]
```